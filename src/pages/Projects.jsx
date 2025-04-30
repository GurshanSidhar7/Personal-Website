import React from "react";
import "./Projects.css";

// Language image mapping
const languageIcons = {
  React: "/language-icons/react.svg",
  CSS: "/language-icons/css.svg",
  JavaScript: "/language-icons/javascript.svg",
  HTML: "/language-icons/html.svg",
  API: "/language-icons/api.svg",
  Python: "/language-icons/python.svg",
  Nextjs: "/language-icons/nextjs.svg",
  Tailwind: "/language-icons/tailwind.svg",
  SpaCy: "/language-icons/spacy.svg",
  Docker: "/language-icons/docker.svg",
  AWS: "/language-icons/aws.svg",
  Git: "/language-icons/git.svg",
  PokeAPI: "/language-icons/poke.svg",
};

const projects = [
  {
    name: "Portfolio Website",
    description: "This is my personal portfolio website, built using React, HTML, and CSS. It showcases my skills, projects, and experience in a clean, interactive design. I crafted this site to highlight my web development abilities and offer an easy-to-navigate space for visitors to explore my work",
    languages: ["HTML","React", "CSS", "JavaScript"],
    github: "https://github.com/GurshanSidhar7/Personal-Website/tree/master?tab=readme-ov-file",
    image: "/image/port_website.png",
  },
  {
    name: "CVLens",
    description: "Worked on a group project to create a web app that extracts data from resumes in PDF/DOCX formats. We used SpaCy's NLP model to pull details like contact info, education, skills, and work experience. Built an API to trigger an AWS Lambda function that processes the resume and returns the data in JSON. Designed a simple frontend with Next.js to display the extracted info.",
    languages: ["Python", "Nextjs", "Tailwind", "SpaCy", "Docker", "AWS", "Git"],
    github: "https://github.com/CVLens/CVLens",
    image: "/image/cvlens.png",
  },

  {
    name: "Poke-Pal",
    description: "PokeMatch AI is a full-stack web app with a Pokedex-style interface that matches your personality to a Pokémon. After answering a few fun questions, your responses are sent to a custom-built backend that integrates with the Gemini AI API to analyze your traits. It then fetches your perfect match from the PokéAPI and displays its image, stats, abilities, and a short explanation of why it fits you.",
    languages: ["Python", "JavaScript", "HTML", "API", "Tailwind" , "Nextjs", "Git", "PokeAPI"],
    github: "https://github.com/GurshanSidhar7/Poke-Pal",
    image: "/image/PokePal.png",
  },

];

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="title">Featured Projects</h2>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Left: Project Details */}
            <div className="project-info">
              <p className="featured-text">Featured Project</p>
              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-languages">
                <strong>Technologies Used:</strong>
                <div className="language-icons">
                  {project.languages.map((lang, i) => (
                    <div key={i} className="language-container">
                      <img
                        src={languageIcons[lang]}
                        alt={lang}
                        className="language-icon"
                      />
                      <span className="language-name">{lang}</span>
                    </div>
                  ))}
                </div>
              </p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-button"
              >
                View on GitHub
              </a>
            </div>

            {/* Right: Project Image */}
            <div className="project-image">
              <img src={project.image} alt={project.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
