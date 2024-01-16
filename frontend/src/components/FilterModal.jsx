import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterModal = ({ toggleFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cancelFilter = (e) => {
    e.preventDefault();
    toggleFilter();
  };

  const resetFilter = (e) => {
    e.preventDefault();
    searchParams.delete("category");
    searchParams.delete("status");
    setSearchParams(searchParams);
    toggleFilter();
    location.reload();
  };

  return (
    <div className="fixed h-screen w-screen top-0 left-0 bg-gray-700 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
      <form className="card min-w-64">
        <input
          type="text"
          value={searchParams.get("key")}
          className="hidden"
          name="key"
        />
        <h1 className="mb-4">Filter</h1>
        <section>
          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full"
            defaultValue={searchParams.get("category") || ""}
          >
            <option value="financial">Financial</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="" className="hidden">
              Category
            </option>
          </select>
        </section>
        <section>
          <label htmlFor="status" className="block">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full"
            defaultValue={searchParams.get("status") || ""}
          >
            <option value="1">Publish</option>
            <option value="0">Draft</option>
            <option value="" className="hidden">
              Status
            </option>
          </select>
        </section>
        <footer className="flex justify-between mt-4">
          <button className="btn-secondary" onClick={resetFilter}>
            Reset
          </button>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={cancelFilter}>
              Cancel
            </button>
            <button className="btn-primary">Filter</button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default FilterModal;
