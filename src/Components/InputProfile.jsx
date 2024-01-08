import { useState } from "react";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const DB_PROFILES_KEY = "profiles";

function InputProfile({
  user,
  setIsLoggedIn,
  storage,
  DB_PROFILE_IMAGES_KEY,
  database,
}) {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    occupation: "",
    hobbies: "",
    smokingPreference: "",
    petFriendly: false,
    url: "",
  });
  const [fileInputFile, setFileInputFile] = useState(null);
  const navigate = useNavigate();
  const profilesRef = ref(database, DB_PROFILES_KEY + "/" + user.uid);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRefInstance = storageRef(
      storage,
      DB_PROFILE_IMAGES_KEY + "/" + fileInputFile.name
    );
    try {
      setIsLoggedIn(true);
      uploadBytes(storageRefInstance, fileInputFile).then(() => {
        getDownloadURL(storageRefInstance).then((url) => {
          set(profilesRef, {
            name: profile.name,
            age: profile.age,
            occupation: profile.occupation,
            hobbies: profile.hobbies,
            smokingPreference: profile.smokingPreference,
            petFriendly: profile.petFriendly,
            url: url,
            peopleLiked: [""],
            peopleMatched: [""],
          });
        });
      });
      navigate("/find-roomie");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={profile.occupation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Hobbies:</label>
          <input
            type="text"
            name="hobbies"
            value={profile.hobbies}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Smoking Preference:</label>
          <input
            type="text"
            name="smokingPreference"
            value={profile.smokingPreference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Pet Friendly:
            <input
              type="checkbox"
              name="petFriendly"
              checked={profile.petFriendly}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>Picture: </label>
          <input
            type="file"
            onChange={(e) => setFileInputFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputProfile;
