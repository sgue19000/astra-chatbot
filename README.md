# Astra Chat

`gpt-6-astra` মডেল দিয়ে স্ট্রিমিং চ্যাটবট ওয়েব অ্যাপ (Experiential Labs API)।

## লোকাল রান

```bash
npm install
cp .env.example .env.local
# .env.local এ EXPLABS_API_KEY বসান
npm run dev
```

ব্রাউজারে: http://localhost:3000

## API

সার্ভার `/api/chat` রুট এই ক্লায়েন্ট ব্যবহার করে:

```js
new OpenAI({
  baseURL: "https://api.experientiallabs.ai/v1",
  apiKey: process.env.EXPLABS_API_KEY,
})
```

মডেল: `gpt-6-astra`, `stream: true`

## Vercel

ডিপ্লয়ের পর Project Settings → Environment Variables এ `EXPLABS_API_KEY` যোগ করুন।
