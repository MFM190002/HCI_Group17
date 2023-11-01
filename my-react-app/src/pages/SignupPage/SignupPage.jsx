import React from "react";
import "./style.css";

function SignupPage() {
  return (
    <div className="index">
      <div className="div">
        <div className="text-wrapper">Sign Up</div>
        <div className="overlap">
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="text-wrapper-2">First Name</div>
        </div>
        <div className="overlap-group">
          <div className="text-wrapper-3">Last Name</div>
        </div>
        <div className="overlap-2">
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="text-wrapper-2">Password</div>
        </div>
        <div className="div-wrapper">
          <div className="text-wrapper-4">Confirm Password</div>
        </div>
        <div className="overlap-group-2">
          <img
            className="img"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-18.svg"
          />
          <div className="text-wrapper-5">Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;