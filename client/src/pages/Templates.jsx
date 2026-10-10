
import TemplateGrid from "../components/TemplateGrid";

const categories = [
  "All",
  "SaaS",
  "Portfolio",
  "E-commerce",
  "Restaurant",
  "Travel",
];

function Templates({
  templates,
  search,
  setSearch,
  category,
  setCategory,
  favorites,
  onToggleFavorite,
}) {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">YOUR NEXT PROJECT STARTS HERE</span>

        <h1>
          Find the perfect template
          <br />
          for your <span>next big idea.</span>
        </h1>

        <p>
          Explore beautiful website templates for your next project.
          Find inspiration and save your favorites.
        </p>

        <a className="primary-button hero-button" href="#templates">
          Explore Templates →
        </a>
      </section>

      <section className="catalog" id="templates">
        <div className="section-heading">
          <div>
            <h2>Explore Templates</h2>
            <p>
              {templates.length} templates to inspire your next project
            </p>
          </div>

          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search templates..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search templates"
            />
          </label>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${
                category === item ? "selected" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

     
        {templates.length > 0 ? (
            <TemplateGrid
                templates={templates}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
            />
            ) : (
            <div className="empty-state">
                <h3>No templates found</h3>
                <p>Try a different search term or category.</p>
            </div>
        )}

      </section>
    </>
  );
}

export default Templates;
