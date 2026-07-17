"use client";

import Link from "next/link";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface Work {
  client: string;
  image: string;
  designation: string;
  duration: string;
  location: string;
  projects: Project[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: Work | null;
}

const Modal = ({ isOpen, onClose, work }: ModalProps) => {
  if (!isOpen || !work) return null;

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-4xl cursor-pointer hover:text-primary transition"
        >
          ×
        </button>

        <div className="p-10">

          {/* Company */}

          <h2>{work.client}</h2>

          <div className="mt-2 flex flex-wrap gap-3 text-secondary">

            <span>{work.designation}</span>

            <span>•</span>

            <span>{work.duration}</span>

            <span>•</span>

            <span>{work.location}</span>

          </div>

          <div className="mt-10 space-y-10">

            {work.projects.map((project) => (
              <div
                key={project.title}
                className="border-l-4 border-primary pl-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  <h4>{project.title}</h4>

                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="text-primary font-medium hover:underline"
                    >
                      View Project →
                    </Link>
                  )}

                </div>

                <p className="mt-4 leading-7">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-softGray px-4 py-2 text-sm"
                    >
                      {tech}
                    </span>
                  ))}

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;