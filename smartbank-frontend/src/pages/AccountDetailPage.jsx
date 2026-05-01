import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const AccountDetailPage = () => {
  const { id } = useParams();

  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transferForm, setTransferForm] = useState({
    toAccountId: "",
    amount: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAccount = async () => {
    const res = await api.get(`/Accounts/${id}`);
    setAccount(res.data);
  };

  const fetchAccounts = async () => {
    const res = await api.get("/Accounts");
    setAccounts(Array.isArray(res.data) ? res.data : res.data.data || []);
  };

useEffect(() => {
  const loadData = async () => {
    try {
      const accountResponse = await api.get(`/Accounts/${id}`);
      setAccount(accountResponse.data);

      const accountsResponse = await api.get("/Accounts");
      setAccounts(
        Array.isArray(accountsResponse.data)
          ? accountsResponse.data
          : accountsResponse.data.data || []
      );
    } catch (err) {
      console.error("Account detail error:", err.response?.data || err.message);
      setError("Hesap bilgileri alınamadı.");
    }
  };

  if (id) {
    loadData();
  }
}, [id]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!transferForm.toAccountId) {
      setError("Lütfen alıcı hesap seçiniz.");
      return;
    }

    if (Number(transferForm.amount) <= 0) {
      setError("Tutar 0'dan büyük olmalıdır.");
      return;
    }

    try {
      await api.post("/Transactions/transfer", {
        fromAccountId: id,
        toAccountId: transferForm.toAccountId,
        amount: Number(transferForm.amount),
      });

      setMessage("Transfer başarılı.");

      setTransferForm({
        toAccountId: "",
        amount: "",
      });

      await fetchAccount();
      await fetchAccounts();
    } catch (err) {
      console.error("Transfer error:", err.response?.data || err.message);
      setError("Transfer başarısız.");
    }
  };

  if (!account) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Hesap Detayı</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div style={cardStyle}>
        <h3>Hesap Bilgileri</h3>
        <p>
          <b>ID:</b> {account.id}
        </p>
        <p>
          <b>Customer ID:</b> {account.customerId}
        </p>
        <p>
          <b>Bakiye:</b> ₺{account.balance ?? 0}
        </p>
      </div>

      <div style={cardStyle}>
        <h3>Para Transferi</h3>

        <form onSubmit={handleTransfer} style={formStyle}>
          <select
            value={transferForm.toAccountId}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                toAccountId: e.target.value,
              })
            }
            style={inputStyle}
          >
            <option value="">Alıcı hesap seçiniz</option>

            {accounts
              .filter((acc) => acc.id !== id)
              .map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.id} - ₺{acc.balance ?? 0}
                </option>
              ))}
          </select>

          <input
            type="number"
            placeholder="Transfer tutarı"
            value={transferForm.amount}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                amount: e.target.value,
              })
            }
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Transfer Yap
          </button>
        </form>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  gap: "12px",
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

export default AccountDetailPage;