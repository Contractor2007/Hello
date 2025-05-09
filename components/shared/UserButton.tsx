'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const UserDropdown = () => {
  const [Open, SetOpen] = useState(false);
  const { data: session } = useSession();

  const Opening = () => {
    SetOpen(!Open);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Get the first letter of the username in uppercase, fallback to 'U'
  const initial = session?.user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative">
      <Button 
        onClick={Opening} 
        style={{ borderRadius: "50%", height: "30px", width: "30px", padding: 0 }}
        className="flex items-center justify-center text-white bg-sky-700"
      >
        {initial}
      </Button>

      {Open && (
        <div className="absolute right-0 mt-2 w-flex bg-sky-700 rounded-md shadow-lg z-10 text-white">
          <div className="p-3 border-b border-sky-500">
            {session?.user?.name || "Username"}<br />
            {session?.user?.email || "User Description"}
          </div>
          <div className="flex flex-col">
            <div className="p-3 hover:bg-sky-600 cursor-pointer transition-colors">
              User Details
            </div>
            <button 
              onClick={handleSignOut}
              className="p-3 hover:bg-sky-600 text-left transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
