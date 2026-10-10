
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar({ favoriteCount }) {
    const { isAuthenticated, user, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/templates">
        <span className="brand-icon">T</span>
        <span>TemplateStore</span>
      </Link>

      <nav className="nav-links">
        <NavLink
          to="/templates"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Templates
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Favorites ({favoriteCount})
        </NavLink>
      </nav>

        <div className="nav-actions">
            {isAuthenticated ? (
                <>
                {user?.name && (
                    <span className="nav-user-name">{user.name}</span>
                )}

                <button
                    type="button"
                    className="nav-auth-button logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                </>
            ) : (
                <>
                <Link className="nav-auth-link" to="/login">
                    Login
                </Link>

                <Link
                    className="nav-auth-link register-button"
                    to="/register"
                >
                    Register
                </Link>
                </>
            )}
    </div>
    </header>
  );
}

export default Navbar;
