# 🏗️ Build Instructions - Dual Version System

## Overview
This project uses feature flags to create two distinct app versions:
- **Web/Full Version**: All features including YouTube ✅
- **Play Store Version**: Facebook + TikTok only (YouTube compliance) ⚠️

## Environment Files

### `.env.example`
Template for development. Copy to `.env.local`:
```bash
cp .env.example .env.local
```

### `.env.playstore`
Pre-configured for Play Store builds (YouTube disabled).

## Build Commands

### 🌐 Web/Full Version (with YouTube)
```bash
npm run build:web
```
This builds the full-featured version suitable for:
- APK direct distribution
- Website deployment
- Testing/Development

### 🏪 Play Store Version (without YouTube)
```bash
npm run build:playstore
```
This builds the Play Store-compliant version:
- YouTube tab hidden
- Only Facebook + TikTok visible
- Safe for Play Store submission

## Android Build Process

### For Play Store (AAB)
```bash
# 1. Build Play Store version
npm run build:playstore

# 2. Sync with Capacitor
npm run cap:sync:playstore

# 3. Open Android Studio
npx cap open android

# 4. Generate Signed AAB
# In Android Studio: Build > Generate Signed Bundle/APK > Android App Bundle
# Select "release" variant
```

### For Direct APK Distribution (Full Version)
```bash
# 1. Build web version
npm run build:web

# 2. Sync with Capacitor
npm run cap:sync

# 3. Open Android Studio
npx cap open android

# 4. Generate Signed APK
# In Android Studio: Build > Generate Signed Bundle/APK > APK
# Select "release" variant
```

## Feature Flags

Located in `lib/featureFlags.ts`:

```typescript
export const FEATURES = {
  YOUTUBE_ENABLED: process.env.NEXT_PUBLIC_ENABLE_YOUTUBE !== 'false',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || 'web',
}
```

### Checking Features in Code

```typescript
import { FEATURES } from '@/lib/featureFlags'

if (FEATURES.YOUTUBE_ENABLED) {
  // YouTube-specific code
}
```

## Testing Different Builds

### Testing Play Store Build Locally
```bash
# Set environment
cp .env.playstore .env.local

# Run dev server
npm run dev

# Verify YouTube tab is hidden
```

### Testing Web Build Locally
```bash
# Set environment  
cp .env.example .env.local

# Run dev server
npm run dev

# Verify YouTube tab is visible
```

## Deployment

### Vercel (Web Version)
The website automatically deploys with full features (YouTube enabled).

No special configuration needed - defaults to web version.

### Play Store Submission
1. Build with `npm run build:playstore`
2. Generate AAB in Android Studio
3. Upload to Play Console
4. Description should mention "Facebook, TikTok, and more platforms"

### APK Distribution (Website)
1. Build with `npm run build:web`
2. Generate APK in Android Studio
3. Host on your website at `/download/ftydownloader.apk`
4. Add download button on homepage

## Important Notes

⚠️ **Always verify the build type before generating final releases:**
- Check `.env.local` contents
- Verify YouTube tab visibility in the app
- Test on emulator/device before final build

✅ **Good Practice:**
- Use `build:playstore` for Play Store submissions
- Use `build:web` for everything else
- Keep `.env.local` in `.gitignore` (already configured)
- Document which build was used for each release

## Troubleshooting

### YouTube still appears in Play Store build
- Check `.env.local` has `NEXT_PUBLIC_ENABLE_YOUTUBE=false`
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build:playstore`

### Changes not reflecting
- Restart dev server
- Clear browser cache
- Check environment file is correct

### Build fails
- Ensure `.env.local` exists
- Check syntax in `.env` files
- Verify all dependencies installed: `npm install`
