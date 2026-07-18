"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ContactItem {
  type: string;
  label: string;
  icon: string;
  sectionId: string;
}

interface SocialItem {
  platform: string;
  icon: string;
  link: string;
}

interface ContactBarData {
  contactItems: ContactItem[];
  socialItems: SocialItem[];
}

const ContactBar = () => {
  const [contactBarData, setContactBarData] = useState<ContactBarData | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileStickyActive, setIsMobileStickyActive] = useState<boolean>(false);
  const mobileStickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactBarData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const items = contactBarData?.contactItems;

    if (!items?.length) return;

    const updateActiveSection = () => {
      let currentSectionId = "";

      items.forEach((item) => {
        const sectionElement = document.getElementById(item.sectionId);

        if (!sectionElement) return;

        const sectionTop = sectionElement.getBoundingClientRect().top;

        if (sectionTop <= 140) {
          currentSectionId = item.sectionId;
        }
      });

      setActiveSectionId(currentSectionId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [contactBarData]);

  useEffect(() => {
    const updateStickyState = () => {
      const stickyElement = mobileStickyRef.current;

      if (!stickyElement) return;

      if (window.innerWidth >= 768) {
        setIsMobileStickyActive(false);
        return;
      }

      const topOffset = 12;
      const currentTop = stickyElement.getBoundingClientRect().top;
      setIsMobileStickyActive(currentTop <= topOffset + 1);
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });
    window.addEventListener("resize", updateStickyState);

    return () => {
      window.removeEventListener("scroll", updateStickyState);
      window.removeEventListener("resize", updateStickyState);
    };
  }, []);

  useEffect(() => {
    if (!isMobileStickyActive && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileStickyActive, isMobileMenuOpen]);

  return (
    <>
      <div ref={mobileStickyRef} className="sticky top-3 z-1000 md:hidden">
        <div className="container">
          <div
            className={`relative w-fit transition-opacity duration-200 ${
              isMobileStickyActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full border border-black/10 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-semibold text-black">Menu</span>
            </button>

            {isMobileMenuOpen && (
              <div className="absolute left-0 top-[calc(100%+0.5rem)] w-[15rem] rounded-2xl border border-black/10 bg-white p-2 shadow-lg">
                {contactBarData?.contactItems?.map((item) => (
                  <button
                    key={item.sectionId}
                    type="button"
                    onClick={(e) => {
                      handleSectionClick(item.sectionId, e);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-softGray"
                  >
                    <span className="text-sm font-medium text-black">{item.label}</span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        activeSectionId === item.sectionId ? "bg-primary" : "bg-softGray"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="sticky top-0 z-100 hidden bg-white md:block">
        <div className="border-t border-softGray">
          <div className="container">
            <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row md:py-7">
              <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start md:gap-5 lg:gap-11">
                {contactBarData?.contactItems?.map((value) => (
                  <button
                    type="button"
                    key={value.sectionId}
                    onClick={(e) => handleSectionClick(value.sectionId, e)}
                    className="flex cursor-pointer items-center gap-2 border-none bg-none p-0 text-sm md:text-base lg:gap-4"
                  >
                    <Image
                      src={getImgPath(value.icon)}
                      alt={value.type}
                      width={24}
                      height={24}
                      className="mb-1 min-h-[24px] min-w-[24px] shrink-0"
                    />

                    <span
                      className={`inline-flex items-center border-b-4 pb-0.5 text-sm leading-none transition-colors md:text-base xl:text-xl ${
                        activeSectionId === value.sectionId
                          ? "border-primary text-primary"
                          : "border-transparent hover:text-primary"
                      }`}
                    >
                      {value.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 md:justify-end md:gap-2.5">
                {contactBarData?.socialItems?.map((value, index) => (
                  <a
                    key={index}
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={getImgPath(value.icon)}
                      alt={value.platform}
                      width={30}
                      height={30}
                      className="hover:opacity-80"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactBar;
