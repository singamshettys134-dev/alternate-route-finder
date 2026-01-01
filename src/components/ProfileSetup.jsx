import { useState } from "react";

export default function ProfileSetup({ user, onFinish }) {
  const [avatar, setAvatar] = useState(null);

  function upload(e) {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card card profile-card">
        <h2>Set up your profile</h2>
        <p className="profile-sub">Add a profile photo to personalize your account</p>

        <label className="avatar-upload">
          {avatar ? <img src={avatar} alt="avatar" /> : <span>+</span>}
          <input type="file" hidden onChange={upload} />
        </label>

        <button className="search-btn" onClick={() => onFinish({ ...user, avatar })}>
          Finish
        </button>
      </div>
    </div>
  );
}
