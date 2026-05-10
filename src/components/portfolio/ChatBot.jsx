import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SYSTEM_CONTEXT = `You are Pravalika's portfolio AI assistant. Answer questions about her background, projects, skills, and experience. Be concise, enthusiastic, and professional.

About Pravalika:
- Final-year B.Tech CSE student at Marri Laxman Reddy Institute of Technology, Hyderabad
- CGPA: 9.12 | Email: pravalika081205@gmail.com | Phone: +91 9030783803
- Skills: Java, Python, C, JavaScript, MySQL, MongoDB, DSA, OOP, DBMS
- Technical Member at SCOPE Club, MLRIT (Nov 2024 – Apr 2025), mentored 200+ students

Projects:
1. Legal Decoder: AI contract analysis tool using NLP & LLM. Extracts clauses, risks, obligations. Live at legal-decoder-ten.vercel.app
2. Morse Master: Real-time Morse code translator with adaptive learning. Live at j-pravalika.github.io/MORSE-MASTER/

Achievements:
- 1st Runner Up – Coursevita Hackathon (AI Skill Exchange Platform)
- Best Prototype – AI Innovation Challenge (AI Chatbot System)

Certifications: Cisco Python Essentials 1, Oracle Data Platform, JPMorgan Chase Software Engineering, Accenture UK Developer Simulation

If asked for resume, say: "Please contact Pravalika at pravalika081205@gmail.com to request her resume."`;

const SUGGESTED = [
  'Tell me about your projects',
  'What are your skills?',
  'Any achievements?',
  'How to contact you?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Pravalika's AI assistant 👋 Ask me anything about her skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const updated = [...messages, { role: 'user', content: msg }];
    setMessages(updated);
    setLoading(true);
    try {
      const history = updated.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${SYSTEM_CONTEXT}\n\nConversation:\n${history}\n\nRespond as the assistant in 2-3 sentences max.`,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had trouble responding. Please try again!' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 glow-cyan"
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-[90] w-[340px] sm:w-[380px] glass-strong rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">Pravalika's AI</p>
                <p className="text-xs text-primary">● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'user' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                    {msg.role === 'user' ? <User className="w-3 h-3 text-accent" /> : <Bot className="w-3 h-3 text-primary" />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent/15 text-foreground rounded-tr-sm'
                      : 'bg-muted/50 text-foreground rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><Bot className="w-3 h-3 text-primary" /></div>
                  <div className="px-3 py-2 rounded-xl bg-muted/50 flex items-center gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map(s => (
                  <button key={s} onClick={() => send(s)} className="px-2.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/30">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-3 py-2 rounded-xl bg-muted/40 border border-border/50 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-all min-w-[36px] flex items-center justify-center"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}