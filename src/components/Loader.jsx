import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Line from "./Line";
import About from "./About";

export default function Loader() {
  const loaderRef = useRef(null);
  const countRef = useRef(null);
  const [count, setCount] = useState(0);
  const [showContent, setShowContent] = useState(false); // Line + About mount

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100; // max 100
      setCount(current);
      if (current === 100) {
        clearInterval(interval);
        // Keep count visible at 100
        gsap.to(countRef.current, {
          duration: 0.5,
          y: 0, // stay in place
        });
        // Mount Line + About after small delay
        setTimeout(() => setShowContent(true), 500);
      }
    }, 35);

    gsap.to(countRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      delay:4.5
    });

    gsap.to(".loader", {
      opacity: 0,
      y: 100,
      duration: 0.5,
      delay:5
    });

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <div
        ref={loaderRef}
        className="text-white font-[one] flex justify-end items-end text-9xl z-50 loader"
      >
        <div ref={countRef}>{count}</div>
      </div>

      {showContent && (
        <>
          <Line />
          <About />
        </>
      )}

    </div>
  );
}
