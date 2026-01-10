import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Nav = ({ closeNav, navOpen, setNavVisible }) => {
  const navRef = useRef(null);
  const linksRef = useRef(null);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const handleHoverIn = (e) => {
  const chars = e.currentTarget.querySelectorAll(".char");
  gsap.to(chars, {
    yPercent: -8,
    duration: 0.4,
    ease: "power3.out",
    stagger: {
      each: 0.03,
      from: 'center'
    }
  });
};

const handleHoverOut = (e) => {
  const chars = e.currentTarget.querySelectorAll(".char");
  gsap.to(chars, {
    yPercent: 0,
    duration: 0.2,
    ease: "power3.out",
    stagger: {
      each: 0.03,
      from: 'center'
    }
  });
};



useEffect(() => {
  const row = linksRef.current;
  const containerWidth = row.parentElement.offsetWidth;
  const contentWidth = row.scrollWidth;
  const maxTranslate = containerWidth - contentWidth;

  let prevX = null;
  let currentX = 0;
  let ticking = false;
  const multiplier = 2;

  const handleMouseMove = (e) => {
    if (prevX === null) prevX = e.clientX;
    const delta = e.clientX - prevX;
    prevX = e.clientX;

    currentX -= delta * multiplier;
    currentX = gsap.utils.clamp(maxTranslate, 0, currentX);

    if (!ticking) {
      requestAnimationFrame(() => {
        gsap.to(row, {
          x: currentX,
          duration: 1.2,
          ease: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        });
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", () => (prevX = null));

  // Kill all tweens to prevent conflicts
  gsap.killTweensOf(navRef.current);
  gsap.killTweensOf(".navbar-bottom");

  if (navOpen) {
    gsap.fromTo(
      navRef.current,
      { y: "100%" },
      { y: "0%", duration: 1.5, ease: "expo.out" }
    );

    gsap.fromTo(
      ".navbar-bottom",
      { y: "100%", opacity: 0 },
      { y: "0%", duration: 1, delay: 0.5, ease: "power4.out", opacity: 1 }
    );
  } else {
    gsap.to(navRef.current, {
      y: "-100%",
      duration: 1.5,
      ease: "expo.out",
      onComplete: () => setNavVisible(false),
    });

    gsap.to(".navbar-bottom", {
      y: "-50%",
      opacity: 0,
      duration: 1,
      ease: "expo.out",
    });
  }

  return () => window.removeEventListener("mousemove", handleMouseMove);
}, [navOpen, setNavVisible]);


  return (
    <div
      ref={navRef}
      className="bg-[#212121] flex h-screen w-screen fixed inset-0 z-[1000]"
    >
      <button
        onClick={closeNav}
        className="fixed top-5 left-5 z-[600] bg-white text-black px-4 py-2 font-extrabold text-sm"
      >
        CLOSE
      </button>

      <div className="navbar-bottom absolute bottom-0 my-2 h-[30vh] w-full overflow-hidden flex items-center">
        <div
          ref={linksRef}
          className="links-row flex px-15 gap-10 uppercase text-white text-[10vw] font-black"
        >
          {["Home", "About", "Projects", "Contact"].map((text, i) => (
            <span
              key={i}
              onClick={closeNav}
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
              className="relative overflow-hidden group  cursor-pointer whitespace-nowrap h-[27vh] inline-block"
            >
              <span className="nav-line">
                {splitText(text)}
                <span className="text-[#A1FF62]">.</span>
              </span>

              <span className="nav-line absolute left-0 ">
                {splitText(text)}
                <span className="text-[#A1FF62]">.</span>
              </span>
              
                 <span className="absolute bottom-0 left-0 w-0 h-[5px] bg-[#A1FF62] transition-all duration-300 ease-out group-hover:w-full" />

            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;

