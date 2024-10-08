import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={loginWithRedirect}
    >
      Login
    </button>
  );
};

export default LoginBtn;
