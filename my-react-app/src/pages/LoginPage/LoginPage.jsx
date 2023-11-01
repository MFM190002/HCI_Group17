import React from "react";
import "./style.css";

function LoginPage() {
  return (
    <div className="index">
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="text-wrapper-2">username</div>
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="text-wrapper-2">username</div>
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="rectangle" />
          <div className="text-wrapper-2">username</div>
        </div>
        <div className="overlap">
          <div className="text-wrapper-2">password</div>
          <div className="rectangle" />
          <div className="text-wrapper-2">password</div>
          <div className="rectangle" />
          <div className="text-wrapper-2">password</div>
        </div>
        <div className="overlap-2">
          <div className="rectangle-2" />
          <div className="text-wrapper-3">Login</div>
        </div>
        <div className="overlap-3">
          <img
            className="img"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-8.svg"
          />
          <div className="text-wrapper-4">Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
