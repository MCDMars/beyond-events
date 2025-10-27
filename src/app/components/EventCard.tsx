import Link from "next/link";

type EventCardProps = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  small?: boolean;
}

export function EventCard(
  // Events API parameters
  { title,
    startTime,
    endTime,
    small,
    id,
  }: EventCardProps
)
{
  // Datetime conversion
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Local formatting
  const locale = typeof window !== "undefined" ? navigator.language : "en-IE";

  const formattedStart = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: undefined,
  }).format(start);

  const formattedEnd = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: undefined,
  }).format(end);

  return (
    <Link href={`/event/${id}`} className="text-decoration-none text-dark">
      <div
        className={`border border-black rounded mb-3 ${small ? "p-2" : "p-3"}`}
        style={{ 
          height: small ? "100%" : "auto", 
          cursor: "pointer" 
        }}
      >
        <div
          className="bg-light border-bottom border-black d-flex align-items-center justify-content-center mb-2"
          style={{ 
            height: small ? 60 : 140, 
            position: "relative" 
          }}
        >
          {/* Image Placeholder with X */}
          <svg width="100%" height="100%" viewBox="0 0 100 60" style={{ 
            position: "absolute", 
            left: 0, 
            top: 0 
          }}>
            <line x1="0" y1="0" x2="100" y2="60" stroke="#bbb" strokeWidth="2" />
            <line x1="100" y1="0" x2="0" y2="60" stroke="#bbb" strokeWidth="2" />
          </svg>
          <span className="text-secondary position-relative" style={{ 
            zIndex: 1 
          }}>Image</span>
        </div>
        <div>
          <div className="fw-semibold">{title}</div>
          <div className="small">Starts: {formattedStart}</div>
          <div className="small">Ends: {formattedEnd}</div>
        </div>
      </div>
    </Link>
  );
}