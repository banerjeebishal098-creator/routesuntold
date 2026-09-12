# Routes Untold

A travel website built with Next.js, React and Tailwind CSS, ready to deploy on Vercel. Includes the responsive brand logo, destination gallery and a Supabase-backed trip enquiry form.

## Deploy to Vercel

1. Open [Vercel's new project page](https://vercel.com/new) and import **banerjeebishal098-creator/routesuntold** from GitHub.
2. Use **main** as the production branch, **Next.js** as the framework, and the repository root (`./`) as the root directory. The committed `vercel.json` provides the install command, build command and `.next` output directory. Node.js 24 is selected in `package.json`.
3. Before clicking **Deploy**, add these environment variables for **Production** (and Preview if you want preview forms to save to the same database):

   | Name | Value |
   | --- | --- |
   | `SUPABASE_URL` | `https://iodwrtepncxfvehyxqsi.supabase.co` |
   | `SUPABASE_PUBLISHABLE_KEY` | Your project's `sb_publishable_...` key from Supabase → Project Settings → API Keys |

4. Click **Deploy**. Open the deployed site and submit a clearly labelled test enquiry. Confirm it appears in Supabase → Table Editor → `routes_untold_enquiries`.
5. Add your custom domain under Vercel → Settings → Domains when ready. Subsequent pushes to the connected production branch trigger deployments.

If you already imported this repository into Vercel, use the root directory above, add the two variables, and redeploy the latest `main` commit. Environment changes require a new deployment. No Supabase service-role key is required.

The form uses a server route at `/api/enquiries`; keep the Next.js framework and `.next` build output. Do not set `output: 'export'`, change the output to `out`, or enable GitHub Pages. Vercel runs the API as a Node.js function. The old Cloudflare build and GitHub Pages workflow have been removed.

## Supabase

The existing Supabase project already contains `public.routes_untold_enquiries` and its insert-only visitor policy. **Do not rerun the table creation script on that existing project.** For a new Supabase project, run `supabase/setup-enquiries.sql` once in its SQL Editor and update the environment variables.

Enquiries are validated on the server. The site reports success only after Supabase confirms the save. A retry with the same request ID does not create a duplicate. Visitors cannot read submitted enquiries; view them through the Supabase dashboard.

## Local development

Install Node.js 24, then run:

```bash
npx --yes pnpm@10.34.5 install --frozen-lockfile
cp .env.example .env.local
```

On Windows, copy `.env.example` to `.env.local` in your editor. Fill in the publishable key, then run:

```bash
npm run dev
```

Open <http://localhost:3000>. Local environment files are ignored by Git. Vercel reads its own configured environment variables.

To check and run the production build:

```bash
npm run lint
npm run build
npm start
```

The build checks TypeScript and generates the static landing page plus the dynamic enquiry API. Dependency versions are recorded in `pnpm-lock.yaml`; use the pinned pnpm version when changing dependencies and commit the updated lockfile.

## Main files

- `app/page.tsx` — landing page, navigation and enquiry form.
- `app/globals.css` — responsive styling and logo mask.
- `app/api/enquiries/route.ts` — Node.js API route using server environment variables.
- `lib/enquiries.ts` — enquiry validation and Supabase insert.
- `public/images/` — logo and website images; attribution in `public/image-credits.json`.
- `supabase/setup-enquiries.sql` — schema and access policy for a new database.
- `.env.example` — environment variable template without a real key.
- `vercel.json` — deployment configuration.

`routes-untold.html` is preserved as a standalone reference file; the deployed website is the Next.js application in `app/`. Newsletter subscriptions and the WhatsApp link still require their own business configuration in `app/page.tsx`.

Deployment references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel package managers](https://vercel.com/docs/package-managers).
