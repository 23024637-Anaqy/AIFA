# F&Business - AI-Powered F&B Career Platform

![F&Business Logo](https://via.placeholder.com/200x80/2D5A27/FFFFFF?text=F%26Business)

## 🍽️ About F&Business

F&Business is a cutting-edge platform that connects Food & Beverage professionals with their dream careers using AI-powered job matching and career guidance. Our platform integrates with Flowise AI to provide personalized career assistance and smart job recommendations.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Job Matching**: Intelligent matching based on skills, experience, and preferences
- **Flowise AI Assistant**: 24/7 career guidance and job search assistance
- **Advanced Search Filters**: Find jobs by location, type, salary, and more
- **Real-time Chat Support**: Instant help from our AI career assistant
- **Mobile-First Design**: Optimized for all devices and screen sizes
- **Accessibility Focused**: WCAG 2.1 AA compliant design

### 🤖 AI Integration
- **Flowise Chatflow Integration**: Custom AI assistant for F&B career guidance
- **Personalized Recommendations**: AI-driven job suggestions
- **Interview Preparation**: AI-powered interview tips and practice
- **Career Path Planning**: AI assistance for career development

### 🎨 Design Features
- **Modern UI/UX**: Clean, professional design optimized for F&B industry
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance Optimized**: Fast loading times and smooth animations
- **Dark Mode Support**: Coming soon

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Flowise instance (for AI functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fnb-business-website.git
   cd fnb-business-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Flowise Integration**
   - Set up your Flowise instance
   - Create a chatflow for F&B career assistance
   - Update the configuration in `js/app.js`:
   ```javascript
   const CONFIG = {
     flowise: {
       chatflowId: 'your-chatflow-id-here',
       apiHost: 'https://your-flowise-instance.com'
     }
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The website should load with all features

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server with live reload
- `npm run dev` - Start development server with file watching
- `npm run build` - Build production-ready files
- `npm test` - Run all tests (HTML, CSS, JS validation)
- `npm run format` - Format code with Prettier
- `npm run lint` - Run linting checks
- `npm run lighthouse` - Run Lighthouse performance audit

### Project Structure

```
fnb-jobsearch/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── app.js              # Main JavaScript application
├── images/                 # Image assets
├── .vscode/                # VS Code configuration
│   ├── tasks.json          # Build tasks
│   ├── launch.json         # Debug configuration
│   └── extensions.json     # Recommended extensions
├── package.json            # Project dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

### Key Technologies

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and Custom Properties
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Flowise**: AI chatbot integration for career assistance
- **Live Server**: Development server with hot reload

## 🎨 Design System

### Color Palette
- **Primary**: Deep Forest Green (`#2D5A27`) - Growth and sustainability
- **Secondary**: Warm Orange (`#E67E22`) - Energy and appetite
- **Accent**: Gold (`#F39C12`) - Premium quality and success
- **Neutral**: Charcoal Gray (`#34495E`) - Professional readability
- **Background**: Cream White (`#FEFEFE`) - Clean and appetizing

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (body text and UI elements)
- **Font Sizes**: Responsive scale from 0.75rem to 3rem

### Components
- Accessible navigation with keyboard support
- Interactive job search with autocomplete
- AI chat integration with Flowise
- Responsive contact forms with validation
- Animated statistics counters
- Smooth scroll navigation

## 🤖 Flowise AI Setup

### 1. Install Flowise
```bash
npm install -g flowise
npx flowise start
```

### 2. Create F&B Career Chatflow
1. Open Flowise UI (usually http://localhost:3000)
2. Create a new chatflow
3. Add nodes for:
   - **Chat Memory**: To maintain conversation context
   - **LLM (OpenAI/ChatGPT)**: For AI responses
   - **Prompt Template**: For F&B-specific prompts
   - **Document Loaders**: For job database integration

### 3. F&B Career Prompt Template
```
You are an expert F&B (Food & Beverage) career assistant. Help users with:
- Job search and recommendations
- Career advice and planning
- Interview preparation
- Salary negotiations
- Skill development recommendations
- Industry insights and trends

Context: The user is looking for opportunities in restaurants, hotels, cafes, bars, and food service industry.

Always be helpful, professional, and focus on actionable advice.

User Question: {question}
```

### 4. Update Website Configuration
Replace the placeholder values in `js/app.js`:
```javascript
window.FlowiseConfig = {
  chatflowId: 'your-actual-chatflow-id',
  apiHost: 'http://localhost:3000', // or your hosted Flowise URL
  theme: {
    // Customization options
  }
};
```

## 📱 Mobile Experience

The website is designed mobile-first with:
- Touch-friendly interface elements
- Responsive navigation menu
- Optimized form inputs for mobile keyboards
- Fast loading on slower connections
- Offline-ready service worker (coming soon)

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance**: Proper heading structure, color contrast, and ARIA labels
- **Keyboard Navigation**: Full site navigation without mouse
- **Screen Reader Support**: Semantic HTML and descriptive text
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Configuration

### Environment Variables
Create a `.env` file for sensitive configuration:
```env
FLOWISE_API_HOST=https://your-flowise-instance.com
FLOWISE_CHATFLOW_ID=your-chatflow-id
ANALYTICS_ID=your-google-analytics-id
```

### Customization
- **Colors**: Update CSS custom properties in `styles.css`
- **Content**: Modify HTML content in `index.html`
- **Features**: Extend functionality in `app.js`
- **Branding**: Replace logo and images in `images/` folder

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload files to your web server
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Job search form submits correctly
- [ ] Contact form validates and submits
- [ ] AI chat loads and responds
- [ ] Mobile navigation works
- [ ] Keyboard navigation is smooth
- [ ] Screen reader compatibility

### Automated Testing
```bash
npm test  # Runs HTML validation, CSS linting, and JS checks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Flowise**: For the amazing AI chatbot framework
- **Font Awesome**: For the beautiful icons
- **Google Fonts**: For the typography
- **Unsplash**: For placeholder images
- **The F&B Community**: For inspiration and feedback

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/fnb-business-website/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/fnb-business-website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fnb-business-website/discussions)
- **Email**: support@fnbusiness.com

---

**Made with ❤️ for the F&B industry**

*Connecting culinary passion with career opportunities through the power of AI.*
