import React from "react";
import "./HomePage.css";
import {Link} from 'react-router-dom';

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
          
          <Link to="/" className="text-wrapper-2">
            Sign Out
          </Link>
        </div>
        <div className="text-wrapper-3">Your Upcoming Checkpoints</div>
        <div className="text-wrapper-4">Friends Leaderboard</div>
        <div className="overlap-group">
          <div className="text-wrapper-5">Progress</div>
          <div className="rectangle-2" />
        </div>
        <div className="overlap-wrapper">
          <div className="view-friends">
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
        <div className="checkpoints" >
          <div className="group-2">
            <div className="rectangle-4" />
            <div className="text-wrapper-9">Research 5 Colleges</div>
          </div>
          <div className="group-3">
            <div className="rectangle-4" />
            <div className="text-wrapper-10">Fill out FAFSA</div>
          </div>
          <div className="group-4">
            <div className="rectangle-4" />
            <div className="text-wrapper-11">Create your resume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
