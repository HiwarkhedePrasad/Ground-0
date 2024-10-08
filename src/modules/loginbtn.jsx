import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
  const { loginWithRedirect, user, isAuthenticated ,logout} = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button onclick={e=>logout} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" > Lo0gout</button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginBtn;
