"use client";

import { getImgPath } from "@/utils/image";
import Image from "next/image";

const FooterLogo = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleLogoClick}
      className="cursor-pointer border-none bg-transparent p-0"
    >
      <Image
        src={getImgPath("/images/icon/bhavik-logo.png")}
        alt="logo"
        width={70}
        height={70}
      />
    </button>
  );
};

export default FooterLogo;
