import { env } from 'cloudflare:workers';
import { handleEnquiry, type EnquiryEnvironment } from '@/lib/enquiries';

export async function POST(request:Request) {
 return handleEnquiry(request,env as EnquiryEnvironment);
}
