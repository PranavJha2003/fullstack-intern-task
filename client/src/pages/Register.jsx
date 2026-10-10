
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login", {
        state: { message: "Account created! Please log in." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <p>Join us and discover amazing templates.</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          autoComplete="name"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <button
          className="primary-button auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
