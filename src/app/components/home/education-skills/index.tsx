"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollReveal from "../../common/ScrollReveal";

interface Skill {
  name: string;
  icon: string;
  rating: number;
}

const DUMMY_SKILLS: Skill[] = [
  { name: "Redux Toolkit", icon: "/images/home/education-skill/react-logo.png", rating: 5 },
  { name: "Tailwind CSS", icon: "/images/home/education-skill/js-logo.png", rating: 5 },
  { name: "Jest", icon: "/images/home/education-skill/typescript.png", rating: 4 },
  { name: "Cypress", icon: "/images/home/education-skill/angular-logo.png", rating: 4 },
  { name: "GraphQL", icon: "/images/home/education-skill/next-logo.png", rating: 4 },
  { name: "Webpack", icon: "/images/home/education-skill/node-logo.png", rating: 3 },
];

const EducationSkills = () => {
  const [educationData, setEductionData] = useState<any>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const baseSkills: Skill[] = educationData?.skills ?? [];
  const allSkills: Skill[] = [...baseSkills, ...DUMMY_SKILLS];
  const visibleSkills: Skill[] = showAllSkills ? allSkills : allSkills.slice(0, 6);
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
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start xl:gap-20">
              <div className="w-full lg:max-w-md flex flex-col gap-0 xl:gap-8 lg:self-start">
                {educationData?.education?.map((value: any, index: any) => {
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="no-print mt-2.5 w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center border-black">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h5>{value?.title}</h5>
                        <p className="font-normal">{value?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full">
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7">
                  {visibleSkills.map((value: Skill, index: number) => {
                    return (
                      <ScrollReveal key={`${value.name}-${index}`} delay={index * 70}>
                        <div className="p-4 xl:p-6 border border-softGray rounded-lg flex flex-col gap-5 sm:gap-10 items-center justify-between h-full">
                          <div className="flex flex-col items-center gap-5">
                            <Image
                              src={getImgPath(value.icon)}
                              alt="icon"
                              width={70}
                              height={70}
                            />
                            <p className="text-black font-normal text-center">{value.name}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                width="9"
                                height="9"
                                viewBox="0 0 9 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="9"
                                  height="9"
                                  rx="4.5"
                                  fill={i < value.rating ? "#FE4300" : "#C0D8E0"}
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
