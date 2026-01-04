# 🎯 Placement Assistance Copilot

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-18.3+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

**AI-Powered Decision Support System for Candidate Placement Evaluation**

*Modern, interactive web application that evaluates candidate readiness, recommends roles, and provides personalized preparation plans*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Tech Stack](#-tech-stack)

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
  - **NEW:** Detailed gap analysis showing exact score differences

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

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhupendra-DS/Placement-Assistance-Copilot.git
   cd Placement-Assistance-Copilot
   ```

2. **Set up Backend (Flask)**
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
Backend runs on: `http://127.0.0.1:5000`

**Terminal 2 - Start React Frontend:**
```bash
cd lovable-ui
npm run dev
```
Frontend runs on: `http://localhost:3000` (or another port)

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
- Classifies candidate status
- Provides reasoning and suggestions

### 2. 🎯 Role Recommendation Agent
- Matches skills against role requirements
- Identifies blocking gaps
- Recommends suitable roles

### 3. 📝 Interview Feedback Agent
- Analyzes feedback text
- Extracts strengths and gaps
- Generates preparation plans

### 4. 🚀 Action Planning Agent
- Creates prioritized action items
- Assigns priority levels
- Provides detailed roadmaps

---

## 📊 Skill Evaluation

### Skills Assessed
- 📊 Excel (15% weight)
- 🗄️ SQL (20% weight)
- 🐍 Python (20% weight)
- 📐 Statistics & Probability (15% weight)
- 🤖 Machine Learning (20% weight)
- 📈 Tableau & Power BI (10% weight)

### Supported Roles
- Data Analyst
- Business Analyst
- Data Scientist
- Junior ML Engineer
- BI Analyst

---

## 🔌 API Documentation

### Endpoints

#### `POST /api/evaluate`
Evaluate a candidate's placement readiness.

**Request:**
```json
{
  "excel": 75,
  "sql": 70,
  "python": 80,
  "stats": 65,
  "ml": 60,
  "bi": 72,
  "feedback": "Candidate demonstrated strong SQL skills..."
}
```

**Response:**
```json
{
  "readiness": { ... },
  "roleSuitability": { ... },
  "gapAnalysis": [ ... ],
  "preparationPlan": [ ... ],
  "actionSummary": { ... }
}
```

#### `GET /api/requirements`
Get all role requirements.

#### `GET /api/skill-weights`
Get skill weight distribution.

---

## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### Architecture
- **Agentic AI** - Modular agent system
- **RESTful API** - Backend API
- **Component-based** - React components

---

## 📁 Project Structure

```
Placement-Assistance-Copilot/
├── agents/              # AI agents
│   ├── readiness_agent.py
│   ├── role_agent.py
│   ├── feedback_agent.py
│   └── action_agent.py
├── rules/              # Business rules
│   ├── scoring_rules.py
│   └── role_requirements.py
├── lovable-ui/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── templates/          # Legacy HTML templates
├── static/            # Static assets
├── app.py             # Flask application
└── requirements.txt   # Python dependencies
```

---

## 🎯 Usage Example

1. **Enter Skill Scores** (0-100 for each skill)
2. **Add Interview Feedback** (text description)
3. **Click "Evaluate"**
4. **View Results:**
   - Readiness score and status
   - Recommended/Not recommended roles
   - **Detailed gap analysis** (NEW!)
   - 7-day preparation plan
   - Action items with roadmaps

---

## 🆕 What's New

### Latest Features
- ✅ **Detailed Gap Analysis** - See exactly why candidates don't qualify for roles
- ✅ **Interactive 7-Day Plans** - Click any day for comprehensive roadmaps
- ✅ **Action Item Roadmaps** - Step-by-step guides for each action
- ✅ **Professional UI** - Modern design with smooth animations
- ✅ **Enhanced Mock Interview Guide** - Complete preparation roadmap

---

## 📸 Screenshots

*Add screenshots of your application here*

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
- Project: [Placement Assistance Copilot](https://github.com/Bhupendra-DS/Placement-Assistance-Copilot)

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for transparent, explainable AI in placement decisions
- Designed for both placement teams and candidates

---

## ⚠️ Disclaimer

This system provides **decision support only** and does not replace human judgment. All final placement decisions remain with human evaluators.

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ by [Bhupendra Singh](https://github.com/Bhupendra-DS)

</div>
