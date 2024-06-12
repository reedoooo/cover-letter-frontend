import React from 'react';
import 'styles/LoadersShared.css';
import 'styles/LoadersA.css';

export const LoadersA = () => {
  return (
    <div className="frame">
      <h2>Save These</h2>
      <h1>CSS Loaders</h1>
      <div className="grid">
        <div>
          <p>1</p>
          <span className="loader-1"></span>
        </div>
        <div>
          <p>2</p>
          <span className="loader-2"></span>
        </div>
        <div>
          <p>3</p>
          <span className="loader-3"></span>
        </div>
        <div>
          <p>4</p>
          <span className="loader-4"></span>
        </div>
        <div>
          <p>5</p>
          <span className="loader-5"></span>
        </div>
        <div>
          <p>6</p>
          <span className="loader-6"></span>
        </div>
      </div>
      <h3>Code in comments ⬇️</h3>
    </div>
  );
};

export default LoadersA;
