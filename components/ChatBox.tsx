'use client';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CONFIG } from '@/lib/config';

interface Message {
  role: 'user' | 'bot' | 'thinking';
  text: string;
}

export interface ChatBoxHandle {
  openWithMessage: (msg: string) => void;
}

const SYSTEM_PROMPT = `You are OmniQuest's expert AI education counsellor. OmniQuest is India's premier global education platform combining EduQuest (SAT/ACT coaching, study abroad, UG admissions), MbaWizards (GMAT, MBA admissions), and Aptech (AI, Data Science, coding careers). Be warm, concise, and helpful. Guide students toward the right programme. Keep responses under 120 words. Use occasional emojis. Always end with a clear next step or question to keep the conversation going.`;

const QUICK_REPLIES = [
  'Which program suits me?',
  'SAT prep tips',
  'MBA admissions',
  'AI programs',
];

const ChatBox = forwardRef<ChatBoxHandle>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [showUnread, setShowUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "👋 Hi! I'm OmniQuest's AI assistant. I can help you with study abroad advice, SAT/GMAT prep, MBA admissions, career programs, or anything else. What's on your mind?" },
  ]);
  const [showQuick, setShowQuick] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<Array<{ role: string; content: string }>>([
    { role: 'system', content: SYSTEM_PROMPT },
  ]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const toggle = () => {
    setOpen(v => !v);
    setShowUnread(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useImperativeHandle(ref, () => ({
    openWithMessage: (msg: string) => {
      setOpen(true);
      setShowUnread(false);
      setTimeout(() => processChat(msg), 300);
    },
  }));

  async function processChat(text: string) {
    setShowQuick(false);
    setMessages(m => [...m, { role: 'user', text }]);
    historyRef.current.push({ role: 'user', content: text });
    setLoading(true);

    try {
      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONFIG.GROK_API_KEY}` },
        body: JSON.stringify({ model: 'grok-3-latest', messages: historyRef.current, temperature: 0.75, max_tokens: 200 }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "I'd love to help! Could you share a bit more about your current studies and goals?";
      setLoading(false);
      setMessages(m => [...m, { role: 'bot', text: reply }]);
      historyRef.current.push({ role: 'assistant', content: reply });
    } catch {
      setLoading(false);
      const fallback = 'Thanks for your question! Our team is online and happy to help. You can also call us at +91-9958041888 or book a free consultation. 😊';
      setMessages(m => [...m, { role: 'bot', text: fallback }]);
      historyRef.current.push({ role: 'assistant', content: fallback });
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    processChat(text);
  }

  return (
    <div className="chat-bubble">
      {open && (
        <div className="chat-window open">
          <div className="chat-head">
            <div className="chat-head-left">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-head-name">OmniQuest AI</div>
                <div className="chat-head-status"><span className="status-dot" /> Online · Ask me anything</div>
              </div>
            </div>
            <button className="chat-close" onClick={toggle}>✕</button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="msg thinking">
                <div className="thinking-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {showQuick && (
            <div className="chat-quick-replies">
              {QUICK_REPLIES.map((q, i) => (
                <button key={i} className="quick-btn" onClick={() => processChat(q)}>{q}</button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="Type your question…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <button className="chat-send" onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={toggle} aria-label="Open chat">
        💬
        {showUnread && <span className="chat-unread">1</span>}
      </button>
    </div>
  );
});

ChatBox.displayName = 'ChatBox';
export default ChatBox;
