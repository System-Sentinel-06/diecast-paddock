'use server';

import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function addCarToPaddock(formData: FormData) {
  try {
    console.log('--- Starting Cloud Sync Operation ---');
    
    const carBrand = formData.get('car_brand') as string;
    const modelManufacturer = formData.get('model_manufacturer') as string;
    const scale = formData.get('scale') as string;
    const fullModelName = formData.get('full_model_name') as string;
    const imageFile = formData.get('image_file') as File;

    // 1. Image Safety & Size Validation
    if (!imageFile || imageFile.size === 0) {
      console.error('Validation Error: Asset Missing');
      return { error: 'Photographic Asset Required' };
    }

    if (imageFile.size > 4 * 1024 * 1024) {
      console.error('File too large for Serverless Function');
      return { error: 'File too large for Serverless Function (Max 4MB)' };
    }

    // 2. Vercel Blob Upload
    console.log('Starting Upload to Vercel Blob...');
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
      addRandomSuffix: true,
    });
    console.log(`Blob URL Received: ${blob.url}`);

    // 3. Connection Resilience (500ms pool warm-up)
    console.log('Warming Postgres Connection Pool...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Force a warm connection
    const client = await sql.connect();
    console.log('Handshake Established.');

    // 4. SQL Integrity: Permanent Insertion
    console.log('Starting SQL Insert...');
    const result = await client.sql`
      INSERT INTO cars (car_brand, model_manufacturer, scale, full_model_name, image_url)
      VALUES (${carBrand}, ${modelManufacturer}, ${scale}, ${fullModelName}, ${blob.url})
      RETURNING id;
    `;

    if (!result || result.rowCount === 0) {
      throw new Error('Database Commit Fault: Row not created');
    }

    console.log(`Sync Complete: ID ${result.rows[0].id} established.`);
    
    // 5. Cache Invalidation
    revalidatePath('/');
    
    return { success: true, id: result.rows[0].id };

  } catch (error: any) {
    console.error('Critical Cloud Sync Interruption:', error);
    return { error: error.message || 'Unknown Sync Fault' };
  }
}
