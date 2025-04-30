import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useProjectStoreContext } from "@/Context/ProjectStoreContext";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export default function NotificationLayer() {

  const {showNotifications,notification} = useProjectStoreContext();
  

  useEffect(() => {
    async function getNotifications()
    {
      await showNotifications();
    }
    getNotifications();
    
  }, []);
  return (
    <>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
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
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
