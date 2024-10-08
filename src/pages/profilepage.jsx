import UserProfile from "../modules/userprofile";

const ProfilePage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        {" "}
        {/* Set a max-width for the profile component */}
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
