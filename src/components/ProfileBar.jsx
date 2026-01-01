import { useEffect, useRef, useState } from "react";

export default function ProfileBar({ user, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="profile-bar" ref={ref}>
      <img src={user?.avatar || "https://via.placeholder.com/50"} onClick={() => setOpen(!open)} />

      {open && (
        <div className="dropdown open">
          <div className="menu-item">Edit Profile</div>
          <div className="menu-item" onClick={logout}>Logout</div>
        </div>
      )}
    </div>
  );
}
