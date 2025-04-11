import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";
import JobViewer from "./components/jobViewer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow">
          <nav className="mb-6 text-center space-x-4">
            <Link to="/" className="text-blue-600 hover:underline font-medium">Submit Instructions</Link>
            <Link to="/jobs" className="text-blue-600 hover:underline font-medium">View Job</Link>
          </nav>

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