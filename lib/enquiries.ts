import { z } from 'zod';
import { services } from './services';

export const enquirySchema = z.object({
 requestId: z.string().uuid(),
 name: z.string().trim().min(1).max(100),
 phone: z.string().trim().regex(/^[+0-9 ()-]{10,22}$/).refine(v => { const n=v.replace(/\D/g,'').length; return n>=10&&n<=15; }),
 email: z.union([z.literal(''),z.string().trim().email().max(254)]).optional(),
 destination: z.enum(['Thailand','Bali','Kashmir','Himachal Pradesh','Vietnam','Dubai','Another country','Not sure yet']),
 destinationDetails: z.string().trim().max(100).optional(),
 service: z.enum(['itinerary','hotels-cabs','hotels-flights']).optional(),
 month: z.union([z.literal(''),z.string().regex(/^20\d{2}-(0[1-9]|1[0-2])$/)]).optional(),
 travellers: z.coerce.number().int().min(1).max(200),
 budget: z.enum(['Below ₹20,000','₹20,000–₹40,000','₹40,000–₹70,000','₹70,000–₹1,00,000','₹1,00,000+']),
 tripType: z.enum(['Couple','Family','Friends','Solo','Honeymoon','Corporate/Group']),
 message: z.string().trim().max(2000).optional(),
 whatsapp: z.boolean(),
}).superRefine((value, ctx) => {
 if (value.destination === 'Another country' && !value.destinationDetails) {
  ctx.addIssue({code: z.ZodIssueCode.custom, path: ['destinationDetails'], message: 'Please enter your country or cities.'});
 }
});

export type EnquiryEnvironment = { SUPABASE_URL?: string; SUPABASE_PUBLISHABLE_KEY?: string };
const response = (body:object,status:number) => Response.json(body,{status,headers:{'Cache-Control':'no-store'}});

export async function handleEnquiry(request:Request, env:EnquiryEnvironment, send:typeof fetch=fetch) {
 if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json') return response({error:'Please submit the trip enquiry form.'},415);
 let raw:unknown;
 try {
  const body=await request.text();
  if(body.length>12000) return response({error:'Your enquiry is too long. Please shorten your message.'},413);
  raw=JSON.parse(body);
 } catch { return response({error:'Please check your enquiry and try again.'},400); }
 const result=enquirySchema.safeParse(raw);
 if(!result.success) return response({error:'Please check your name, phone number, email and travel details.'},400);
 if(!env.SUPABASE_URL||!env.SUPABASE_PUBLISHABLE_KEY) return response({error:'Trip enquiries aren’t available yet. Please try again later.'},503);
 const e=result.data;
 // Keep the existing database schema compatible with already deployed clients.
 // Store the chosen service, its canonical fee and any unlisted destination in
 // the enquiry message; no database migration or new public permissions needed.
 const selectedService=services.find(item=>item.id===e.service);
 const notes=[
  selectedService ? `Requested service: ${selectedService.title} | Service fee: INR ${selectedService.fee} (travel costs separate)` : '',
  e.destination === 'Another country' ? `Requested destination: ${e.destinationDetails}` : '',
  e.message || '',
 ].filter(Boolean).join('\n\n');
 if(notes.length>2000) return response({error:'Please shorten your message so we can save your service and destination details.'},400);
 const row={id:e.requestId,full_name:e.name,phone:e.phone,email:e.email||null,destination:e.destination==='Another country'?'Not sure yet':e.destination,travel_month:e.month||null,travellers:e.travellers,budget_per_person:e.budget,trip_type:e.tripType,message:notes||null,whatsapp_opt_in:e.whatsapp};
 try {
  const saved=await send(`${env.SUPABASE_URL.replace(/\/$/,'')}/rest/v1/routes_untold_enquiries`,{
   method:'POST',headers:{apikey:env.SUPABASE_PUBLISHABLE_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},
   body:JSON.stringify(row),signal:AbortSignal.timeout(10000),
  });
  if(saved.ok) return response({ok:true},201);
  const issue=await saved.json().catch(()=>({})) as {code?:string;message?:string};
  // A retry of the same UUID is already saved; never require public read access.
  if(saved.status===409&&issue.code==='23505'&&issue.message?.includes('routes_untold_enquiries_pkey')) return response({ok:true},200);
  if(issue.code==='PGRST205'||issue.code==='42501') return response({error:'Trip enquiries aren’t available yet. Please try again later.'},503);
  return response({error:'We couldn’t save your enquiry. Your details are still here — please try again.'},502);
 } catch { return response({error:'We couldn’t confirm your enquiry. Please try again; your details are still here.'},502); }
}
