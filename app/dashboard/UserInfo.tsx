"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      fetch(`/api/user?userId=${session.user.id}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error:", error));
    }
    console.log("user", user);
  }, [session]);

  // Render the credits or a loading message if the user data hasn't loaded yet
  return (
    <div className="text-center text-sm text-white-500">
      {user
        ? `You currently have ${user.credits} credits`
        : "Loading your credits..."}
    </div>
  );
}
