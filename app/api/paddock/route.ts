import { sql } from '@vercel/postgres';
import { NextResponse, connection } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  await connection();
  try {
    // 1. Database Table Initialization & Schema Resilience (Migration)
    await sql`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        car_brand TEXT NOT NULL,
        model_manufacturer TEXT NOT NULL,
        scale TEXT NOT NULL,
        full_model_name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure older versions of the table have all current columns
    try { await sql`ALTER TABLE cars ADD COLUMN IF NOT EXISTS image_url TEXT;`; } catch(e) {}
    try { await sql`ALTER TABLE cars ADD COLUMN IF NOT EXISTS model_manufacturer TEXT;`; } catch(e) {}
    try { await sql`ALTER TABLE cars ADD COLUMN IF NOT EXISTS full_model_name TEXT;`; } catch(e) {}

    await sql`
      CREATE TABLE IF NOT EXISTS registry_models_list (
        brand_name TEXT PRIMARY KEY
      );
    `;

    // 2. Fetch the production collection (Limited to 50 for scalable pagination readiness)
    const { rows } = await sql`SELECT * FROM cars ORDER BY date_added DESC LIMIT 50`;
    
    // Fetch unique brands
    const brandResult = await sql`SELECT brand_name FROM registry_models_list ORDER BY brand_name ASC`;
    let categories = brandResult.rows.map(r => r.brand_name);

    // One-Time Secure Seeding Migration: Injects the foundation brands ONCE so they are globally editable and erasable.
    await sql`CREATE TABLE IF NOT EXISTS sys_registry_migrations (name TEXT PRIMARY KEY)`;
    const seeded = await sql`SELECT 1 FROM sys_registry_migrations WHERE name = 'seed-base-brands'`;
    if (seeded.rowCount === 0) {
       console.log("Triggering Application Migration: Seeding 39 Foundation Brands into SQL...");
       const initialBrands = [ "Autoart", "AutoWorld", "Bburago", "BM Creations", "Era Car", "GreenLight", "GT Spirit", "Hobby Japan", "Hot Wheels - Mainline", "Hot Wheels - Premium", "Hot Wheels - RLC", "Hot Wheels - Team Transport", "Ignition Model", "Inno64", "Johnny Lightning", "Kaido House", "Kyosho", "LCD Models", "Maisto", "Majorette", "Mark43", "Matchbox - Basic", "Matchbox - Collectors", "Matchbox - Moving Parts", "Mini GT", "Motorhelix", "Norev", "Ottomobile", "Para64", "Peako64", "Pop Race", "Schuco", "Solido", "Sparky", "Tarmac Works", "Tomica - Basic", "Tomica - Limited Vintage", "Tomica - Premium", "X-Cartoys" ];
       for (const b of initialBrands) {
          await sql`INSERT INTO registry_models_list (brand_name) VALUES (${b}) ON CONFLICT DO NOTHING`;
       }
       await sql`INSERT INTO sys_registry_migrations (name) VALUES ('seed-base-brands')`;
       
       // Force a direct recount from Postgres immediately post-migration.
       const freshBrandResult = await sql`SELECT brand_name FROM registry_models_list ORDER BY brand_name ASC`;
       categories = freshBrandResult.rows.map(r => r.brand_name);
    }

    // Map database columns to the UI data model perfectly
    const collection = rows.map(r => ({
       id: r.id,
       title: r.full_model_name,
       scale: r.scale,
       manufacturer: r.model_manufacturer,
       description: r.car_brand, // Note: car_brand field is used to store user-provided 'Notes'
       dateAdded: new Date(r.date_added).toISOString().split('T')[0],
       imageUrls: [r.image_url]
    }));

    return NextResponse.json({ collection, categories });
  } catch (error) {
    console.error('Postgres Vault Fetch Fault:', error);
    return NextResponse.json({ error: 'DB Fetch Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { car_brand, model_manufacturer, scale, full_model_name, image_url } = await request.json();
    
    if (!full_model_name || !model_manufacturer || !image_url) {
        return NextResponse.json({ error: 'Data Validation Fault: Mandatory Fields Missing' }, { status: 400 });
    }

    // 3. Commit to Postgres Cloud Stability
    await sql`
      INSERT INTO cars (car_brand, model_manufacturer, scale, full_model_name, image_url)
      VALUES (${car_brand}, ${model_manufacturer}, ${scale}, ${full_model_name}, ${image_url})
    `;

    // Ensure model brand exists in registry_models_list
    await sql`
      INSERT INTO registry_models_list (brand_name)
      VALUES (${model_manufacturer})
      ON CONFLICT (brand_name) DO NOTHING;
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Postgres Vault Write Fault:', error);
    return NextResponse.json({ error: 'Cloud Sync Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID Missing' }, { status: 400 });

    const car = await sql`SELECT model_manufacturer FROM cars WHERE id = ${id}`;
    
    await sql`DELETE FROM cars WHERE id = ${id}`;

    if (car.rowCount && car.rowCount > 0) {
      const brand = car.rows[0].model_manufacturer;
      const count = await sql`SELECT count(*) FROM cars WHERE model_manufacturer = ${brand}`;
      if (parseInt(count.rows[0].count) === 0) {
        await sql`DELETE FROM registry_models_list WHERE brand_name = ${brand}`;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Postgres Vault Delete Fault:', error);
    return NextResponse.json({ error: 'Delete Failed' }, { status: 500 });
  }
}
