# The Genesis Moment

A phone-first editorial website prototype for The Genesis Moment podcast,
Thoughtcasts, and The Mustard Seed.

## Included experiences

- Home and featured Genesis Moment
- Story archive
- Individual episode
- Direct-to-camera Thoughtcast archive
- Individual Thoughtcast video and transcript
- The Mustard Seed mission
- Story submission and nomination
- Support the Ministry with one-time and monthly commitments
- Protected `/admin` publishing for episodes and Thoughtcasts

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Build

```bash
npm run build
```

## Deploy on Netlify

This repository is configured for Netlify's maintained Next.js adapter.

1. Import the GitHub repository into Netlify.
2. Keep the detected build command as `npm run build`.
3. Add `NEXT_PUBLIC_GIVING_URL` in Netlify only when the secure donation
   processor is ready.
4. Enable Netlify Forms so story, nomination, and ministry-support submissions
   appear in the project dashboard.
5. Enable Netlify Identity and Git Gateway to protect `/admin`.

Netlify builds the application directly from the repository. Do not set a
custom publish directory.

## Secure giving

The site never collects or stores card information. Add the secure giving page
from your chosen donation processor as `NEXT_PUBLIC_GIVING_URL` in Netlify
before the production build. The Support page records the visitor's intended
amount and frequency through Netlify Forms, then hands them to that secure
provider.

Use `.env.example` as the configuration reference.

## Content and media

The current people and episode details are prototype content. Remote editorial
images are temporary visual placeholders and should be replaced with owned
guest photography, video poster frames, and Mustard Seed program imagery before
production launch.

Thoughtcasts are designed as direct-to-camera video with captions, a readable
transcript, related pieces, and an audio-compatible player treatment.

## GitHub

This is a conventional source-code project and does not require Lovable or
another proprietary editor to run.
