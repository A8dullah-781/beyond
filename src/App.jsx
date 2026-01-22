import React from "react";
import Loader from "./components/Loader.jsx";
import LocomotiveScroll from 'locomotive-scroll';


export default function App() {
const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="App bg-black min-h-screen overflow-hidden">
      <Loader />
    </div>
  );
}
