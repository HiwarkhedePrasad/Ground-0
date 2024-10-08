

const HeroSection = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Connect with Fellow Developers
        </h1>
        <p className="text-lg mb-6">
          Easily find and collaborate with developers who share your interests.
        </p>
      
        <a
          href="/search"
          className="bg-white text-blue-500 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition duration-300"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
