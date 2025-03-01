import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles.css";

// Main App component
function App() {
  const [points, setPoints] = useState(0); // Track total points

  const handleJobCompletion = (jobPoints) => {
    setPoints((prevPoints) => prevPoints + jobPoints); // Add points when job is completed
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/opportunities"
            element={<Opportunities onComplete={handleJobCompletion} />}
          />
          <Route path="/profile" element={<Profile points={points} />} />
          <Route path="/about" element={<About />} /> {/* About page */}
        </Routes>
      </div>
    </Router>
  );
}

// Navbar component with links to each page
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/opportunities">Opportunities</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

// Home page component
function Home() {
  return (
    <div>
      <h1>Welcome to the National Volunteering Society</h1>
      <p>
        Find volunteering opportunities and earn points for your contributions!
      </p>
    </div>
  );
}

// Opportunities page component
function Opportunities({ onComplete }) {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Beach Cleanup", points: 50, completed: false },
    { id: 2, title: "Food Bank Assistance", points: 40, completed: false },
    { id: 3, title: "Tree Planting", points: 60, completed: false },
  ]);

  const handleCompleteJob = (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, completed: true } : job))
    );
    const completedJob = jobs.find((job) => job.id === id);
    onComplete(completedJob.points); // Add points on completion
  };

  return (
    <div>
      <h1>Volunteering Opportunities</h1>
      <ul>
        {jobs.map((job) => (
          <li
            key={job.id}
            style={{
              backgroundColor: job.completed ? "#c8e6c9" : "#b2dfdb",
              opacity: job.completed ? 0.6 : 1,
            }}
          >
            {job.title} - {job.points} points
            {!job.completed && (
              <button onClick={() => handleCompleteJob(job.id)}>
                Complete Task
              </button>
            )}
            {job.completed && <span> - Completed</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Profile page component
function Profile({ points }) {
  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <p>Total Points: {points}</p>
    </div>
  );
}

// About page component with the purpose of the program
function About() {
  return (
    <div>
      <h1>About the National Volunteering Society</h1>
      <p>
        The National Volunteering Society aims to connect individuals with local
        volunteering opportunities and reward them for their contributions. By
        gamifying the volunteer experience, we encourage recurring participation
        and help strengthen local communities.
      </p>
      <h3>What will it do?</h3>
      <p>
        Provide an interface where you can easily see nearby volunteering
        opportunities.
      </p>
      <h3>How will it solve the problem?</h3>
      <p>
        Gamify volunteering, helping local communities and making the process
        more engaging and rewarding.
      </p>
      <h4>Key Features: </h4>
      <p>Points system to reward recurring volunteers</p>
      <p>Filter to narrow down opportunities teens may be interested in</p>
    </div>
  );
}

export default App;
