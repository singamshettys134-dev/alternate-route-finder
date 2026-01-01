import { useState } from "react";
import { saveUser } from "../utils/auth";

export default function ProfileSetup({ user, finish }) {
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const completeProfile = () => {
    const updatedUser = {
      ...user,
      profilePic: preview || null
    };
    saveUser(updatedUser);
    finish(updatedUser);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Set up your profile</h2>

        {/* PROFILE PIC PICKER */}
        <div className="avatar-upload">
          {preview ? (
            <img src={preview} alt="profile" />
          ) : (
            <label
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "2rem"
              }}
            >
              +
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          )}
        </div>

        <p>{user.username}</p>

        <input placeholder="Add a bio (optional)" />

        <button className="primary-btn" onClick={completeProfile}>
          Finish
        </button>
      </div>
    </div>
  );
}
