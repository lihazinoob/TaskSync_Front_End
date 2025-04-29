import AuthImage from "@/Components/Auth/AuthImage";
import AuthBody from "@/Components/Auth/AuthBody";

export interface AuthLayoutProps{
  triggerOnBoarding: ()=>void
}

export default function AuthLayout({triggerOnBoarding}:AuthLayoutProps)
{
  return(
    <>
      <div className="min-h-screen bg-slate-100 flex flex-row px-16 py-4">
        {/* Image Container of the SignUp Page */}
        <div className="flex-1/2">
          <AuthImage/>
        </div>
        <div className="flex-1/2">
          <AuthBody triggerOnBoarding = {triggerOnBoarding}/>
        </div>
      </div>
      

    </>
  );
}