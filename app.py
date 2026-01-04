from flask import Flask, request, jsonify
from flask_cors import CORS

from agents.readiness_agent import evaluate_readiness
from agents.role_agent import recommend_roles
from agents.feedback_agent import analyze_feedback
from agents.action_agent import generate_next_actions
from rules.scoring_rules import SKILL_WEIGHTS
from rules.role_requirements import ROLE_REQUIREMENTS

app = Flask(__name__)
# Enable CORS globally for API access (required for frontend integration)
CORS(app)

# NOTE: This is a pure API-only backend. All routes return JSON responses only.
# The app is WSGI-compatible and works with Vercel's @vercel/python runtime.


@app.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint - Returns API status and available endpoints.
    This is the only non-/api route and serves as the API health/status endpoint.
    Returns JSON for consistency (API-only backend, no HTML rendering).
    """
    return jsonify({
        "status": "healthy",
        "service": "Placement Assistance Copilot API",
        "version": "1.0.0",
        "endpoints": {
            "evaluate": "/api/evaluate",
            "requirements": "/api/requirements",
            "skill_weights": "/api/skill-weights"
        }
    }), 200


def transform_response_for_ui(readiness, scores, weights, recommended, rejected, strengths, gaps, plan, actions):
    """
    Transform Flask API response to match UI's expected format.
    This function maintains backward compatibility with existing frontend.
    """
    # Transform readiness
    readiness_ui = {
        "status": readiness["status"],
        "score": int(readiness["final_score"]),
        "reasoning": readiness.get("reasons", []),
        "improvements": readiness.get("suggestions", []),
        "skillBreakdown": [
            {
                "skill": skill,
                "score": score,
                "status": "Excellent" if score >= 80 else "Good" if score >= 70 else "Average" if score >= 50 else "Needs Improvement"
            }
            for skill, score in scores.items()
        ]
    }
    
    # Transform role suitability
    role_suitability_ui = {
        "recommended": [
            {
                "role": role,
                "matchScore": 85,  # Default match score
                "strengths": [f"Strong {skill}" for skill in scores.keys() if scores[skill] >= 70]
            }
            for role in recommended
        ],
        "notRecommended": [
            {
                "role": role,
                "gaps": gap_list
            }
            for role, gap_list in rejected.items()
        ]
    }
    
    # Create detailed gap analysis for rejected roles
    gap_analysis_ui = []
    for role, gap_list in rejected.items():
        if role in ROLE_REQUIREMENTS:
            role_requirements = ROLE_REQUIREMENTS[role]
            skill_gaps = []
            total_gap = 0
            
            for skill_name in gap_list:
                # Find the actual skill name (handle variations)
                actual_skill = None
                for skill_key in scores.keys():
                    if skill_name.lower() in skill_key.lower() or skill_key.lower() in skill_name.lower():
                        actual_skill = skill_key
                        break
                
                if actual_skill and actual_skill in role_requirements:
                    candidate_score = scores[actual_skill]
                    required_score = role_requirements[actual_skill]
                    gap = required_score - candidate_score
                    
                    skill_gaps.append({
                        "skill": actual_skill,
                        "candidateScore": candidate_score,
                        "requiredScore": required_score,
                        "gap": gap
                    })
                    total_gap += gap
            
            if skill_gaps:
                gap_analysis_ui.append({
                    "role": role,
                    "gaps": skill_gaps,
                    "totalGap": total_gap
                })
    
    # Transform feedback analysis
    feedback_analysis_ui = {
        "strengths": strengths if strengths else ["Basic understanding of core concepts"],
        "areasToImprove": gaps if gaps else ["No major technical gaps identified"]
    }
    
    # Transform preparation plan with detailed activities
    def get_detailed_activities(day_num, focus_text):
        """Generate detailed activities based on day and focus."""
        focus_lower = focus_text.lower()
        
        # Special handling for mock interview day
        if "mock interview" in focus_lower or "interview" in focus_lower:
            return [
                "Review technical concepts and coding problems",
                "Practice STAR method for behavioral questions",
                "Prepare questions to ask the interviewer",
                "Set up interview environment and test equipment",
                "Review your projects and be ready to explain them"
            ]
        
        # SQL focused days
        if "sql" in focus_lower:
            return [
                "Practice complex joins and subqueries",
                "Work on query optimization techniques",
                "Solve SQL problems on LeetCode/HackerRank",
                "Build a mini-project using SQL"
            ]
        
        # Python focused days
        if "python" in focus_lower:
            return [
                "Solve data structures and algorithms problems",
                "Practice debugging and code review",
                "Work on Python-specific projects",
                "Review Python best practices and patterns"
            ]
        
        # Communication/Behavioral days
        if "communication" in focus_lower or "explain" in focus_lower:
            return [
                "Practice explaining technical concepts clearly",
                "Record yourself and review for improvement",
                "Practice STAR method storytelling",
                "Work on clarity and structure in explanations"
            ]
        
        # Statistics days
        if "statistics" in focus_lower or "probability" in focus_lower:
            return [
                "Review core statistical concepts",
                "Practice probability problems",
                "Work on case studies and analysis",
                "Apply statistics to real-world scenarios"
            ]
        
        # ML days
        if "machine learning" in focus_lower or "ml" in focus_lower:
            return [
                "Review ML algorithms and concepts",
                "Work on a mini ML project",
                "Practice model evaluation techniques",
                "Study real-world ML applications"
            ]
        
        # Resume/Preparation days
        if "resume" in focus_lower or "confidence" in focus_lower:
            return [
                "Update resume with recent projects",
                "Prepare portfolio and GitHub profile",
                "Practice confidence-building exercises",
                "Review and refine your preparation"
            ]
        
        # Default activities
        return [
            "Review core concepts related to today's focus",
            "Practice hands-on exercises and problems",
            "Apply learning through mini-projects",
            "Document progress and plan next steps"
        ]
    
    preparation_plan_ui = []
    for i, plan_item in enumerate(plan, 1):
        # Parse plan string (e.g., "Day 1: Communication drills...")
        if ":" in plan_item:
            day_part, activity_part = plan_item.split(":", 1)
            day_num = int(day_part.replace("Day", "").strip())
            focus = activity_part.strip()
        else:
            day_num = i
            focus = plan_item
        
        # Get detailed activities for this day
        activities = get_detailed_activities(day_num, focus)
        
        preparation_plan_ui.append({
            "day": day_num,
            "focus": focus,
            "activities": activities
        })
    
    # Ensure we always have exactly 7 days, sorted by day number
    # If somehow we have fewer, this ensures all days are present
    if len(preparation_plan_ui) < 7:
        # Create a set of existing day numbers
        existing_days = {item["day"] for item in preparation_plan_ui}
        
        # Default plans for missing days
        default_plans = {
            1: {"day": 1, "focus": "Communication and fundamentals mastery", "activities": get_detailed_activities(1, "communication")},
            2: {"day": 2, "focus": "SQL mastery and database skills", "activities": get_detailed_activities(2, "sql")},
            3: {"day": 3, "focus": "Python and problem-solving mastery", "activities": get_detailed_activities(3, "python")},
            4: {"day": 4, "focus": "Statistics and probability mastery", "activities": get_detailed_activities(4, "statistics")},
            5: {"day": 5, "focus": "Machine learning and advanced skills", "activities": get_detailed_activities(5, "machine learning")},
            6: {"day": 6, "focus": "Full mock interview (technical + HR)", "activities": get_detailed_activities(6, "mock interview")},
            7: {"day": 7, "focus": "Resume refinement and confidence preparation", "activities": get_detailed_activities(7, "resume")}
        }
        
        # Add missing days
        for day_num in range(1, 8):
            if day_num not in existing_days:
                preparation_plan_ui.append(default_plans[day_num])
    
    # Sort by day number to ensure correct order
    preparation_plan_ui.sort(key=lambda x: x["day"])
    
    # Create detailed gap analysis for rejected roles
    gap_analysis_ui = []
    for role, gap_list in rejected.items():
        if role in ROLE_REQUIREMENTS:
            role_requirements = ROLE_REQUIREMENTS[role]
            skill_gaps = []
            total_gap = 0
            
            for skill_name in gap_list:
                # Find the actual skill name (handle variations)
                actual_skill = None
                for skill_key in scores.keys():
                    if skill_name.lower() in skill_key.lower() or skill_key.lower() in skill_name.lower():
                        actual_skill = skill_key
                        break
                
                if actual_skill and actual_skill in role_requirements:
                    candidate_score = scores[actual_skill]
                    required_score = role_requirements[actual_skill]
                    gap = required_score - candidate_score
                    
                    skill_gaps.append({
                        "skill": actual_skill,
                        "candidateScore": candidate_score,
                        "requiredScore": required_score,
                        "gap": gap
                    })
                    total_gap += gap
            
            if skill_gaps:
                gap_analysis_ui.append({
                    "role": role,
                    "gaps": skill_gaps,
                    "totalGap": total_gap
                })
    
    # Transform action summary
    priority = "High" if readiness["status"] == "Ready" else "Medium" if readiness["status"] == "Almost Ready" else "Low"
    recommendation = (
        "Candidate is ready for placement. Schedule final interviews with partner companies."
        if readiness["status"] == "Ready"
        else "Candidate shows promise. Recommend 2-week intensive training before placement."
        if readiness["status"] == "Almost Ready"
        else "Candidate needs foundational work. Enroll in 4-week bootcamp program."
    )
    
    action_summary_ui = {
        "priority": priority,
        "recommendation": recommendation,
        "actionItems": actions if actions else ["Complete the 7-day preparation plan"]
    }
    
    return {
        "readiness": readiness_ui,
        "roleSuitability": role_suitability_ui,
        "feedbackAnalysis": feedback_analysis_ui,
        "preparationPlan": preparation_plan_ui,
        "actionSummary": action_summary_ui,
        "gapAnalysis": gap_analysis_ui,
        "candidateScores": scores
    }


@app.route("/api/evaluate", methods=["POST"])
def api_evaluate():
    """
    API endpoint for candidate evaluation.
    Accepts JSON with skill scores and feedback.
    Returns complete evaluation results in UI-compatible format.
    
    Request body should contain:
    - excel, sql, python, stats, ml, bi (0-100 scores)
    - feedback (string)
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "error": "Request body must be JSON",
                "message": "Please send a JSON payload with candidate data"
            }), 400
        
        # Extract scores from JSON
        scores = {
            "Excel": int(data.get("excel", 0)),
            "SQL": int(data.get("sql", 0)),
            "Python": int(data.get("python", 0)),
            "Statistics & Probability": int(data.get("stats", 0)),
            "Machine Learning": int(data.get("ml", 0)),
            "Tableau & Power BI": int(data.get("bi", 0))
        }
        
        feedback_text = data.get("feedback", "")
        
        # Run agent workflows (business logic unchanged)
        readiness = evaluate_readiness(scores, feedback_text)
        recommended, rejected = recommend_roles(scores)
        strengths, gaps, plan = analyze_feedback(feedback_text)
        actions = generate_next_actions(readiness, recommended)
        
        # Transform for UI
        ui_response = transform_response_for_ui(
            readiness, scores, SKILL_WEIGHTS, recommended, rejected,
            strengths, gaps, plan, actions
        )
        
        # Return JSON response
        return jsonify(ui_response), 200
    
    except ValueError as e:
        return jsonify({
            "success": False,
            "error": "Invalid input",
            "message": str(e)
        }), 400
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Internal server error",
            "message": str(e)
        }), 500


