# Verba AI Assistant Chat Application

This project is a simple full-stack web application that demonstrates a chat interface with a mocked AI backend response.

<img width="1920" height="1080" alt="verba_ai_app" src="https://github.com/user-attachments/assets/bf642349-aa11-46d6-ada1-4a48c6a1b738" />

### Features:

- Real-time chat interface with message history
- Mock AI responses to different messages that contain: hello; how are you; help; ?; bye...
- Responsive design that also works on smaller screens
- Message timestamps that show when each message was sent
- Typing indicators while the AI is thinking
- User-friendly error handling

## Tech Stack

### Frontend
- **React**
- **TypeScript**
- **CSS**
- **Fetch API**

### Backend
- **Node.js**
- **TypeScript**
- **Express**
- **Dotenv**
- **CORS**
- **Nodemon**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd verba-ai-chat
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Copy and configure backend environment variables (optional)**
   ```bash
   cp .env.example .env
   ```
   (Note that the app will work without this step, as it has default fallbacks)

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Copy and configure frontend environment variables (optional)**
   ```bash
   cp .env.example .env
   ```
   (Note that the app will work without this step, as it has default fallbacks)

### Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 - Backend:**
```bash
cd ../backend
npm run dev
```
The server will start on `http://localhost:8080` or whichever URL or port you set in `.env`

**Terminal 2 - Frontend:**
```bash
cd ../frontend
npm start
```
The application will open automatically at `http://localhost:3000` or whichever port you set in `.env`

### Building the Application

**Backend:**
```bash
cd ../backend
npm run build
npm start
```

**Frontend:**
```bash
cd ../frontend
npm run build
```

## Future Additions

- User authentication
- Chat history preservation
- File upload support
- Markdown rendering in messages
- Export chat history
- Multiple conversation threads
