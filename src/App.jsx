import React, { useState, useEffect } from 'react';
import './elearning-platform_App.css';

const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'React 18 & Modern Frontend Architecture',
    instructor: 'Dr. Angela Yu',
    category: 'Development',
    badge: '⚛️',
    description: 'Master React, hooks, server components, state management and enterprise patterns.',
    lessons: [
      { id: 'l101', title: '01. Introduction to React 18 & Concurrent Features', duration: '12 min' },
      { id: 'l102', title: '02. State Management with useState & useReducer', duration: '24 min' },
      { id: 'l103', title: '03. Effect Lifecycle and Custom Hooks', duration: '18 min' },
      { id: 'l104', title: '04. Building High Performance Component Trees', duration: '30 min' },
      { id: 'l105', title: '05. Context API vs Modern Stores', duration: '22 min' },
    ]
  },
  {
    id: 'c2',
    title: 'Mastering CSS Grid & Responsive Layouts',
    instructor: 'Kevin Powell',
    category: 'Design',
    badge: '🎨',
    description: 'Learn modern CSS layouts from scratch: Flexbox, CSS Grid, and Container Queries.',
    lessons: [
      { id: 'l201', title: '01. Flexbox vs Grid Fundamentals', duration: '15 min' },
      { id: 'l202', title: '02. Auto-fit vs Auto-fill Grid Templates', duration: '20 min' },
      { id: 'l203', title: '03. Named Grid Areas & Responsive Media', duration: '25 min' },
      { id: 'l204', title: '04. Container Queries Masterclass', duration: '19 min' },
    ]
  },
  {
    id: 'c3',
    title: 'Node.js & Express RESTful API Engineering',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Backend',
    badge: '🚀',
    description: 'Build secure, scalable Node backend services with auth, database integration, and testing.',
    lessons: [
      { id: 'l301', title: '01. Event Loop & Node.js Architecture', duration: '14 min' },
      { id: 'l302', title: '02. Express Middleware Architecture', duration: '22 min' },
      { id: 'l303', title: '03. JWT Authentication & Security Headers', duration: '28 min' },
      { id: 'l304', title: '04. Database Schemas with MongoDB & Prisma', duration: '35 min' },
      { id: 'l305', title: '05. API Rate Limiting & Performance Optimization', duration: '16 min' },
      { id: 'l306', title: '06. Deploying to Cloud Microservices', duration: '20 min' },
    ]
  },
  {
    id: 'c4',
    title: 'TypeScript 5.0 for Frontend Engineers',
    instructor: 'Dan Abramov',
    category: 'Development',
    badge: '📘',
    description: 'Type safety from basic annotations to generics, conditional types, and strict mode.',
    lessons: [
      { id: 'l401', title: '01. Static Typing Basics & Type Inference', duration: '10 min' },
      { id: 'l402', title: '02. Union, Intersection & Discriminated Unions', duration: '18 min' },
      { id: 'l403', title: '03. Generics & Utility Types', duration: '26 min' },
      { id: 'l404', title: '04. Strict Compiler Options & Best Practices', duration: '21 min' },
    ]
  },
  {
    id: 'c5',
    title: 'UI/UX Principles for Software Engineers',
    instructor: 'Steve Schoger',
    category: 'Design',
    badge: '✨',
    description: 'Practical visual design tricks, typography, contrast, spacing, and micro-interactions.',
    lessons: [
      { id: 'l501', title: '01. Hierarchy, Scale and Whitespace', duration: '15 min' },
      { id: 'l502', title: '02. Color Theory & Accessibility', duration: '17 min' },
      { id: 'l503', title: '03. Micro-interactions and Animation Guidelines', duration: '24 min' },
      { id: 'l504', title: '04. Design Systems & Tokens', duration: '30 min' },
      { id: 'l505', title: '05. Usability Testing & Feedback Loops', duration: '12 min' },
    ]
  },
];

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [activeLesson, setActiveLesson] = useState(null);

  // Completed lesson IDs set stored in localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('elearning_completed_lessons');
      return saved ? JSON.parse(saved) : ['l101', 'l102', 'l201'];
    } catch (e) {
      return ['l101', 'l102', 'l201'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('elearning_completed_lessons', JSON.stringify(completedLessons));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessons]);

  const toggleLessonCompletion = (lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  // Calculate overall statistics
  const totalLessonsAll = INITIAL_COURSES.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalCompletedAll = completedLessons.length;
  const overallProgressPct = Math.round((totalCompletedAll / totalLessonsAll) * 100) || 0;

  const selectedCourse = INITIAL_COURSES.find(c => c.id === selectedCourseId);

  const categories = ['All', 'Development', 'Design', 'Backend'];

  const filteredCourses = activeTab === 'All' 
    ? INITIAL_COURSES 
    : INITIAL_COURSES.filter(c => c.category === activeTab);

  const getCourseProgress = (course) => {
    const completedCount = course.lessons.filter(l => completedLessons.includes(l.id)).length;
    const totalCount = course.lessons.length;
    return {
      completedCount,
      totalCount,
      percentage: Math.round((completedCount / totalCount) * 100),
    };
  };

  return (
    <div className="el-app">
      {/* Top Navbar */}
      <header className="el-navbar">
        <div className="el-brand" onClick={() => { setSelectedCourseId(null); setActiveLesson(null); }}>
          <span className="el-logo-badge">🎓</span>
          <span className="el-brand-title">SkillPulse Academy</span>
        </div>
        <div className="el-global-stats">
          <div className="el-stat-pill">
            <span>Overall Learning Progress</span>
            <strong>{totalCompletedAll} / {totalLessonsAll} Lessons ({overallProgressPct}%)</strong>
          </div>
          <div className="el-progress-bar-sm">
            <div className="el-progress-fill" style={{ width: `${overallProgressPct}%` }}></div>
          </div>
        </div>
      </header>

      <main className="el-main-content">
        {!selectedCourse ? (
          /* Course List View */
          <div className="el-dashboard">
            <div className="el-hero">
              <h2>Expand Your Engineering & Design Skills</h2>
              <p>Explore top rated courses, track your lesson completions, and earn certificates.</p>
            </div>

            {/* Category Filters */}
            <div className="el-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`el-cat-btn ${activeTab === cat ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="el-courses-grid">
              {filteredCourses.map(course => {
                const prog = getCourseProgress(course);
                return (
                  <div key={course.id} className="el-course-card" onClick={() => setSelectedCourseId(course.id)}>
                    <div className="el-course-header">
                      <span className="el-course-badge">{course.badge}</span>
                      <span className="el-course-cat">{course.category}</span>
                    </div>
                    <h3 className="el-course-title">{course.title}</h3>
                    <p className="el-course-instructor">By {course.instructor}</p>
                    <p className="el-course-desc">{course.description}</p>
                    
                    <div className="el-course-footer">
                      <div className="el-prog-info">
                        <span>{prog.completedCount}/{prog.totalCount} Lessons</span>
                        <span>{prog.percentage}%</span>
                      </div>
                      <div className="el-progress-track">
                        <div className="el-progress-fill" style={{ width: `${prog.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Course Detail View */
          <div className="el-detail-view">
            <button className="el-back-btn" onClick={() => { setSelectedCourseId(null); setActiveLesson(null); }}>
              ← Back to All Courses
            </button>

            <div className="el-detail-grid">
              {/* Left Column: Player / Lesson Viewer */}
              <div className="el-player-section">
                <div className="el-video-placeholder">
                  <div className="el-play-icon">▶</div>
                  <p className="el-video-title">
                    {activeLesson ? activeLesson.title : 'Select a lesson to begin watching'}
                  </p>
                  <p className="el-video-sub">Interactive HD Video Stream (Mock Player)</p>
                </div>

                <div className="el-course-overview">
                  <div className="el-badge-title">
                    <span className="el-course-badge">{selectedCourse.badge}</span>
                    <div>
                      <h2>{selectedCourse.title}</h2>
                      <p>Instructor: {selectedCourse.instructor}</p>
                    </div>
                  </div>
                  <p className="el-overview-desc">{selectedCourse.description}</p>
                </div>
              </div>

              {/* Right Column: Lessons List Checklist */}
              <div className="el-lessons-sidebar">
                <div className="el-sidebar-header">
                  <h3>Course Lessons</h3>
                  {(() => {
                    const prog = getCourseProgress(selectedCourse);
                    return <span>{prog.completedCount} / {prog.totalCount} Completed ({prog.percentage}%)</span>;
                  })()}
                </div>

                <div className="el-lessons-list">
                  {selectedCourse.lessons.map(lesson => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = activeLesson?.id === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`el-lesson-item ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveLesson(lesson)}
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleLessonCompletion(lesson.id);
                          }}
                          className="el-checkbox"
                        />
                        <div className="el-lesson-info">
                          <span className={`el-lesson-title ${isCompleted ? 'done' : ''}`}>
                            {lesson.title}
                          </span>
                          <span className="el-lesson-time">⏱ {lesson.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
