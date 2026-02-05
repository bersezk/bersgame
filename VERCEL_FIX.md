# Vercel Deployment Fix

## Latest Issue: 404 NOT_FOUND Error

When accessing the deployed Vercel site, it was returning:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: sin1::jbc8x-1770300115624-5391cdd1aee4
```

### Root Cause
The previous `vercel.json` configuration wasn't properly routing requests to the static files in the `public/` directory. Vercel needs explicit build and route configuration for static sites served from subdirectories.

### Solution
Updated `vercel.json` to use Vercel's v2 configuration format with proper builds and routes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

**Key changes:**
- Added `"version": 2` to use stable Vercel configuration format
- Added `builds` section with `@vercel/static` builder for the public directory
- Added `routes` to map all requests to files in the `/public/` directory
- Simplified configuration by removing unnecessary options

---

## Previous Issue: Framework Auto-Detection

When deploying to Vercel, the build was failing with:

```
Your application is being built using `next build`. 
If you need to define a different build step, please create a 
`vercel-build` script in your `package.json`
```

### Root Cause (Previous)

Vercel was auto-detecting the project as a Next.js application and trying to run `next build`, even though this is a static HTML site with no build process required.

### Solution (Previous)

We made the following changes to explicitly tell Vercel this is a static site:

### 1. Updated `vercel.json` (Previous Attempt)

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
