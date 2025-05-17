import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

//import React from "react";
const Page = () => {
  return (
    <div className="min-h-screen bg-[#070709] text-gray-100">
      {/* Advanced background elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0c0c14] to-[#070709] z-[-2]"></div>
      <div className="fixed inset-0 cyber-grid z-[-1] opacity-30"></div>
      
      {/* Animated glow spots */}
      <div className="fixed top-[20%] left-[10%] glow-overlay animate-pulse-glow z-[-1]" 
           style={{animationDelay: "0s"}}></div>
      <div className="fixed top-[60%] right-[15%] glow-overlay animate-pulse-glow z-[-1]" 
           style={{animationDelay: "1.5s", width: "300px", height: "300px"}}></div>
      <div className="fixed bottom-[10%] left-[30%] glow-overlay animate-pulse-glow z-[-1]" 
           style={{animationDelay: "0.7s"}}></div>
           
      {/* Digital constellation effect */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(120,100,250,0.08)_1px,transparent_1px)] bg-[length:30px_30px] z-[-1]"></div>
      
      <Navbar />
      <Hero/>

      </div>
  );
};

export default Page;