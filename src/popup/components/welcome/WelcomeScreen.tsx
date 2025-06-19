import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="min-h-[600px] w-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">PeerPulse</h1>
          <p className="text-lg text-gray-600">Connect with friends across the web</p>
        </div>
        
        <div className="w-full max-w-xs">
          <img 
            src="/icons/icon128.png" 
            alt="PeerPulse Logo" 
            className="mx-auto h-32 w-32 mb-6"
          />
          
          <div className="space-y-4">
            <a 
              href="#/signup" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-center"
            >
              Sign Up
            </a>
            
            <a 
              href="#/login" 
              className="block w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-4 border border-blue-600 rounded-lg transition duration-200 text-center"
            >
              Log In
            </a>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 max-w-xs text-center mt-8">
          Join PeerPulse to see what your friends are browsing in real-time, with full privacy controls.
        </p>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-2 mb-2 inline-block">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-gray-600">Add Friends</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-2 mb-2 inline-block">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-gray-600">Live Status</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-2 mb-2 inline-block">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-gray-600">Privacy Control</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;