import TemplateGrid from "../components/TemplateGrid";

function Favorites({
  templates,
  favorites,
  onToggleFavorite,
}) {
  const favoriteTemplates = templates.filter((template) =>
    favorites.includes(template._id)
  );

  return (
    <section className="catalog favorites-page">
      <div className="section-heading">
        <div>
          <h2>My Favorites</h2>
          <p>Your collection of saved website templates.</p>
        </div>
      </div>

      {favoriteTemplates.length > 0 ? (
        <TemplateGrid
          templates={favoriteTemplates}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <div className="empty-state">
          <h3>No favorites yet</h3>
          <p>
            Explore the templates and save the ones you like.
          </p>
        </div>
      )}
    </section>
  );
}

export default Favorites;