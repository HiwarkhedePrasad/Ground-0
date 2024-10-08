import Spline from '@splinetool/react-spline';



const HeroSection = () => {
  return (
    <>
      <div class=" h-screen flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-5xl font-bold mb-4">
            Connect with Fellow Developers
          </h1>
          <p class="text-lg mb-6">
            Easily find and collaborate with developers who share your
            interests.
          </p>
           <Spline
        scene="https://prod.spline.design/PY531-6KKJb8AM0B/scene.splinecode" 
      />
          <a
            href="/search"
            class="bg-white text-blue-500 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition duration-300"
          >
            Join Now
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
