import { useEffect, useRef, useState } from "react";

export default function ProfileBar({ user, onEdit, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="profile-bar" ref={ref}>
      <img
        src={user.photo || "https://i.pravatar.cc/150?img=12"}
        alt="profile"
        onClick={() => setOpen(o => !o)}
      />

      <div className={`dropdown ${open ? "open" : ""}`}>
        <span className="username">{user.name}</span>

        <button className="menu-item" onClick={onEdit}>
          Edit Profile
        </button>

        <button className="menu-item" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
