"use client";

import React, { useEffect, useState } from "react";

export default function CreateEventPage() {

  // Set blank defaults
  const defaultFormData = {
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location_Id: "",
    url: "",
    organizationFeatures: [] as string[],
    category_Id: "",
  };

  // Setting up default data with UseState
  const [formData, setFormData] = useState(defaultFormData);

  // Fetching locations and categories for dropdowns
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

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

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categories');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
      }
    };
    fetchCategories();
  }, []); 

    // Setting checkbox toggle
    function handleFeatureToggle(feature: string, checked: boolean) {
    setFormData(prev => {
      const updatedFeatures = checked
        ? [...prev.organizationFeatures, feature] // add if checked
        : prev.organizationFeatures.filter(f => f !== feature); // remove if unchecked

      return { ...prev, organizationFeatures: updatedFeatures };
    });
  }

  // Trycatch to post, used by the submit button
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Starting submit")
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Gotta do this cause it expects an iso 8601 standard datetime
      console.log("Converting datetime");
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);

      const isoStart = start.toISOString();
      const isoEnd = end.toISOString();

      // For every change made, this is where I pray
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
          category_Id: formData.category_Id,
          url: formData.url,
          organizationFeatures: formData.organizationFeatures,
          organizer_Id: "6c7cad90-c167-4a82-a138-4fe2d56a2f5d",
        }),
      });
      console.log("Response", response)
      if (!response.ok) throw new Error("RESPONSE ERROR");

      // Establish success and reset the form
      alert("Event created");
      setFormData(defaultFormData);
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
            
            {/* Category */}
            <div className="row d-flex align-items-center mb-3 gx-5">
              <label htmlFor="category_Id" className="col-sm-2">
                Category
              </label>
              <select
                id="category_Id"
                name="category_Id"
                value={formData.category_Id || ""} // controlled value
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData(prev => ({
                    ...prev,
                    category_Id: e.target.value, // Long
                  }))
                }
                className="form-select w-auto"
              >
                <option value="">Select an option</option>
                {categories.map(loc => (
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

            {/* Features */}
            
            <div className="fs-6 fw-semibold mb-3">Additional options</div>

            {["brackets", "timetable", "comments", "voting"].map(feature => (
              <div key={feature} className="row d-flex align-items-center mb-3 gx-5">
                <label htmlFor={feature} className="col-sm-2 text-capitalize">
                  {feature.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={feature}
                  type="checkbox"
                  checked={formData.organizationFeatures.includes(feature)}
                  onChange={e => handleFeatureToggle(feature, e.target.checked)}
                  className="form-check-input w-auto"
                />
              </div>
            ))}


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
