import { useEffect, useState } from "react";
import api from "../api/axios";

const DashboardPage = () => {
  const [stats, setStats] = useState([
    { title: "Toplam Müşteri", value: "128", icon: "👥" },
    { title: "Toplam Hesap", value: "0", icon: "🏦" },
    { title: "Toplam Bakiye", value: "₺0", icon: "💰" },
    { title: "Aktif İşlem", value: "0", icon: "🔄" },
  ]);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const accountsRes = await api.get("/Accounts");
        const accounts = Array.isArray(accountsRes.data)
          ? accountsRes.data
          : accountsRes.data.data || [];

        const totalBalance = accounts.reduce(
          (sum, acc) => sum + (acc.balance ?? 0),
          0
        );

        const txRes = await api.get("/Transactions");
        const txs = Array.isArray(txRes.data)
          ? txRes.data
          : txRes.data.data || [];

        setStats([
          { title: "Toplam Müşteri", value: "128", icon: "👥" },
          { title: "Toplam Hesap", value: accounts.length, icon: "🏦" },
          { title: "Toplam Bakiye", value: `₺${totalBalance}`, icon: "💰" },
          { title: "Aktif İşlem", value: txs.length, icon: "🔄" },
        ]);

        setTransactions(txs.slice(0, 5));
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "6px" }}>Dashboard</h2>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        SmartBank yönetim paneline hoş geldiniz.
      </p>

      <div style={gridStyle}>
        {stats.map((item) => (
          <div key={item.title} style={cardStyle}>
            <div style={{ fontSize: "28px" }}>{item.icon}</div>
            <p style={{ color: "#64748b", margin: "12px 0 6px" }}>
              {item.title}
            </p>
            <h2 style={{ margin: 0 }}>{item.value}</h2>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginBottom: "16px" }}>Son İşlemler</h3>

        {transactions.length === 0 ? (
          <p>Henüz işlem yok.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ textAlign: "left", color: "#64748b" }}>
                <th style={thStyle}>Gönderen Hesap</th>
                <th style={thStyle}>Alıcı Hesap</th>
                <th style={thStyle}>Tutar</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.id || index}>
                  <td style={tdStyle}>{shortId(tx.fromAccountId)}</td>
                  <td style={tdStyle}>{shortId(tx.toAccountId)}</td>
                  <td style={{...tdStyle,fontWeight: "bold",color: tx.toAccountId ? "#16a34a" : "#ef4444",}}>{tx.toAccountId ? "+" : "-"}₺{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const shortId = (id) => {
  if (!id) return "-";
  return `${id.slice(0, 8)}...`;
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};

export default DashboardPage;