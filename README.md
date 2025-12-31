# Spur – AI Live Chat Agent

An AI-powered customer support chat application built as a take-home assignment for Spur.

The application simulates a live chat widget where users can ask questions and receive contextual responses from an AI support agent, similar to how a real customer engagement and automation platform would work.

---

## Live Demo

- **Frontend:** https://spur-ai-chat-delta.vercel.app/
- **Backend:** https://spur-ai-chat-25zl.onrender.com

---

## Tech Stack

### Backend

- Node.js
- TypeScript
- Express
- Prisma (SQLite)
- OpenAI / OpenRouter API

### Frontend

- SvelteKit
- TypeScript
- Vite

### Deployment

- Backend: Render
- Frontend: Vercel

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/remmiculous/spur-ai-chat.git
cd spur-ai-chat
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

#### Environment variables

Create a `.env` file inside the `backend` directory:

```env
OPENAI_API_KEY=your_openai_or_openrouter_key
DATABASE_URL="file:./dev.db"
```

#### Database setup (migrations)

Run Prisma migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

This will:

- Create a local SQLite database
- Set up the `Conversation` and `Message` tables
- Generate the Prisma client

#### Start the backend server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Architecture Overview

### Backend Structure

The backend is structured with clear separation of concerns:

- **Routes**: Handle HTTP request/response logic (e.g. `/chat/message`)
- **Services**: Encapsulate business logic such as LLM interaction and chat flow
- **Database Layer**: Prisma client and schema definitions
- **Utils**: Input validation and shared helpers

This structure makes it easy to extend the system with additional channels (WhatsApp, Instagram) or swap LLM providers without changing route logic.

### Design Decisions

- A single `/chat/message` endpoint handles the entire chat flow
- Conversations are session-based (no authentication required)
- Messages are persisted to enable contextual replies
- LLM integration is isolated behind a service for flexibility
- Robust error handling is prioritized to prevent backend crashes

---

## LLM Notes

- **Provider**: OpenAI (via OpenAI SDK) / OpenRouter (for cost-effective access)
- **Prompting Strategy**:

  - A system prompt defines the AI as a helpful e-commerce support agent
  - Basic FAQ knowledge (shipping, returns, refunds, support hours) is injected into every request
  - Recent conversation history is included to generate contextual replies

- **Cost & Safety Controls**:

  - Conversation history is capped to limit token usage
  - LLM errors, rate limits, and quota exhaustion are handled gracefully
  - A friendly fallback response is returned when the LLM is unavailable

---

## Trade-offs & If I Had More Time

### Trade-offs

- SQLite was used for simplicity instead of Postgres
- No authentication or multi-user support
- UI design was kept intentionally minimal
- No streaming responses for AI messages

### If I Had More Time

- Add streaming responses for better UX
- Improve UI polish and mobile responsiveness
- Add message timestamps and read indicators
- Introduce authentication and multi-tenant support
- Replace SQLite with Postgres for production
- Add logging, metrics, and observability

---

## Submission Notes

This project was built with a focus on:

- Clean and maintainable architecture
- Robust error handling
- Realistic product behavior
- Ease of extensibility

The scope was intentionally constrained to reflect how features would be shipped in a real startup environment.

```
This project was completed as part of the Spur take-home assignment and represents my approach to building practical, production-minded features.

Thank you to the Spur team 🤝 for the opportunity and for your time in reviewing this submission.

Made with 💜