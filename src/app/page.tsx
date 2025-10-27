import React from "react";
import { SearchBar } from "./components/SearchBar";
import { EventCard } from "./components/EventCard";


export default async function Home() {
  try {
    const response = await fetch("http://localhost:8080/api/events/main", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    // Split up data into categories, first 0-x are featured, all else is small
    const featured = data.slice(0, 3)
    const small = data.slice(3)

  return (
    <main className="container min-vh-100 bg-white d-flex flex-column align-items-center font-sans">
      <div className="w-100" style={{ maxWidth: 1900 }}>
        <div className="px-4">
          <SearchBar />
          <div className="fs-5 fw-semibold mb-3">Featured Events</div>

            <div className="row g-4 mb-5">
              {featured.map((event: any) => (
                <div className="col-6 col-md-4 col-lg-2 d-flex" key={event.id}>
                  <EventCard
                    id={event.id}
                    title={event.title}
                    startTime={event.startTime}
                    endTime={event.endTime}
                  />
                </div>
              ))}
            </div>

            <div className="fs-5 fw-semibold mb-3">All Events</div>

            <div className="row g-4">
              {small.map((event: any) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex" key={event.id}>
                  <EventCard
                    small
                    id={event.id}
                    title={event.title}
                    startTime={event.startTime}
                    endTime={event.endTime}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </main>
  );
}

catch (error) {
    return (
      <main className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2>Events unavailable</h2>
          <p>Unable to fetch events at this time</p>
        </div>
      </main>
    );
  }
}
