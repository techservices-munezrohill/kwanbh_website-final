# kwanbh.com — Full Migration: Squarespace → AWS
## Stop old site. Start new site. Move domain. Cancel Squarespace.

Last updated: August 2026
GitHub repo: techservices-munezrohill/kwanbh_website-final

---

## OVERVIEW — WHAT WE ARE DOING

OLD: kwanbh.com → Squarespace (old website, paying monthly)
NEW: kwanbh.com → AWS Amplify (new website, ~$2/month)

Strategy to avoid downtime:
  Step 1-3  : Get new site live on a temporary AWS URL (test it)
  Step 4    : Change nameservers at Squarespace → site switches to AWS in 1-4 hours
  Step 5    : Start domain transfer from Squarespace to AWS (runs in background, 5-7 days)
  Step 6    : Cancel Squarespace website plan immediately
  Step 7    : Close Squarespace account after domain transfer completes

---

## STEP 1 — PUSH CODE TO GITHUB

STATUS: ✅ COMPLETED
The code is live at: https://github.com/techservices-munezrohill/kwanbh_website-final

---

## STEP 2 — DEPLOY TO AWS AMPLIFY

### 2.1 Open Amplify in AWS Console

1. Go to https://console.aws.amazon.com and log in with your company account
2. In the top search bar, type: Amplify
3. Click "AWS Amplify" from the results
4. Click the orange button: "Create new app"

### 2.2 Connect to GitHub

1. On the "Add repository branch" screen, select: GitHub
2. Click "Authorize AWS Amplify" — a GitHub popup appears
3. Log into GitHub as: techservices-munezrohill (or your personal GitHub if linked)
4. Click "Authorize aws-amplify"
5. Back in AWS, in the Repository dropdown: select kwanbh_website-final
6. In the Branch dropdown: select main
7. Click Next

### 2.3 Configure build settings

Amplify should detect amplify.yml automatically. Verify it shows:

   Build command:      npm run build
   Output directory:   dist
   Node.js version:    18  (if not shown, type 18 in the Node.js version field)

If it shows anything different, correct it to match the above.

Click Next.

### 2.4 Add environment variables (CRITICAL — contact form breaks without these)

On the same screen, scroll down and click "Advanced settings".
Add these 6 variables. Open your .env.local file to copy the values:

   Variable name                Value (copy from .env.local)
   ─────────────────────────────────────────────────────────
   VITE_EMAILJS_SERVICE_ID      copy from line: VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID     copy from line: VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY      copy from line: VITE_EMAILJS_PUBLIC_KEY=...
   VITE_SANITY_PROJECT_ID       copy from line: VITE_SANITY_PROJECT_ID=...
   VITE_SANITY_DATASET          value is: production
   VITE_SANITY_API_VERSION      value is: 2025-01-01

Each one: click "Add environment variable", type the name, paste the value.

Click "Save and deploy".

### 2.5 Wait for first build (~5 minutes)

You will see a pipeline with stages: Provision → Build → Deploy → Verify
When it turns green, click the URL it shows — looks like:
   https://main.xxxxxxxxxxxx.amplifyapp.com

Open that URL. TEST EVERY PAGE before continuing:
   - Home, About, CV, Service, Contact
   - Contact form: fill it in and submit — check if email arrives
   - Check it on your phone (mobile view)

Do NOT continue to Step 3 until the site looks perfect on this test URL.

---

## STEP 3 — ADD kwanbh.com TO AMPLIFY (prepares AWS DNS)

This step creates the AWS DNS zone and SSL certificate BEFORE you switch.

1. In Amplify, click on your app
2. In the left sidebar, click "Domain management"
3. Click "Add domain"
4. Type: kwanbh.com
5. Click "Configure domain"
6. On the next screen:
   - Leave the root domain setting as kwanbh.com
   - Also add: www.kwanbh.com (check the checkbox or add it as a subdomain)
7. Click "Save"

Amplify now does two things automatically (takes 5-10 minutes):
   a) Creates a Route 53 hosted zone for kwanbh.com
   b) Requests a free SSL certificate (HTTPS padlock)

After a few minutes, click on the domain — it will show a status like:
   "Action required: Update nameservers at your registrar"

It will show you 4 nameservers. They look like:
   ns-123.awsdns-45.com
   ns-678.awsdns-90.net
   ns-111.awsdns-22.org
   ns-999.awsdns-88.co.uk

COPY ALL 4 NAMESERVERS. You need them for Step 4.

---

## STEP 4 — SWITCH kwanbh.com TO AWS (the cutover — 1 to 4 hours downtime)

This is the moment the old Squarespace site stops and the new AWS site starts.
Best time to do this: early morning or evening when traffic is lowest.

### 4.1 Log into Squarespace

1. Go to https://account.squarespace.com
2. Log in with your Squarespace account

### 4.2 Go to domain settings

1. Click "Domains" in the left menu
2. Click on kwanbh.com
3. Click "DNS Settings" or "Advanced DNS"
4. Find the "Nameservers" section

### 4.3 Replace nameservers

You will see existing Squarespace nameservers like:
   ext-dns1.squarespace.com
   ext-dns2.squarespace.com

