import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
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

    // 2. Fetch the production collection

    const { rows } = await sql`SELECT * FROM cars ORDER BY date_added DESC`;
    
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

    return NextResponse.json({ collection });
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

    await sql`DELETE FROM cars WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Postgres Vault Delete Fault:', error);
    return NextResponse.json({ error: 'Delete Failed' }, { status: 500 });
  }
}
