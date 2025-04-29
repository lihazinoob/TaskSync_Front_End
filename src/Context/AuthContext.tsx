import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import api, { setAccessToken } from "../Context/axios";

interface User {
  username: string;
  profile_picture: string;
}
interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  user: User | null;
}

// Creating the context first

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creating the Context Provider

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // In memory State to store the user data
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch the user data from the backend
  async function fetchUserData(token:string) {
    try {
      console.log("accessToken",token);
      setAccessToken(token);
      // Fetching the data from the API endpoint
      const { data } = await api.get("/userData");
      console.log("data is",data);
      setUser({
        username: data.userInfo.name,
        profile_picture: data.userInfo.profile_picture,
      });
      console.log("User Data is Fetched", user);
    } catch (error) {
      console.log("Failed to fetch the user data",error);
      setUser(null);
    }
  }

  // When the browser is refreshed we need to lokk for the refresh token

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await api.post("/refresh");
        setAccessTokenState(data.access_token);
        setAccessToken(data.access_token);
        setIsAuthenticated(true);
        await fetchUserData(data.access_token);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    initializeAuth();
  }, []);

  const login = async (token: string) => {
    // The Access tokens are set to the in memory state instead of local storage
    setAccessTokenState(token);
    // setAccessToken(token);
    setIsAuthenticated(true);
    // calling a function to fecth the user data
    await fetchUserData(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Wrapper function to use AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
