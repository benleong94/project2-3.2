function UserProfile ({ profile }) {

  return (
    <div className="user-profile">
      <div className="profile-name">Name: {profile.val.name}</div>
      <img src={profile.val.url} alt="" width="150px" height="100px"></img>
    </div>
  );
};

export default UserProfile;