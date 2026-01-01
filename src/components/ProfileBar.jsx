import { useState } from "react";

export default function ProfileSetup({ onComplete }) {
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleFinish() {
    const profile = {
      name: "Yogesh",
      username: "yogi.ok2025",
      bio,
      profilePic: image
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    onComplete(profile);
  }

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <h2>Set up your profile</h2>

        <label className="profile-upload">
          {image ? (
            <img src={image} alt="profile" />
          ) : (
            <span>+</span>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>

        <input
          placeholder="Add a bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button className="search-btn" onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
}
