import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getCustomers } from "../api/customerService";

const AccountsPage = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    initialBalance: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerData = await getCustomers();

        setCustomers(
          Array.isArray(customerData)
            ? customerData
            : customerData.data || []
        );

        const accountResponse = await api.get("/Accounts");

        setAccounts(
          Array.isArray(accountResponse.data)
            ? accountResponse.data
            : accountResponse.data.data || []
        );
      } catch (err) {
        console.error(err);
        setError("Veriler alınamadı.");
      }
    };

    loadData();
  }, []);

  const refreshAccounts = async () => {
    try {
      const res = await api.get("/Accounts");

      setAccounts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Hesaplar yenilenemedi.");
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.customerId) {
      setError("Lütfen müşteri seçiniz.");
      return;
    }

    try {
      await api.post("/Accounts", {
        customerId: form.customerId,
        initialBalance: Number(form.initialBalance),
      });

      setForm({
        customerId: "",
        initialBalance: 0,
      });

      await refreshAccounts();
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      setError("Hesap oluşturulamadı.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu hesabı silmek istediğine emin misin?")) return;

    try {
      await api.delete(`/Accounts/${id}`);
      await refreshAccounts();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setError("Silme başarısız.");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Accounts</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCreateAccount} style={formStyle}>
        <select
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          style={inputStyle}
        >
          <option value="">Müşteri seçiniz</option>

          {customers.map((c, index) => (
            <option key={c.id || index} value={c.id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Başlangıç Bakiyesi"
          value={form.initialBalance}
          onChange={(e) =>
            setForm({ ...form, initialBalance: e.target.value })
          }
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Hesap Oluştur
        </button>
      </form>

      <div style={cardStyle}>
        <h3>Hesap Listesi</h3>

        {accounts.length === 0 ? (
          <p>Henüz hesap yok.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Customer ID</th>
                <th style={thStyle}>Bakiye</th>
                <th style={thStyle}>İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((acc, index) => (
                <tr key={acc.id || index}>
                  <td style={tdStyle}>{acc.id}</td>
                  <td style={tdStyle}>{acc.customerId}</td>
                  <td style={tdStyle}>
                    ₺{acc.balance ?? acc.initialBalance ?? 0}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => navigate(`/accounts/${acc.id}`)}
                      style={actionBtn}
                    >
                      Detay
                    </button>

                    <button
                      onClick={() => handleDelete(acc.id)}
                      style={{ ...actionBtn, background: "#ef4444" }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const formStyle = {
  display: "flex",
  gap: "12px",
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  flex: 1,
};

const buttonStyle = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
};

const thStyle = {
  textAlign: "left",
  padding: "14px",
  background: "#e2e8f0",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
};

const actionBtn = {
  marginRight: "8px",
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
};


export default AccountsPage;