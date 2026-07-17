"use client";

import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";

interface Work {
  client: string;
  image: string;
  description: string;
  technologies?: string[];
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
              <p className="text-xl text-primary">(04)</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {workData.map((work, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={getImgPath(work.image)}
                      alt={work.client}
                      width={570}
                      height={414}
                      style={{backgroundColor:'white'}}
                      className="w-full rounded-lg object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setSelectedWork(work)}
                      className="absolute inset-0 hidden items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm transition group-hover:flex cursor-pointer"
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