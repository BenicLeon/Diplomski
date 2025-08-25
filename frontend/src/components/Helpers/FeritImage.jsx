import React from 'react';
import '../../css/authStyle.css';
import feritLogo from '../../assets/feritLogo.png';

const FeritImage = () => {
  return (
    <div className="ferit-image-wrapper">
      <img src={feritLogo} alt="FERIT logo" />
      <p>Leon Benić</p>
    </div>
  );
};

export default FeritImage;
