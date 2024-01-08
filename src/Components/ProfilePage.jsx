import { Link } from "react-router-dom";
import { auth, database, storage } from "../firebase";

import {
  onChildAdded,
  onChildChanged,
  ref as databaseRef,
  update,
} from "firebase/database";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

function ProfilePage({
  user,
  currentProfile,
  setCurrentProfile,
  DB_PROFILE_IMAGES_KEY,
  DB_STORAGE_KEY,
  profilesRef,
}) {
  const [imgFileInput, setImgFileInput] = useState("");
  //This useEffect adds the child event listeners so that it will
  //auto update the profiles when they're changed.
  //need to look through and modify.
  const auth = getAuth();

  const changeEmail = () => {
    updateEmail();
  };

  const handleImgFileInput = (e) => {
    console.log("e.target.files: ", e.target.files[0]);
    setImgFileInput(e.target.files[0]);
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
    console.log("e.target:", e.target);
    e.preventDefault();

    // console.log("e.target.name.name: ", e.target.name.name);
    // console.log("e.target.name.value: ", e.target.name.value);

    //currentProfile has the key of the profile we're editing.
    const currentkey = currentProfile.key;

    console.log("currentkey", currentProfile.key);
    let profilecurrent = currentProfile;

    console.log("profilesRef", profilesRef);

    update(profilesRef, {
      [currentProfile.key]: profilecurrent.val,
    });
  };

  //sends picture to database, sets the url it gets back to the CurrentProfile, then updates the user's profile in the database with the url.
  const writePhotoData = (e) => {
    e.preventDefault();

    const storageRefInstance = storageRef(
      storage,
      DB_PROFILE_IMAGES_KEY + "/" + imgFileInput.name
    );

    uploadBytes(storageRefInstance, imgFileInput).then((v) => {
      getDownloadURL(storageRefInstance).then((url) => {
        //Once we get our url back from the storage, we send it off to the database)

        let profilecurrent = currentProfile;

        setCurrentProfile((prevProfile) => ({
          ...prevProfile,
          val: {
            ...prevProfile.val,
            url: [url],
          },
        }));

        update(profilesRef, {
          [currentProfile.key]: currentProfile.val,
        });
      });
    });
  };

  //This is for doing stuff after the database has been changed.
  // useEffect(() => {
  //   onChildChanged(
  //     profilesRef,
  //     (data) => console.log("data: ", data)
  //   );
  // }, []);

  // useEffect(() => {
  //   console.log("currentProfile: ", currentProfile);
  // }, [currentProfile]);

  // useEffect(() => {
  //   console.log("imgFileInput: ", imgFileInput);
  //   console.log("imgFileInput name: ", imgFileInput.name);
  // }, [imgFileInput]);

  return (
    <div className="settings-container">
      <h1>Profile Page</h1>

      <div>
        <h1>Profile Picture</h1>
        <img src={currentProfile.val.url} width="100px" height="100px" />
        <form onSubmit={writePhotoData}>
          {" "}
          <input name="url" type="file" onChange={handleImgFileInput} />
          <button type="submit">Upload new photo!</button>
        </form>
      </div>

      <div>
        <h2>Name:</h2>
        <form onSubmit={writeData}>
          {" "}
          <input
            name="name"
            type="text"
            value={currentProfile.val.name}
            onChange={handleProfileInput}
          />
          <button type="submit">Submit name!</button>
        </form>
      </div>

      <div>
        <h2>Age:</h2>
        <form onSubmit={writeData}>
          <input
            name="age"
            type="number"
            value={currentProfile.val.age}
            onChange={handleProfileInput}
          />
          <button type="submit">Submit age!</button>
        </form>
      </div>

      <div>
        <h1>Occupation:</h1>
        <form onSubmit={writeData}>
          <input
            name="occupation"
            type="text"
            value={currentProfile.val.occupation}
            onChange={handleProfileInput}
          />
          <button type="submit">Submit occupation!</button>
        </form>
      </div>

      <div>
        <h2>Hobbies:</h2>
        <form onSubmit={writeData}>
          <input
            name="hobbies"
            type="text"
            value={currentProfile.val.hobbies}
            onChange={handleProfileInput}
          />
          <button type="submit">Submit hobbies!</button>
        </form>
      </div>

      <div>
        <h2>Pet Friendly?</h2>
        <form onSubmit={writeData}>
          <input
            name="petFriendly"
            type="checkbox"
            value={currentProfile.val.petFriendly}
            onChange={handleProfileInput}
          />
          <button type="submit">Submit petfriendliness</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
