import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const SahayaBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Namaste! I am 'Sahaya'. How can I help you today? (e.g., 'scholarship', 'farming')" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { type: 'user', text: input };
        setMessages([...messages, userMsg]);

        // Simple Rule-Based NLP
        let botResponse = "I'm checking our database...";
        const lowerInput = input.toLowerCase();

        setTimeout(() => {
            if (lowerInput.includes("education") || lowerInput.includes("scholarship") || lowerInput.includes("school")) {
                botResponse = "For education, you might be eligible for 'Sukanya Samriddhi Yojana' or 'National Scholarship'. Check the Eligibility page!";
            } else if (lowerInput.includes("farm") || lowerInput.includes("kisan") || lowerInput.includes("agriculture")) {
                botResponse = "Farmers can apply for 'PM Kisan Samman Nidhi'. It offers ₹6,000/year.";
            } else if (lowerInput.includes("health") || lowerInput.includes("doctor") || lowerInput.includes("hospital")) {
                botResponse = "You should look into 'Ayushman Bharat'. It covers up to ₹5 Lakhs.";
            } else {
                botResponse = "I can help you find schemes for Health, Education, or Agriculture. Please try asking about those!";
            }
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 1000);

        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition animate-bounce"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1 rounded-full"><MessageCircle size={20} /></div>
                            <span className="font-bold">Sahaya Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.type === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none text-gray-700'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
                        <input
                            type="text"
                            className="flex-grow px-3 py-2 border rounded-full text-sm focus:outline-none focus:border-primary"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-blue-700">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SahayaBot;
