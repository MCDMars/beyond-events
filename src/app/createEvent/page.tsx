import React from "react";

export default function CreateEventPage() {
  return (
    <main className="min-vh-100 bg-white font-sans d-flex flex-column align-items-center">
      <div className="w-100" style={{ maxWidth: 1100 }}>
        <div className="px-4 pt-4">
        <div className="fs-5 fw-semibold mb-3">Basic Info</div>
          
        <form>
          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="eventTitle" className="required-field col-sm-2">Event Title</label>
            <input
              type="text"
              name="eventTitle"
              placeholder="Event Title..."
              className="form-control w-auto"
              style={{ width: "100%" }}
            />
          </div>
          <div className='row d-flex align-items-center mb-3 gx-5'>
            <label htmlFor="eventDescription" className="required-field col-sm-2">Description:</label>
            <textarea
              name='eventDescription'
              placeholder='A few words to describe your event...'
              className='form-control w-auto'
              style = {{ minWidth: 300, minHeight: 90, resize: "none"}}
            />
          </div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="startDate" className="required-field col-sm-2">Start date:</label>
            <input
              type="datetime-local"
              name="startDate"
              className="form-control w-auto"
              style={{ width: "100%" }}
            />
            <label htmlFor="endDate" className="required-field col-sm-2">End date:</label>
            <input
              type="datetime-local"
              name="endDate"
              className="form-control w-auto"
              style={{ width: "100%" }}
            />
          </div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="eventLocation" className="col-sm-2">Location:</label>
            <input
              type="text"
              name="eventLocation"
              placeholder="Where it's happening..."
              className="form-control w-auto"
              style={{ width: "100%" }}
            />
          </div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="eventTeams" className="col-sm-2">Teams link:</label>
            <input
              type="url"
              name="eventTeams"
              placeholder=" https://teams.microsoft.com/"
              className="form-control w-auto"
              style={{ width: "100%" }}
            />
          </div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="recurringCheckbox" className="col-sm-2">Recurring event:</label>
            <input
              type="checkbox"
              name="recurringCheckbox"
              className="form-check-input w-auto"
            />
          </div>
        
          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="eventIcon" className="col-sm-2">Upload icon:</label>
            <input
              type="file"
              name="eventIcon"
              className="form-control w-auto"
            />
          </div>

          <div className="fs-6 fw-semibold mb-3">Additional options</div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="bracketCheckbox" className="col-sm-2">Requires bracket:</label>
            <input
              type="checkbox"
              name="bracketCheckbox"
              className="form-check-input w-auto"
            />
          </div>
        
          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="votingCheckbox" className="col-sm-2">Voting:</label>
            <input
              type="checkbox"
              name="votingCheckbox"
              className="form-check-input w-auto"
            />
          </div>

          <div className="row d-flex align-items-center mb-3 gx-5">
            <label htmlFor="openSpaceCheckbox" className="col-sm-2">Open space:</label>
            <input
              type="checkbox"
              name="openSpaceCheckbox"
              className="form-check-input w-auto"
            />
          </div>

        </form>

        </div>
        <button className="btn btn-outline-dark px-5 py-2 fs-5">Submit</button>
      </div>
    </main>
  );
}
