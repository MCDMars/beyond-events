import React from "react";
import { SearchBar } from "./components/SearchBar";
import { EventCard } from "./components/EventCard";

export default function Home() {
  return (
    <main className="min-vh-100 bg-white d-flex flex-column align-items-center font-sans">
      <div className="w-100" style={{ maxWidth: 1900 }}>
        <div className="px-4">
          <SearchBar />
          <div className="fs-5 fw-semibold mb-3">Featured Events</div>
          <div className="d-flex gap-4 mb-4">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
          <div className="d-flex align-items-center gap-4">
            <EventCard small />
            <div>
              <button className="btn btn-outline-dark px-5 py-2 fs-5">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
