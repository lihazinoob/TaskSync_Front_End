import NotificationLayer from "@/Components/Notification/NotificationLayer";
import { ProjectStoreProvider } from "@/Context/ProjectStoreContext";
function DashBoardPage() {
  return (
    <>
      <ProjectStoreProvider>
        <div>
          This is the dashboard page of a user
          <NotificationLayer />
        </div>
      </ProjectStoreProvider>
    </>
  );
}
export default DashBoardPage;
