import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { setToken } from "../utils/token";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

try {
  const response = await login(form);
  console.log("LOGIN RESPONSE:", response);

  const token =
    response?.token ||
    response?.accessToken ||
    response?.jwtToken ||
    response?.data?.token ||
    response?.data?.accessToken ||
    response?.data?.jwtToken ||
    response?.tokenDto?.token ||
    response?.tokenDto?.accessToken ||
    response?.result?.token ||
    response?.result?.accessToken;

  if (!token) {
    throw new Error("Token bulunamadı");
  }

  setToken(token);
  navigate("/dashboard");
} catch (err) {
  console.error(err);
  setError("Giriş başarısız.");
}
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>Giriş Yap</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;