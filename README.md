# Namirembe Cathedral Choir Website

The Namirembe Cathedral Choir website is a Next.js and Supabase platform for presenting the choir's ministry, leadership, events, media, music, news, applications, and support information.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Supabase Auth, Database, Storage, and Row Level Security
- Tailwind CSS 4 integration with a custom CSS design system
- Forest Green, Black, Regal Purple, and Gold visual palette

## Project Setup

From the project directory:

```bash
cd choir-website
npm install
```

Create `.env.local` with the Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production verification:

```bash
npm run build
npm run start
```

## Supabase Setup

1. Open the Supabase SQL Editor.
2. Run [`supabase-migration.sql`](supabase-migration.sql) after the original project tables have been created.
3. Confirm that the tables and policies were created.
4. Refresh the Supabase schema cache if the application reports that a table or column is missing.

The migration is intended for an existing project. Tables and columns use `if not exists`, but PostgreSQL policies do not. If a policy already exists, do not create it a second time. Drop the existing policy first or run only the missing migration statements.

### Main Tables

| Table | Purpose |
| --- | --- |
| `applications` | Public choir applications and admin status management |
| `contact_messages` | Public enquiries and reply status |
| `events` | Dated concerts, services, rehearsals, and event posters |
| `news` | News and announcements |
| `media_items` | Gallery photos and video highlights |
| `leadership` | Leadership profiles and display order |
| `music_tracks` | Audio playlist records |
| `services` | Recurring services and liturgy schedule |

### Important Fields

- `events.poster_url`: public event poster URL
- `contact_messages.enquiry_type`: enquiry pathway selected by the visitor
- `media_items.description`: optional gallery description
- `services.is_active`: controls whether a recurring service is public
- `music_tracks.is_featured`: selects the initial featured audio track

### Storage

The project uses the public Supabase Storage bucket named `media`.

Recommended folders:

```text
media/event-posters/
media/audio/
media/photos/
media/videos/
```

Uploaded event posters are placed under `event-posters/`. Gallery uploads currently use generated file names at the bucket root; the folders above are recommended for future organization.

## Public Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page, hero carousel, leadership preview, calendar preview |
| `/about` | Choir introduction |
| `/history` | Choir history and milestones |
| `/leadership` | Leadership profiles |
| `/music` | Audio playlist and repertoire |
| `/events` | Dated events and recurring services |
| `/media` | Photo gallery and video highlights |
| `/news` | Public news and announcements |
| `/contact` | Contact form, address, and Google Maps link |
| `/join` | Choir application form |
| `/donate` | Support pathways and giving information |

## Admin Portal

The admin portal is available at `/admin` and requires a Supabase authenticated user.

### Applications

Administrators can search applications, filter by status, and accept or reject applicants.

### Events & Calendar

Administrators can add, edit, and delete dated events. Event posters can be uploaded as PNG, JPG, or WEBP files. Posters are saved to the `media` bucket and their public URL is stored in `events.poster_url`.

### Services & Liturgy

Administrators can add, edit, activate, deactivate, and delete recurring services. The form includes:

- Service Title
- Day of Week
- Time
- Description
- Liturgical Season

Only active services appear publicly. The default fallback schedule is:

- Wednesday Practice & Liturgy - 4:00 PM
- Friday Practice & Liturgy - 4:00 PM
- Sunday Main Service - 10:30 AM

### News & Announcements

News supports the proposal categories, publication dates, editing, unpublishing, and deletion.

### Contact Messages

The inbox displays submitted messages and their enquiry pathways. Administrators can reply by email and mark messages as replied or unread.

### Media & Gallery

Administrators can upload photos and videos, add external URLs, captions, categories, and descriptions. The public gallery supports direct video files and YouTube links.

### Leadership

Administrators can manage leader names, positions, photos, biographies, responsibilities, musical backgrounds, and display order.

## Audio Player

The persistent audio player is mounted once in the public layout, so it survives navigation between public routes.

Audio does not autoplay. Visitors must select a track or press play.

To add a track:

1. Upload the audio file to the Supabase `media` bucket, preferably under `audio/`.
2. Copy its public URL.
3. Insert a row in `music_tracks`:

```sql
insert into music_tracks (title, composer, audio_url, duration, is_featured)
values (
  'Sunday Worship Anthem',
  'Namirembe Cathedral Choir',
  'https://your-project.supabase.co/storage/v1/object/public/media/audio/anthem.mp3',
  '04:35',
  true
);
```

Only one track should normally be marked as featured. The `/music` page loads tracks dynamically and provides a `Listen Now` action.

## Images and Backgrounds

Static assets are stored under `public/` and can be referenced from the site root.

Important folders:

- `public/backgrounds/`: church, interior, organ, and choir background images
- `public/leadership/`: leadership portraits
- `public/developers/`: technical team portraits

The global ambient background slideshow currently uses `Interior.jpeg` and `organ.jpeg`. The homepage also has a dynamic hero carousel that can load photo records from Supabase and fall back to local images.

## Technical Architecture

- `app/layout.tsx`: root metadata, fonts, and global assets
- `app/(public)/layout.tsx`: public header, footer, and persistent audio provider
- `app/(admin)/admin/page.tsx`: authenticated admin CMS
- `app/components/AudioPlayer.tsx`: audio context, persistent player, and track controls
- `app/components/RecurringSchedule.tsx`: active recurring services display
- `app/components/EventsCalendar.tsx`: dated events and poster lightbox
- `app/components/MediaGallery.tsx`: photos and video highlights
- `app/components/LeadershipGrid.tsx`: database-backed leadership display
- `app/globals.css`: shared visual system and responsive styles
- `lib/supabase.ts`: Supabase browser client

## Validation

Run the production build after schema or route changes:

```bash
npm run build
```

Run TypeScript validation directly when debugging a narrow change:

```bash
npx tsc --noEmit
```

The app requires the Supabase environment variables at runtime. Without them, the Supabase client intentionally fails fast.

## Deployment Notes

For deployment, configure the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in the hosting provider. Apply the Supabase migration separately in the Supabase project; deploying the Next.js app does not execute SQL migrations automatically.
