import api from "@/Context/axios";
import { useState, useEffect } from "react";
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

// Define the Task type with additional fields
export interface Task {
  id: string;
  title: string;
  category: "Todo" | "In Progress" | "Completed";
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
  techStack: string;
  workType: string;
  tasks: Task[];
}

// Local store state
let projectList: ProjectListDataType[] = [];
let syncInterval: NodeJS.Timeout | null = null;

// Fetch Project from the backend
export const fetchProjects = async (): Promise<ProjectListDataType[]> => {
  try {
    const response = await api.get("/projects");
    projectList = response.data.data.map((project: any) => ({
      id: project.id.toString(),
      slack: project.slack,
      name: project.name,
      category: project.category,
      techStack: project.techStack,
      workType: project.workType,
      tasks: project.tasks.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        category: task.category,
        description: task.description || "",
        createdBy: task.created_by,
        assignees: task.assignees || [],
        timeline: task.timeline,
        status: task.status,
        subtasks: task.subtasks.map((subtask: any) => ({
          id: subtask.id.toString(),
          title: subtask.title,
          completed: subtask.completed,
        })),
      })),
    }));
    return projectList;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

// Create a Project
export const createProject = async (
  projectData: Omit<ProjectListDataType, "id" | "slack" | "tasks">
): Promise<ProjectListDataType> => {
  try {
    console.log("createProject function called");
    // Sending the data over the backend
    const response = await api.post("/createProject", {
      name: projectData.name,
      category: projectData.category,
      techStack: projectData.techStack,
      workType: projectData.workType,
    });

    const newProject = response.data.data;
    const projectToAdd: ProjectListDataType = {
      id: newProject.id.toString(),
      slack: newProject.slack,
      name: newProject.name,
      category: newProject.category,
      techStack: newProject.techStack,
      workType: newProject.workType,
      tasks: [],
    };
    projectList.push(projectToAdd); // Still update projectList for consistency
    return projectToAdd; // Return the new project
  } catch (error) {
    console.error("Failed to create a Project", error);
    throw error;
  }
};

// Create a Task
export const createTask = async (
  projectSlack: string,
  taskData: Omit<Task, "id" | "subtasks">
): Promise<void> => {
  console.log("createTask function called");
  // Finding the project according to the slack
  const project = projectList.find((p) => p.slack === projectSlack);

  if (!project) {
    throw new Error("Project Not Found");
  }

  try {
    const response = await api.post(`/projects/${project.id}/tasks`, {
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
      created_by: taskData.createdBy,
      assignees: taskData.assignees,
      timeline: taskData.timeline,
      status: taskData.status,
    });

    const newTask = response.data.data;
    project.tasks.push({
      id: newTask.id.toString(),
      title: newTask.title,
      category: newTask.category,
      description: newTask.description,
      createdBy: newTask.created_by,
      assignees: newTask.assignees,
      timeline: newTask.timeline,
      status: newTask.status,
      subtasks: [],
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

// Add a SubTask to a Task
export const addSubtaskToTask = async (
  projectSlack: string,
  taskId: string,
  newSubtask: Subtask
): Promise<void> => {
  const projectIndex = projectList.findIndex((p) => p.slack === projectSlack);
  if (projectIndex === -1) {
    throw new Error("Project Not Found");
  }
  const project = projectList[projectIndex];
  const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error("Task not Found");
  }

  try {
    const response = await api.post(`/tasks/${taskId}/subtasks`, {
      title: newSubtask.title,
    });

    const createdSubTask = response.data.data;
    projectList[projectIndex].tasks[taskIndex].subtasks.push({
      id: createdSubTask.id.toString(),
      title: createdSubTask.title,
      completed: createdSubTask.completed,
    });
  } catch (error) {
    console.error("Failed to add SubTask", error);
    throw error;
  }
};

// Fetch Project By slack
export const fetchProjectBySlack = (slack: string) => {
  return projectList.find((project) => project.slack === slack);
};

// create subTask completion status

export const updateSubTaskCompletionStatus = async (
  projectSlack: string,
  taskId: string,
  subTaskId: string,
  completed: boolean
): Promise<void> => {
  const projectIndex = projectList.findIndex((p) => p.slack === projectSlack);
  if (projectIndex === -1) throw new Error("Project not found");

  const project = projectList[projectIndex];
  const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) throw new Error("Task not found");

  const subTaskIndex = project.tasks[taskIndex].subtasks.findIndex(
    (s) => s.id === subTaskId
  );
  if (subTaskIndex === -1) throw new Error("Subtask not found");

  try {
    await api.patch(`/subtasks/${subTaskId}`, { completed });
    projectList[projectIndex].tasks[taskIndex].subtasks[
      subTaskIndex
    ].completed = completed;
  } catch (error) {
    console.error("Failed to update subtask:", error);
    throw error;
  }
};

// Sync local Store with backend

export const syncWithBackend = async (): Promise<void> => {
  try {
    const response = await api.get("/projects");
    projectList = response.data.data.map((project: any) => ({
      id: project.id.toString(),
      slack: project.slack,
      name: project.name,
      category: project.category,
      techStack: project.techStack,
      workType: project.workType,
      tasks: project.tasks.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        category: task.category,
        description: task.description || "",
        createdBy: task.created_by,
        assignees: task.assignees || [],
        timeline: task.timeline,
        status: task.status,
        subtasks: task.subtasks.map((subtask: any) => ({
          id: subtask.id.toString(),
          title: subtask.title,
          completed: subtask.completed,
        })),
      })),
    }));
  } catch (error) {
    console.error("Failed to sync with backend:", error);
  }
};

// Custom Hook to use the Project Store
export const useProjectStore = () => {

  const hookId = Math.random().toString(36).substring(2, 15);
  console.log(`useProjectStore instantiated, hookId: ${hookId}`);
  // const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<ProjectListDataType[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Function to add a new project and update state
  const addProject = async (
    projectData: Omit<ProjectListDataType, "id" | "slack" | "tasks">
  ) => {
    try {
      console.log(`addProject Function Called, hookId: ${hookId}`);

      const newProject = await createProject(projectData); // Get the new project
      console.log(`New project created, hookId: ${hookId}`, newProject);
      setProjects((prevProjects) => {
        
        const updatedProjects = [...prevProjects, newProject];
        console.log(`New projects state, hookId: ${hookId}:`, updatedProjects);
        return updatedProjects;
      });
      console.log(`After setProjects, hookId: ${hookId}`);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  };

  // Function to add a new task and update state
  const addTask = async (
    projectSlack: string,
    taskData: Omit<Task, "id" | "subtasks">
  ) => {
    try {
      console.log("addTask function called");
      await createTask(projectSlack, taskData);
      console.log("After await createTask"); // Updates projectList
      setProjects([...projectList]); // Update state to reflect projectList
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchProjects().then((fetchedProjects) => {
      setProjects(fetchedProjects);
    });

    // Periodic sync every 30 seconds
    syncInterval = setInterval(() => {
      if (Date.now() - lastUpdate < 5000) {
        console.log("Skipping sync due to recent update");
        return; // Skip sync if a project was added in the last 5 seconds
      }

      syncWithBackend().then(() => {
        setProjects([...projectList]);
      });
    }, 30000);

    // Clean up interval on unmount
    return () => {
      if (syncInterval) {
        clearInterval(syncInterval);
      }
    };
  }, []);

  return { projects, addProject, addTask };
};
