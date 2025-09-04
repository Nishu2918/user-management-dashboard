import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>User Management Dashboard</h1>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/add" className="btn">+ Add User</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
