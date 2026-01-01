export default function EditProfileModal({ user, close }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <img src={user.profilePic} className="edit-avatar" />
        <input defaultValue={user.first} />
        <input placeholder="Add a bio" />
        <button className="primary-btn">Save</button>
        <p className="link" onClick={close}>Back</p>
      </div>
    </div>
  );
}
