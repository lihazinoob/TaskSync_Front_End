import SignUpPhoto from "../../assets/SignUpPhoto.jpg";

export default function AuthImage() {
  return (
    <div
      className="w-3/4 ml-8 h-full max-h-screen  rounded-2xl"
      style={{
        backgroundImage: `url(${SignUpPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Add your text content here */}
      <div className="text-white  flex flex-col items-center justify-between h-full">
        {/* Header */}
        <div className="flex flex-col items-center justify-center">
          <div className="mt-20 text-3xl tracking-widest">
            Welcome to TaskSync
          </div>
          <div className="mt-2 text-sm items-center">
            Your Gateway to Effortless Management
          </div>
        </div>
        {/* Footer */}
        <div className="mb-32 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold tracking-wider">
            Seamless Collaboration
          </div>
          <div className="mt-4">
            Effortlessly work together with your team 
          </div>
          <div>
          in real time
          </div>
        </div>
      </div>
    </div>
  );
}
