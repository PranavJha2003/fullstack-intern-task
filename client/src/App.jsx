import { useEffect, useMemo, useState } from "react";
import { fetchTemplates } from "./services/templateService";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "./services/favoriteService";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Templates from "./pages/Templates";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/templates" replace />
  ) : (
    children
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoritesError, setFavoritesError] = useState("");
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Load all templates
  useEffect(() => {
    let isActive = true;

    async function loadTemplates() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchTemplates();

        if (isActive) {
          setTemplates(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Unable to load templates.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadTemplates();

    return () => {
      isActive = false;
    };
  }, []);

  // Load saved favorites whenever authentication changes
  useEffect(() => {
    let isActive = true;

    async function loadFavorites() {
      setFavoritesError("");

      if (!isAuthenticated) {
        setFavorites([]);
        return;
      }

      try {
        const data = await getFavorites();

        if (isActive) {
          const favoriteIds = (data.favorites || [])
            .filter((favorite) => favorite.template)
            .map((favorite) => favorite.template._id);

          setFavorites(favoriteIds);
        }
      } catch (err) {
        if (isActive) {
          setFavoritesError(
            err.message || "Unable to load your favorites."
          );
        }
      }
    }

    loadFavorites();

    return () => {
      isActive = false;
    };
  }, [isAuthenticated]);

  // Search and category filters
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        category === "All" || template.category === category;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        (template.name || "").toLowerCase().includes(query) ||
        (template.description || "").toLowerCase().includes(query) ||
        (template.category || "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [templates, search, category]);

  // Add or remove a favorite through the backend
  async function toggleFavorite(id) {
    if (!isAuthenticated) {
      setFavoritesError("Please log in to save favorites.");
      return;
    }

    if (favoriteLoading) return;

    const alreadyFavorite = favorites.includes(id);

    try {
      setFavoriteLoading(true);
      setFavoritesError("");

      if (alreadyFavorite) {
        await removeFavorite(id);
        setFavorites((previous) =>
          previous.filter((favoriteId) => favoriteId !== id)
        );
      } else {
        await addFavorite(id);
        setFavorites((previous) =>
          previous.includes(id) ? previous : [...previous, id]
        );
      }
    } catch (err) {
      setFavoritesError(
        err.message || "Unable to update your favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  }

  return (
    <div className="app">
      <Navbar favoriteCount={favorites.length} />

      <main>
        {loading && (
          <p className="status-message">Loading templates...</p>
        )}

        {error && !loading && (
          <p className="status-message error-message">{error}</p>
        )}

        {favoritesError && (
          <p className="status-message error-message">
            {favoritesError}
          </p>
        )}

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/templates" replace />}
          />

          <Route
            path="/templates"
            element={
              <Templates
                templates={filteredTemplates}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites
                  templates={templates}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/templates" replace />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <a className="brand" href="/templates">
          <span className="brand-icon">T</span>
          TemplateStore
        </a>
        <p>Find inspiration. Build something amazing.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;