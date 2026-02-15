# 📮 Tales & Tiles

**Your stories. Your photos. Real postcards, shipped fast.**

**Domain:** talesandtiles.com ✅

## 🚀 What It Does

- Upload your own photos
- Write a custom message
- Send to anyone in the US
- Ships in 3-5 days via Lob.com

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Lob API** for printing & mailing
- **Sharp** for image processing

## 📦 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your Lob API key to `.env`:**
   ```
   LOB_TEST_SECRET_KEY=test_your_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Run the dev server:**
   ```bash
   npm run dev
   ```

4. **Open:** http://localhost:3000

## 🧪 Testing

Since you're using the **test** API key, postcards won't actually ship. You can:
- View test postcards in your Lob dashboard
- See previews of front/back design
- Test the full flow without charges

When ready to go live, swap `LOB_TEST_SECRET_KEY` for `LOB_LIVE_SECRET_KEY`.

## 📝 TODO

- [ ] Add Stripe for payments
- [ ] Better image cropping/editing UI
- [ ] Preview postcard before sending
- [ ] Save drafts
- [ ] Order history
- [ ] International shipping support
- [ ] Custom return address

## 💰 Pricing

**Current costs (Lob):**
- 6x4 postcard: ~$1.50-2.00 per card (including postage)

**Pricing strategy:**
- Sell at: $7.99 per postcard
- Profit: ~$6 per card
- Stripe fees: ~$0.50
- **Net profit: ~$5.50 per card** 🎉

## 🌏 Perfect for:

- Travelers & digital nomads
- Families documenting adventures
- Travel vloggers (like JFRAT!)
- Expats staying in touch
- People who hate finding postcards in tourist shops

---

Built with 🐉 by Mushu & Jes
