# ⚖️ Vakil AI — Senior Indian Legal Counsel

An AI-powered legal advisor simulating **Adv. Ramesh Kumar Sharma**, a senior advocate with 35+ years of experience in Indian law — covering the Constitution, landmark Supreme Court cases, all central acts, and state-specific laws.

---

## ✨ Features

- 🏛️ Deep knowledge of Indian Constitution (all 395 Articles, 12 Schedules, 104 Amendments)
- 📚 Constituent Assembly Debates (1946–49)
- ⚖️ 5000+ landmark Supreme Court & High Court judgments
- 🗺️ State-specific laws for all 28 states & 8 UTs
- 💬 Intelligent follow-up questioning for case clarity
- 📱 Mobile-first responsive design
- 💾 Chat history saved locally (+ MongoDB for server-side)
- 🔒 Production-ready with CORS, rate limiting, helmet

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS v4     |
| UI/UX     | React Hot Toast, React Markdown     |
| Fonts     | Playfair Display, Source Serif 4    |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB (optional) + localStorage   |
| AI        | Google Gemini 1.5 Pro               |
| Deploy    | Vercel (frontend + backend)         |

---

## 🚀 Quick Start

### 1. Clone / Extract

```bash
cd vakil-ai
```

### 2. Install Dependencies

```bash
# Install all
npm run install:all

# Or individually:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure Environment

**Backend** (`backend/.env`):
```env
GEMINI_API_KEY=your_google_gemini_api_key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vakil-ai
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

> **Note:** MongoDB is optional. If `MONGODB_URI` is not set, the app uses only localStorage.

### 4. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Paste it in `backend/.env`

### 5. Run Development

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

Open: `http://localhost:5173`

---

## 🚢 Deployment to Vercel

### Backend Deployment

1. Create new Vercel project → Import `backend/` folder
2. Add Environment Variables:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend.vercel.app`
3. Deploy

### Frontend Deployment

1. Create new Vercel project → Import `frontend/` folder
2. Add Environment Variables:
   - `VITE_API_URL=https://your-backend.vercel.app`
3. Deploy

---

## 📁 Project Structure

```
vakil-ai/
├── backend/
│   ├── controllers/
│   │   ├── chatController.js    # Gemini AI integration + system prompt
│   │   └── sessionsController.js
│   ├── models/
│   │   └── ChatSession.js       # MongoDB schema
│   ├── routes/
│   │   ├── chat.js
│   │   └── sessions.js
│   ├── server.js                # Express app
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx        # Session history sidebar
    │   │   ├── Header.jsx         # Top navigation
    │   │   ├── MessageBubble.jsx  # Chat messages
    │   │   ├── ChatInput.jsx      # Message input
    │   │   ├── StateSelector.jsx  # State/UT picker modal
    │   │   └── WelcomeScreen.jsx  # Landing page
    │   ├── hooks/
    │   │   └── useChatHistory.js  # localStorage persistence
    │   ├── pages/
    │   │   └── ChatPage.jsx       # Main chat interface
    │   ├── utils/
    │   │   ├── api.js             # Axios API calls
    │   │   └── constants.js       # States list, helpers
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── vercel.json
    └── package.json
```

---

## 🎨 Design

- **Color Palette:** Parchment & gold (#c8972a) on deep mahogany (#1a1208)
- **Fonts:** Playfair Display (headings) + Source Serif 4 (body) — evoking legal documents
- **Theme:** Traditional Indian courtroom aesthetic meets modern chat UI

---

## ⚠️ Disclaimer

Vakil AI provides **general legal information** based on Indian law. It is **not a substitute** for advice from a qualified advocate. Always consult a licensed lawyer for your specific situation.

---

## 📄 License

MIT License — Free to use and modify.
