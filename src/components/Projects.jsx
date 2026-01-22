import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <section className="h-screen bg-[#212121] text-white text-4xl font-black flex justify-center items-center">
        MY ALL PROJECTS
      </section>

      {["PROJECT ONE", "PROJECT TWO", "PROJECT THREE"].map((text, i) => (
        <section
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="h-screen bg-white border border-black text-black text-4xl font-black flex justify-center items-start py-12"
        >
          {text}
        </section>
      ))}
    </>
  );
};

export default Projects;
