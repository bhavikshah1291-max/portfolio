import { getImgPath } from "@/utils/image";
import Image from "next/image";
import ScrollReveal from "../../common/ScrollReveal";

const AboutMe = () => {
  return (
    <section id="about-me">
      <div className="relative bg-softGray py-10 md:py-32">
        <div className="absolute top-0 w-full px-9">
          <Image
            src={getImgPath("/images/home/about-me/resume-bg-img.svg")}
            alt="resume-bg-img"
            width={1200}
            height={348}
            className="w-full"
          />
        </div>

        <div className="relative z-10">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center justify-between gap-2 border-b border-black pb-7">
                <h2>About Me</h2>
              </div>
            </ScrollReveal>

            <div className="pt-10 xl:pt-16 flex gap-10 items-center justify-between">
              <ScrollReveal className="hidden lg:flex" delay={40}>
                <div className="w-[303px] h-[440px]">
                  <Image
                    src={getImgPath("/images/home/about-me/about-banner-img.svg")}
                    alt="about-banner"
                    width={303}
                    height={440}
                    className="w-full h-full"
                  />
                </div>
              </ScrollReveal>

              <div className="w-full lg:max-w-2xl flex-1">
                <ScrollReveal delay={80}>
                  <p>
                    I specialized in building <strong>secure, scalable, and high-performance</strong> applications
                    that solve complex engineering challenges and create meaningful <strong>business impact</strong>. 
                     At <strong>Fortinet</strong>, I&apos;ve contributed to enterprise platforms that improve performance,
                    enhance user experience, and support the company&apos;s global digital presence through
                    <strong> modern architectures, cloud technologies and AI-driven capabilities</strong>.
                    I have collaborated across teams, mentoring engineers, and designing solutions that
                    balance technical excellence with business goals. I hold a <strong>Master of Science in
                    Computer Science</strong> from California State University, Long Beach, where I focused on 
                    <strong> distributed systems</strong>, scalable computing, and fault-tolerant architectures—principles
                    that continue to shape how I build <strong>reliable, cloud-native applications</strong> today.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={130}>
                  <div className="grid grid-cols-3 py-10 xl:py-16 gap-5 border-b border-mistGray">
                    {[
                      { count: "10+", label: "Years of experience" },
                      { count: "4+", label: "Sectors Served" },
                      { count: "25+", label: "Project Completed" },
                    ].map((item, i) => (
                      <div key={i}>
                        <h3>{item.count}</h3>
                        <p className="text-base md:text-lg text-black">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={180}>
                  <div className="pt-8 xl:pt-14 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={getImgPath("/images/icon/lang-icon.svg")}
                        alt="lang-icon"
                        width={30}
                        height={30}
                      />
                      <p className="text-base xl:text-xl text-black">Language</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2.5">
                      {["English", "Hindi", "Gujarati"].map((lang) => (
                        <p
                          key={lang}
                          className="bg-white py-2 md:py-3.5 px-4 md:px-5 w-fit rounded-full text-base xl:text-xl"
                        >
                          {lang}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
