import React from "react";
import Logos from "../../assets/logo.png";

function Logo() {
  return (
    <div className="flex-shrink-0 bg-white">
      <img src={Logos} alt="Logo" className="h-14 w-auto" />
    </div>
  );
}

export default Logo;
