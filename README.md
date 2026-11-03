# SocialBirds 🐦

**Live site:** https://socialbirds-client-l.vercel.app

SocialBirds is a community platform where neighbors can **create**, **join** and **track** social service events in their local area — blanket drives, tree plantations, food distribution, clean-up drives and more.

## Features

- 🔐 **Email/password and Google login** with BetterAuth, with a profile page to update your name and photo
- 📅 **Upcoming events only** — events whose date has passed never appear on the public page
- ➕ **Create, edit and delete your own events** (only the owner can change an event, checked on the server with a JWT)
- 🙋 **Join / leave an event with one click**, with a live participant count on every event
- 🌗 **Light and dark theme** toggle that changes the whole site
- ✅ **Form validation and toast messages** on every form (login, register, create/update event, profile)
- 💀 **Loading skeletons** on events, event details and private pages
- 📱 **Fully responsive** for mobile, tablet and desktop

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui (+ Sonner toasts) · daisyUI · BetterAuth (MongoDB adapter + JWT) · Express · MongoDB

