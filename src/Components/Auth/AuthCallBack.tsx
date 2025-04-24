import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@/Context/axios";
import { useAuth } from "@/Context/AuthContext";

export default function AuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    console.log('AuthCallback - OAuth Code:', code, 'State:', state);

    if (code) {
      const handleCallback = async () => {
        try {
          const { data } = await api.get("/auth/github/callback", {
            params: { code },
          });
          console.log('GitHub Callback Response:', data);
          login(data.access_token);

          if (state === 'login') {
            console.log('Navigating to dashboard...');
            navigate('/', { replace: true });
          } else {
            console.log('Navigating to register to trigger onboarding...');
            navigate('/register?onboarding=true', { replace: true });
          }
        } catch (err: any) {
          console.error('Callback Error:', err);
          navigate("/login", { 
            state: { error: "GitHub authentication failed" },
            replace: true 
          });
        }
      };
      handleCallback();
    } else {
      console.log('No OAuth code found in URL');
      navigate("/login", { replace: true });
    }
  }, [login, navigate, location]);

  return <div>Loading...</div>;
}