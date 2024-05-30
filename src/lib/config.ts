import { Circle, LucideIcon } from "lucide-react";

const contractPerNetwork = {
  mainnet: "hello.near-examples.near",
  testnet: "courch1.testnet",
};

export type Category = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    value: "web development",
    label: "Web Development",
    icon: Circle,
  },
  {
    value: "blockchain",
    label: "Blockchain",
    icon: Circle,
  },
  {
    value: "cloud computing",
    label: "Cloud Computing",
    icon: Circle,
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
    icon: Circle,
  },
  {
    value: "artificial intelligence",
    label: "Artificial Intelligence",
    icon: Circle,
  },
  {
    value: "machine learning",
    label: "Machine Learning",
    icon: Circle,
  },
  {
    value: "software development",
    label: "Software Development",
    icon: Circle,
  },
  {
    value: "game development",
    label: "Game Development",
    icon: Circle,
  },
  {
    value: "mobile development",
    label: "Mobile Development",
    icon: Circle,
  },
  {
    value: "data science",
    label: "Data Science",
    icon: Circle,
  },
  {
    value: "design",
    label: "Design",
    icon: Circle,
  },
];

export const levels = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

export const NetworkId = "testnet";
export const CONTRACTID = contractPerNetwork[NetworkId];
export const COURSE_ENROLLMENT_FEE_PERCENTAGE = 10;
export const COURSE_CREATION_FEE_PERCENTAGE = 10;
