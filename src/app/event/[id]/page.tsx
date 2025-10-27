import { Armata } from "next/font/google";
import React from "react";

// Dealing with next believing I gotta await params
type Params = { params: Promise<{id: string}> }

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:8080/api/events`);
  const data = await response.json();

  return data.map((event: any) => ({
    id: event.id.toString(),
  }))
}

// Combs through the events to match the ID
async function getEvent(id: string) {
  const response = await fetch(`http://localhost:8080/api/events`);
  const data = await response.json();

  return data.find((event: any) => event.id === id);
}


export default async function EventPage(props: Params) {
  const params = await props.params;
  const event = await getEvent(params.id)

  // Quick condition incase event ID doesn't exist
  if(!event){
    return (
      <main className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2>Event unavailable</h2>
        </div>
      </main>
    )
  }

  // Each call of an event property is going to check if data exists there first
  return (
    <main className="min-vh-100 bg-white font-sans d-flex flex-column align-items-center">
      <div className="w-100" style={{ maxWidth: 1100 }}>

        <div className="px-4 pt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            {/*Event title and organiser*/}
            <div className="fs-4 fw-semibold">{event?.title} <span className="fs-6 fw-normal ms-2">{event?.organizer?.displayName}</span></div>
          </div>
          <div className="row g-4">
            {/* Left: Image and Interactions */}
            <div className="col-md-7">
              {/* Image Placeholder */}
              <div className="border border-black mb-3" style={{ width: "100%", aspectRatio: "4/3", position: "relative", background: "#f8f9fa" }}>
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: "absolute", left: 0, top: 0 }}>
                  <line x1="0" y1="0" x2="400" y2="300" stroke="#bbb" strokeWidth="2" />
                  <line x1="400" y1="0" x2="0" y2="300" stroke="#bbb" strokeWidth="2" />
                </svg>
              </div>
              {/* Event Interaction */}
              <div className="fw-semibold mb-2">Event Interaction</div>
              <div className="mb-3">
                <a href="#" className="me-3 text-decoration-underline">Voting</a>
                <a href="#" className="text-decoration-underline">Brackets</a>
              </div>
              {/* Comments */}
              <div className="fw-semibold mb-2">Comments</div>
              <div className="border-bottom border-black" style={{ height: 32, width: "100%" }}></div>
            </div>
            {/* Right: Details and Join */}
            <div className="col-md-5">
              <div className="mb-3">
                <div className="fw-semibold">Date / Time</div>
                <div className="mb-2">Starts: {event?.startTime}</div>
                <div className="mb-2">Ends: {event?.endTime}</div>
                <div className="fw-semibold">Location</div>
                <div className="border-bottom border-black mb-1" style={{ width: "100%" }}>{event?.location?.address}</div>
                <div className="border-bottom border-black mb-2" style={{ width: "100%" }}>{event?.location?.type}</div>
                <div className="fw-semibold">Description</div>
                <div className="border-bottom border-black mb-1" style={{ width: "100%" }}>{event?.description}</div>
                <div className="border-bottom border-black mb-1" style={{ width: "100%" }}></div>
                <div className="border-bottom border-black mb-1" style={{ width: "100%" }}></div>
                <div className="fw-semibold">Category</div>
                <div className="border-bottom border-black mb-2" style={{ width: "60%" }}>{event?.category?.name}</div>
              </div>
              <div className="fw-semibold mb-2">Participants (00)</div>
              <div className="d-flex gap-2 mb-3">
                <div className="rounded-circle border border-black" style={{ width: 32, height: 32 }}></div>
                <div className="rounded-circle border border-black" style={{ width: 32, height: 32 }}></div>
                <div className="rounded-circle border border-black" style={{ width: 32, height: 32 }}></div>
              </div>
              <button className="btn btn-outline-dark px-5 py-2 fs-5">Join</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
