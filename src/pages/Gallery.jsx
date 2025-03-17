import React, { useState } from 'react';
import "./Gallery.css";

export default function Gallery() {
  const images = [
    { src: "/gallery_image/seigfried.jpg", title: "Late Night Runs", description: "Sometimes all you need is a Mucho Mango Arizona, some Fuzzy Peaches and your friends on a late night cruise!", spotifyLink: "https://open.spotify.com/track/1BViPjTT585XAhkUUrkts0?si=a4f18c665392434b" },
    { src: "/gallery_image/bird_sun.jpg", title: "Ball of Fire", description: "It's like the birds are flocking around the warmth of the sun.", spotifyLink: "  https://open.spotify.com/track/7o2AeQZzfCERsRmOM86EcB?si=ad6e121d01004345" },
    { src: "/gallery_image/dark_ryd.jpg", title: "Dark Ryd", description: "The red light shines like a ruby in a ocean of blue skies", spotifyLink: "https://open.spotify.com/track/3EaJDYHA0KnX88JvDhL9oa?si=b53cf178439a45bb" },
    { src: "/gallery_image/house.jpg", title: "Dancing Trees", description: "A late night walk can reveal that your not the only one moving with nature.", spotifyLink: "https://open.spotify.com/track/784VjdNkpXhFV0RHquzsi2?si=e75680947f6a4915" },
    { src: "/gallery_image/snowboard.jpg", title: "Snow Dunes", description: "The calm before the storm", spotifyLink: "https://open.spotify.com/track/6yiSyupeI7KYdBZKJdnIUO?si=2e521ffef3ab4f37" },
    { src: "/gallery_image/late_night.jpg", title: "Passenger Perspective", description: "Sometimes the best thing to do is look out your window and absorb what you drive by.", spotifyLink: "https://open.spotify.com/track/0CjJqkWOpIUXdem5hUcxAk?si=ea0dba24c9e04716" },
    { src: "/gallery_image/jellyfish.JPG", title: "Floating Away", description: "Fun Fact: They're older than dinosaurs!", spotifyLink: "https://open.spotify.com/track/4wajJ1o7jWIg62YqpkHC7S?si=9bb46ea68e3b49a6" },
    { src: "/gallery_image/mountain.jpg", title: "Nature's Roller Coaster", description: "I like to imagine I can glide across the edges of these insane mountains!", spotifyLink: "https://open.spotify.com/track/2ctvdKmETyOzPb2GiJJT53?si=80893f72eaa54bee" },
    { src: "/gallery_image/sunflower.jpg", title: "Cotton Candy Skies", description: "The sunflowers chasing the sun.", spotifyLink: "https://open.spotify.com/track/3stWWPN41byqp8loPdy92u?si=cd141a0f9d9e4328" },
    { src: "/gallery_image/yosemit.jpg", title: "Half Dome", description: "This view makes you realize how small we truly are in the world. (Bigger question is how we invented an airfryer from this!?)", spotifyLink: "https://open.spotify.com/track/17YNmMy03QLPirmBzWxFa6?si=e781a1a578134a01" },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="gallery-container">
      <div className="about-section">
        <h1 className="about-title">About Me</h1>
        <img src="/gallery_image/gursh_speech.png" alt="My Picture" className="about-image" />
        <p className="about-description">Hey, I'm Gurshan!  I'm a second-year Computer Science student minoring in Statistics at 
          Wilfrid Laurier University. I love diving into problem-solving, working with data, 
          and building creative projects that blend my passions with modern technology. Outside of tech, I'm passionate about 
          photography, gaming, cooking, films and snowboarding. Capturing moments through a lens is something I really enjoy—it's a way 
          to freeze time and tell a story without words. Music also plays a huge role in my life; there's nothing better 
          than finding the perfect song to match a moment, whether it's a photo I've taken or just a feeling in the air.  
          Below, you'll find a small gallery of my photography, each paired with a song that perfectly matches its vibe. 
          Take a look, Click the image, and see where it takes you! 🎶📸</p>
      </div>

      <div className="gallery-content">
        <div className="carousel-container">
          <a 
            href={images[currentIndex].spotifyLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="gallery-item"
          >
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].title} 
              className="gallery-image" 
            />
            <div className="gallery-text">
              <h3>{images[currentIndex].title}</h3>
              <p>{images[currentIndex].description}</p>
            </div>
          </a>
        </div>
        
        <div className="navigation-buttons">
          <button className="carousel-button prev-button" onClick={goToPrevious}>
            &#8592;
          </button>
          <button className="carousel-button next-button" onClick={goToNext}>
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}