
// "use client";
// import { useState } from "react";


// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [streamResponse, setStreamResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [streaming, setStreaming] = useState(false);

//   const handleChat = async () => {
//     setLoading(true);
//     setResponse("");

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       if (!res.ok) throw new Error("Network error");

//       const data = await res.json();
//       setResponse(data.response);
//     } catch (error) {
//       console.error("Error:", error);
//       setResponse("⚠️ Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStreamChat = async () => {
//     setStreaming(true);
//     setStreamResponse("");

//     try {
//       const res = await fetch("/api/chat-stream", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n");

//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             const data = JSON.parse(line.slice(6));
//             setStreamResponse((prev) => prev + data.content);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setStreamResponse("⚠️ Something went wrong while streaming.");
//     } finally {
//       setStreaming(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      
//       <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
//         <h1 className="text-3xl font-bold text-center text-blue-600">
//           🚀 AI Chat Assistant
//         </h1>

//         {/* Input Box */}
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="💬 Type your message here..."
//           rows={4}
//           className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
//         />

//         {/* Buttons */}
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={handleChat}
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition"
//           >
//             {loading ? "⌛ Loading..." : "💡 Chat"}
//           </button>
//           <button
//             onClick={handleStreamChat}
//             disabled={streaming}
//             className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 disabled:bg-green-300 transition"
//           >
//             {streaming ? "📡 Streaming..." : "⚡ Stream Chat"}
//           </button>
//         </div>

//         {/* Response Section */}
//         {response && (
//           <div className="p-4 bg-gray-50 border rounded-xl shadow-inner text-gray-800 whitespace-pre-wrap">
//             <strong>AI Response:</strong> {response}
//           </div>
//         )}

//         {streamResponse && (
//           <div className="p-4 bg-gray-50 border rounded-xl shadow-inner text-gray-800 whitespace-pre-wrap">
//             <strong>Streaming Response:</strong> {streamResponse}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streamResponse, setStreamResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStreamChat = async () => {
    setStreaming(true);
    setStreamResponse("");

    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            setStreamResponse((prev) => prev + data.content);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setStreamResponse("⚠️ Something went wrong while streaming.");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 backdrop-blur-md bg-opacity-90">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          🚀 AI Chat Assistant
        </h1>

        {/* Input Box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="💬 Type your message here..."
          rows={4}
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
        />

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleChat}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            {loading ? "⌛ Loading..." : "💡 Chat"}
          </button>
          <button
            onClick={handleStreamChat}
            disabled={streaming}
            className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 disabled:bg-green-300 transition"
          >
            {streaming ? "📡 Streaming..." : "⚡ Stream Chat"}
          </button>
        </div>

        {/* Response Section */}
        {response && (
          <div className="p-4 bg-gray-50 border rounded-xl shadow-inner text-gray-800 whitespace-pre-wrap">
            <strong>AI Response:</strong> {response}
          </div>
        )}

        {streamResponse && (
          <div className="p-4 bg-gray-50 border rounded-xl shadow-inner text-gray-800 whitespace-pre-wrap">
            <strong>Streaming Response:</strong> {streamResponse}
          </div>
        )}
      </div>
    </div>
  );
}

