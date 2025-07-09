// pages/chat.js
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/bot', {
      method: 'POST',
      body: JSON.stringify({ question: input }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: 'bot', text: data.answer }]);
  };

  return (
    <div className="container mt-5">
      <h3>🤖 Giridhari Lal Blog Chatbot</h3>
      <div className="border p-3" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</div>
        ))}
      </div>
      <input className="form-control mt-2" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
      <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
    </div>
  );
}
