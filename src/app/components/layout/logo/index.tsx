import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src={getImgPath("/images/icon/bhavik-logo.png")}
          alt="logo"
          width={70}
          height={70}
        />
      </Link>
    </>
  );
};

export default Logo;
