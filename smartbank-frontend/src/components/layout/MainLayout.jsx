import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>SmartBank</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link style={linkStyle} to="/dashboard">Dashboard</Link>
          <Link style={linkStyle} to="/accounts">Accounts</Link>
        </nav>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, background: "#f1f5f9" }}>
        
        {/* NAVBAR */}
        <div
          style={{
            height: "60px",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h3>Dashboard</h3>

          <button onClick={handleLogout}>Çıkış</button>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "24px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "6px",
};

export default MainLayout;