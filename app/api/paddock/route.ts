import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

const DATA_FILENAME = 'paddock_master_registry.json';

export async function GET() {
  try {
    const { blobs } = await list();
    const targetBlob = blobs.find((b) => b.pathname === DATA_FILENAME);

    if (!targetBlob) {
      return NextResponse.json({ collection: [], categories: [] });
    }

    const response = await fetch(targetBlob.url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch paddock data:', error);
    return NextResponse.json({ error: 'Data Fetch Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // List existing blobs to see if we should delete the old one or just overwrite (put overwrites if pathname is same usually, but vercel-blob appends random hash unless we handle it)
    // Actually 'put' results in a new URL every time. We'll just keep the latest one retrieved by 'list' in GET.
    
    const blob = await put(DATA_FILENAME, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false, // This is key for persistent names if supported, or we just trust 'list'
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Failed to save paddock data:', error);
    return NextResponse.json({ error: 'Save Failed' }, { status: 500 });
  }
}
