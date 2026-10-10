
import TemplateCard from "./TemplateCard";

function TemplateGrid({ templates, favorites, onToggleFavorite }) {
  return (
    <div className="template-grid">
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
          isFavorite={favorites.includes(template._id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default TemplateGrid;
