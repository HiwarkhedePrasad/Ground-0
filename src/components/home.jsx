// Home.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="text-center text-3xl font-bold mb-4">Connect to the Developer of The World</h1>
      <p className="text-center text-lg text-gray-600 mb-8">Best of the Project and People you will find Here.</p>

      {/* Embed Spline scene */}
      <div style={{ height: '600px', width: '100%' }}>
        <Spline scene="https://prod.spline.design/2hNI0byTB8KANP2Q/scene.splinecode" />
      </div>
    </div>
  );
}
