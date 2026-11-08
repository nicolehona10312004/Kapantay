# Kapantay | Gender & Society

A multi-page, responsive website on **gender-based violence (violence against women)**, with a Philippine focus. It promotes gender awareness, equality, inclusion, empowerment and social responsibility. Every statistic, law and claim links to a numbered source.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no server.

## Open it in VS Code

**Easiest:** double-click `index.html` to open it in your browser.

**Recommended (live reload):**
1. Open this folder in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

You need an internet connection only for the Google Fonts (Archivo and Source Serif 4). Offline, the site falls back to Helvetica/Arial and Georgia and still works.

## Pages

| File | What it is | Sign-in needed |
| --- | --- | --- |
| `index.html` | Login, create account, continue as guest | No |
| `dashboard.html` | Home: key statistics, charts, your progress, daily fact, quick help | Yes |
| `issues.html` | The issue: forms, risk groups, why it persists, consequences, prevention, inclusion | Yes |
| `evidence.html` | Statistics explorer, laws + "which law applies to me?" tool, claim check, all sources | Yes |
| `act.html` | LIVES support guide, personal action plan, 8-question quiz | Yes |
| `help.html` | Emergency numbers, how to get a protection order, safety tips | **No** |
| `about.html` | Mission, sourcing standards, logo and design, privacy, glossary, FAQ | **No** |

Help and About are public on purpose: someone in danger should never have to sign in to find a phone number. A **Quick exit** button (or pressing Esc twice) appears on every page.

## Folder structure

```
kapantay/
  index.html  dashboard.html  issues.html  evidence.html
  act.html    help.html       about.html
  css/styles.css          all styles + light/dark design tokens
  js/app.js               helpers, demo auth, progress tracking, app shell (sidebar/topbar)
  js/data.js              ALL content: statistics, laws, claims, quiz, references
  js/charts.js            bars, line chart, donut, pictogram (no libraries)
  js/pages/*.js           one small script per page
  assets/favicon.svg
```

## Editing content

Almost everything you read on the site lives in **`js/data.js`**. To change a statistic, add a law, reword a claim or add a quiz question, edit that file. Citations use `K.c(n)`, where `n` is the reference number in `K.refs` (shown on the Evidence > Sources tab).

Change colours and fonts in the `:root` block at the top of `css/styles.css`. Dark-mode values are in the two dark blocks right below it.

## About the login (please read)

This is a **front-end demonstration**. There is no server:

- Accounts, progress, quiz scores and action plans are saved in the browser's `localStorage`.
- Passwords are salted and hashed (PBKDF2 via the Web Crypto API), but this is **not real security**. Anyone with access to the browser can read or delete the data.
- Nothing is sent anywhere. There are no cookies or analytics.
- "Forgot password" cannot email you, since there is no server. Use **reset demo data** on the login page or the About page.

For a real deployment you would replace `K.auth` in `js/app.js` with calls to a proper authentication service (for example Firebase Auth, Supabase or your own API).

## Data and sources

Statistics were checked on 19 September 2026 against WHO, the Philippine Commission on Women, the Philippine Statistics Authority (NDHS 2022), UN Women, the DHS Program and the World Economic Forum. The 2026 Global Gender Gap figures come from a news report published days before this review; check weforum.org for the full edition. Helpline numbers come from lists published by the Philippine Commission on Women and can change, so confirm them before publishing.

The site is educational. It is not a crisis line or a legal service.

## Publishing

Because it is static, you can host it free on GitHub Pages, Netlify, Cloudflare Pages or Vercel by uploading this folder.
