import CompanyLogo from "@/assets/CompanyLogo.svg";
import { SideBarLinks } from "@/CONSTANTS/SideBarMenuLinks";
import { NavLink } from "react-router-dom";
import IconToopTipWrapper from "./IconToolTipWrapper";
import { Search } from "lucide-react";

interface SideBarProps {
  isMobile: boolean;
}

const SideBar = ({ isMobile = false }: SideBarProps) => {
  // Mock user data (replace with actual user data from context/auth)
  const user = {
    profileImage: "https://example.com/user-profile.jpg", // Replace with actual URL
    name: "Naveed",
  };

  return (
    <div
      className={`h-full flex flex-col items-center ${
        isMobile ? "flex-row justify-around py-2" : "flex-col mt-6"
      }`}
    >
      {/* Logo Holder */}
      {!isMobile && (
        <div>
          <img src={CompanyLogo} alt="Company_Logo" />
        </div>
      )}

      {/* Menu Item Holder */}
      <div
        className={`flex ${
          isMobile ? "flex-row space-x-4" : "flex-col mt-20 space-y-8"
        }`}
      >
        {SideBarLinks.map((menuItem, index) => (
          <IconToopTipWrapper key={index} label={menuItem.label}>
            <NavLink to={menuItem.path}
            end={menuItem.path === "/dashboard"}
            className={({isActive}) => 
            `flex items-center justify-center rounded-4xl p-2 transition-colors
            ${isActive ? 'bg-black border text-white':'hover:bg-gray-200'}
            `
          }
            >
              <menuItem.icon className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
            </NavLink>
          </IconToopTipWrapper>
        ))}
      </div>

      {/* Search Icon and profile Avatar holder */}
      <div
        className={`flex ${
          isMobile ? "flex-row space-x-6" : "flex-col mt-20 space-y-8"
        }`}
      >
        <IconToopTipWrapper label="Search">
          <Search className={isMobile ? "w-5 h-5" : " ml-1.5 w-6 h-6"} />
        </IconToopTipWrapper>

        {/* Profile Avatar */}
        <IconToopTipWrapper label={user.name}>
          <div
            className={`rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ${
              isMobile ? "w-5 h-5" : "w-10 h-10"
            }`}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className={`text-gray-600 font-bold ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "N"}
              </span>
            )}
          </div>
        </IconToopTipWrapper>
      </div>
    </div>
  );
};

export default SideBar;
