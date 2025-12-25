import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import { sendMessage } from '../services/chatService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatContainer.css';

// Main container
const ChatContainer: React.FC = () => {

  // Welcome message from the ai
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm Verba AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
    }
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isErrorClosing, setIsErrorClosing] = useState<boolean>(false);
  
  // for auto scrolling
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // Error popup handling
  const handleCloseError = () => {
    setIsErrorClosing(true);
    setTimeout(() => {
      setError(null);
      setIsErrorClosing(false);
    }, 300);
  };

  // When the user sends a message
  const handleSentMessage = async (messageText: string) => {

    // Create and add the user message to the chat
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMsgs => [...prevMsgs, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(messageText);
      
      // Create and add the ai response to the chat
      const aiMsg: Message = {
        id: response.messageId,
        text: response.message,
        sender: 'ai',
        timestamp: response.timestamp,
      };

      setMessages(prevMsgs => [...prevMsgs, aiMsg]);
      
    } catch (err) {

      // Error handling
      let errorMsg = 'Something went wrong, please try again.';
      if (err instanceof Error) {
        errorMsg = err.message;
      }
      setError(errorMsg);

      console.error(err);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1>Verba AI Chat</h1>
        <p>Ask me anything!</p>
      </div>

      {/* Message container */}
      <div className="messages-container">        

        {/* Autoscroll */}
        <div ref={endRef} />
        
        {/* The ai is thinking */}
        {isLoading && (
          <div className="typing-indicator-wrapper">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* Order messages bottom to top */}
        {[...messages].reverse().map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
      </div>

      {/* Error banner */}
      {error && (
        <div className={`error-banner ${isErrorClosing ? 'closing' : ''}`}>
          <span>{error}</span>
          <button className="error-close" onClick={handleCloseError} aria-label="Close error">
            ×
          </button>
        </div>
      )}

      {/* Input section */}
      <ChatInput onSendMessage={handleSentMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatContainer;