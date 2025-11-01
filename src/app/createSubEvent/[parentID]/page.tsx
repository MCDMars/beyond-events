"use client";

import React, { useEffect, useState } from "react";

function CreateSubEventPage() {

  // Set blank defaults
  const defaultFormData = {
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location_Id: "",
    url: "",
    features: [] as string[],
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
        ? [...prev.features, feature] // add if checked
        : prev.features.filter(f => f !== feature); // remove if unchecked

      return { ...prev, features: updatedFeatures };
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
          features: formData.features,
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
// This page just straight breaks if I don't have this here
export default CreateSubEventPage;