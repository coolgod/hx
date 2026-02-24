# huixia.love

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Adding real photos

1. Convert photos to WebP and place them in `public/photos/`
2. Edit `src/data/photos.ts` — update each entry's `src`, `date`, `location`, and `memory`

## Adding background music

1. Place your MP3/AAC file in `public/audio/`
2. In `src/App.tsx`, uncomment and set the `audioSrc` prop:
   ```tsx
   <AudioController audioSrc="/audio/track.mp3" />
   ```

## Deploy

Push to `main`. GitHub Actions will build and deploy to GitHub Pages automatically.

To use a custom domain, add a `CNAME` file to `public/` with your domain name and configure DNS accordingly.
