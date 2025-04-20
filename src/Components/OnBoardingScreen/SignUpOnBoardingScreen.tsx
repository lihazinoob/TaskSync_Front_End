import CompanyLogo from "../../assets/CompanyLogo.svg";
import CheckMark from "../../assets/CheckMark.png"
export default function SignUpOnBoardingScreen() {
  return (
    <>
      <div className="fixed inset-0 bg-indigo-100 flex items-center justify-center">
        <div className="bg-slate-50 rounded-lg shadow-lg w-full mx-8 my-16 min-h-[calc(100vh-4rem)] py-12 px-8 flex flex-col items-center  text-center">
          {/* Company Logo */}
          <div className="flex items-center justify-start mb-4 gap-2">
            <img src={CompanyLogo} alt="" />
            <div className="text-2xl font-semibold">TaskSync</div>
          </div>

          {/* CheckMark */}
          <div className="mt-16 flex items-center justify-start flex-col">
            <img src={CheckMark} alt="" className="w-30 h-30" />
            <div className="mt-8 text-xl font-semibold text-slate-800">
              Account Created Successfully!!
            </div>
            <div className="mt-2 text-base tracking-wide text-slate-600">
              Welcome aboard! Start your success journey with TaskSync.
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
