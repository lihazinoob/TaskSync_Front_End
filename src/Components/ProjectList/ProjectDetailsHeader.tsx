import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ProjectListDataType,
  User,
  fetchAllUsers,
  fetchProjectBySlack,
  inviteUser,
} from "@/CONSTANTS/ProjectListItems";
import { Star, Plus, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { CheckCircle2,XCircle} from "lucide-react";

export default function ProjectDetailsHeader() {
  const { slack } = useParams<{ slack: string }>();

  // State for setting the project Data inside this component
  const [project,setProject] = useState<ProjectListDataType|null>(null);

  // state for toggling the star icon
  const [isStarred, setIsSStarred] = useState(false);
  // State for showing the alert box
  const [showAlert, setShowAlert] = useState(false);
  // State to store the fetched users
  const [users, setUsers] = useState<User[]>([]);

  // State dor the users that will be filtered along with search options. Subset of users
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // State for the search query. Used for searching the between the registered user
  const [searchQuery, setSearchQuery] = useState("");

  // Use State hook to fetch project data when the component mounts

  useEffect(()=>{
    if(slack)
    {
      const projectData = fetchProjectBySlack(slack);
      setProject(projectData || null);
    }
  },[slack])

  // function for handling the starToggle
  function handleStarToggle() {
    setIsSStarred((prev) => !prev);
    setShowAlert(true);
  }

  // useEffect hook to fetch all the registered users on mount
  useEffect(() => {
    fetchAllUsers()
      .then((fetchedUsers) => {
        // Set the In-component memeory (state)
        setUsers(fetchedUsers);
        // Also set the filtered Users
        setFilteredUsers(fetchedUsers);
      })
      .catch((error) => console.error("Error Fetching Users", error));
  }, []);

  // Filter Users based on Search Query
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [users, searchQuery]);

  // useEffect hook for hiding the alert box after 2 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Handler function for this component to add a User to a Project

  async function handleInviteUserToProject(userID: string) {
    try {
      await inviteUser(project?.id,userID);
      
      // Show success notification
      toast.success("Success",{
        description: "The user has been invited to join this project.",
        duration: 3000,
        icon: <CheckCircle2 className="h-5 w-5 text-slate-900" />,
      });

    } catch (error) {
      // Show error notification with Sonner
      toast.error("Invitation failed", {
        description: "There was a problem sending the invitation. Please try again.",
        duration: 3000,
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });

    }
    


  }

  // Mock data for avatars (replace with actual project data later)
  const avatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
  ];
  const additionalPeople = 11; // Number of additional people

  return (
    <>
      {/* Alert Section */}
      {showAlert && (
        <div className="mb-4 justify-center items-center flex">
          <Alert
            variant={isStarred ? "default" : "destructive"}
            className="max-w-md border border-indigo-200 bg-indigo-50 text-indigo-800"
          >
            <AlertTitle>{isStarred ? "Success" : "Removed"}</AlertTitle>
            <AlertDescription>
              {isStarred
                ? "This project has been added to the starred project"
                : "This Project has been removed from starred project"}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-row items-center justify-between">
        {/* Project Name,type and others section */}
        <div className="flex flex-col gap-2">
          {/* Project name  */}
          <div className="text-2xl font-semibold text-slate-900">
            {project?.name}
          </div>
          <div className="text-sm tracking-wider">
            {project?.techStack}/{project?.workType}
          </div>
        </div>

        {/* Stars and Avatar section */}
        <div className="flex justify-center gap-4">
          {/* Star Opttion */}
          <button onClick={handleStarToggle} className="cursor-pointer">
            <Star
              size={24}
              className={
                isStarred
                  ? "fill-indigo-400 text-indigo-400 "
                  : "text-slate-900"
              }
            />
          </button>

          {/* Avatar Layout */}
          <div className="items-center flex border-2  p-1 rounded-full">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white text-xs font-medium text-gray-700">
                +{additionalPeople}
              </div>
            </div>
            {/* Add People Button with dropdown Menu*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 w-8 h-8 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer">
                  <Plus size={16} className="text-blue-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <DropdownMenuLabel>Add people</DropdownMenuLabel>

                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search Users"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="pl-8"
                  />
                </div>

                {/* Here all the users based on the search will be shown */}
                {filteredUsers.length === 0 ? (
                  <p className="text-sm text-gray-500">No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            user.profile_picture ||
                            "https://via.placeholder.com/32"
                          }
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{user.name}</span>
                      </div>

                      <Button
                        className="text-sm px-2 py-1 cursor-pointer"
                        onClick={() => handleInviteUserToProject(user.id)}
                      >
                        Add
                      </Button>
                    </div>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Toaster Component to show the message */}
      <Toaster position="bottom-right" richColors closeButton/>
    </>
  );
}
