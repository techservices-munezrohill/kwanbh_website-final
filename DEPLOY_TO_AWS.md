# KWANBH Website — Full AWS Deployment Guide

Repository: techservices-munezrohill/kwanbh_website-final
Project folder: E:\PROJECTS_Backup\KWANBH\kwanbh_website-final

---

## PHASE 1 — COMMIT AND PUSH (do this on your PC)

Open a Command Prompt (NOT PowerShell) in the project folder, then run these commands one by one:

```
cd E:\PROJECTS_Backup\KWANBH\kwanbh_website-final
git add -A
git status
git commit -m "Final approved website — ready for AWS deployment"
git push origin main
```

After pushing, go to https://github.com/techservices-munezrohill/kwanbh_website-final
and confirm the latest commit is visible.

---

## PHASE 2 — AWS AMPLIFY SETUP (in AWS Console)

### 2.1 Open AWS Amplify

1. Log into your AWS Console: https://console.aws.amazon.com
2. In the search bar at the top, type "Amplify" and click it
3. Click "Create new app"
4. Choose "Host web app" → click Next

### 2.2 Connect GitHub

1. Select "GitHub" as the source
2. Click "Authorize AWS Amplify" — this lets AWS read your GitHub repos
3. In the repository dropdown, select: techservices-munezrohill/kwanbh_website-final
4. In the branch dropdown, select: main
5. Check the box "My app is a monorepo" — NO, leave it unchecked
6. Click Next

### 2.3 Build settings

Amplify will detect the amplify.yml file automatically. Confirm these settings:

- Build command:     npm run build
- Output directory:  dist
- Node.js version:   18 (or 20 — both work)

If it shows different values, change them to match the above.

Click Next.

### 2.4 Add environment variables (IMPORTANT — site will break without these)

Click "Advanced settings" to expand the environment variables section.
Add each variable below — copy the values from your .env.local file:

Variable name                   | Where to find the value
--------------------------------|----------------------------------
VITE_EMAILJS_SERVICE_ID         | .env.local line starting with VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID        | .env.local line starting with VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY         | .env.local line starting with VITE_EMAILJS_PUBLIC_KEY
VITE_SANITY_PROJECT_ID          | .env.local line starting with VITE_SANITY_PROJECT_ID
VITE_SANITY_DATASET             | .env.local (value is: production)
VITE_SANITY_API_VERSION         | .env.local (value is: 2025-01-01)

Do NOT add .env.local itself — just copy the values one by one into this screen.

Click "Save and deploy".

---

## PHASE 3 — WAIT FOR FIRST BUILD (~5 minutes)

Amplify will:
1. Pull the code from GitHub
2. Run: npm ci
3. Run: npm run build
4. Upload the output to its CDN

You will see a progress bar. When it turns green and says "Deployed", the site is live.

Amplify gives you a temporary URL like: https://main.xxxxxxxxxx.amplifyapp.com
Open it and test every page.

---

## PHASE 4 — CONNECT YOUR CUSTOM DOMAIN

### 4.1 Add the domain in Amplify

1. In your Amplify app, click "Domain management" in the left sidebar
2. Click "Add domain"
3. Type your domain name (e.g. kwanbh.com or kwanblounthill.com)
4. Click "Configure domain"
5. Amplify will show you DNS records to add

### 4.2 Option A — Keep domain at Squarespace, point it at AWS (RECOMMENDED)

1. In Amplify → Domain management, after adding your domain, Amplify shows you
   4 nameservers that look like: ns-xxx.awsdns-xx.com
   Copy all 4 nameservers.

2. Go to your Squarespace account → Domains → your domain → DNS settings
3. Find "Nameservers" and replace them with the 4 AWS nameservers
4. Save and wait up to 48 hours for DNS to propagate worldwide
   (usually works within 1–4 hours)

Amplify automatically sets up HTTPS (the padlock) — no extra work needed.

### 4.3 Option B — Transfer domain to AWS (everything in one place)

1. In Squarespace, unlock your domain and get the "Transfer authorization code" (EPP code)
2. In AWS Console → Route 53 → Registered domains → Transfer domain
3. Enter your domain name and the EPP code
4. Cost: ~$15 (adds 1 year of registration)
5. Takes 3–7 days to complete the transfer

Recommendation: Use Option A to get the site live faster.

---

## PHASE 5 — VERIFY EVERYTHING WORKS

Once your domain is pointing to AWS, test these:

[ ] Homepage loads at https://yourdomain.com
[ ] All pages load: /about, /cv, /service, /contact
[ ] The contact form sends an email (test it by filling in the form)
[ ] The site has the HTTPS padlock (green lock icon)
[ ] The site looks correct on mobile (test on your phone)
[ ] Links in the CV page (View CV Online, Download PDF) work correctly

---

## PHASE 6 — SET UP BILLING ALERT (HIGHLY RECOMMENDED)

1. In AWS Console → search "Billing"
2. Click "Budgets" → "Create a budget"
3. Choose "Monthly cost budget"
4. Set the amount to $10
5. Add your email address as the alert recipient
6. Click Create

This ensures you get an email if costs ever go above $10/month.
(Expected cost is $1–3/month — this is just a safety net.)

---

## ESTIMATED MONTHLY COSTS

Service                | Monthly cost
-----------------------|------------------
AWS Amplify hosting    | $0–$1
Route 53 DNS           | $0.50
Domain renewal         | ~$1.25 (averaged)
TOTAL                  | ~$1.75–$2.75 / month

---

## FUTURE — RE-ENABLING TINACMS (content editing)

Once the site is live and stable, to re-enable content editing:

1. Reinstall TinaCMS in the project (npm install tinacms @tinacms/cli)
2. Restore the tina/ config directory
3. Add TINA_CLIENT_ID and TINA_TOKEN as environment variables in Amplify
4. Change the Amplify build command from "npm run build" to "npm run cms:build"
5. The editor then accesses the admin at: https://yourdomain.com/admin

---

## SUPPORT

AWS documentation: https://docs.aws.amazon.com/amplify/
AWS cost calculator: https://calculator.aws/
Route 53 pricing: https://aws.amazon.com/route53/pricing/
