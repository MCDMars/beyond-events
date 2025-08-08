import Link from "next/link";

export function EventCard({ small }: { small?: boolean }) {
  return (
    <Link href="/event" className="text-decoration-none text-dark">
      <div
        className={`border border-black rounded mb-3 ${small ? "p-2" : "p-3"}`}
        style={{ width: small ? 130 : 220, cursor: "pointer" }}
      >
        <div
          className="bg-light border-bottom border-black d-flex align-items-center justify-content-center mb-2"
          style={{ height: small ? 60 : 140, position: "relative" }}
        >
          {/* Image Placeholder with X */}
          <svg width="100%" height="100%" viewBox="0 0 100 60" style={{ position: "absolute", left: 0, top: 0 }}>
            <line x1="0" y1="0" x2="100" y2="60" stroke="#bbb" strokeWidth="2" />
            <line x1="100" y1="0" x2="0" y2="60" stroke="#bbb" strokeWidth="2" />
          </svg>
          <span className="text-secondary position-relative" style={{ zIndex: 1 }}>Image</span>
        </div>
        <div>
          <div className="fw-semibold">Event Title (Online)</div>
          <div className="small">01/01/26</div>
        </div>
      </div>
    </Link>
  );
}