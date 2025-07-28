import React from "react";
import "./Projects.css";

// Language image mapping
const languageIcons = {
  React: "/language-icons/react.svg",
  CSS: "/language-icons/css.svg",
  JavaScript: "/language-icons/javascript.svg",
  HTML: "/language-icons/html.svg",
  FastAPI: "/language-icons/api.svg",
  Python: "/language-icons/python.svg",
  Nextjs: "/language-icons/nextjs.svg",
  Tailwind: "/language-icons/tailwind.svg",
  SpaCy: "/language-icons/spacy.svg",
  Docker: "/language-icons/docker.svg",
  AWS: "/language-icons/aws.svg",
  Git: "/language-icons/git.svg",
  PokeAPI: "/language-icons/poke.svg",
  TypeScript: "/language-icons/typescript.svg",
  Express: "/language-icons/default.svg",
  Supabase: "/language-icons/default.svg",
  PostgreSQL: "/language-icons/sql.svg",
  
};

const projects = [

  {
    name: "Lucky Lease",
    description: "LuckyLease is a web‑based platform for short‑term subletting focused on student and intern housing. It offers JWT‑secured email/password authentication, listing creation and advanced filtering, multiple image uploads via Supabase Storage, real‑time chat with Socket.io, an interactive map for location discovery, and a Personalized AI advisor “Lucky” powered by Google Gemini API that analyzes budget, location, amenities, and lease duration to provide structured pros/cons and a compatibility rating.",
    languages: ["TypeScript", "JavaScript", "Nextjs", "Tailwind", "Express", "Supabase", "PostgreSQL"],
    github: "https://github.com/TaseskiCS/LuckyLease",
    image: "/image/Lucky_Lease.png",
  },

  {
    name: "CVLens",
    description: "Worked on a group project to create a web app that extracts data from resumes in PDF/DOCX formats. We used SpaCy's NLP model to pull details like contact info, education, skills, and work experience. Built a RESTful API with FastAPI to process uploaded resumes using NLP and serve structured JSON responses. Designed a simple frontend with Next.js to display the extracted info.",
    languages: ["Python", "Nextjs", "Tailwind", "SpaCy", "Docker", "Git"],
    github: "https://github.com/CVLens/CVLens",
    image: "/image/cvlens.png",
  },

  {
    name: "Poke-Pal",
    description: "PokeMatch AI is a full-stack web app with a Pokedex-style interface that matches your personality to a Pokémon. After answering a few fun questions, your responses are sent to a custom-built backend that integrates with the Gemini AI API to analyze your traits. It then fetches your perfect match from the PokéAPI and displays its image, stats, abilities, and a short explanation of why it fits you.",
    languages: ["Python", "JavaScript", "HTML", "FastAPI", "Tailwind" , "Nextjs", "Git", "PokeAPI"],
    github: "https://github.com/GurshanSidhar7/Poke-Pal",
    image: "/image/PokePal.png",
  },

  {
    name: "Portfolio Website",
    description: "This is my personal portfolio website, built using React, HTML, and CSS. It showcases my skills, projects, and experience in a clean, interactive design. I crafted this site to highlight my web development abilities and offer an easy-to-navigate space for visitors to explore my work",
    languages: ["HTML","React", "CSS", "JavaScript"],
    github: "https://github.com/GurshanSidhar7/Personal-Website/tree/master?tab=readme-ov-file",
    image: "/image/port_website.png",
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