DELETE all existing nameservers.
ADD the 4 AWS nameservers you copied from Step 3.

Save changes.

### 4.4 What happens next

DNS changes take between 1 and 4 hours to spread worldwide (sometimes up to 24 hours).
During this time, some visitors will still see the old Squarespace site.
After it propagates, everyone sees the new AWS site.

You can check if it has switched by going to: https://www.whatsmydns.net
Type kwanbh.com and click Search. When you see AWS nameservers worldwide, it is done.

---

## STEP 5 — TRANSFER DOMAIN REGISTRATION FROM SQUARESPACE TO AWS

This moves the actual ownership of kwanbh.com into your AWS account.
Do this AFTER Step 4 (the site will stay live during transfer).
Transfer takes 5-7 days to complete.

### 5.1 Prepare domain at Squarespace

1. In Squarespace → Domains → kwanbh.com
2. Click "Domain options" or "Settings"
3. Find "Transfer domain" or "Domain lock"
4. TURN OFF domain lock (also called "Registrar lock" or "Transfer lock")
5. Look for "Authorization code" or "EPP code" and click to get it
6. Copy the authorization code — it looks like: xK9#mL2$pQ8

Note: WHOIS privacy is fine to leave on during transfer.

### 5.2 Start transfer in AWS Route 53

1. In AWS Console, search for: Route 53
2. Click "Registered domains" in the left sidebar
3. Click "Transfer domain"
4. Type: kwanbh.com
5. Click Check
6. Click "Add to cart" then Proceed
7. Enter the authorization code from 5.1
8. Fill in your contact information (this becomes the registrar record)
9. Choose whether to auto-renew (YES, recommended)
10. Complete payment: ~$15 USD (this also adds 1 year of registration)

### 5.3 Respond to confirmation email

Squarespace will send a confirmation email to the email address on your domain account.
You MUST click "Approve transfer" in that email within 5 days.
If you do not approve, the transfer is cancelled and you have to restart.

### 5.4 Wait for transfer to complete

The transfer takes 5-7 days.
You will receive an email when it is done.
After it completes, Route 53 → Registered domains → kwanbh.com shows up.
Your site will not be interrupted during this process.

---

## STEP 6 — CANCEL SQUARESPACE WEBSITE PLAN

Do this AFTER the new site is live on kwanbh.com (after Step 4 is confirmed working).
Do NOT cancel the Squarespace account yet — you still need it for the domain transfer.

1. In Squarespace → Account & Security → Billing
2. Under your website plan, click "Cancel plan" or "Downgrade"
3. Follow the cancellation steps
4. Keep a screenshot of the cancellation confirmation

This stops the monthly/annual Squarespace website fee.
The domain registration stays active separately until transferred.

---

## STEP 7 — CLOSE SQUARESPACE ACCOUNT (after transfer is fully done)

Do this ONLY AFTER Step 5 is 100% complete and kwanbh.com shows in Route 53.

1. Log into Squarespace
2. Go to Account & Security → Account
3. Click "Close account" or "Delete account"
4. Follow the confirmation steps

After this, Squarespace has no access to kwanbh.com.
Everything is on AWS.

---

## STEP 8 — SET AWS BILLING ALERT

Do this any time. Keeps you from surprise charges.

1. In AWS Console, search for: Billing
2. Click "Budgets"
3. Click "Create a budget"
4. Choose "Monthly cost budget"
5. Amount: $10
6. Add your email for alerts
7. Click Create

Expected monthly cost: $1.75-$2.75 (hosting + DNS + domain averaged)

---

## SUMMARY — EXACT ORDER

   ✅  1. Code pushed to GitHub
   →   2. Deploy to AWS Amplify (20 minutes, in AWS Console)
   →   3. Add kwanbh.com to Amplify Domain Management (10 minutes)
   →   4. Update nameservers at Squarespace (5 minutes — site goes live on AWS in 1-4 hours)
   →   5. Start domain transfer: Squarespace → Route 53 (5 minutes setup, 5-7 days to complete)
   →   6. Cancel Squarespace website plan (do this same day as step 4)
   →   7. Close Squarespace account (after domain transfer is complete, 5-7 days later)
   →   8. Set billing alert (any time)

---

## WHAT DOES kwanbh.com COST ON AWS VS SQUARESPACE

   Squarespace:        $16–$23 per month (or $144–$276 per year)
   AWS:                ~$2 per month (~$24 per year)

   Annual saving:      ~$120–$252 per year

---

## IF ANYTHING GOES WRONG

Site shows the old Squarespace site after 4+ hours:
   → DNS has not propagated yet, or nameservers were not saved correctly
   → Check at whatsmydns.net to see current DNS state

Site shows an error (not old site, not new site):
   → SSL certificate may still be issuing (give it 30 more minutes)
   → Check Amplify → Domain management for any error messages

Contact form not working on the live site:
   → Environment variables may not have been added in Amplify
   → Go to Amplify → App settings → Environment variables and add the 6 VITE_ variables

Domain transfer rejected or expired:
   → Check the email for kwanbh.com's registrar contact
   → Look for the approval email and click the link
   → If 5 days passed, you need to restart the transfer from Step 5.2
