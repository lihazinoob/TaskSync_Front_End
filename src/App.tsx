import { AuthProvider } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
