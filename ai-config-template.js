// ===== AI CONFIGURATION TEMPLATE =====
// Copy this to js/config.js or update directly in index.html

// 🤖 OPTION 1: FLOWISE INTEGRATION (Recommended)
window.FlowiseConfig = {
    // 📋 STEP 1: Replace with your Flowise chatflow ID
    chatflowId: 'your-chatflow-id-here', // Get this from Flowise URL after creating chatflow
    
    // 🌐 STEP 2: Replace with your Flowise instance URL
    apiHost: 'http://localhost:3000', // Local Flowise instance
    // apiHost: 'https://your-flowise-app.railway.app', // Production deployment
    
    // 🎨 STEP 3: Customize the chat appearance (optional)
    theme: {
        button: {
            backgroundColor: '#2D5A27', // F&B green theme
            right: 20,
            bottom: 20,
            size: 'medium',
            iconColor: 'white',
            customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/flowise.svg'
        },
        chatWindow: {
            welcomeMessage: 'Hello! I\'m your F&B career assistant. How can I help you find your next opportunity?',
            backgroundColor: '#ffffff',
            height: 500,
            width: 400,
            fontSize: 16,
            poweredByTextColor: '#2D5A27',
            botMessage: {
                backgroundColor: '#f7f8ff',
                textColor: '#303235'
            },
            userMessage: {
                backgroundColor: '#2D5A27',
                textColor: '#ffffff'
            },
            textInput: {
                placeholder: 'Ask about F&B careers...',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '#2D5A27'
            }
        }
    }
};

// 🔧 OPTION 2: DIRECT OPENAI API (Advanced Users)
/*
window.OpenAIConfig = {
    apiKey: 'your-openai-api-key',
    model: 'gpt-3.5-turbo',
    systemPrompt: `You are an expert F&B career assistant for F&Business platform.
    
    Help with:
    - Job search in restaurants, hotels, catering
    - Career advice for chefs, servers, managers
    - Interview preparation and salary negotiation
    - Industry trends and skill development
    
    Always be professional, encouraging, and provide actionable advice.`
};
*/

// 🚀 QUICK START CHECKLIST:
/*
✅ 1. Install Flowise: npm install -g flowise
✅ 2. Start Flowise: flowise start (opens at http://localhost:3000)
✅ 3. Create new chatflow with F&B career assistant prompt
✅ 4. Copy chatflow ID from browser URL
✅ 5. Update chatflowId above
✅ 6. Test your website at http://localhost:3000 (different port for website)
✅ 7. Click chat button to test AI integration
*/

// 📝 F&B CAREER ASSISTANT PROMPT TEMPLATE:
/*
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
*/
