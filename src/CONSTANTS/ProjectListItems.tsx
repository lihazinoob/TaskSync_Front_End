export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

// Define the Task type with additional fields
export interface Task {
  id: string;
  title: string;
  category: "Todo" | "In Progress" | "In Review" | "Completed";
  description: string;
  createdBy: string;
  assignees: string[];
  timeline: { start: string; end: string };
  status: string;
  subtasks: Subtask[];
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
      {
        id: "1-1",
        title: "UX Research",
        category: "Todo",
        description:
          "Overall UX process of full product for first version. Create overall UX process of full product include user personas, sitemap, information architecture, user flow and mindmap for our client to show research process and accurate results.",
        createdBy: "Heman Lon",
        assignees: ["Kalon Arm", "Mally Mile"],
        timeline: { start: "Jan 3, 2024", end: "Apr 4, 2024" },
        status: "To Do",
        subtasks: [
          { id: "1-1-1", title: "Primary Research", completed: true },
          { id: "1-1-2", title: "User Persona", completed: false },
          { id: "1-1-3", title: "Sitemap", completed: false },
        ],
      },
      {
        id: "1-2",
        title: "Requirement Gathering",
        category: "In Progress",
        description: "Collect all details from client regarding the project.",
        createdBy: "Heman Lon",
        assignees: ["Kalon Arm"],
        timeline: { start: "Jan 5, 2024", end: "Apr 10, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "1-2-1", title: "Client Meeting", completed: true },
          { id: "1-2-2", title: "Document Requirements", completed: false },
        ],
      },
      {
        id: "1-3",
        title: "Test login flow",
        category: "In Progress",
        description: "Test the login flow for the CreativeSync Hub app.",
        createdBy: "Heman Lon",
        assignees: ["Mally Mile"],
        timeline: { start: "Jan 10, 2024", end: "Apr 15, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "1-3-1", title: "Test OAuth", completed: false },
          { id: "1-3-2", title: "Fix Bugs", completed: false },
        ],
      },
      {
        id: "1-4",
        title: "Set up project structure",
        category: "Completed",
        description:
          "Set up the initial project structure for CreativeSync Hub.",
        createdBy: "Heman Lon",
        assignees: ["Kalon Arm"],
        timeline: { start: "Jan 1, 2024", end: "Jan 5, 2024" },
        status: "Completed",
        subtasks: [
          { id: "1-4-1", title: "Initialize Repo", completed: true },
          { id: "1-4-2", title: "Set Up CI/CD", completed: true },
        ],
      },
    ],
  },
  // Add similar updates for other projects as needed
  {
    id: "2",
    slack: "projectflowpro",
    name: "ProjectFlow Pro",
    category: "Active",
    techStack: "Android",
    WorkType: "UI Design",
    tasks: [
      {
        id: "2-1",
        title: "Create wireframes",
        category: "Todo",
        description: "Create wireframes for the ProjectFlow Pro app.",
        createdBy: "Heman Lon",
        assignees: ["Kalon Arm"],
        timeline: { start: "Jan 5, 2024", end: "Apr 10, 2024" },
        status: "To Do",
        subtasks: [
          { id: "2-1-1", title: "Homepage Wireframe", completed: false },
          { id: "2-1-2", title: "Settings Wireframe", completed: false },
        ],
      },
      {
        id: "2-2",
        title: "Design app icons",
        category: "In Progress",
        description: "Design app icons for ProjectFlow Pro.",
        createdBy: "Heman Lon",
        assignees: ["Mally Mile"],
        timeline: { start: "Jan 10, 2024", end: "Apr 15, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "2-2-1", title: "Draft Icons", completed: true },
          { id: "2-2-2", title: "Finalize Icons", completed: false },
        ],
      },
      {
        id: "2-3",
        title: "Review icon designs",
        category: "In Progress",
        description: "Review the icon designs for ProjectFlow Pro.",
        createdBy: "Heman Lon",
        assignees: ["Kalon Arm"],
        timeline: { start: "Jan 15, 2024", end: "Apr 20, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "2-3-1", title: "Client Feedback", completed: false },
          { id: "2-3-2", title: "Revise Designs", completed: false },
        ],
      },
      {
        id: "2-4",
        title: "Finalize color scheme",
        category: "Completed",
        description: "Finalize the color scheme for ProjectFlow Pro.",
        createdBy: "Heman Lon",
        assignees: ["Mally Mile"],
        timeline: { start: "Jan 1, 2024", end: "Jan 5, 2024" },
        status: "Completed",
        subtasks: [
          { id: "2-4-1", title: "Select Colors", completed: true },
          { id: "2-4-2", title: "Apply Colors", completed: true },
        ],
      },
    ],
  },
  {
    id: "3",
    slack: "devsyncplus",
    name: "DevSync Plus",
    category: "On Hold",
    techStack: "Flutter",
    WorkType: "Development",
    tasks: [
      {
        id: "3-1",
        title: "Set up Firebase",
        category: "Todo",
        description: "Integrate Firebase for authentication and database.",
        createdBy: "Sara Lee",
        assignees: ["John Doe"],
        timeline: { start: "Feb 1, 2024", end: "Mar 1, 2024" },
        status: "To Do",
        subtasks: [
          { id: "3-1-1", title: "Create Firebase Project", completed: false },
          { id: "3-1-2", title: "Enable Auth", completed: false },
        ],
      },
      {
        id: "3-2",
        title: "Prototype screens",
        category: "Completed",
        description: "Design prototype screens using Figma.",
        createdBy: "Sara Lee",
        assignees: ["John Doe", "Maya Jin"],
        timeline: { start: "Jan 5, 2024", end: "Jan 20, 2024" },
        status: "Completed",
        subtasks: [
          { id: "3-2-1", title: "Login Screen", completed: true },
          { id: "3-2-2", title: "Dashboard", completed: true },
        ],
      },
    ],
  },
  {
    id: "4",
    slack: "mobileconnect",
    name: "MobileConnect",
    category: "Active",
    techStack: "React Native",
    WorkType: "All",
    tasks: [
      {
        id: "4-1",
        title: "Implement push notifications",
        category: "In Progress",
        description: "Add and test push notification system.",
        createdBy: "Ivy Lane",
        assignees: ["Maya Jin"],
        timeline: { start: "Mar 1, 2024", end: "Mar 15, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "4-1-1", title: "Setup FCM", completed: true },
          { id: "4-1-2", title: "Integrate with frontend", completed: false },
        ],
      },
    ],
  },
  {
    id: "5",
    slack: "taskmasterpro",
    name: "TaskMaster Pro",
    category: "Closed",
    techStack: "Website",
    WorkType: "UI Design",
    tasks: [
      {
        id: "5-1",
        title: "Create style guide",
        category: "Completed",
        description: "Establish brand colors, typography, and components.",
        createdBy: "Ava Smith",
        assignees: ["Kalon Arm"],
        timeline: { start: "Dec 1, 2023", end: "Dec 15, 2023" },
        status: "Completed",
        subtasks: [
          { id: "5-1-1", title: "Choose Font", completed: true },
          { id: "5-1-2", title: "Define Color Palette", completed: true },
        ],
      },
    ],
  },
  {
    id: "6",
    slack: "shopxpress",
    name: "ShopXpress",
    category: "Active",
    techStack: "IOS",
    WorkType: "Development",
    tasks: [
      {
        id: "6-1",
        title: "Setup payment gateway",
        category: "Todo",
        description: "Integrate Stripe payment gateway for IOS app.",
        createdBy: "Mason Roy",
        assignees: ["Lily Tan"],
        timeline: { start: "Mar 10, 2024", end: "Apr 5, 2024" },
        status: "To Do",
        subtasks: [
          { id: "6-1-1", title: "Stripe Sandbox Setup", completed: false },
          { id: "6-1-2", title: "UI Integration", completed: false },
        ],
      },
    ],
  },
  {
    id: "7",
    slack: "eventifyhub",
    name: "Eventify Hub",
    category: "On Hold",
    techStack: "Android",
    WorkType: "All",
    tasks: [
      {
        id: "7-1",
        title: "Calendar Integration",
        category: "In Progress",
        description: "Add Google Calendar sync feature.",
        createdBy: "Nina Kim",
        assignees: ["Jake Yin"],
        timeline: { start: "Feb 10, 2024", end: "Mar 10, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "7-1-1", title: "Google API Setup", completed: true },
          { id: "7-1-2", title: "Sync Events", completed: false },
        ],
      },
    ],
  },
  {
    id: "8",
    slack: "mediplan",
    name: "MediPlan",
    category: "Active",
    techStack: "Website",
    WorkType: "Development",
    tasks: [
      {
        id: "8-1",
        title: "Build appointment booking UI",
        category: "Todo",
        description: "Create appointment booking frontend components.",
        createdBy: "Oliver Diaz",
        assignees: ["Maya Jin"],
        timeline: { start: "Mar 20, 2024", end: "Apr 20, 2024" },
        status: "To Do",
        subtasks: [
          { id: "8-1-1", title: "Booking Form", completed: false },
          { id: "8-1-2", title: "Doctor Availability", completed: false },
        ],
      },
    ],
  },
  {
    id: "9",
    slack: "bloglaunchpad",
    name: "Blog Launchpad",
    category: "Closed",
    techStack: "Website",
    WorkType: "UI Design",
    tasks: [
      {
        id: "9-1",
        title: "Design blog layout",
        category: "Completed",
        description: "Create responsive layout for blog posts.",
        createdBy: "Zara Wills",
        assignees: ["Kalon Arm"],
        timeline: { start: "Dec 5, 2023", end: "Dec 20, 2023" },
        status: "Completed",
        subtasks: [
          { id: "9-1-1", title: "Header/Footer", completed: true },
          { id: "9-1-2", title: "Blog Cards", completed: true },
        ],
      },
    ],
  },
  {
    id: "10",
    slack: "learnhub",
    name: "LearnHub",
    category: "Active",
    techStack: "React Native",
    WorkType: "All",
    tasks: [
      {
        id: "10-1",
        title: "Quiz Module",
        category: "In Review",
        description: "Develop and review quiz feature.",
        createdBy: "Tina Ross",
        assignees: ["Mason Roy"],
        timeline: { start: "Feb 20, 2024", end: "Mar 25, 2024" },
        status: "In Review",
        subtasks: [
          { id: "10-1-1", title: "Question Form", completed: true },
          { id: "10-1-2", title: "Review UX", completed: false },
        ],
      },
    ],
  },
  {
    id: "11",
    slack: "newsly",
    name: "Newsly",
    category: "Active",
    techStack: "IOS",
    WorkType: "UI Design",
    tasks: [
      {
        id: "11-1",
        title: "Reader mode design",
        category: "Todo",
        description: "Design a distraction-free reader mode.",
        createdBy: "Ivy Lane",
        assignees: ["Lily Tan"],
        timeline: { start: "Apr 1, 2024", end: "Apr 30, 2024" },
        status: "To Do",
        subtasks: [
          { id: "11-1-1", title: "Typography", completed: false },
          { id: "11-1-2", title: "Dark Mode", completed: false },
        ],
      },
    ],
  },
  {
    id: "12",
    slack: "trackerx",
    name: "TrackerX",
    category: "On Hold",
    techStack: "Flutter",
    WorkType: "Development",
    tasks: [
      {
        id: "12-1",
        title: "Bug tracking module",
        category: "In Progress",
        description: "Create module to track bugs and logs.",
        createdBy: "Zara Wills",
        assignees: ["John Doe"],
        timeline: { start: "Feb 15, 2024", end: "Mar 30, 2024" },
        status: "In Progress",
        subtasks: [
          { id: "12-1-1", title: "Create Tracker UI", completed: true },
          { id: "12-1-2", title: "Logging API", completed: false },
        ],
      },
    ],
  },
];

