import Image from "next/image";
import { formatDimensions, type FurnitureModel } from "@/data/models";
import { asset } from "@/lib/asset";
import { LeadButton } from "./LeadForm";

export function ModelCard({ model }: { model: FurnitureModel }) {
  const image = model.images.studio ?? model.images.interior;
  return (
    <article className="card">
      {image && (
        <div
          className={`card__media${image.studio ? " card__media--studio" : ""}`}
          style={image.zoom ? ({ "--zoom": image.zoom } as React.CSSProperties) : undefined}
        >
          <Image
            src={asset(image.src)}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="card__body">
        <h3 className="card__name">{model.name}</h3>
        <p className="card__type">
          {model.type}
          <span className="card__variant"> · {model.variant.toLowerCase()}</span>
        </p>
        {model.dimensions && (
          <p className="card__dims">
            <span className="visually-hidden">Ширина, глубина, высота: </span>
            {formatDimensions(model.dimensions)}
          </p>
        )}
        <LeadButton type="model" modelId={model.id} variant="link" className="card__cta">
          Рассчитать комплектацию
        </LeadButton>
      </div>
    </article>
  );
}
