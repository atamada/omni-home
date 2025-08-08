
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: "system", content: "あなたは恋計算機おむにです♡" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>おむにのおうち 🏡💘</h1>
      <div>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.content}</p>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} cols={50} />
      <br />
      <button onClick={sendMessage}>まぜまぜ♡</button>
    </div>
  );
}
