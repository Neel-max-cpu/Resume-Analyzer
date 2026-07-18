import {
  BadgeCheck,
  CircleAlert,
  CircleCheck,
  CircleX,
  FileText,
  MapPin,
  Zap,
} from "lucide-react";
import { TbBriefcase2 } from "react-icons/tb";

export const exportInfo = [
  {
    id: 1,
    icon: MapPin,
    title: "CONTEXTUAL MATCHING",
    desc: "Moves beyond keywords to understand sematic alignment between roles and experience.",
  },
  {
    id: 2,
    icon: BadgeCheck,
    title: "BIAS REDUCTION",
    desc: "Algorithmically audited to ensure fair evaluation across all demographic profiles.",
  },
  {
    id: 3,
    icon: Zap,
    title: "INSTANT INSIGHST",
    desc: "Generates summary and reports based on matching result.",
  },
];

export const shortInfo = [
  {
    id: 1,
    icon: FileText,
    title: "Analyzed Resume",
    fileName: "v1.2 final.pdf",
    desc: "Experienced Senior Software Engineer with 8+ years in full-stack development, specialized in React, Node.js, and cloud architecture.",
  },
  {
    id: 2,
    icon: TbBriefcase2,
    title: "Job Description",
    fileName: "",
    desc: "Seeking a Lead Software Engineer to drive our cloud migration strategy using AWS and Kubernetes. Experience with distributed systems required...",
  },
];

export const matchingSkill = [
  {
    id: 1,
    star: true,
    name: "React.js",
  },
  {
    id: 2,
    star: false,
    name: "Node.js",
  },
  {
    id: 3,
    star: true,
    name: "AWS Architecture",
  },
  {
    id: 4,
    star: false,
    name: "Distributed System",
  },
  {
    id: 5,
    star: false,
    name: "TypeScript",
  },
  {
    id: 6,
    star: false,
    name: "PostgreSQL",
  },
  {
    id: 7,
    star: false,
    name: "CI/CD Pipelines",
  },
  {
    id: 8,
    star: false,
    name: "Docker",
  },
  {
    id: 9,
    star: false,
    name: "Rest API",
  },
];

export const missingSkill = [
  {
    id: 1,
    star: true,
    name: "Kubernetes",
  },
  {
    id: 2,
    star: false,
    name: "Teraform",
  },
  {
    id: 3,
    star: false,
    name: "Go Lang",
  },
];

export const insights = [
  {
    id: 1,
    icon: CircleCheck,
    rowBg: "bg-blue-100",
    iconBg: "bg-green-200",
    iconColor: "text-[#059669]",
    title: "Strong React Experience",
    desc: "Extensive 6-year history with complex state managment and performance optimization in large scale applications.",
  },
  {
    id: 2,
    icon: CircleAlert,
    rowBg: "bg-orange-100",
    iconBg: "bg-orange-200",
    iconColor: "text-yellow-600",
    title: "Missing AWS/Docker Knowledge",
    desc: "Limited exposure to deployment pipelines and containerization required for our full-stack autonomy model.",
  },
  {
    id: 3,
    icon: CircleX,
    rowBg: "bg-red-100",
    iconBg: "bg-red-200",
    iconColor: "text-red-600",
    title: "Experience",
    desc: "Doesn't have 10yr of experience leading a team.",
  },
];

export const fitPercent = [
  {
    id: 1,
    color: "bg-orange-500",
    title: "Technical Fit",
    percentage: 74,
  },
  {
    id: 2,
    color: "bg-emerald-600",
    title: "Cultural Alignment",
    percentage: 92,
  },
  {
    id: 3,
    color: "bg-blue-600",
    title: "Domain Knowledge",
    percentage: 68,
  },
];
