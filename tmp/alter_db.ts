import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  try {
    console.log('Altering table...');
    await sql`ALTER TABLE cars ADD COLUMN IF NOT EXISTS blurhash TEXT;`;
    console.log('Table altered successfully.');
  } catch (e) {
    console.error('Error altering table:', e);
  }
}

run();
