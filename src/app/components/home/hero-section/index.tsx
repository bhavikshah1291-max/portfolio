import { getImgPath } from "@/utils/image";
import Image from "next/image";

const index = () => {
  return (
    <section className="relative hero-section overflow-hidden pt-35 md:pt-40 pb-12 lg:pb-30 xl:pt-52">
      <div className="container">
        <div className="lg:flex grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-4 items-center">
          <div className="hero-fade-up hero-delay-1 flex max-w-2xl flex-col gap-4 md:gap-7">
            <div className="hero-fade-up hero-delay-2">
              <div className="flex items-center gap-8">
                <h1>I'm Bhavik</h1>
                <div className="wave">
                  <Image
                    src={getImgPath("/images/home/banner/wave-icon.svg")}
                    alt="wave-icon"
                    width={62}
                    height={62}
                    className=""
                  />
                </div>
              </div>
              <h1>Senior Software Engineer</h1>
            </div>
            <p className="hero-fade-up hero-delay-3 text-secondary font-normal max-w-md xl:max-w-xl">
           Based in the <strong>San Francisco Bay Area, California,</strong> I am currently building enterprise-scale solutions at <strong>Fortinet Inc.</strong> With <strong>10+</strong> years of experience building scalable, high-performance web applications, I specialize in <strong>React, JavaScript, TypeScript, Next.js,</strong> and modern frontend technologies. I enjoy architecting impactful solutions and creating seamless digital experiences that deliver meaningful business value</p>
          </div>
          <Image
            src={getImgPath("/images/home/banner/Bhavik.jpeg")}
            alt="banner-img"
            width={685}
            height={650}
            className="hero-fade-up hero-delay-3 block lg:hidden"
          />
        </div>
      </div>
      <div className="hero-fade-right hero-delay-2 absolute right-0 top-0 hidden h-auto w-1/2 lg:block 2xl:h-171.5 2xl:w-187.5">
        <Image
          src={getImgPath("/images/home/banner/Bhavik.jpeg")}
          alt="banner-img"
          width={685}
          height={650}
          className=" absolute right-0 top-0 z-1"
        />
      </div>
    </section>
  );
};

export default index;
