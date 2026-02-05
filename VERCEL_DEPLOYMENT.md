# Deploying BersGame to Vercel

This guide will help you deploy the BersGame visual novel to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works perfectly)
- Git repository connected to GitHub (already done)

## Important: Configuration

The project is configured as a **static site** with no build step required. The `vercel.json` file explicitly sets:
- `framework: null` - No framework auto-detection
- `buildCommand: null` - No build command needed
- `outputDirectory: "public"` - Serves files from public directory
- `vercel-build` script in package.json overrides any default build behavior

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `bersezk/bersgame`
4. Configure project settings:
   - **Framework Preset**: Other (or leave auto-detected - config will override)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Will be automatically handled by vercel.json
   - **Output Directory**: `public` (set in vercel.json)
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project root:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - What's your project's name? **bersgame**
   - In which directory is your code located? **./** (project root, not ./public)

5. For production deployment:
```bash
vercel --prod
```

### Option 3: One-Click Deploy

Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bersezk/bersgame)

## Configuration

The repository includes a `vercel.json` configuration file that:
- Serves the static site from the `public` directory
- Configures proper routing (SPA fallback to index.html)
- Sets security headers
- Optimizes for static content delivery

## Project Structure for Vercel

```
bersgame/
├── public/              ← Deployed to Vercel
│   └── index.html      ← Main game file
├── contracts/          ← Not deployed (smart contracts)
├── scripts/            ← Not deployed (deployment scripts)
├── test/               ← Not deployed (tests)
├── vercel.json         ← Vercel configuration
└── package.json        ← Project metadata
```

## Environment Variables

This project doesn't require any environment variables for the frontend demo. If you add Web3 integration in the future, you can add environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add variables like:
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_NETWORK_ID`
   - etc.

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel
2. Navigate to Settings → Domains
3. Add your domain
4. Update your DNS settings as instructed

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a unique preview URL
- **Development**: You can trigger manual deployments

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Or use Python's built-in server
cd public
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deployment Status

Check your deployment status:
- Visit your Vercel dashboard
- Or check the deployment URL directly
- All deployments are logged with git commit information

## Troubleshooting

### Issue: Vercel tries to use Next.js build
**Solution**: This is now fixed. The `vercel.json` file explicitly sets `framework: null` and `buildCommand: null` to prevent auto-detection. The `vercel-build` script in `package.json` also overrides any default build behavior.

### Issue: Build fails
**Solution**: The project is a static site and doesn't need a build step. The configuration now properly tells Vercel this is a static site with no build required.

### Issue: 404 errors
**Solution**: Check that `vercel.json` has the correct rewrite rules and `outputDirectory` is set to `public`.

### Issue: Files not updating
**Solution**: Clear Vercel cache by redeploying or use `vercel --prod --force` to force a new deployment.

## Performance

The deployed site benefits from:
- Global CDN distribution
- Automatic SSL/HTTPS
- HTTP/2 and HTTP/3 support
- Edge caching
- Optimized asset delivery

## Monitoring

Monitor your deployment:
- View analytics in Vercel dashboard
- Set up monitoring tools
- Enable Web Analytics in Vercel settings (free)

## Next Steps

After deployment:
1. Test the game at your Vercel URL
2. Share the link with players
3. Monitor usage and performance
4. Consider adding Web3 integration for real blockchain features

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Project Issues](https://github.com/bersezk/bersgame/issues)

---

🎮 Your BersGame visual novel is now ready to be deployed on Vercel!
