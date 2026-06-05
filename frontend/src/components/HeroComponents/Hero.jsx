import React from "react";
import BackgroundSlideshow from "../BackgroundSlideshow";
import img1 from "../../assets/img/o_1fvaougrmgun1s7q1o9l1fb21edqa.webp";
import img2 from "../../assets/img/o_1fvsfhcj91j0n17is1jq81lotllpb.webp";
import img3 from "../../assets/img/o_1fvsfhcj917q7ovtg4f18qna4c.webp";

export default function Hero({
  title,
  description,
  desktopHeroHeight,
  mobileHeroHeight,
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-gray-800 text-white flex flex-col justify-center"
      style={{
        minHeight:
          window.innerWidth < 768 ? mobileHeroHeight : desktopHeroHeight,
      }}
    >
      <BackgroundSlideshow images={[img1, img2, img3]} />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-0"></div>

      <div className="container mx-auto h-full flex flex-col justify-center pt-20 pb-28 relative z-10 px-6">
        <h1 className="text-3xl md:text-6xl font-black mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-base md:text-xl max-w-2xl bg-black/40 p-4 border-l-4 border-red-600 backdrop-blur-sm">
          {description}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white z-20"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 30% 0, 0 50%)",
        }}
      ></div>
    </section>
  );
}
