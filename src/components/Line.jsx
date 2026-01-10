import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Nav from "./Nav";

const Line = () => {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const menuRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.in" } });

    tl.fromTo(boxRef.current, { x: "-100%" }, { x: "0%", duration: 1.5, delay: 0.2 })
      .to(boxRef.current, { height: "100vh", duration: 1.2, delay:0.5, ease: "power2.out" })
     tl.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
  .fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

  }, []);

  const handleOpenNav = () => {
    setNavVisible(true);
    setNavOpen(true);
  };

  const handleCloseNav = () => {
    setNavOpen(false);
  };

  return (
    <div className="flex h-screen justify-center items-center relative">
      <div
        ref={boxRef}
        className="h-[2vh] w-screen bg-white text-center text-7xl font-extrabold z-50 flex items-center justify-center"
      >
        <p ref={textRef}>
          A CREATIVE WEBSITE AGENCY <br /> WE MAKE YOUR IDEAS COME TRUE
        </p>
      </div>

      <button
        onClick={handleOpenNav}
        ref={menuRef}
        className="fixed top-5 left-5 z-[500] font-extrabold bg-black text-white px-4 py-2 text-sm"
      >
        MENU
      </button>

      {navVisible && (
        <Nav
          closeNav={handleCloseNav}
          navOpen={navOpen}
          setNavVisible={setNavVisible}
        />
      )}
    </div>
  );
};

export default Line;