import { ChatRequest, ChatResponse } from '../types/chat';

// Use the base app URL from .env or fallback to the default localhost if it's missing
const base_url = process.env.CHAT_APP_URL || 'http://localhost';

// Use the port from .env or fallback to the default 8080 if it's missing
const port = process.env.SERVER_PORT || 8080;


// Send the message to the server and return a response (or an error)
export const sendMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const requestData: ChatRequest = { 
      message: message 
    };
    
    const response = await fetch(`${base_url}:${port}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(requestData),
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }
    
    // Parse and return the response as .json
    const responseData: ChatResponse = await response.json();
    return responseData;
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};