export const fetchProjectBySlack = (slack: string) => {
  return ProjectListItem.find((project) => project.slack === slack);
};

// Function to add a subtask to a task (simulates a PATCH request)
export const addSubtaskToTask = (
  projectSlack: string,
  taskId: string,
  newSubtask: Subtask
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const projectIndex = ProjectListItem.findIndex(
      (p) => p.slack === projectSlack
    );
    if (projectIndex === -1) {
      reject(new Error("Project not found"));
      return;
    }

    const project = ProjectListItem[projectIndex];
    const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      reject(new Error("Task not found"));
      return;
    }

    // Update the mock data
    ProjectListItem[projectIndex].tasks[taskIndex].subtasks.push(newSubtask);

    // Simulate a backend API call (e.g., to a database)
    setTimeout(() => {
      console.log(`Added subtask to task ${taskId} in project ${projectSlack}`);
      resolve();
    }, 500); // Simulate network delay
  });
};

// Function to update a subtask's completion status

export const updateSubTaskCompletionStatus = (
  projectSlack:string,
  taskId:string,
  subTaskId:string,
  completed:boolean
):Promise<void> =>{
  return new Promise((resolve,reject)=>{
    const projectIndex = ProjectListItem.findIndex((project)=>{
      project.slack === projectSlack
    });
    // If there is no related project accroding to the slack,reject it
    if(projectIndex === -1)
    {
      reject(new Error("There is no project related to the slack"));
      return;
    }
    else
    {
      const project = ProjectListItem[projectIndex];
      const taskIndex = project.tasks.findIndex((task)=>{
        task.id === taskId
      });
      if(taskIndex === -1)
      {
        reject(new Error("There is no relatd task in the project"));
        return;
      }
      else
      {
        const subTaskIndex = project.tasks[taskIndex].subtasks.findIndex((sub)=>{
          sub.id === subTaskId
        });
        if (subTaskIndex === -1) {
          reject(new Error("Subtask not found"));
          return;
        }
        else{
          // The finding is done, now update

          ProjectListItem[projectIndex].tasks[taskIndex].subtasks[subTaskIndex].completed = completed;

          setTimeout(() => {
            console.log(
              `Updated subtask ${subTaskId} in task ${taskId} in project ${projectSlack} to completed: ${completed}`
            );
            resolve();
          }, 500);
        }
      }
    }


  });
}
