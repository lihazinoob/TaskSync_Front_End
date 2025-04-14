import { ReactNode, createContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../Context/axios";
interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
}

// Creating the context first

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creating the Context Provider

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // When the browser is refreshed we need to lokk for the refresh token

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await api.post("/refresh");
        setAccessTokenState(data.access_token);
        setAccessToken(data.access_token);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    initializeAuth();
  }, []);
};
