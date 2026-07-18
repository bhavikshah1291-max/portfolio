"use client";

import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import ScrollReveal from "../../common/ScrollReveal";

interface Work {
  client: string;
  image: string;
  designation: string;
  duration: string;
  location: string;
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }[];
}

const LatestWork = () => {
  const [workData, setWorkData] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setWorkData(data.workData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="latest-work">
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32">
            <div className="mb-16 flex items-center justify-between border-b border-black pb-7">
              <h2>Work Experience</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {workData.map((work, index) => (
                <ScrollReveal key={index} delay={index * 70}>
                  <div className="group">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={getImgPath(work.image)}
                        alt={work.client}
                        width={570}
                        height={414}
                        style={{ backgroundColor: "white" }}
                        className="w-full rounded-lg object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => setSelectedWork(work)}
                        aria-label={`Open details for ${work.client}`}
                        className="absolute inset-0 z-10 md:hidden"
                      />

                      <button
                        type="button"
                        onClick={() => setSelectedWork(work)}
                        aria-label={`Open details for ${work.client}`}
                        className="absolute inset-0 z-10 hidden items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm transition cursor-pointer md:flex md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
                      >
                        <svg
                          width="65"
                          height="64"
                          viewBox="0 0 65 64"
                          fill="none"
                        >
                          <rect
                            x="0.333374"
                            width="64"
                            height="64"
                            rx="32"
                            fill="#FE4300"
                          />
                          <path
                            d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4">
                      <p>
                        <strong>Company:</strong> {work.client}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
<Modal isOpen={selectedWork !== null} work={selectedWork} onClose={() => setSelectedWork(null)}/>
    </section>
  );
};

export default LatestWork;