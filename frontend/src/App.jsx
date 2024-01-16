import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Icon } from "@iconify/react";
import FilterModal from "./components/FilterModal";
import { Link } from "react-router-dom";
import { deleteStory, getAllStory } from "./services/story";
import ActionMenu from "./components/actionMenu";
import toggleActionMenu from "./utils/toggleActionMenu";
import DeleteModal from "./components/deleteModal";

function App() {
  const [showFilter, setShowFilter] = useState(false);
  const [story, setStory] = useState([]);
  const [deleteData, setDeleteData] = useState({
    show: false,
    action: null,
  });

  useEffect(() => {
    getAllStory()
      .then((res) => {
        setStory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleFilter = () => setShowFilter(!showFilter);

  const toggleDelete = () => {
    setDeleteData({ ...deleteData, show: !deleteData.show });
  };

  const deleteHandler = (id) => {
    const deleteAction = () => {
      deleteStory(id)
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(err));
    };

    const temp = deleteData;
    temp.action = deleteAction;
    setDeleteData(temp);
    toggleDelete();
  };

  return (
    <main className="card">
      {deleteData.show && (
        <DeleteModal cancel={toggleDelete} action={deleteData.action} />
      )}
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
          {story.map((val, idx) => {
            const tags = val.tag.split(" ");
            return (
              <tr key={idx}>
                <td>{val.title}</td>
                <td>{val.writer}</td>
                <td>
                  {val.category.charAt(0).toUpperCase() + val.category.slice(1)}
                </td>
                <td>
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag me-1">
                      {tag}
                    </span>
                  ))}
                </td>
                <td>{val.status ? "Publish" : "Draft"}</td>
                <td>
                  <button className="text-3xl">
                    <Icon
                      icon="material-symbols:more-horiz"
                      // onClick={() => toggleActionMenu(idx)}
                      onClick={() => deleteHandler(val.id)}
                    />
                    <ActionMenu id={idx} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default App;
