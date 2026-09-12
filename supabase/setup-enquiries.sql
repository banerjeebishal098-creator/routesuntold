-- Routes Untold: run once in the Supabase SQL Editor for iodwrtepncxfvehyxqsi.
-- Creates a NEW table; does not modify or delete existing business tables.
begin;
create table public.routes_untold_enquiries (
 id uuid primary key,
 created_at timestamptz not null default now(),
 full_name text not null check (char_length(trim(full_name)) between 1 and 100),
 phone text not null check (phone ~ '^[+0-9 ()-]{10,22}$' and char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 10 and 15),
 email text check (email is null or (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$')),
 destination text not null check (destination in ('Thailand','Bali','Kashmir','Himachal Pradesh','Vietnam','Dubai','Not sure yet')),
 travel_month text check (travel_month is null or travel_month ~ '^20[0-9]{2}-(0[1-9]|1[0-2])$'),
 travellers integer not null check (travellers between 1 and 200),
 budget_per_person text not null check (budget_per_person in ('Below ₹20,000','₹20,000–₹40,000','₹40,000–₹70,000','₹70,000–₹1,00,000','₹1,00,000+')),
 trip_type text not null check (trip_type in ('Couple','Family','Friends','Solo','Honeymoon','Corporate/Group')),
 message text check (message is null or char_length(message) <= 2000),
 whatsapp_opt_in boolean not null default false
);
alter table public.routes_untold_enquiries enable row level security;
revoke all on table public.routes_untold_enquiries from public, anon, authenticated;
grant usage on schema public to anon;
grant insert (id,full_name,phone,email,destination,travel_month,travellers,budget_per_person,trip_type,message,whatsapp_opt_in)
 on public.routes_untold_enquiries to anon;
create policy "Visitors may submit trip enquiries"
 on public.routes_untold_enquiries for insert to anon with check (true);
-- No SELECT, UPDATE or DELETE access for visitors. Manage enquiries in the dashboard.
commit;
notify pgrst, 'reload schema';
