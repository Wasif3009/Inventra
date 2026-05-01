import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
const Profile = ({ open, setOpen, showProfile, setShowProfile }) => {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} className="dialog">
        <DialogContent className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 dialog profile-dialog">
          <DialogHeader>
            <DialogTitle className="text-white text-xl text-center">
              User Profile
            </DialogTitle>

            <DialogDescription className="text-zinc-400 text-base text-center">
              Your account details
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <div className="profile-info ">
              <p className="text-lg text-zinc-400">Name</p>
              <p className="text-white text-xl font-medium">{user.name}</p>
            </div>

            <div className=" profile-info ">
              <p className="text-lg text-zinc-400">Email</p>
              <p className="text-white text-xl font-medium">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md dialog-btn"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
