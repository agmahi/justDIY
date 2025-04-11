import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";
import JobViewer from "./components/jobViewer";

function App() {
  return (
    <Router>
      {/* Outer shell for full screen layout */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
        {/* Centered card container */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          {/* Nav bar */}
          <nav className="mb-6 text-center space-x-6">
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Submit Instructions
            </Link>
            <Link to="/jobs" className="text-blue-600 hover:underline font-medium">
              View Job
            </Link>
          </nav>

          {/* Page content */}
          <Routes>
            <Route path="/" element={<UploadForm />} />
            <Route path="/jobs" element={<JobViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;