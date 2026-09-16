import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, Clock, Star, Loader2, ArrowRight } from 'lucide-react';
import './App.css';

const Home = () => (
  <div className="hero">
    <div className="container">
      <h1 className="text-gradient">Learn. Practice.<br/>Build. Grow.</h1>
      <p>Master modern technologies with our AI-powered learning platform. Interactive courses, real-time feedback, and a community of developers.</p>
      <div className="navbar-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/courses" className="btn btn-primary">
          Explore Courses <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses from our new Spring Boot API
    fetch('/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setError('Unable to load courses at this time. The backend might not be running yet.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Explore Courses</h2>
        <p className="text-muted">Discover our curated collection of premium courses.</p>
      </div>

      {loading && (
        <div className="loader">
          <Loader2 className="spinner" size={48} />
        </div>
      )}

      {error && (
        <div className="glass-card" style={{ textAlign: 'center', color: 'var(--accent)' }}>
          <p>{error}</p>
          <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            We've set up the frontend connection to /api/courses, but the backend server needs to be running.
          </p>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <p className="text-muted">No courses available right now.</p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="course-grid">
          {courses.map(course => (
            <div key={course.id} className="glass-card course-card">
              {course.imageUrl ? (
                <img src={course.imageUrl} alt={course.title} className="course-image" />
              ) : (
                <div className="course-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, var(--primary-light), var(--bg-surface-hover))' }}>
                  <Code size={48} color="var(--primary)" />
                </div>
              )}
              <div className="course-content">
                <div className="course-category">{course.difficulty || 'All Levels'}</div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-footer">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} /> {course.duration || 'Self-paced'}
                  </span>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const About = () => (
  <div className="container">
    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <Terminal size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>About SAVIOPZI</h2>
      <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        SAVIOPZI is an AI-powered e-learning platform designed to bridge the gap between theory and practice. 
        We believe in learning by doing, supported by intelligent guidance every step of the way.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', fontSize: '2rem' }}>10k+</h3>
          <p className="text-muted">Active Learners</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--success)', fontSize: '2rem' }}>50+</h3>
          <p className="text-muted">Premium Courses</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--warning)', fontSize: '2rem' }}>4.9</h3>
          <p className="text-muted"><Star size={16} fill="currentColor" /> Average Rating</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <BookOpen color="var(--primary)" />
              SAVIOPZI
            </Link>
            
            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/courses" className="nav-link">Courses</Link>
              <Link to="/about" className="nav-link">About</Link>
            </div>

            <div className="navbar-actions">
              <button className="btn btn-outline">Login</button>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="navbar-brand" style={{ justifyContent: 'center', opacity: 0.7 }}>
              <BookOpen size={20} /> SAVIOPZI
            </div>
            <p className="footer-text">© 2026 SAVIOPZI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
