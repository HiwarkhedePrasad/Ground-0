import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <button
      onClick={handleSignup}
      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
    >
      Signup
    </button>
  );
};

export default SignupButton;
