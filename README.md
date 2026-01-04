# 🎯 Placement Assistance Copilot

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-18.3+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)
![API](https://img.shields.io/badge/API-RESTful-brightgreen.svg)

**AI-Powered Decision Support System for Candidate Placement Evaluation**

*Modern, RESTful API backend with interactive React frontend that evaluates candidate readiness, recommends roles, and provides personalized preparation plans*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

**Placement Assistance Copilot** is an intelligent, rule-based AI system designed to help placement teams and candidates make data-driven decisions. It evaluates candidate skills, analyzes interview feedback, recommends suitable roles, and creates personalized 7-day preparation plans.

### Key Highlights

- 🤖 **Agentic AI Architecture** - Modular agents for different evaluation tasks
- 📊 **Comprehensive Gap Analysis** - Detailed breakdown of skill gaps with visual progress bars
- 🎯 **Role Recommendations** - Smart matching based on skill requirements
- 📅 **7-Day Preparation Plans** - Interactive roadmaps with detailed daily activities
- 💼 **Professional UI** - Modern, responsive design with smooth animations
- 🔍 **Transparent Decisions** - Fully explainable, rule-based logic (no black-box ML)
- 🚀 **Pure REST API** - Clean API-only backend with JSON responses
- 🌐 **CORS Enabled** - Ready for frontend integration

---

## ✨ Features

### 🎯 Core Capabilities

- **Candidate Readiness Evaluation**
  - Weighted scoring system (0-100)
  - Status classification (Ready / Almost Ready / Not Ready)
  - Detailed reasoning and improvement suggestions

- **Role Suitability Analysis**
  - Matches candidates against 5+ role types
  - Identifies recommended and not-recommended roles
  - **Detailed gap analysis** showing exact score differences

- **Interview Feedback Processing**
  - Extracts strengths and improvement areas
  - Analyzes communication, technical, and behavioral aspects
  - Generates actionable insights

- **7-Day Preparation Plans**
  - Interactive day cards with comprehensive roadmaps
  - Click any day to see detailed activities, schedules, and tips
  - Special focus on mock interview preparation (Day 6)

- **Action Items & Roadmaps**
  - Clickable action items with step-by-step guides
  - Priority-based recommendations
  - Professional roadmaps for skill improvement

### 🎨 UI Features

- **Modern Design** - Professional teal-blue color scheme
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Layout** - Works on all devices
- **Interactive Components** - Click to explore detailed information
- **Visual Progress Bars** - See skill scores and gaps at a glance

### 🔌 API Features

- **Pure REST API** - All endpoints return JSON only
- **CORS Enabled** - Cross-origin requests supported
- **Well Documented** - Clear API endpoints with examples
- **Error Handling** - Proper HTTP status codes and error messages

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhupendra-DS/placement-assistance-copilot.git
   cd placement-assistance-copilot
   ```

2. **Set up Backend (Flask API)**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   ```

3. **Set up Frontend (React)**
   ```bash
   # Navigate to UI folder
   cd lovable-ui
   
   # Install dependencies
   npm install
   ```

### Running the Application

#### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Flask Backend:**
```bash
python app.py
```
Backend API runs on: `http://127.0.0.1:5000`

**Terminal 2 - Start React Frontend:**
```bash
cd lovable-ui
npm run dev
```
Frontend runs on: `http://localhost:3000` (or another port)

The frontend will automatically connect to the backend API.

#### Option 2: Production Mode

**Build and serve from Flask:**
```bash
cd lovable-ui
npm run build
cd ..
python app.py
```
Everything runs on: `http://127.0.0.1:5000`

---

## 🧠 Agentic Architecture

The system uses **4 specialized AI agents** working together:

### 1. 📊 Readiness Agent
- Calculates weighted readiness score
- Classifies candidate status (Ready/Almost Ready/Not Ready)
- Provides reasoning and improvement suggestions

### 2. 🎯 Role Recommendation Agent
- Matches skills against role requirements
- Identifies blocking gaps
- Recommends suitable roles with detailed analysis

### 3. 📝 Interview Feedback Agent
- Analyzes feedback text using rule-based logic
- Extracts strengths and gaps
- Generates structured preparation plans

### 4. 🚀 Action Planning Agent
- Creates prioritized action items
- Assigns priority levels (High/Medium/Low)
- Provides detailed roadmaps for improvement

---

## 📊 Skill Evaluation

### Skills Assessed
- 📊 **Excel** (15% weight)
- 🗄️ **SQL** (20% weight)
- 🐍 **Python** (20% weight)
- 📐 **Statistics & Probability** (15% weight)
- 🤖 **Machine Learning** (20% weight)
- 📈 **Tableau & Power BI** (10% weight)

### Supported Roles
- **Data Analyst** - Analyze data to provide actionable business insights
- **Business Analyst** - Create dashboards and reports for business decision-making
- **Data Scientist** - Build predictive models and derive insights from complex data
- **Junior ML Engineer** - Deploy and maintain machine learning models in production
- **BI Analyst** - Design and implement business intelligence solutions

---

## 🔌 API Documentation

The backend provides a **pure REST API** that returns JSON responses only. All endpoints support CORS for frontend integration.

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints

#### `GET /`
Root endpoint - Returns API status and available endpoints.

**Response:**
```json
{
  "status": "Backend running",
  "message": "This is a pure API backend. Use /api/evaluate for candidate evaluation.",
  "endpoints": {
    "evaluate": "/api/evaluate",
    "requirements": "/api/requirements",
    "skill_weights": "/api/skill-weights"
  }
}
```

#### `POST /api/evaluate`
Evaluate a candidate's placement readiness.

**Request Body:**
```json
{
  "excel": 75,
  "sql": 70,
  "python": 80,
  "stats": 65,
  "ml": 60,
  "bi": 72,
  "feedback": "Candidate demonstrated strong SQL skills and good analytical thinking..."
}
```

**Response:**
```json
{
  "readiness": {
    "status": "Almost Ready",
    "score": 72,
    "reasoning": [...],
    "improvements": [...],
    "skillBreakdown": [...]
  },
  "roleSuitability": {
    "recommended": [...],
    "notRecommended": [...]
  },
  "gapAnalysis": [...],
  "feedbackAnalysis": {
    "strengths": [...],
    "areasToImprove": [...]
  },
  "preparationPlan": [...],
  "actionSummary": {
    "priority": "Medium",
    "recommendation": "...",
    "actionItems": [...]
  },
  "candidateScores": {...}
}
```

#### `GET /api/requirements`
Get all role requirements with minimum skill thresholds.

**Response:**
```json
[
  {
    "role": "Data Analyst",
    "description": "Analyze data to provide actionable business insights",
    "requirements": [
      {
        "skill": "SQL",
        "minimum": 70
      },
      ...
    ]
  },
  ...
]
```

#### `GET /api/skill-weights`
Get skill weight distribution used in scoring.

**Response:**
```json
{
  "success": true,
  "skill_weights": {
    "Excel": 0.15,
    "SQL": 0.20,
    "Python": 0.20,
    "Statistics & Probability": 0.15,
    "Machine Learning": 0.20,
    "Tableau & Power BI": 0.10
  }
}
```

### Error Responses

All endpoints return proper HTTP status codes:
- `200 OK` - Successful request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Endpoint not found

Error response format:
```json
{
  "error": "Error message",
  "message": "Detailed description"
}
```

---

## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing support

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vite** - Fast build tool
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Architecture
- **Agentic AI** - Modular agent system for different evaluation tasks
- **RESTful API** - Clean API design with JSON responses
- **Component-based** - Reusable React components
- **Separation of Concerns** - Backend API and frontend are decoupled

---

## 📁 Project Structure

```
placement-assistance-copilot/
├── agents/                  # AI agents
│   ├── readiness_agent.py   # Readiness evaluation agent
│   ├── role_agent.py        # Role recommendation agent
│   ├── feedback_agent.py    # Feedback analysis agent
│   └── action_agent.py      # Action planning agent
├── rules/                   # Business rules
│   ├── scoring_rules.py     # Skill weights and scoring rules
│   └── role_requirements.py # Role-specific requirements
├── lovable-ui/              # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utilities (API client)
│   │   └── types/           # TypeScript types
│   └── package.json
├── app.py                   # Flask API application
└── requirements.txt         # Python dependencies
```

---

## 🎯 Usage Example

1. **Start the Backend**
   ```bash
   python app.py
   ```

2. **Start the Frontend**
   ```bash
   cd lovable-ui
   npm run dev
   ```

3. **Use the Application**
   - Enter skill scores (0-100 for each skill)
   - Add interview feedback (text description)
   - Click "Evaluate"
   - View comprehensive results:
     - Readiness score and status
     - Recommended/Not recommended roles
     - Detailed gap analysis
     - Interactive 7-day preparation plan
     - Action items with roadmaps

---

## 🔄 Recent Updates

### Latest Changes
- ✅ **API-Only Backend** - Converted to pure REST API with JSON responses only
- ✅ **CORS Support** - Enabled cross-origin requests for frontend integration
- ✅ **Clean Architecture** - Removed template rendering, focused on API endpoints
- ✅ **Better Documentation** - Comprehensive API documentation
- ✅ **Detailed Gap Analysis** - See exactly why candidates don't qualify for roles
- ✅ **Interactive 7-Day Plans** - Click any day for comprehensive roadmaps
- ✅ **Action Item Roadmaps** - Step-by-step guides for each action
- ✅ **Professional UI** - Modern design with smooth animations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Bhupendra Singh**

- GitHub: [@Bhupendra-DS](https://github.com/Bhupendra-DS)
- Repository: [placement-assistance-copilot](https://github.com/Bhupendra-DS/placement-assistance-copilot)

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for transparent, explainable AI in placement decisions
- Designed for both placement teams and candidates
- Uses rule-based logic for transparent, explainable decisions

---

## ⚠️ Disclaimer

This system provides **decision support only** and does not replace human judgment. All final placement decisions remain with human evaluators. The system uses rule-based logic for transparency and explainability.

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ by [Bhupendra Singh](https://github.com/Bhupendra-DS)

[⬆ Back to Top](#-placement-assistance-copilot)

</div>