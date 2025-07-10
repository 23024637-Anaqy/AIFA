# 🤖 Flowise AI Integration Guide

## Quick Setup (5 minutes)

### 1. Install Flowise
```bash
# Global installation
npm install -g flowise

# Or use npx (no installation needed)
npx flowise start
```

### 2. Start Flowise
```bash
# If installed globally
flowise start

# Or with npx
npx flowise start
```

This will open Flowise at `http://localhost:3000`

### 3. Create Your F&B Career Chatflow

1. **Open Flowise UI**: Navigate to `http://localhost:3000`
2. **Create New Chatflow**: Click "Create New Chatflow"
3. **Add Required Nodes**:

#### Essential Nodes Setup:
```
[Chat Memory] → [Conversation Chain] → [ChatGPT/OpenAI] → [Output]
                     ↑
               [Prompt Template]
```

#### Drag these nodes to your canvas:
- **Chat Memory** (BufferMemory or ConversationSummaryMemory)
- **ChatOpenAI** (or any LLM you prefer)
- **Prompt Template** 
- **Conversation Chain**

### 4. Configure the Prompt Template

Use this F&B-specific prompt:

```
You are an expert Food & Beverage career assistant for F&Business platform. Your role is to help job seekers in the F&B industry with:

🍽️ EXPERTISE AREAS:
- Restaurant jobs (chef, server, manager)
- Hotel F&B positions 
- Catering and events
- Food production and manufacturing
- Bar and beverage service
- Food service management
- Culinary careers

💼 HELP WITH:
- Job search strategies
- Resume and interview tips
- Salary negotiations
- Career progression advice
- Skill development recommendations
- Industry trends and insights

🎯 PERSONALITY:
- Professional yet friendly
- Knowledgeable about F&B industry
- Encouraging and supportive
- Practical and actionable advice

Always ask clarifying questions to better understand the user's experience level, career goals, and specific interests within F&B.

User: {input}
Assistant:
```

### 5. Connect the Nodes
1. **Chat Memory** → **Conversation Chain** (memory input)
2. **Prompt Template** → **Conversation Chain** (prompt input)  
3. **ChatOpenAI** → **Conversation Chain** (llm input)
4. **Conversation Chain** → **Output**

### 6. Configure Your LLM
- Add your OpenAI API key (or other LLM credentials)
- Set temperature to 0.7 for balanced creativity
- Max tokens: 500-1000

### 7. Test Your Chatflow
- Click "Test" button in Flowise
- Ask: "I'm looking for chef positions in New York"
- Verify the AI responds with F&B-specific advice

### 8. Get Your Chatflow ID
- After saving, copy the chatflow ID from the URL
- It looks like: `abc123def-456g-789h-ijkl-mnop012qrstu`

### 9. Update Your Website
Replace the placeholder in your `index.html` (around line 378):

```javascript
window.FlowiseConfig = {
    chatflowId: 'your-actual-chatflow-id-here', // ← Replace this
    apiHost: 'http://localhost:3000', // ← Your Flowise URL
    theme: {
        // ... existing theme config
    }
};
```

### 10. Test Integration
1. Start your website: `npm start`
2. Click the chat button or "Talk to AI Assistant"
3. The chat should load with your custom F&B assistant!

## Production Deployment

### For Production Use:
1. **Deploy Flowise**: Use Railway, Render, or Docker
2. **Update apiHost**: Change to your production URL
3. **Secure API**: Add authentication if needed

### Example Production Config:
```javascript
window.FlowiseConfig = {
    chatflowId: 'abc123def-456g-789h-ijkl-mnop012qrstu',
    apiHost: 'https://your-flowise-app.railway.app',
    theme: {
        button: {
            backgroundColor: '#2D5A27',
            right: 20,
            bottom: 20,
            size: 'medium'
        },
        chatWindow: {
            welcomeMessage: 'Hi! I\'m your F&B career assistant. What can I help you with today?',
            height: 500,
            width: 400
        }
    }
};
```

## Troubleshooting

### Chat Not Loading?
1. Check browser console for errors
2. Verify Flowise is running
3. Confirm chatflow ID is correct
4. Test chatflow directly in Flowise UI

### CORS Issues?
Add to Flowise environment:
```bash
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
```

### AI Responses Not F&B Focused?
- Review your prompt template
- Add more specific F&B examples
- Train with sample conversations
