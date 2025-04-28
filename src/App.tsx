import { AuthProvider } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
// import { ProjectStoreProvider } from "./Context/ProjectStoreContext";
function App() {
  return (
    <>
      <AuthProvider>
        {/* <ProjectStoreProvider> */}
          <RouterProvider router={router} />
        {/* </ProjectStoreProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;
