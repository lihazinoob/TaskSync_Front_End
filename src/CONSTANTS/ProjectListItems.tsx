export interface ProjectListDataType {
  id: string;
  slack:string;
  name: string;
  category: "Active" | "On Hold" | "Closed";
  techStack: "Website" | "Android" | "IOS" | "Flutter" | "React Native";
  WorkType: "UI Design" | "Development" | "All";
}

export const ProjectListItem: ProjectListDataType[] = [
  {
    id: "1",
    slack:"creativesynchub",
    name: "CreativeSync Hub",
    category: "Active",
    techStack: "Website",
    WorkType: "All",
  },
  {
    id: "2",
    slack:"projectflowpro",
    name: "ProjectFlow Pro",
    category: "Active",
    techStack: "Android",
    WorkType: "UI Design",
  },
  {
    id: "3",
    slack:"websyncapp",
    name: "WebSync App",
    category: "On Hold",
    techStack: "Website",
    WorkType: "Development",
  },
  {
    id: "4",
    slack:"blueprintnexus",
    name: "BluePrint Nexus",
    category: "On Hold",
    techStack: "IOS",
    WorkType: "UI Design",
  },
  {
    id: "5",
    slack:"visionplanpro",
    name: "VisionPlan Pro",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "Development",
  },
  {
    id: "6",
    slack:"App Development",
    name: "App Development",
    category: "Closed",
    techStack: "Android",
    WorkType: "All",
  },
  {
    id: "7",
    slack:"creativeboardcentral",
    name: "CreativeBoard Central",
    category: "Closed",
    techStack: "React Native",
    WorkType: "UI Design",
  },
  {
    id: "8",
    slack:"artisanlink",
    name: "ArtisanLink",
    category: "Closed",
    techStack: "Flutter",
    WorkType: "All",
  },
];
