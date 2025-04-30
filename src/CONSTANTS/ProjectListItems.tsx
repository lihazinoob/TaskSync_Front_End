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

// Interface for the data type User
export interface User {
  id: string;
  name: string;
  profile_picture: string | null;
}

// Data type for notification
export interface Notification {
  id: number;
  user_id: number;
  project_id: number;
  type: string;
  message: string;
  // If the message has been read or not
  read: boolean;
  // The Status of the related project. If not then it will be null
  related_Project_Status: string | null;
}

// Local store state
let projectList: ProjectListDataType[] = [];
let syncInterval: NodeJS.Timeout | null = null;
let notificationList: Notification[] = [];

// Function to fetch all the users
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/allUserData");
    return response.data.users.map((user: any) => ({
      // Transfroming all the element of the response array
      id: user.id.toString(),
      name: user.name,
      profile_picture: user.profile_picture || null,
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// Function to communicate with backend for inviting a user
export const inviteUser = async (
  projectIDstring: string | undefined,
  userID: string
): Promise<void> => {
  try {
    console.log("The ProjectID", projectIDstring);
    console.log("The userID", userID);
    const projectID = Number(projectIDstring);
    const response = await api.post(`/projects/${projectID}/invite`, {
      user_id: userID,
    });
    console.log("Response from inviteUser function", response.data);
  } catch (error) {
    console.log("An unnecessary error occured");
  }
};

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
    // console.log("createProject function called");
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
): Promise<Task> => {
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
    const taskToAdd: Task = {
      id: newTask.id.toString(),
      title: newTask.title,
      category: newTask.category,
      description: newTask.description,
      createdBy: newTask.created_by,
      assignees: newTask.assignees,
      timeline: newTask.timeline,
      status: newTask.status,
      subtasks: [],
    };
    project.tasks.push(taskToAdd);
    return taskToAdd;
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
): Promise<Subtask> => {
  // Finding the cuurentProject by slack
  const currentProject = projectList.find((p) => p.slack === projectSlack);
  if (!currentProject) {
    throw new Error("Project Not Found");
  }
  // Finding the task of the subtask by using taskId
  const task = currentProject.tasks.find((task) => task.id === taskId);
  if (!task) {
    throw new Error("Task Not Found");
  }
  try {
    const requestBody = {
      title: newSubtask.title,
      completed: newSubtask.completed,
    };
    console.log(
      "addSubtaskToTask: Sending request to:",
      `/tasks/${taskId}/subtasks`,
      requestBody
    );
    const response = await api.post(`/tasks/${taskId}/subtasks`, {
      title: newSubtask.title,
    });
    const createdSubTask: Subtask = {
      id: response.data.data.id.toString(),
      title: response.data.data.title,
      completed: response.data.data.completed,
    };
    task.subtasks.push(createdSubTask);
    return createdSubTask;
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
  // finding the project and task in which the subtask resides in
  const project = projectList.find((p) => p.slack === projectSlack);
  if (!project) {
    throw new Error("Project not found");
  }
  const task = project.tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) throw new Error("Task not found");

  const subTaskIndex = project.tasks[taskIndex].subtasks.findIndex(
    (s) => s.id === subTaskId
  );
  if (subTaskIndex === -1) throw new Error("Subtask not found");

  try {
    await api.patch(`/subtasks/${subTaskId}`, { completed });

    // Finding the subtask
    const subtask = task.subtasks.find((s) => s.id === subTaskId);

    if (subtask) {
      subtask.completed = completed;
    }
  } catch (error) {
    console.error("Failed to update subtask:", error);
    throw error;
  }
};

// Function that communicates with backend to fetch the notifications
export const fetchNotificationfromBackend = async (): Promise<
  Notification[]
> => {
  try {
    const response = await api.get("/fetchAllNotifications");
    notificationList = response.data.notifications.map((notification: any) => ({
      id: notification.id,
      user_id: notification.user_id,
      project_id: notification.project_id,
      type: notification.type,
      message: notification.message,
      read: notification.read,
      related_Project_Status: notification.status,
    }));
    return notificationList;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

// Function that communicates with backend for accepting the project invitation
export const acceptInvitation = async (
  userID: number,
  projectID: number
): Promise<void> => {
  try {
    
    const response = await api.post("/projects/accept-invitation", {
      user_id: userID,
      project_id: projectID,
    });
    console.log('Invitation accepted:', response.data.message);
  } catch (error) {
    console.error("Failed to accept invitation:", error);
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
  // const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<ProjectListDataType[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [notification, setNotification] = useState<Notification[]>([]);

  // Function to add a new project and update state
  const addProject = async (
    projectData: Omit<ProjectListDataType, "id" | "slack" | "tasks">
  ) => {
    try {
      const newProject = await createProject(projectData); // Get the new project
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects, newProject];
        return updatedProjects;
      });
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
      const newTask = await createTask(projectSlack, taskData);
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.map((project) =>
          project.slack === projectSlack
            ? { ...project, tasks: [...project.tasks, newTask] }
            : project
        );
        console.log("Updated projects with new task:", updatedProjects);
        return updatedProjects;
      });
      console.log("After await createTask"); // Updates projectList
      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  // Wrapper Function to handle the SubTask Addition
  const addSubTask = async (
    projectSlack: string,
    taskId: string,
    newSubtask: Subtask
  ) => {
    try {
      const createdSubtask = await addSubtaskToTask(
        projectSlack,
        taskId,
        newSubtask
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.slack === projectSlack
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId
                    ? { ...task, subtasks: [...task.subtasks, createdSubtask] }
                    : task
                ),
              }
            : project
        )
      );
      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Error adding subtask:", error);
      throw error;
    }
  };

  // Wrapper Function to toggle the completion status
  const toggleSubTaskCompletionStatus = async (
    projectSlack: string,
    taskId: string,
    subTaskId: string,
    completed: boolean
  ) => {
    try {
      await updateSubTaskCompletionStatus(
        projectSlack,
        taskId,
        subTaskId,
        completed
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.slack === projectSlack
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                          subtask.id === subTaskId
                            ? { ...subtask, completed }
                            : subtask
                        ),
                      }
                    : task
                ),
              }
            : project
        )
      );

      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Error toggling subtask:", error);
      throw error;
    }
  };

  // Wrapper Function to fetch the notifications of a user
  const showNotifications = async () => {
    console.log("Inside the wrapper function of notification fetching");
    try {
      const notificationData = await fetchNotificationfromBackend();
      console.log(notificationData);
      setNotification(notificationData);
    } catch (error) {
      console.error("Error toggling subtask:", error);
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

  return {
    projects,
    addProject,
    addTask,
    addSubTask,
    toggleSubTaskCompletionStatus,
    notification,
    showNotifications,
  };
};
