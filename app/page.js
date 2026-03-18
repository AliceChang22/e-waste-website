"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Forest from "@/components/Forest";
import Cave from "@/components/Cave";
import SortingGame from "@/components/SortingGame";

const sections = [Hero, Forest, Cave, SortingGame];
const buttonLabels = ["Start", "Go Deeper", "Next Game", ""];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);


  const goNext = () => {
    if (animating || current >= sections.length - 1) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev => prev + 1);
      setAnimating(false);
    }, 700);
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>

      {sections.map((Section, i) => {
        const isCurrent = i === current;
        const isNext = i === current + 1;

        let transform = "translateY(100%)"; // hidden below by default
        if (isCurrent) transform = animating ? "translateY(-100%)" : "translateY(0)"; // current slides up
        if (isNext) transform = animating ? "translateY(0)" : "translateY(100%)";     // next comes up from below

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: isNext ? 2 : isCurrent ? 1 : 0,
              transform,
              transition: (isCurrent || isNext) && animating ? "transform 0.7s ease" : "none",
            }}
          >
            <Section />
          </div>
        );
      })}

      {current < sections.length - 1 && (
        <button
          onClick={goNext}

          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 18,
            fontWeight: 700, position: "fixed", bottom: "30px", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10
          }}
        >
          {buttonLabels[current]}
        </button>
      )}
    </div>
  );
}