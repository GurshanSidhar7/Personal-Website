import React from 'react';
import Socials from '../components/Socials';  
import './HomeStyling.css'


const Home = () => {
  return (
    
    <div className="main">
      <div className="main__container">
        <div className="main__content">
          <h1>HEY,</h1>
          <h2> I'M GURSHAN SIDHAR</h2>
          <p>Welcome to my personal portfolio!</p>
          <Socials/>
        </div>
        <div className="main__img--container">
          <img src="image/Avatar New.png" alt="pic" id="main__img" />
        </div>
      </div>
    </div> 
  )
}

export default Home