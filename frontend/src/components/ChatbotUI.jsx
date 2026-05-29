import { useState } from "react"

export default function ChatbotUI() {

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour! Je suis l'assistant de la buanderie ENSIAS."
    }
  ])

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMessage = {
      sender: "user",
      text: input
    }

    setMessages(prev => [...prev, userMessage])

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input
        })
      })

      const data = await response.json()

      const botMessage = {
        sender: "bot",
        text: data.reply
      }

      setMessages(prev => [...prev, botMessage])

    } catch (error) {

      setMessages(prev => [...prev, {
        sender: "bot",
        text: "Erreur serveur ❌"
      }])

    }

    setInput("")
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{ fontFamily: '"Playpen Sans", cursive' }}
    >

      {/* Chat Window */}
      <div className="w-[370px] h-[420px] bg-white rounded-[30px] shadow-2xl overflow-hidden border border-[#f3cfcf] flex flex-col">

        {/* Header */}
        <div className="bg-[#FADDDD] p-3 flex items-center gap-4 border-b border-[#f0caca]">
          
            
    

          <div>
            <h1 className="text-[#555555] text-lg font-bold">
              Assistant ENSIAS
            </h1>
            <p className="text-[#777777] text-sm">
              Toujours là pour vous aider !
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fffafa] scrollbar-thin scrollbar-thumb-[#FADDDD]">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl text-sm shadow-sm max-w-[75%]
                ${msg.sender === "user"
                  ? "bg-[#555555] text-white rounded-br-sm"
                  : "bg-[#FADDDD] text-[#555555] rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>

          ))}

        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-[#f0d2d2]">
          <div className="flex items-center bg-[#fff5f5] rounded-full px-3 py-2 border border-[#f3d5d5] shadow-sm">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 bg-transparent outline-none text-[#555555] px-2 text-sm"
            />

            <button
              onClick={sendMessage}
              className="w-11 h-11 rounded-full bg-[#555555] text-white flex items-center justify-center"
            >
              ➤
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}