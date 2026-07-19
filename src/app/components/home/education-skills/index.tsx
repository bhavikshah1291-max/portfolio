"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollReveal from "../../common/ScrollReveal";

interface TechCategory {
  title: string;
  items: string[];
}

interface Education {
  title: string;
  description: string;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Front-End Technologies",
    items: [
      "React",
      "Angular",
      "Next.js",
      "Redux",
      "jQuery",
      "HTML5",
      "CSS3",
      "AEM",
      "D3.js",
      "SASS/LESS",
      "Bootstrap",
      "Tailwind CSS",
      "Ant Design",
    ],
  },
  {
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Java"],
  },
  {
    title: "Back-End Technologies",
    items: ["Node.js", "Express.js", "Spring", "REST API", "GraphQL"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Testing Framework",
    items: ["Jasmine", "Jest", "Cypress", "Protractor", "K6"],
  },
  {
    title: "CI/CD & Version Control",
    items: ["Jenkins", "SonarQube", "GitHub", "Bitbucket", "GitLab"],
  },
  {
    title: "Tools",
    items: [
      "Splunk",
      "Google Cloud Console",
      "Postman",
      "JIRA",
      "Asana",
      "Figma",
    ],
  },
];

const DEFAULT_TECH_ICON = "/images/home/education-skill/js-logo.png";

const TECH_ICON_MAP: Record<string, string> = {
  "JavaScript": "/images/home/education-skill/js-logo.png",
  "TypeScript": "/images/home/education-skill/typescript.png",
  "Java": "/images/home/education-skill/Java.png",
  "React": "/images/home/education-skill/react-logo.png",
  "Angular": "/images/home/education-skill/angular-logo.png",
  "Next.js": "/images/home/education-skill/next-logo.png",
  "Redux": "/images/home/education-skill/Redux.png",
  "jQuery": "/images/home/education-skill/jQuery.png",
  "AEM": "/images/home/education-skill/adobe-icon.svg",
  "D3.js": "/images/home/education-skill/D3.js.png",
  "HTML5": "/images/home/education-skill/HTML5.png",
  "CSS3": "/images/home/education-skill/CSS3.png",
  "SASS/LESS": "/images/home/education-skill/Sass.png",
  "Bootstrap": "/images/home/education-skill/Bootstrap.png",
  "Tailwind CSS": "/images/home/education-skill/Tailwind CSS.png",
  "Ant Design": "/images/home/education-skill/Ant Design.png",
  "Node.js": "/images/home/education-skill/Node.js.png",
  "Express.js": "/images/home/education-skill/Express.png",
  "Spring": "/images/home/education-skill/Spring.png",
  "REST API": "/images/home/education-skill/Rest.png",
  "GraphQL": "/images/home/education-skill/GraphQL.png",
  "MySQL": "/images/home/education-skill/MySQL.png",
  "PostgreSQL": "/images/home/education-skill/PostgresSQL.png",
  "MongoDB": "/images/home/education-skill/MongoDB.png",
  "Jasmine": "/images/home/education-skill/Jasmine.png",
  "Jest": "/images/home/education-skill/Jest.png",
  "Cypress": "/images/home/education-skill/Cypress.png",
  "Protractor": "/images/home/education-skill/Protractor Test.png",
  "K6": "/images/home/education-skill/Karma.png",
  "Jenkins": "/images/home/education-skill/Jenkins.png",
  "SonarQube": "/images/home/education-skill/SonarQube.png",
  "GitHub": "/images/home/education-skill/GitHub.png",
  "Bitbucket": "/images/home/education-skill/BitBucket.png",
  "GitLab": "/images/home/education-skill/GitLab.png",
  "Splunk": "/images/home/education-skill/Splunk.png",
  "Google Cloud Console": "/images/home/education-skill/Google Cloud.png",
  "Postman": "/images/home/education-skill/Postman.png",
  "Lighthouse": "/images/home/education-skill/js-logo.png",
  "JIRA": "/images/home/education-skill/Jira.png",
  "Asana": "/images/home/education-skill/asana-icon.jpg",
  "Figma": "/images/home/education-skill/figma-icon.svg",
};

const EducationSkills = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [educationData, setEducationData] = useState<{ education: Education[] } | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEducationData(data?.educationData ?? null);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setShowAllSkills(false);
  }, [activeCategoryIndex]);

  const activeCategory = TECH_CATEGORIES[activeCategoryIndex];
  const allSkills = activeCategory.items;

  const visibleSkills = showAllSkills ? allSkills : allSkills.slice(0, 6);
  const hasMoreSkills = allSkills.length > 6;

  return (
    <section id="education-skills">
      <div className="border-t border-softGray overflow-hidden">
        <div className="container relative z-10">
          <Image
            src={getImgPath(
              "/images/home/education-skill/edu-skill-vector.svg"
            )}
            alt="vector"
            width={260}
            height={170}
            className="no-print absolute top-0 left-0 hidden transform -translate-y-1/2 md:block"
          />
          <div className="relative z-10 py-16 md:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 xl:mb-16">
              <h2>Education & Skills</h2>
            </div>
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start xl:gap-14">
              <div className="w-full lg:max-w-md lg:self-start">
                <div className="lg:hidden">
                  <label htmlFor="skills-category" className="mb-2 block text-sm font-semibold tracking-wide text-black/80">
                    Choose Skill Category
                  </label>
                  <div className="relative">
                    <select
                      id="skills-category"
                      value={activeCategoryIndex}
                      onChange={(event) => setActiveCategoryIndex(Number(event.target.value))}
                      className="w-full appearance-none rounded-2xl border border-primary/30 bg-gradient-to-r from-white to-primary/5 px-4 py-3.5 pr-12 text-base font-semibold text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    >
                      {TECH_CATEGORIES.map((category, index) => (
                        <option key={category.title} value={index}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/80" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="hidden flex-col gap-3 lg:flex">
                  {TECH_CATEGORIES.map((category, index) => (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => setActiveCategoryIndex(index)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                        activeCategoryIndex === index
                          ? "border-primary bg-primary text-white"
                          : "border-softGray bg-white text-black opacity-45 hover:opacity-70"
                      }`}
                    >
                      <span className="text-base font-semibold md:text-lg xl:text-xl">
                        {category.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7">
                  {visibleSkills.map((value, index) => (
                    <ScrollReveal key={`${value}-${index}`} delay={index * 70}>
                      <div className="p-4 xl:p-6 border border-softGray rounded-lg flex flex-col gap-5 sm:gap-10 items-center justify-between h-full">
                        <div className="flex flex-col items-center gap-5">
                          <Image
                            src={getImgPath(TECH_ICON_MAP[value] ?? DEFAULT_TECH_ICON)}
                            alt={value}
                            width={70}
                            height={70}
                          />
                          <p className="text-black font-normal text-center">{value}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {hasMoreSkills && (
                  <div className="mt-7 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllSkills((prev) => !prev)}
                      className="cursor-pointer rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                      {showAllSkills ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <ScrollReveal delay={80}>
              <div className="mt-10 w-full rounded-2xl border border-softGray bg-white p-5 md:p-6">
                <h5 className="mb-5 text-primary text-2xl md:text-3xl">Education</h5>
                <div className="flex flex-col gap-5">
                  {educationData?.education?.map((value, index) => (
                    <div key={`${value.title}-${index}`} className="flex items-start gap-4">
                      <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-primary/70 bg-primary/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-xl md:text-2xl font-semibold text-black">{value.title}</p>
                        <p className="text-lg md:text-xl font-normal">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
