import { useEffect, useState } from "react";
import "./App.css";
import { getOverview, type OverviewData } from "./api";

const fallbackData: OverviewData = {
  academicYear: "2024–25",
  semesterLabel: "This semester",
  totalStudents: 13991,
  undergraduate: 10490,
  graduate: 3501,
  eventsThisWeek: 48,
  topEvents: [
    { id: 1, name: "Welcome Week Social", department: "Campus Life", date: "Sep 12", attendance: 245, percentage: 92 },
    { id: 2, name: "Career Connections", department: "Career Center", date: "Sep 11", attendance: 213, percentage: 90 },
    { id: 3, name: "Retriever Pantry Pop-up", department: "Retriever Essentials", date: "Sep 10", attendance: 186, percentage: 88 },
    { id: 4, name: "Graduate Coffee Hour", department: "Graduate Student Life", date: "Sep 09", attendance: 127, percentage: 76 }
  ],
  source: "demo"
};

function App() {
  const [data, setData] = useState<OverviewData>(fallbackData);
  const [profileOpen, setProfileOpen] = useState(false);
  const [status, setStatus] = useState("Loading dashboard...");

  useEffect(() => {
    getOverview()
      .then((overview) => {
        setData(overview);
        setStatus("");
      })
      .catch(() => setStatus("Backend not connected yet — showing demo values."));
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">D</div>
          <div>
            <div className="brand-title">Division Impact</div>
            <div className="brand-subtitle">DEAN OF STUDENTS</div>
          </div>
        </div>

        <div className="nav-label">DASHBOARD</div>
        <nav className="nav">
          <button className="nav-item active">▦ <span>Overview</span></button>
          <button className="nav-item">♙ <span>Student engagement</span></button>
          <button className="nav-item">□ <span>Events</span></button>
          <button className="nav-item nav-parent">▣ <span>Services</span><span className="chevron">⌄</span></button>

          <div className="service-child">
            <span className="service-dot">•</span>
            <span>Retriever Essentials</span>
            <span className="pill">INTEGRATED</span>
          </div>

          <button className="nav-item contact-item">✉ <span>Contact Us</span></button>
        </nav>

        <div className="manage-label">MANAGE</div>
        <div className="help-card">
          <strong>Need help with your data?</strong>
          <p>Review upload guidelines and accepted formats.</p>
          <button>View data guide →</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">Dean of Students <span>›</span> <strong>Overview</strong></div>

          <div className="top-actions">
            <button className="icon-button" aria-label="Search">⌕</button>
            <button className="icon-button notification" aria-label="Notifications">♧<span className="notification-dot" /></button>

            <div className="profile-wrap">
              <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="avatar">TU</span>
                <span className="profile-text">
                  <strong>Test User</strong>
                  <small>Administrator</small>
                </span>
                <span>⌃</span>
              </button>

              {profileOpen && (
                <div className="profile-menu">
                  <div className="menu-user">
                    <strong>Test User</strong>
                    <small>testuser@umbc.edu</small>
                  </div>
                  <button>♙ <span>Profile</span></button>
                  <button>⚙ <span>Settings</span></button>
                  <button>◊ <span>Privacy &amp; Security</span></button>
                  <button>◔ <span>Appearance</span></button>
                  <button>ⓘ <span>Help &amp; Support</span></button>
                  <div className="menu-separator" />
                  <button className="sign-out">↪ <span>Sign out</span></button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="page">
          <div className="eyebrow">ACADEMIC YEAR {data.academicYear}</div>

          <div className="hero-row">
            <div>
              <h1>Division impact overview</h1>
              <p>A current view of student reach, participation, and campus engagement.</p>
            </div>

            <div className="hero-actions">
              <select defaultValue={data.semesterLabel} aria-label="Date range">
                <option>{data.semesterLabel}</option>
                <option>This academic year</option>
              </select>
              <button className="upload-button">↥ <span>Upload data</span></button>
            </div>
          </div>

          {status && <div className="status-note">{status}</div>}

          <div className="metric-grid">
            <MetricCard title="Total students" value={data.totalStudents} detail="↑ 1.8%" note="vs. last academic year" />
            <MetricCard title="Undergraduate" value={data.undergraduate} detail="↑ 2.1%" note="75% of enrollment" />
            <MetricCard title="Graduate" value={data.graduate} detail="↑ 0.9%" note="25% of enrollment" />
            <MetricCard title="Events this week" value={data.eventsThisWeek} detail="↑ 10.4%" note="From last week" />
          </div>

          <div className="insight-banner">
            <strong>First-year students</strong> are the most engaged group, accounting for over one-third of attendance.
          </div>

          <section className="events-card">
            <div className="events-heading">
              <div>
                <h2>Top events this week</h2>
                <p>Ranked by total attendance</p>
              </div>
              <span className="demo-badge">{data.source === "demo" ? "DEMO DATA" : "LIVE DATA"}</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>EVENT</th><th>DEPARTMENT</th><th>DATE</th><th>ATTENDANCE</th><th>RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topEvents.map((event) => (
                    <tr key={event.id}>
                      <td><div className="event-name"><span className="rank">{event.id}</span><strong>{event.name}</strong></div></td>
                      <td>{event.department}</td>
                      <td>{event.date}</td>
                      <td><strong>{event.attendance}</strong></td>
                      <td><span className="rate">{event.percentage}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="page-footer">Last updated today · Data reflects uploaded division records</footer>
        </section>
      </main>
    </div>
  );
}

function MetricCard(props: { title: string; value: number; detail: string; note: string }) {
  return (
    <article className="metric-card">
      <div className="metric-card-top"><span>{props.title}</span><span className="metric-icon">♙</span></div>
      <div className="metric-value">{props.value.toLocaleString()}</div>
      <div className="metric-meta"><span className="metric-change">{props.detail}</span><span>{props.note}</span></div>
    </article>
  );
}

export default App;
