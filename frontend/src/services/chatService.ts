import { ChatRequest, ChatResponse } from '../types/chat';

// Use the full API URL from .env or fallback to the default http://localhost:8080
// Make sure the full url matches up with the API URL and API port from backend/src/server.ts
const url = process.env.FULL_API_URL || 'http://localhost:8080';


// Send the message to the server and return a response (or an error)
export const sendMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const requestData: ChatRequest = { 
      message: message 
    };
    
    const response = await fetch(`${url}/api/chat`, {
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