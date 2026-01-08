import { NextRequest, NextResponse } from 'next/server';
import { getDb, createFile } from '@/lib/db';
import type { FileType } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      fileId: string;
      courseId: string;
      fileName: string;
      fileType: FileType;
      r2Key: string;
      fileSizeBytes: number;
      mimeType: string;
      semester?: string;
      year?: number;
      doctorName?: string;
      tags?: string;
      notes?: string;
    };
    const { 
      fileId, 
      courseId, 
      fileName, 
      fileType, 
      r2Key,
      fileSizeBytes,
      mimeType,
      semester, 
      year, 
      doctorName, 
      tags, 
      notes 
    } = body;

    // Get user email (placeholder until auth is set up)
    const userEmail = req.headers.get('x-user-email') || 'admin@university.edu';

    // Get D1 database from platform env (Cloudflare Pages)
    const db = getDb((req as any).env?.DB);
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    // Create file record in database
    const fileUrl = `https://${process.env.CLOUDFLARE_R2_BUCKET_NAME}.${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${r2Key}`;
    
    await createFile(db, {
      id: fileId,
      courseId,
      fileName,
      fileType,
      fileUrl,
      fileSizeBytes,
      mimeType,
      date: new Date(),
      semester,
      year,
      doctorName,
      uploadedBy: userEmail,
      isVerified: false,
      downloadCount: 0,
      tags: tags ? JSON.parse(tags) : undefined,
      notes,
    });

    return NextResponse.json({ 
      success: true, 
      fileId,
      message: 'File uploaded successfully' 
    });

  } catch (error) {
    console.error('Confirm upload error:', error);
    return NextResponse.json({ error: 'Failed to confirm upload' }, { status: 500 });
  }
}
