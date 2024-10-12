'use client'
import { useState } from 'react';

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Make a request to the login API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'google' }),
      });

      if (!response.ok) {
        throw new Error('Login request failed');
      }

      const data = await response.json();
      console.log('Login API response:', data);

      // TODO: Handle the response from the server
      // This might involve setting tokens, updating state, or redirecting the user
    } catch (err) {
      setError('Google Sign-In failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? (
            'Signing in...'
          ) : (
            <>
              <img src="/googleLogo.svg" alt="" className="w-6 h-6 mr-2" />
              Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
