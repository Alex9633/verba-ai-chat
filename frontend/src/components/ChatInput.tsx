import React, { useState, KeyboardEvent } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

// Input message container
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState<string>('');

  // Send message function
  const sendMsg = () => {
    const trimmedInput = inputValue.trim();
    
    // only send if there's actual content and clear the input
    if (trimmedInput.length > 0) {  
      onSendMessage(trimmedInput);
      setInputValue('');
    }
  };

  // Option to send the message by pressing Enter (without Shift)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        disabled={disabled}
        rows={1}
      />
      <button className="send-button" onClick={sendMsg} disabled={disabled || inputValue.trim().length === 0}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;