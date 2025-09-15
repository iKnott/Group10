import { type CultureType, type CultureInfo } from "@shared/schema";

export const cultureData: Record<CultureType, CultureInfo> = {
  caring: {
    name: "Caring Culture",
    icon: "heart",
    description: "Your organization prioritizes the wellbeing and development of its people. There's a strong focus on collaboration, support, and creating an environment where employees feel valued and cared for. Decision-making often considers the human impact, and there's emphasis on work-life balance and personal growth.",
    strengths: [
      "High employee engagement and loyalty",
      "Strong team collaboration and support", 
      "Attracts and retains top talent",
      "Positive workplace relationships",
      "Strong emotional intelligence"
    ],
    growthAreas: [
      "May need more focus on performance metrics",
      "Could benefit from clearer goal setting",
      "Balance care with accountability",
      "Avoid decision paralysis from over-consultation"
    ],
    color: "text-red-500"
  },
  purpose: {
    name: "Purpose Culture",
    icon: "bullseye",
    description: "Your organization is driven by a strong mission and meaningful impact. Employees are motivated by contributing to something bigger than themselves, and decisions are made based on alignment with core values and purpose rather than just profit.",
    strengths: [
      "Strong employee motivation and engagement",
      "Clear direction and decision-making criteria",
      "Attracts mission-driven talent",
      "Sustainable long-term growth",
      "Strong brand reputation"
    ],
    growthAreas: [
      "May struggle with practical implementation",
      "Need to balance idealism with realism",
      "Ensure financial sustainability",
      "Avoid mission drift over time"
    ],
    color: "text-green-500"
  },
  learning: {
    name: "Learning Culture",
    icon: "graduation-cap",
    description: "Your organization thrives on continuous improvement, experimentation, and knowledge sharing. Mistakes are viewed as learning opportunities, and there's a strong emphasis on personal and professional development at all levels.",
    strengths: [
      "High adaptability and innovation",
      "Continuous skill development",
      "Resilience in face of challenges",
      "Knowledge sharing across teams",
      "Future-ready workforce"
    ],
    growthAreas: [
      "May over-analyze instead of taking action",
      "Need to balance learning with execution",
      "Avoid perfectionism paralysis",
      "Ensure learning translates to results"
    ],
    color: "text-blue-500"
  },
  enjoyment: {
    name: "Enjoyment Culture",
    icon: "smile",
    description: "Your organization creates a fun, energetic work environment where people genuinely enjoy coming to work. There's emphasis on celebration, creativity, and making work feel less like work and more like play.",
    strengths: [
      "High employee satisfaction",
      "Creative and innovative solutions",
      "Strong team bonding",
      "Attracts energetic talent",
      "Positive company reputation"
    ],
    growthAreas: [
      "May lack focus on serious issues",
      "Need structure for accountability",
      "Balance fun with productivity",
      "Ensure professionalism when needed"
    ],
    color: "text-yellow-500"
  },
  results: {
    name: "Results Culture",
    icon: "chart-line",
    description: "Your organization is laser-focused on achieving ambitious goals and delivering outstanding performance. Success is measured by metrics and outcomes, with a strong drive for excellence and competitive advantage.",
    strengths: [
      "High performance and productivity",
      "Clear accountability systems",
      "Strong competitive advantage",
      "Efficient resource allocation",
      "Achievement-oriented mindset"
    ],
    growthAreas: [
      "May sacrifice long-term for short-term gains",
      "Risk of employee burnout",
      "Need to balance results with relationships",
      "Ensure sustainable growth practices"
    ],
    color: "text-red-600"
  },
  authority: {
    name: "Authority Culture",
    icon: "crown",
    description: "Your organization operates with clear hierarchies and strong leadership direction. Decision-making flows from the top down, with well-defined roles and responsibilities throughout the organization.",
    strengths: [
      "Clear decision-making process",
      "Strong organizational alignment",
      "Efficient execution",
      "Clear career progression paths",
      "Crisis management capability"
    ],
    growthAreas: [
      "May limit innovation from lower levels",
      "Risk of disengaged employees",
      "Need more collaborative approaches",
      "Develop leadership at all levels"
    ],
    color: "text-purple-500"
  },
  safety: {
    name: "Safety Culture",
    icon: "shield-alt",
    description: "Your organization prioritizes risk management, stability, and security. There's careful planning, thorough risk assessment, and emphasis on creating a secure environment for employees and customers.",
    strengths: [
      "Strong risk management",
      "Stable and predictable environment",
      "High employee security",
      "Thorough planning processes",
      "Customer trust and confidence"
    ],
    growthAreas: [
      "May be slow to adapt to change",
      "Could miss opportunities due to caution",
      "Need to encourage calculated risks",
      "Balance safety with innovation"
    ],
    color: "text-green-600"
  },
  order: {
    name: "Order Culture",
    icon: "list",
    description: "Your organization values structure, processes, and systematic approaches. There are clear procedures for everything, with emphasis on consistency, reliability, and following established best practices.",
    strengths: [
      "Consistent quality and reliability",
      "Clear expectations and procedures",
      "Efficient operations",
      "Scalable systems",
      "Regulatory compliance"
    ],
    growthAreas: [
      "May resist necessary changes",
      "Could stifle creativity",
      "Need flexibility for innovation",
      "Balance structure with agility"
    ],
    color: "text-gray-600"
  }
};
