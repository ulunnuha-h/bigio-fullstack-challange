import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Icon } from "@iconify/react";
import FilterModal from "./components/FilterModal";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { deleteStory, getAllStory } from "./services/story";
import ActionMenu from "./components/actionMenu";
import toggleActionMenu from "./utils/toggleActionMenu";
import DeleteModal from "./components/deleteModal";
import { deleteChapter, getAllChapter } from "./services/chapter";

function App() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [story, setStory] = useState([]);
  const [deleteData, setDeleteData] = useState({
    show: false,
    action: null,
  });
  const [key, setKey] = useState("");

  useEffect(() => {
    setKey(searchParams.get("key") || "");

    const params = {
      key,
      category: searchParams.get("category") || "",
      status: searchParams.get("status") || "",
    };

    getAllStory(params)
      .then((res) => {
        setStory(res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleDelete = () => {
    setDeleteData({ ...deleteData, show: !deleteData.show });
  };

  const keyHandler = (e) => {
    setKey(e.target.value);
    searchParams.set("key", e.target.value);
    setSearchParams(searchParams);
  };

  const editHandler = (id) => {
    nav(`/edit/${id}`);
  };

  const deleteHandler = (id) => {
    const deleteAction = () => {
      getAllChapter(id)
        .then((res) => {
          const { data } = res.data;
          data.map((val) => {
            deleteChapter(id, val.id).catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          deleteStory(id)
            .then(() => {
              location.reload();
            })
            .catch((err) => console.log(err));
        });
    };

    const temp = deleteData;
    temp.action = deleteAction;
    setDeleteData(temp);
    toggleDelete();
  };

  return (
    <main className="card w-full">
      {deleteData.show && (
        <DeleteModal cancel={toggleDelete} action={deleteData.action} />
      )}
      <header className="flex justify-between mb-8 gap-8">
        <h1>List Story</h1>
        {showFilter && <FilterModal toggleFilter={toggleFilter} />}
        <section className="flex gap-2">
          <input
            type="text"
            className="input-text"
            placeholder="Search by writer's name/title story"
            value={key}
            onChange={keyHandler}
          />
          <button className="btn-secondary" onClick={toggleFilter}>
            <Icon icon="material-symbols:filter-alt" />
          </button>
          <Link className="btn-primary" to="add">
            Add Story
          </Link>
        </section>
      </header>
      <table className="table-auto w-full">
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
                      onClick={() => toggleActionMenu(idx)}
                    />
                    <ActionMenu
                      id={idx}
                      name={["View", "Edit", "Delete"]}
                      action={[
                        () => nav(`story/${val.id}`),
                        () => editHandler(val.id),
                        () => deleteHandler(val.id),
                      ]}
                    />
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
