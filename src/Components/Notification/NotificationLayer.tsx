import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useProjectStoreContext } from "@/Context/ProjectStoreContext";
import { Button } from "../ui/button";
import { acceptInvitation } from "@/CONSTANTS/ProjectListItems";

export default function NotificationLayer() {
  const { showNotifications, notification } = useProjectStoreContext();



  useEffect(() => {
    async function getNotifications() {
      await showNotifications();
    }
    getNotifications();
  }, []);

  // function for handling acceptInvitation
  async function handleInvitationAccept(userID:number,projectID:number)
  { 
    await acceptInvitation(userID,projectID);
  }
  return (
    <>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            You have
            <span className="font-bold text-slate-950 tracking-widest">
              {" "}
              {notification.length}{" "}
            </span>
            unread messages.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {notification.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-600" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                {notification.related_Project_Status === "pending" ? (
                  <div className="flex items-center justify-end gap-4">
                    <Button
                    onClick={()=>handleInvitationAccept(notification.user_id,notification.project_id)}
                    >Accept</Button>
                    <Button variant={"destructive"}>Reject</Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
