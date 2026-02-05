# Vercel Deployment Fix

## Issue

When deploying to Vercel, the build was failing with:

```
Your application is being built using `next build`. 
If you need to define a different build step, please create a 
`vercel-build` script in your `package.json`
```

## Root Cause

Vercel was auto-detecting the project as a Next.js application and trying to run `next build`, even though this is a static HTML site with no build process required.

## Solution

We made the following changes to explicitly tell Vercel this is a static site:

### 1. Updated `vercel.json`

```json
{
  "buildCommand": null,           // No build needed
  "outputDirectory": "public",    // Serve from public/
  "installCommand": "echo 'No dependencies to install'",  // Skip npm install
  "framework": null,              // Disable framework auto-detection
  "rewrites": [...],              // SPA routing
  "headers": [...]                // Security headers
}
```

**Key changes:**
- `framework: null` - Prevents Vercel from auto-detecting as Next.js or other frameworks
- `buildCommand: null` - Explicitly sets no build command (instead of an echo)
- `installCommand` - Skips unnecessary npm install step for faster deploys

### 2. Added `vercel-build` script to `package.json`

```json
{
  "scripts": {
    "vercel-build": "echo 'Static site - no build needed'"
  }
}
```

This script overrides Vercel's default build behavior as a fallback.

## Result

✅ **Deployment now works correctly:**
- No framework detection
- No build process
- No dependency installation
- Direct serving from `public/` directory
- Deployment time: ~10 seconds
- Zero configuration needed in Vercel dashboard

## How to Deploy

### Option 1: Automatic (Recommended)
1. Push to GitHub main branch
2. Vercel automatically deploys

### Option 2: Manual via CLI
```bash
vercel --prod
```

### Option 3: Vercel Dashboard
1. Import GitHub repository
2. Click "Deploy" (all settings are in vercel.json)

## What Gets Deployed

```
public/
└── index.html (18KB - complete game)
```

All other files (contracts, tests, scripts) are excluded via `.vercelignore`.

## Verification

You can verify the fix by checking:
1. No "next build" errors in Vercel logs
2. Deployment completes in ~10 seconds
3. Site loads correctly at your Vercel URL
4. Game is fully functional

## Additional Resources

- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Full deployment guide
- [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Configuration overview
- [Vercel Static Site Documentation](https://vercel.com/docs/concepts/static-sites)
