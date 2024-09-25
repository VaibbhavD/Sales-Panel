import React from "react";
import Logos from "../../assets/logo.png";

function Logo({ size }) {
  return (
    <div className="flex-shrink-0 bg-white">
      <img src={Logos} alt="Logo" width={300} />
    </div>
  );
}

export default Logo;
