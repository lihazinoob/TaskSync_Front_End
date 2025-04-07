export interface Task {
  id: string;
  title: string;
  category: "Todo" | "In Progress" | "Completed";
}

export interface ProjectListDataType {
  id: string;
  slack: string;
  name: string;
  category: "Active" | "On Hold" | "Closed";
  techStack: "Website" | "Android" | "IOS" | "Flutter" | "React Native";
  WorkType: "UI Design" | "Development" | "All";
  tasks: Task[];
}

export const ProjectListItem: ProjectListDataType[] = [
  {
    id: "1",
    slack: "creativesynchub",
    name: "CreativeSync Hub",
    category: "Active",
    techStack: "Website",
    WorkType: "All",
    tasks: [
      { id: "1-1", title: "Design homepage layout", category: "Todo" },
      { id: "1-2", title: "Implement authentication", category: "In Progress" },
      { id: "1-3", title: "Set up project structure", category: "Completed" },
    ],
  },
  {
    id: "2",
    slack: "projectflowpro",
    name: "ProjectFlow Pro",
    category: "Active",
    techStack: "Android",
    WorkType: "UI Design",
    tasks: [
      { id: "2-1", title: "Create wireframes", category: "Todo" },
      { id: "2-2", title: "Design app icons", category: "In Progress" },
      { id: "2-3", title: "Finalize color scheme", category: "Completed" },
    ],
  },
  {
    id: "3",
    slack: "websyncapp",
    name: "WebSync App",
    category: "On Hold",
    techStack: "Website",
    WorkType: "Development",
    tasks: [
      { id: "3-1", title: "Fix API integration", category: "Todo" },
      { id: "3-2", title: "Optimize database queries", category: "Todo" },
      { id: "3-3", title: "Set up CI/CD pipeline", category: "Completed" },
    ],
  },
  {
    id: "4",
    slack: "blueprintnexus",
    name: "BluePrint Nexus",
    category: "On Hold",
    techStack: "IOS",
    WorkType: "UI Design",
    tasks: [
      { id: "4-1", title: "Design onboarding screens", category: "Todo" },
      { id: "4-2", title: "Create navigation flow", category: "Todo" },
      { id: "4-3", title: "Prototype UI components", category: "Completed" },
    ],
  },
  {
    id: "5",
    slack: "visionplanpro",
    name: "VisionPlan Pro",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "Development",
    tasks: [
      { id: "5-1", title: "Deploy to production", category: "Completed" },
      { id: "5-2", title: "Test payment gateway", category: "Completed" },
      { id: "5-3", title: "Write documentation", category: "Completed" },
    ],
  },
  {
    id: "6",
    slack: "App Development",
    name: "App Development",
    category: "Closed",
    techStack: "Android",
    WorkType: "All",
    tasks: [
      { id: "6-1", title: "Publish to Play Store", category: "Completed" },
      { id: "6-2", title: "Fix bugs in v1.0", category: "Completed" },
      { id: "6-3", title: "User testing", category: "Completed" },
    ],
  },
  {
    id: "7",
    slack: "creativeboardcentral",
    name: "CreativeBoard Central",
    category: "Closed",
    techStack: "React Native",
    WorkType: "UI Design",
    tasks: [
      { id: "7-1", title: "Design dashboard UI", category: "Completed" },
      { id: "7-2", title: "Create mockups", category: "Completed" },
      { id: "7-3", title: "User feedback session", category: "Completed" },
    ],
  },
  {
    id: "8",
    slack: "artisanlink",
    name: "ArtisanLink",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "All",
    tasks: [
      { id: "8-1", title: "Launch marketing site", category: "Completed" },
      { id: "8-2", title: "Integrate analytics", category: "Completed" },
      { id: "8-3", title: "Train support team", category: "Completed" },
    ],
  },
];
