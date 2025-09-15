import { type Question, type Assessment, type InsertAssessment, type CultureType } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getQuestions(): Promise<Question[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: string): Promise<Assessment | undefined>;
}

export class MemStorage implements IStorage {
  private questions: Map<string, Question>;
  private assessments: Map<string, Assessment>;

  constructor() {
    this.questions = new Map();
    this.assessments = new Map();
    this.initializeQuestions();
  }

  private initializeQuestions() {
    const questionsData: Question[] = [
      {
        id: "1",
        text: "When your team faces a tight deadline, what approach does your company typically encourage?",
        options: [
          { value: "results", text: "Push through with overtime and extra effort", subtitle: "Focus on meeting the deadline at all costs" },
          { value: "caring", text: "Check in with team members' wellbeing first", subtitle: "Ensure work-life balance while finding solutions" },
          { value: "learning", text: "Use it as a learning opportunity", subtitle: "Analyze what led to the situation and improve processes" },
          { value: "order", text: "Follow established escalation procedures", subtitle: "Stick to the proper channels and protocols" }
        ]
      },
      {
        id: "2",
        text: "How are important decisions typically made in your organization?",
        options: [
          { value: "authority", text: "Top-down from senior leadership", subtitle: "Clear hierarchy and chain of command" },
          { value: "caring", text: "Through collaborative team discussions", subtitle: "Everyone's input is valued and considered" },
          { value: "purpose", text: "Based on alignment with company mission", subtitle: "Decisions support the greater purpose" },
          { value: "safety", text: "After careful risk assessment", subtitle: "Minimize potential negative impacts" }
        ]
      },
      {
        id: "3",
        text: "What happens when someone makes a mistake at your company?",
        options: [
          { value: "learning", text: "It's treated as a learning opportunity", subtitle: "Focus on understanding and improvement" },
          { value: "caring", text: "Support is provided to help them recover", subtitle: "Emphasis on personal growth and wellbeing" },
          { value: "order", text: "There are clear consequences and procedures", subtitle: "Established protocols are followed" },
          { value: "authority", text: "Management addresses it directly", subtitle: "Leadership takes control of the situation" }
        ]
      },
      {
        id: "4",
        text: "How does your company approach innovation and new ideas?",
        options: [
          { value: "learning", text: "Experimentation is encouraged", subtitle: "Try new things and learn from failures" },
          { value: "enjoyment", text: "Creative brainstorming sessions", subtitle: "Fun, energetic idea generation" },
          { value: "authority", text: "Innovation comes from leadership", subtitle: "Senior management drives new initiatives" },
          { value: "safety", text: "Thorough testing before implementation", subtitle: "Minimize risks with careful validation" }
        ]
      },
      {
        id: "5",
        text: "What motivates employees most in your organization?",
        options: [
          { value: "purpose", text: "Making a meaningful impact", subtitle: "Contributing to something bigger than themselves" },
          { value: "results", text: "Achieving ambitious goals", subtitle: "Recognition for high performance" },
          { value: "caring", text: "Personal growth and development", subtitle: "Feeling valued and supported" },
          { value: "enjoyment", text: "Having fun at work", subtitle: "Positive, energetic work environment" }
        ]
      },
      {
        id: "6",
        text: "How does your company handle conflicts between team members?",
        options: [
          { value: "caring", text: "Mediated discussions to understand all perspectives", subtitle: "Focus on maintaining relationships" },
          { value: "order", text: "Follow HR policies and procedures", subtitle: "Structured approach to conflict resolution" },
          { value: "authority", text: "Management makes the final decision", subtitle: "Clear direction from leadership" },
          { value: "purpose", text: "Refocus on shared company mission", subtitle: "Unite around common goals" }
        ]
      },
      {
        id: "7",
        text: "What's the typical work environment like in your office?",
        options: [
          { value: "enjoyment", text: "Lively and energetic", subtitle: "Music, games, and social activities" },
          { value: "order", text: "Quiet and structured", subtitle: "Clear workspaces and minimal distractions" },
          { value: "caring", text: "Collaborative and supportive", subtitle: "Open communication and helping each other" },
          { value: "learning", text: "Dynamic and intellectually stimulating", subtitle: "Constant learning and knowledge sharing" }
        ]
      },
      {
        id: "8",
        text: "How does your company approach goal setting?",
        options: [
          { value: "results", text: "Aggressive, stretch targets", subtitle: "Push for maximum performance" },
          { value: "purpose", text: "Align with company mission and values", subtitle: "Goals that create meaningful impact" },
          { value: "order", text: "Clear, measurable objectives", subtitle: "Structured planning and tracking" },
          { value: "learning", text: "Focus on growth and development", subtitle: "Goals that build capabilities" }
        ]
      },
      {
        id: "9",
        text: "What happens when your company exceeds expectations?",
        options: [
          { value: "enjoyment", text: "Big celebrations and rewards", subtitle: "Team parties and fun recognition" },
          { value: "results", text: "Set even higher targets", subtitle: "Use success as motivation for more" },
          { value: "caring", text: "Appreciate everyone's contributions", subtitle: "Personal recognition for each team member" },
          { value: "learning", text: "Analyze what worked well", subtitle: "Document lessons learned for future success" }
        ]
      },
      {
        id: "10",
        text: "How does your company communicate important updates?",
        options: [
          { value: "authority", text: "Top-down announcements", subtitle: "Clear messages from leadership" },
          { value: "caring", text: "Open forums for discussion", subtitle: "Everyone gets to ask questions and share thoughts" },
          { value: "order", text: "Formal, documented communications", subtitle: "Official channels and proper procedures" },
          { value: "purpose", text: "Connect to company mission", subtitle: "Explain how changes support our values" }
        ]
      },
      {
        id: "11",
        text: "What's the approach to work-life balance in your company?",
        options: [
          { value: "caring", text: "Strong emphasis on personal wellbeing", subtitle: "Flexible schedules and mental health support" },
          { value: "results", text: "Balance is secondary to achieving goals", subtitle: "Work hard to deliver results" },
          { value: "enjoyment", text: "Make work so fun it doesn't feel like work", subtitle: "Blend personal enjoyment with professional tasks" },
          { value: "order", text: "Clear boundaries between work and personal time", subtitle: "Structured policies and expectations" }
        ]
      },
      {
        id: "12",
        text: "How does your company approach risk-taking?",
        options: [
          { value: "safety", text: "Very cautious and risk-averse", subtitle: "Extensive planning to avoid problems" },
          { value: "learning", text: "Calculated risks for learning", subtitle: "Accept failures as part of growth" },
          { value: "results", text: "Bold risks for big rewards", subtitle: "High risk, high reward mentality" },
          { value: "authority", text: "Risk decisions made by leadership", subtitle: "Senior management controls major risks" }
        ]
      },
      {
        id: "13",
        text: "What drives hiring decisions at your company?",
        options: [
          { value: "caring", text: "Cultural fit and interpersonal skills", subtitle: "People who will work well with the team" },
          { value: "results", text: "Track record of high performance", subtitle: "Proven ability to deliver results" },
          { value: "learning", text: "Potential for growth and development", subtitle: "Curiosity and willingness to learn" },
          { value: "purpose", text: "Alignment with company mission", subtitle: "Shared values and commitment to our cause" }
        ]
      },
      {
        id: "14",
        text: "How does your company handle customer complaints?",
        options: [
          { value: "caring", text: "Empathetic, personal attention", subtitle: "Make customers feel heard and valued" },
          { value: "order", text: "Systematic process and documentation", subtitle: "Follow established procedures" },
          { value: "results", text: "Quick resolution to maintain reputation", subtitle: "Efficient problem-solving" },
          { value: "learning", text: "Analyze for process improvements", subtitle: "Use feedback to prevent future issues" }
        ]
      },
      {
        id: "15",
        text: "What's the typical meeting style in your organization?",
        options: [
          { value: "order", text: "Structured with clear agendas", subtitle: "Formal format with documented outcomes" },
          { value: "caring", text: "Inclusive discussions where everyone speaks", subtitle: "Ensure all voices are heard" },
          { value: "authority", text: "Led by senior members", subtitle: "Clear leadership and decision-making" },
          { value: "enjoyment", text: "Dynamic and engaging", subtitle: "Interactive with creative elements" }
        ]
      },
      {
        id: "16",
        text: "How does your company approach professional development?",
        options: [
          { value: "learning", text: "Continuous learning opportunities", subtitle: "Regular training, conferences, and courses" },
          { value: "caring", text: "Personalized development plans", subtitle: "Individual attention to each person's growth" },
          { value: "results", text: "Development tied to performance goals", subtitle: "Skills building that drives business results" },
          { value: "authority", text: "Leadership development programs", subtitle: "Focus on building management capabilities" }
        ]
      },
      {
        id: "17",
        text: "What's the company's approach to change management?",
        options: [
          { value: "order", text: "Careful planning and phased rollouts", subtitle: "Structured change with clear processes" },
          { value: "caring", text: "Support employees through transitions", subtitle: "Focus on people's emotional needs during change" },
          { value: "authority", text: "Leadership drives change initiatives", subtitle: "Top-down implementation" },
          { value: "learning", text: "Iterative approach with continuous feedback", subtitle: "Adapt and improve based on what we learn" }
        ]
      },
      {
        id: "18",
        text: "How does your company measure success?",
        options: [
          { value: "results", text: "Financial metrics and KPIs", subtitle: "Revenue, profit, and performance indicators" },
          { value: "purpose", text: "Impact on mission and values", subtitle: "Meaningful contribution to our cause" },
          { value: "caring", text: "Employee satisfaction and retention", subtitle: "How well we take care of our people" },
          { value: "safety", text: "Risk mitigation and stability", subtitle: "Avoiding problems and maintaining security" }
        ]
      }
    ];

    questionsData.forEach(question => {
      this.questions.set(question.id, question);
    });
  }

  async getQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      id,
      responses: insertAssessment.responses,
      results: insertAssessment.results,
      completedAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }
}

export const storage = new MemStorage();
