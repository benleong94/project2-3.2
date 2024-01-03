import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, updateEmail } from "firebase/auth";
import { useEffect } from "react";

function ProfilePage({ user, currentProfile }) {
  //get what data you can from the auth
  console.log("user passed into ProfilePage: ", user);
  const auth = getAuth();

  console.log("current profile: ", currentProfile);
  console.log("user: ", user);
  console.log("auth: ", auth);
  console.log("user.uid: ", user.uid);

  const changeEmail = () => {
    updateEmail();
  };

  const handleProfile = () => {};

  const updatePhoto = () => {};

  return (
    <div className="settings-container">
      <h1>Profile Page</h1>

      <div>
        <h1>Profile Picture:</h1>
        <img src={currentProfile.val.url} width="100px" height="100px" />
        <form>
          {" "}
          <input type="file" />
          <button type="submit">Upload new photo!</button>
        </form>
      </div>

      <div>
        <h1>Name:</h1>
        <form>
          <input
            type="text"
            value={currentProfile.val.name}
            onChange={handleProfile}
          />
        </form>
      </div>

      <div>
        <h1>Age:</h1>
        <input type="number" value={currentProfile.val.age} />
      </div>

      <div>
        <h1>Occupation:</h1>
        <input type="text" value={currentProfile.val.occupation} />
      </div>

      <div>
        <h1>Hobbies:</h1>
        <input type="text" value={currentProfile.val.hobbies} />
      </div>

      <div>
        <h1>Pet Friendly?</h1>
        <input type="checkbox" value={currentProfile.val.petFriendly} />
      </div>
    </div>
  );
}

export default ProfilePage;
/*
      name: "" , age: "", occupation: "", hobbies: "", smokingPreference: "",
      petFriendly: false, peopleLiked: [""], peopleMatched: [""], //figure out
      how to edit it //get the rest of the data from the database //get key of
      user and then update the specific values of a user
*/
