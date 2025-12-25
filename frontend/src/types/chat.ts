
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// Send to the server
export interface ChatRequest {
  message: string;
}

// Recieve from the server
export interface ChatResponse {
  message: string;
  timestamp: string;
  messageId: string;
}

export interface ErrorResponse {
  error: string;
}