export interface ProjectListDataType {
  id: string;
  name: string;
  category: "Active" | "On Hold" | "Closed";
  techStack: "Website" | "Android" | "IOS" | "Flutter" | "React Native";
  WorkType: "UI Design" | "Development" | "All";
}

export const ProjectListItem: ProjectListDataType[] = [
  {
    id: "1",
    name: "CreativeSync Hub",
    category: "Active",
    techStack: "Website",
    WorkType: "All",
  },
  {
    id: "2",
    name: "ProjectFlow Pro",
    category: "Active",
    techStack: "Android",
    WorkType: "UI Design",
  },
  {
    id: "3",
    name: "WebSync App",
    category: "On Hold",
    techStack: "Website",
    WorkType: "Development",
  },
  {
    id: "4",
    name: "BluePrint Nexus",
    category: "On Hold",
    techStack: "IOS",
    WorkType: "UI Design",
  },
  {
    id: "5",
    name: "VisionPlan Pro",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "Development",
  },
  {
    id: "6",
    name: "App Development",
    category: "Closed",
    techStack: "Android",
    WorkType: "All",
  },
  {
    id: "7",
    name: "CreativeBoard Central",
    category: "Closed",
    techStack: "React Native",
    WorkType: "UI Design",
  },
  {
    id: "8",
    name: "ArtisanLink",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "All",
  },
];
