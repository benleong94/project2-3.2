import { Link } from "react-router-dom";
import { auth, database } from "../firebase";

import {
  onChildAdded,
  onChildChanged,
  ref as databaseRef,
  update,
} from "firebase/database";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

function ProfilePage({
  user,
  currentProfile,
  setCurrentProfile,
  DB_PROFILES_KEY,
  profilesRef,
}) {
  //This useEffect adds the child event listeners so that it will
  //auto update the profiles when they're changed.
  //need to look through and modify.

  // useEffect(() => {
  //   onChildChanged(profilesRef, (data) =>
  //     setProfiles((prev) =>
  //       prev.map((item) =>
  //         item.key === data.key ? { key: data.key, val: data.val() } : item
  //       )
  //     )
  //   ), []})

  const auth = getAuth();

  const changeEmail = () => {
    updateEmail();
  };

  const handleProfileInput = (e) => {
    const current_target_name = e.target.name;

    setCurrentProfile((prevProfile) => ({
      ...prevProfile,
      val: {
        ...prevProfile.val,
        [current_target_name]: e.target.value,
      },
    }));
  };

  //Figure out how to set to the database first.
  const writeData = (e) => {
    e.preventDefault();

    console.log("e.target.name: ", e.target.name);
    console.log("e.target.value: ", e.target.value);

    update(profilesRef, {
      [e.target.name]: e.target.value,
    });
    //profilesRef was passed in as a prop.

    //const messageListRef = databaseRef(database, DB_MESSAGES_KEY);
    //const newMessageRef = push(messageListRef);
  };

  const writePhotoData = () => {
    e.preventDefault();

    const storageRefInstance = storageRef(
      storage,
      DB_STORAGE_KEY + fileInputFile.name
    );

    uploadBytes(storageRefInstance, fileInputFile).then((v) => {
      //console.log(v);
      getDownloadURL(storageRefInstance).then((url) => {
        //Once we get our url back from the storage, we send it off to the database)

        //Instead of setting (creating a new reference)
        //I want to update the url already in the database.
        //use update() ?

        //if I can put in all the same data, do I even need to get the key to only change
        //specifically the url?

        set(profilesRef, { url: url });
      });
    });

    //This function is just for uploading the changed picture to firebase and
  };

  //This is for doing stuff after the database has been changed.
  useEffect(() => {
    onChildChanged(
      profilesRef,
      (data) => console.log("data: ", data)
      // setProfiles((prev) =>
      //   prev.map((item) =>
      //     item.key === data.key ? { key: data.key, val: data.val() } : item
    );
  }, []);

  useEffect(() => {
    console.log("currentProfile: ", currentProfile);
  }, [currentProfile]);

  return (
    <div className="settings-container">
      <h1>Profile Page</h1>

      <div>
        <h1>Profile Picture</h1>
        <img src={currentProfile.val.url} width="100px" height="100px" />
        <form>
          {" "}
          <input type="file" />
          <button onClick={writePhotoData}>Upload new photo!</button>
        </form>
      </div>

      <div>
        <h2>Name:</h2>
        <form>
          <input
            name="name"
            type="text"
            value={currentProfile.val.name}
            onChange={handleProfileInput}
          />
          <button type="submit" onClick={writeData}>
            Submit name!
          </button>
        </form>
      </div>

      <div>
        <h2>Age:</h2>
        <input
          name="age"
          type="number"
          value={currentProfile.val.age}
          onChange={handleProfileInput}
        />
      </div>

      <div>
        <h1>Occupation:</h1>
        <input type="text" value={currentProfile.val.occupation} />
      </div>

      <div>
        <h2>Hobbies:</h2>
        <input type="text" value={currentProfile.val.hobbies} />
      </div>

      <div>
        <h2>Pet Friendly?</h2>
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

/*

        <input
          id="file-input-box"
          type="file"
          value={props.fileInputValue}
          onChange={(e) => {
            props.setFileInputFile(e.target.files[0]);
            props.setFileInputValue(e.target.value);
          }}
        />
        <br />
        <button onClick={props.writeData}>Send</button>
        */
