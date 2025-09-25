export function SearchBar() {
  return (
    <div className="d-flex gap-3 mt-4 mb-4">
      <input
        type="text"
        placeholder="Search"
        className="form-control w-auto"
        style={{ minWidth: 200 }}
      />
      <select className="form-select w-auto" style={{ minWidth: 170 }}>
        <option>Categories</option>
      </select>
      <select className="form-select w-auto" style={{ minWidth: 170 }}>
        <option>Dates</option>
      </select>
      <button className="btn btn-outline-dark px-4">Search</button>
    </div>
  );
}