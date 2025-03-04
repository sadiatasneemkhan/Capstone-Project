// import React, { useState } from "react";
// import axios from "axios";

// const ChatbotPage = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     const trimmedInput = input.trim();
//     if (!trimmedInput) return;

//     const userMessage = { sender: "user", text: trimmedInput };
//     const updatedMessages = [...messages, userMessage];

//     setMessages(updatedMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const history = updatedMessages.map((msg) => ({
//         role: msg.sender === "bot" ? "assistant" : "user",
//         content: msg.text,
//       }));

//       const res = await axios.post("http://localhost:8000/api/chat", {
//         message: trimmedInput,
//         history: history.slice(-10), // Send only the last 10 messages for context
//       });

//       const botMessage = { sender: "bot", text: res.data.response };
//       setMessages([...updatedMessages, botMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([...updatedMessages, { sender: "bot", text: "⚠️ Error: Unable to get a response from the server." }]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#d32f2f" }}>LLM_Chatbot</h2>
      
//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           padding: "10px",
//           height: "400px",
//           overflowY: "scroll",
//           background: "#f9f9f9",
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div key={index} style={{ textAlign: msg.sender === "bot" ? "left" : "right", margin: "10px 0" }}>
//             <span
//               style={{
//                 display: "inline-block",
//                 background: msg.sender === "bot" ? "#e0e0e0" : "#d32f2f",
//                 color: msg.sender === "bot" ? "#000" : "#fff",
//                 padding: "8px 12px",
//                 borderRadius: "16px",
//                 maxWidth: "80%",
//                 wordWrap: "break-word",
//               }}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//         {loading && <p style={{ textAlign: "center", fontStyle: "italic", color: "#888" }}>Thinking...</p>}
//       </div>

//       <form onSubmit={handleSend} style={{ marginTop: "10px", display: "flex" }}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             fontSize: "16px",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             border: "none",
//             borderRadius: "4px",
//             backgroundColor: "#d32f2f",
//             color: "#fff",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatbotPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // Generate a unique session ID for chat history tracking
  useEffect(() => {
    const storedSession = sessionStorage.getItem("chatSessionId");
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSession = Math.random().toString(36).substring(7);
      sessionStorage.setItem("chatSessionId", newSession);
      setSessionId(newSession);
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: "user", text: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat/", {
        query: trimmedInput,
        session_id: sessionId, // Send session ID to maintain chat history
      });

      const botMessage = { sender: "bot", text: res.data.response || "No response from AI." };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...updatedMessages,
        { sender: "bot", text: "⚠️ Error: Unable to get a response from the server." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#d32f2f" }}>LLM_Chatbot</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          background: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              margin: "10px 0",
              display: "flex",
              justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.sender === "bot" ? "#e0e0e0" : "#d32f2f",
                color: msg.sender === "bot" ? "#000" : "#fff",
                padding: "8px 12px",
                borderRadius: "16px",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ textAlign: "center", fontStyle: "italic", color: "#888" }}>Thinking...</p>}
      </div>

      <form onSubmit={handleSend} style={{ marginTop: "10px", display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#d32f2f",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
