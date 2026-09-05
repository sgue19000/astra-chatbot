"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "হাই — আমি gpt-6-astra। কী নিয়ে কথা বলতে চান?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function onSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    if (!res.ok || !res.body) {
      setMessages([
        ...next,
        { role: "assistant", content: "API error. EXPLABS_API_KEY চেক করুন।" },
      ]);
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistant = "";
    setMessages([...next, { role: "assistant", content: "" }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      assistant += decoder.decode(value, { stream: true });
      setMessages([...next, { role: "assistant", content: assistant }]);
    }
    setLoading(false);
  }

  return (
    <div className="app">
      <header>
        <h1>Astra Chat</h1>
        <p>gpt-6-astra · Experiential Labs</p>
      </header>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="মেসেজ লিখুন..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : "পাঠান"}
        </button>
      </form>
    </div>
  );
}
