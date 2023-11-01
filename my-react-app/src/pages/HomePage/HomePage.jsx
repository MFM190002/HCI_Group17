import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home">
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <div className="overlap">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-19-2.svg"
          />
          <div className="text-wrapper-2">Sign Out</div>
        </div>
        <div className="text-wrapper-3">Upcoming Checkpoints</div>
        <div className="text-wrapper-4">Friends Leaderboard</div>
        <div className="overlap-group">
          <div className="text-wrapper-5">Progress</div>
          <div className="text-wrapper-6">Goal</div>
          <div className="rectangle-2" />
        </div>
        <div className="overlap-2">
          <div className="group">
            <div className="overlap-group-2">
              <div className="text-wrapper-7">Post Malone</div>
              <div className="rectangle-3" />
            </div>
          </div>
          <div className="text-wrapper-7">{""}</div>
        </div>
        <div className="friend-wrapper">
          <div className="friend">
            <div className="overlap-group-2">
              <div className="text-wrapper-7">Harry Styles</div>
              <div className="rectangle-3" />
            </div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap-3">
            <img
              className="img"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-24-4.svg"
            />
            <div className="text-wrapper-8">View Friends</div>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-3">
            <img
              className="img"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-24-5.svg"
            />
            <div className="text-wrapper-8">View Checkpoints</div>
          </div>
        </div>
        <div className="group-2">
          <div className="rectangle-4" />
          <div className="text-wrapper-9">Draft College Essay</div>
        </div>
        <div className="group-3">
          <div className="rectangle-4" />
          <div className="text-wrapper-10">Start Application to UTD</div>
        </div>
        <div className="group-4">
          <div className="rectangle-4" />
          <div className="text-wrapper-11">Fill out FAFSA</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
