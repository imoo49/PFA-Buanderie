import { useState } from "react"

export default function ChatbotUI() {

  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
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
      const token = localStorage.getItem('token')

      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end"
      style={{ fontFamily: '"Playpen Sans", cursive' }}
    >

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[370px] h-[70vh] max-h-[480px] bg-white rounded-[24px] shadow-2xl overflow-hidden border border-[#d9a0a0] flex flex-col">

          {/* Header */}
          <div className="bg-[#e8a0a0] p-3 flex items-center justify-between border-b border-[#c98080]">

            <div>
              <h1 className="text-white text-base font-bold">
                Assistant ENSIAS
              </h1>
              <p className="text-[#fff0f0] text-xs">
                Toujours là pour vous aider !
              </p>
            </div>

            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#c97070] text-white flex items-center justify-center text-lg font-bold hover:bg-[#b85555] transition"
            >
              ✕
            </button>

          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fdf4f4]">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm shadow-sm max-w-[78%] leading-relaxed
                  ${msg.sender === "user"
                    ? "bg-[#444444] text-white rounded-br-sm"
                    : "bg-[#e8a0a0] text-white rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>

            ))}

          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[#d9a0a0]">
            <div className="flex items-center bg-[#fdf0f0] rounded-full px-3 py-2 border border-[#d9a0a0] shadow-sm">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 bg-transparent outline-none text-[#444444] px-2 text-sm"
              />

              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-full bg-[#444444] text-white flex items-center justify-center hover:bg-[#333333] transition"
              >
                ➤
              </button>

            </div>
          </div>

        </div>
      )}

      {/* Bouton toggle */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 rounded-full bg-[#c97070] text-white shadow-xl flex items-center justify-center text-2xl hover:bg-[#b85555] transition hover:scale-105"
      >
        {isOpen ? "✕" : "💬"}
      </button>

    </div>
  )
}