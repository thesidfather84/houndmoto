# Deploy Auto Parts Finder to Vercel

## What's Included

✅ Top 18 car brands (Toyota, Honda, Ford, Chevy, Nissan, Dodge, Jeep, Hyundai, Kia, BMW, Mercedes, Audi, VW, Subaru, Mazda, Chrysler, Buick, GMC)  
✅ 30+ models with year ranges (2000-2024)  
✅ Searches 4 major retailers: AutoZone, O'Reilly, RockAuto, PartsGeek  
✅ 9 part categories with 60+ specific parts  
✅ Real-time pricing via web search  

---

## Step-by-Step Deployment

### 1. Create a Vercel Account
- Go to https://vercel.com
- Sign up with GitHub, GitLab, or email

### 2. Create a Next.js Project (Simple Method)

In your computer terminal, run:

```bash
npx create-next-app@latest auto-parts-finder
```

Answer the questions:
- TypeScript? **No**
- ESLint? **Yes**
- Tailwind CSS? **Yes**
- App Router? **Yes**
- Others? **No**

### 3. Replace the Code

Navigate to your project folder:
```bash
cd auto-parts-finder
```

Open `app/page.js` and replace ALL the code with the content from `auto_parts_website.jsx`

### 4. Install Dependencies (if needed)

```bash
npm install
```

### 5. Test Locally

Run it on your computer first:
```bash
npm run dev
```

Open http://localhost:3000 in your browser and test it.

If it works, press `Ctrl+C` to stop.

### 6. Push to GitHub

Initialize git:
```bash
git init
git add .
git commit -m "Initial commit - Auto Parts Finder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/auto-parts-finder.git
git push -u origin main
```

(Replace YOUR_USERNAME with your actual GitHub username)

### 7. Deploy to Vercel

**Option A: Quick Deploy (Recommended)**
- Go to https://vercel.com/new
- Click "Import Git Repository"
- Paste your GitHub repo URL
- Click "Deploy"

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel
```

Follow the prompts.

### 8. Add Environment Variables

If you plan to use the Anthropic API for searches:

1. Go to your Vercel project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add any API keys you need (optional for hobby tier)

---

## Your Site is Live!

Vercel gives you a URL like: `https://auto-parts-finder-xyz.vercel.app`

Every time you push code to GitHub, Vercel automatically redeploys.

---

## How It Works

**Navigation:**
1. Select your car Make (Toyota, Ford, etc.)
2. Select Model (Camry, F-150, etc.)
3. Select Year (2006, 2020, etc.)
4. Select Category (Electrical, Brakes, Engine, etc.)
5. Select Specific Part (Starter, Brake Pads, etc.)
6. See prices from AutoZone, O'Reilly, RockAuto, PartsGeek

**Search:** Uses real web search to find current prices and availability

---

## Customization

### Add More Vehicles
Edit the `makes` object to add more brands/models

### Change Retailers
In the search prompt, modify which retailers to search

### Add More Parts
Edit the `categories` object with new part types

---

## Hobby Tier Limitations

Vercel Hobby (Free) gives you:
- ✅ Unlimited deployments
- ✅ Serverless functions
- ✅ Global CDN
- ✅ Real-time logs
- ❌ No analytics
- ❌ No custom domain (but you can add one)

For a parts finder website, Hobby tier is perfect.

---

## Troubleshooting

**"Module not found" error?**
Make sure you copied the entire code and replaced `app/page.js`

**Site not updating after deploy?**
- Commit and push to GitHub
- Vercel auto-deploys on each push
- Check deployment logs in Vercel dashboard

**Search not working?**
- Make sure you have internet connection
- The API needs to reach Anthropic's servers
- Check browser console for error messages

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Your GitHub repo will show deploy status

Good luck! 🚗