@app.route("/api/requirements", methods=["GET"])
def api_requirements():
    """
    API endpoint to get role requirements.
    Returns all role requirements with minimum skill thresholds.
    """
    try:
        # Transform to UI format
        role_descriptions = {
            "Data Analyst": "Analyze data to provide actionable business insights",
            "Business Analyst": "Create dashboards and reports for business decision-making",
            "Data Scientist": "Build predictive models and derive insights from complex data",
            "Junior ML Engineer": "Deploy and maintain machine learning models in production",
            "BI Analyst": "Design and implement business intelligence solutions"
        }
        
        requirements_ui = [
            {
                "role": role,
                "description": role_descriptions.get(role, f"Requirements for {role}"),
                "requirements": [
                    {
                        "skill": skill.replace("Statistics & Probability", "Statistics").replace("Tableau & Power BI", "BI Tools"),
                        "minimum": minimum
                    }
                    for skill, minimum in skills.items()
                ]
            }
            for role, skills in ROLE_REQUIREMENTS.items()
        ]
        
        return jsonify(requirements_ui), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Internal server error",
            "message": str(e)
        }), 500


@app.route("/api/skill-weights", methods=["GET"])
def api_skill_weights():
    """
    API endpoint to get skill weights.
    Returns skill weights used in the evaluation algorithm.
    """
    try:
        return jsonify({
            "success": True,
            "skill_weights": SKILL_WEIGHTS
        }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Internal server error",
            "message": str(e)
        }), 500


@app.route('/<path:path>')
def catch_all(path):
    """
    Catch-all route for undefined paths.
    Returns JSON error since this is an API-only backend.
    This route only catches paths that don't match any defined routes above.
    """
    # API routes are handled by specific routes above, so this only catches non-API paths
    return jsonify({
        "success": False,
        "error": "Not found",
        "message": "This is an API-only backend. Use /api/* endpoints.",
        "available_endpoints": [
            "/api/evaluate",
            "/api/requirements",
            "/api/skill-weights"
        ]
    }), 404


if __name__ == "__main__":
    print("🚀 Starting Flask API-only backend...")
    print("   All routes return JSON responses only")
    print("\n📋 Available API endpoints:")
    print("   GET  / - Health check")
    print("   POST /api/evaluate - Candidate evaluation")
    print("   GET  /api/requirements - Role requirements")
    print("   GET  /api/skill-weights - Skill weights")
    
    app.run(debug=True)
