import Image from "next/image";
import React from "react";

const TitleNays = () => {
  return (
    <Image
      src="/naysDream.svg"
      className="flex justify-center"
      alt="Nay's Dreams"
      width={300}
      height={300}
    />
  );
};

export default TitleNays;
