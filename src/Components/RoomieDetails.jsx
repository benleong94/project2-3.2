function RoomieDetails({ profile }) {
  return (
    <div class="bg-gray-100 p-4 rounded-lg shadow-md w-100">
      <div class="font-bold text-lg mb-2">Name: {profile.val.name}</div>
      <div class="mb-1">Age: {profile.val.age}</div>
      <div class="mb-1">Occupation: {profile.val.occupation}</div>
      <div class="mb-1">Hobbies: {profile.val.hobbies}</div>
      <div class="mb-1">
        Smoking Preferences: {profile.val.smokingPreferences}
      </div>
      <div class="mb-1">Pet Friendly: {profile.val.petFriendly}</div>
    </div>
  );
}

export default RoomieDetails;
