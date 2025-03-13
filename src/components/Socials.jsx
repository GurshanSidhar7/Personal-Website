import React from 'react'
import './SocialStyling.css'

const Socials = () => {
  return (
    <div className="button-container">
      <a
        href="https://www.linkedin.com/in/gurshan-sidhar"
        target="_blank"
        rel="noopener noreferrer"
        className="btn linkedin"
      >
        <img src="image/linkedin.svg" alt="LinkedIn" className="icon" />
      </a>
      <a
        href="https://github.com/GurshanSidhar7"
        target="_blank"
        rel="noopener noreferrer"
        className="btn github"
      >
        <img src="image/github.svg" alt="GitHub" className="icon" />
      </a>
    </div>

  )
}

export default Socials