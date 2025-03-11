import React, { useState } from 'react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Append user's message to the chat
    const userMessage = { sender: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);

    // Dummy bot response logic (replace with your API call or logic)
    const botMessage = { sender: 'bot', text: 'Thanks for your message! I\'ll get back to you shortly.' };
    setMessages((prev) => [...prev, botMessage]);

    setInput('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#d32f2f' }}>LLM_Chatbot</h2>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          height: '400px',
          overflowY: 'scroll',
          background: '#f9f9f9',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'bot' ? 'left' : 'right',
              margin: '10px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: msg.sender === 'bot' ? '#e0e0e0' : '#d32f2f',
                color: msg.sender === 'bot' ? '#000' : '#fff',
                padding: '8px 12px',
                borderRadius: '16px',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ marginTop: '10px', display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#d32f2f',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
