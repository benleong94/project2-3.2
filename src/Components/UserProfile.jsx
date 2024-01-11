function UserProfile({ profile }) {
  //showing different users

  return (
    <div className="user-profile">
      <img src={profile.val.url} alt="Roomie"></img>
      <div className="profile-name-age">
        {profile.val.name}, {profile.val.age}
      </div>
    </div>
  );
}

export default UserProfile;
