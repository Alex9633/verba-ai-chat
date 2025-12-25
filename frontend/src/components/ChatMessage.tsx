import React from 'react';
import { Message } from '../types/chat';
import './ChatMessage.css';

interface ChatMessageProps {
  message: Message;
}

// For each message
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {

  // Add a timestamp
  const getFormattedTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
        <div className="message-timestamp">
          {getFormattedTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;