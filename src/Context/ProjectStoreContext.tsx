import { createContext, useContext, ReactNode } from "react";
import { useProjectStore } from "@/CONSTANTS/ProjectListItems";

const ProjectStoreContext = createContext<ReturnType<typeof useProjectStore> | null>(null);

export const ProjectStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useProjectStore();
  return (
    <ProjectStoreContext.Provider value={store}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

export const useProjectStoreContext = () => {
  const context = useContext(ProjectStoreContext);
  if (!context) {
    throw new Error("useProjectStoreContext must be used within a ProjectStoreProvider");
  }
  return context;
};