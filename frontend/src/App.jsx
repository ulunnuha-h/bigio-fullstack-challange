import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Icon } from "@iconify/react";
import FilterModal from "./components/FilterModal";
import { Link } from "react-router-dom";

function App() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <main className="card">
      <header className="flex justify-between mb-8">
        <h1>List Story</h1>
        {showFilter && <FilterModal toggleFilter={toggleFilter} />}
        <section className="flex gap-2">
          <input
            type="text"
            className="input-text"
            placeholder="Search by writer's name/title story"
          />
          <button className="btn-secondary" onClick={toggleFilter}>
            <Icon icon="material-symbols:filter-alt" />
          </button>
          <Link className="btn-primary" to="add">
            Add Story
          </Link>
        </section>
      </header>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>Writes</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default App;
