import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load variables from .env
dotenv.config();

// Use the API URL from .env or fallback to the default localhost if it's missing
const url = process.env.API_URL || 'http://localhost';

// Use the port from .env or fallback to the default 8080 if it's missing
const port = process.env.API_PORT || 8080;

const app = express();

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  message: string;
  timestamp: string;
  messageId: string;
}

interface ErrorResponse {
  error: string;
}

// Setup
app.use(cors());
app.use(express.json());

// Generate a mock response based on the user's message
function genResponse(userMsg: string): string {
  const msg = userMsg.toLowerCase().trim();
  
  if (msg.includes('hello') || msg.includes('hi')) {
    return "Hello! You can ask me anyhting.";
  }
  
  if (msg.includes('help')) {
    return "I can assist you with:\n- General questions\n- Product information\n- Technical support\n\nWhat would you like to know?";
  }
  
  if (msg.includes('how are you')) {
    return "I'm functioning well, thank you for asking! How can I assist you?";
  }
  
  if (msg.includes('?')) {
    return `That's a great question! If I wasn't a demo AI assistant, I would provide detailed information based on our knowledge base.`;
  }

  if (msg.includes('bye') || msg.includes('goodbye')) {
    return "Goodbye! Feel free to return if you have more questions.";
  }
  
  // default response
  return `I understand you said: "${userMsg}". As an AI assistant, I'm here to help! In production, I would provide more contextual responses.`;
}

// Chat endpoint
app.post('/api/chat', async (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse | ErrorResponse>) => {
  try {
    const { message } = req.body;
    
    // Message cannot be empty
    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message cannot be empty' 
      });
    }

    // Simulated error for testing (include 'error' in the message)
    /*
    if (message.toLowerCase().includes('error')) {
      return res.status(500).json({
        error: 'Testing error popup'
      });
    }
    */
    
    // Response artificial delay (1s - 2s)
    const delay = Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Return a generated response
    const aiMsg = genResponse(message);
    return res.json({
      message: aiMsg,
      timestamp: new Date().toISOString(),
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
    
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ 
      error: 'Failed to process message' 
    });
  }
});

// Check server status on [URL]:[PORT]/
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Server is running',
    endpoints: { chat: 'POST /api/chat' }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on ${url}:${port}`);
  console.log(`Chat endpoint ${url}:${port}/api/chat`);
});