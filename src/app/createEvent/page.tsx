"use client";

import React, { useEffect, useState } from "react";

export default function CreateEventPage() {

  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/locations');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setLocations(data);
      } catch (err) {
      }
    };
    fetchLocations();
  }, []); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location_Id: "",
    url: "",
    recurring: false,
    bracket: false,
    voting: false,
    openSpace: false,
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Starting submit")
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Converting datetime");
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);

      const isoStart = start.toISOString();
      const isoEnd = end.toISOString();

      console.log("Beginning post")
      const response = await fetch("http://127.0.0.1:8080/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          startTime: isoStart,
          endTime: isoEnd,
          location_Id: formData.location_Id,
          url: formData.url,
          recurring: formData.recurring,
          bracket: formData.bracket,
          voting: formData.voting,
          openSpace: formData.openSpace,
          organizer_Id: "6c7cad90-c167-4a82-a138-4fe2d56a2f5d",
          category_Id: 1
        }),
      });
      console.log("Response", response)
      if (!response.ok) throw new Error("RESPONSE ERROR");

      alert("Event created");
      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location_Id: "",
        url: "",
        recurring: false,
        bracket: false,
        voting: false,
        openSpace: false,
      });
    } catch (err) {
      console.error(err);
      alert("GENERIC ERROR");
    }
  };

  return (
    <main className="min-vh-100 bg-white font-sans d-flex flex-column align-items-center">
      <div className="w-100" style={{ maxWidth: 1100 }}>
        <div className="px-4 pt-4">
          <div className="fs-5 fw-semibold mb-3">Basic Info</div>

          <form>
            {/* Title */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="title" className="required-field col-sm-2">
                Event Title
              </label>
              <input
                id="title"
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({ ...prev, title: e.target.value }))
                }
                placeholder="Event Title..."
                className="form-control w-auto"
              />
            </div>

            {/* Description */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="description" className="required-field col-sm-2">
                Description
              </label>
              <textarea
                id="description"
                required
                name="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData(prev => ({ ...prev, description: e.target.value }))
                }
                placeholder="A few words to describe your event..."
                className="form-control w-auto"
                style={{ minWidth: 300, minHeight: 90, resize: "none" }}
              />
            </div>

            {/* Start/End Time */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="startTime" className="col-sm-2">
                Start date
              </label>
              <input
                id="startTime"
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({ ...prev, startTime: e.target.value }))
                }
                className="form-control w-auto"
              />

              <label htmlFor="endTime" className="col-sm-2">
                End date
              </label>
              <input
                id="endTime"
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({ ...prev, endTime: e.target.value }))
                }
                className="form-control w-auto"
              />
            </div>

            {/* Location */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="location_Id" className="col-sm-2">
                Location
              </label>
              <select
                id="location_Id"
                name="location_Id"
                value={formData.location_Id || ""} // controlled value
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    location_Id: e.target.value, // UUID string
                  }))
                }
                className="form-select w-auto"
                required
              >
    <option value="">Select an option</option>
    {locations.map(loc => (
      <option key={loc.id} value={loc.id}>
        {loc.name}
      </option>
    ))}
  </select>
            </div>

            {/* URL */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="url" className="col-sm-2">
                Teams link
              </label>
              <input
                id="url"
                type="url"
                name="url"
                value={formData.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({ ...prev, url: e.target.value }))
                }
                placeholder="https://teams.microsoft.com/"
                className="form-control w-auto"
              />
            </div>

            {/* Recurring */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="recurring" className="col-sm-2">
                Recurring event
              </label>
              <input
                id="recurring"
                type="checkbox"
                name="recurring"
                checked={formData.recurring}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    recurring: e.target.checked,
                  }))
                }
                className="form-check-input w-auto"
              />
            </div>

            <div className="fs-6 fw-semibold mb-3">Additional options</div>

            {/* Bracket */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="bracket" className="col-sm-2">
                Requires bracket
              </label>
              <input
                id="bracket"
                type="checkbox"
                name="bracket"
                checked={formData.bracket}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    bracket: e.target.checked,
                  }))
                }
                className="form-check-input w-auto"
              />
            </div>

            {/* Voting */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="voting" className="col-sm-2">
                Voting
              </label>
              <input
                id="voting"
                type="checkbox"
                name="voting"
                checked={formData.voting}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    voting: e.target.checked,
                  }))
                }
                className="form-check-input w-auto"
              />
            </div>

            {/* Open Space */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="openSpace" className="col-sm-2">
                Open space
              </label>
              <input
                id="openSpace"
                type="checkbox"
                name="openSpace"
                checked={formData.openSpace}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    openSpace: e.target.checked,
                  }))
                }
                className="form-check-input w-auto"
              />
            </div>

            <button
              className="btn btn-outline-dark px-5 py-2 fs-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
