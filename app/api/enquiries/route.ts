import { handleEnquiry } from '@/lib/enquiries';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleEnquiry(request, {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  });
}
