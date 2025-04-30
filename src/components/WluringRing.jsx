import React from 'react';
import './WluringRing.css';

const WluringRing = () => {
  return (
    <div className="webring">
      <a href="https://wluring.xyz/api/your-username/prev" className="webring-link">
        ← 
      </a>
      <a href="https://wluring.xyz">
        <img src="/image/wluring_white.png" alt="Wluring" className="webring-logo" />
      </a>
      <a href="https://wluring.xyz/api/your-username/next" className="webring-link">
         →
      </a>
    </div>
  );
};

export default WluringRing;
