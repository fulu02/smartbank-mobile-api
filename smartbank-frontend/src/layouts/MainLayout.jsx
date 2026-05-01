import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div style={layout}>
      <header style={header}>
        <h1 style={{ margin: 0 }}>💳 SmartBank</h1>

        <nav style={nav}>
          <Link style={link} to="/dashboard">Dashboard</Link>
          <Link style={link} to="/accounts">Accounts</Link>

          <button onClick={handleLogout} style={logoutBtn}>
            Çıkış
          </button>
        </nav>
      </header>

      <main style={main}>
        <Outlet />
      </main>
    </div>
  );
};

const layout = {
  minHeight: "100vh",
  background: "#f8fafc",
};

const header = {
  background: "#1e293b",
  color: "white",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const nav = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const link = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const logoutBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const main = {
  padding: "24px",
  maxWidth: "1000px",
  margin: "0 auto",
};

export default MainLayout;