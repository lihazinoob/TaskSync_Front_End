import AuthImage from "@/Components/Auth/AuthImage";
import AuthBody from "@/Components/Auth/AuthBody";
export default function AuthLayout()
{
  return(
    <>
      <div className="h-screen bg-slate-100 flex flex-row px-16 py-8">
        {/* Image Container of the SignUp Page */}
        <div className="flex-1/2">
          <AuthImage/>
        </div>
        <div className="flex-1/2">
          <AuthBody/>
        </div>
      </div>
      

    </>
  );
}