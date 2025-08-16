import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-100 d-flex align-items-center justify-content-between border border-black px-4 py-3 mb-0">
      <Link href="/" className="text-decoration-none text-dark">
        <div className="fs-4 fw-semibold">Beyond Events</div>
      </Link>
      <div className="d-flex gap-4 fs-6">
        <a href="/createEvent" className="text-decoration-none link-dark">
          Create Event
        </a>
        <a href="#" className="text-decoration-none link-dark">
          Dashboard
        </a>
        <a href="#" className="text-decoration-none link-dark">
          Profile
        </a>
      </div>
    </nav>
  );
}
