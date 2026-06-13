interface ShopInfoRowProps {
  label: string;
  value: string | null | undefined;
  icon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export default function ShopInfoRow({
  label,
  value,
  icon,
  href,
  external,
}: ShopInfoRowProps) {
  if (!value) return null;

  return (
    <div
      className="flex gap-3 py-3 border-b text-sm"
      style={{ borderColor: "var(--color-night-border)" }}
    >
      <dt
        className="w-20 shrink-0 text-xs pt-0.5 tracking-wide"
        style={{ color: "var(--color-night-muted)" }}
      >
        {label}
      </dt>
      <dd className="flex-1" style={{ color: "var(--color-night-text)" }}>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 transition-colors hover:underline"
            style={{ color: "var(--color-night-gold-light)" }}
          >
            {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
            {value}
          </a>
        ) : (
          <span className="flex items-center gap-1.5">
            {icon && <span className="w-4 h-4 shrink-0 opacity-50">{icon}</span>}
            {value}
          </span>
        )}
      </dd>
    </div>
  );
}
