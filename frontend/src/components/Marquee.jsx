import React from "react";

export default function Marquee({ items = [], speed = 20 }) {
  if (!items.length) return null;

  const listContent = (
    <div className="flex shrink-0 items-center">
      {items.map((it, idx) => (
        <React.Fragment key={idx}>
          <span className="mx-10 inline-block">{it}</span>
          <span className="mx-10">•</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#555] text-white text-xs py-2 overflow-hidden">
      <div
        className="flex animate-marquee whitespace-nowrap tracking-widest uppercase font-semibold"
        style={{ animationDuration: `${speed}s` }}
      >
        {listContent}
        {listContent}
      </div>
    </div>
  );
}
