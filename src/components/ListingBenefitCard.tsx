interface ListingBenefitCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ListingBenefitCard({
  number,
  title,
  description,
}: ListingBenefitCardProps) {
  return (
    <div
      className="flex gap-4 p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
      style={{
        background: "var(--color-night-card)",
        borderColor: "var(--color-night-border)",
      }}
    >
      <span
        className="shrink-0 text-2xl font-bold leading-none mt-0.5 tabular-nums"
        style={{
          color: "var(--color-night-gold)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {number}
      </span>
      <div className="space-y-1.5">
        <p
          className="text-sm font-semibold tracking-wide leading-snug"
          style={{ color: "var(--color-night-text)" }}
        >
          {title}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-night-muted)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
