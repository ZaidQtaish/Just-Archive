import { drizzle } from 'drizzle-orm/d1';
import { eq, desc } from 'drizzle-orm';
import { files, courses } from '@/db/schema';

// This will be initialized with D1 database in API routes
export function getDb(d1Database: D1Database) {
  return drizzle(d1Database);
}

// Get all files for a course
export async function getFilesByCourse(db: ReturnType<typeof getDb>, courseId: string) {
  return await db.select().from(files).where(eq(files.courseId, courseId)).orderBy(desc(files.uploadedAt));
}

// Get a single file by ID
export async function getFileById(db: ReturnType<typeof getDb>, fileId: string) {
  const result = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  return result[0];
}

// Increment download count
export async function incrementDownloadCount(db: ReturnType<typeof getDb>, fileId: string) {
  const file = await getFileById(db, fileId);
  if (file) {
    return await db.update(files)
      .set({ downloadCount: (file.downloadCount || 0) + 1 })
      .where(eq(files.id, fileId));
  }
}

// Get a course by ID
export async function getCourseById(db: ReturnType<typeof getDb>, courseId: string) {
  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result[0];
}
