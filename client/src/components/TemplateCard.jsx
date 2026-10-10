
function TemplateCard({ template, isFavorite, onToggleFavorite }) {
  return (
    <article className="template-card">
      <div className="template-image">
        <img
          src={template.image}
          alt={`${template.name} preview`}
        />

        <button
          type="button"
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(template._id)}
          aria-label={
            isFavorite
              ? `Remove ${template.name} from favorites`
              : `Add ${template.name} to favorites`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="template-details">
        <span className="template-category">{template.category}</span>

        <h3>{template.name}</h3>
        <p>{template.description}</p>

        <button type="button" className="preview-button">
          View Template <span>↗</span>
        </button>
      </div>
    </article>
  );
}

export default TemplateCard;
