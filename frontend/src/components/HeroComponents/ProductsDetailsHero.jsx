import React from "react";
import BackgroundSlideshow from "../BackgroundSlideshow";
import img1 from "../../assets/img/o_1fvaougrmgun1s7q1o9l1fb21edqa.webp";
import img2 from "../../assets/img/o_1fvsfhcj91j0n17is1jq81lotllpb.webp";
import img3 from "../../assets/img/o_1fvsfhcj917q7ovtg4f18qna4c.webp";

export default function ProductsDetailsHero({ calidad, title }) {
  return (
    <section className="relative w-full h-[500px] md:h-[460px] overflow-hidden bg-gray-800 text-white">
      <BackgroundSlideshow images={[img1, img2, img3]} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      <div className="container mx-auto h-full flex flex-col pt-10 relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl bg-black/30 p-4 border-l-4 border-primary backdrop-blur-sm">
          {calidad?.description}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-white"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 30% 0, 0 50%)",
        }}
      ></div>
    </section>
  );
}
