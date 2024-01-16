import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addStory, getStoryById, updateStory } from "../services/story";
import AddChapter from "./addChapter";
import { Icon } from "@iconify/react";
import formateDate from "../utils/formatDate";
import EditChapter from "./EditChapter";
import ActionMenu from "../components/actionMenu";
import toggleActionMenu from "../utils/toggleActionMenu";
import {
  addChapterToStory,
  getAllChapter,
  deleteChapter as deleteChapterFromStory,
} from "../services/chapter";
import DeleteModal from "../components/deleteModal";

const EditStory = () => {
  const { id } = useParams();
  const [showChapter, setShowChapter] = useState(false);
  const [showEditChapter, setShowEditChapter] = useState(false);
  const [deleteData, setDeleteData] = useState({
    show: false,
    action: null,
  });
  const nav = useNavigate();
  const [storyData, setStoryData] = useState({
    title: "",
    writer: "",
    synopsis: "",
    category: "",
    status: "",
    tag: "",
    image: null,
  });
  const [chapterData, setChapterData] = useState([]);
  const [editData, setEditData] = useState({
    idx: 0,
    data: {},
  });

  const storyDataHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    let temp = storyData;
    if (name == "image") {
      temp[name] = e.target.files[0];
    } else {
      temp[name] = e.target.value;
    }

    console.log(temp);
    setStoryData(temp);
  };

  const toggleDelete = () => {
    setDeleteData({ ...deleteData, show: !deleteData.show });
  };

  const toggleAddChapter = (e) => {
    e.preventDefault();
    setShowChapter(!showChapter);
  };

  const toggleEditChapter = (e) => {
    e.preventDefault();
    setShowEditChapter(!showEditChapter);
  };

  const addChapter = (title, story) => {
    setChapterData([
      ...chapterData,
      { title, story, updated_at: formateDate(Date.now()) },
    ]);
  };

  const editChapter = (title, story, idx) => {
    let temp = chapterData;
    temp[idx] = { title, story, updated_at: formateDate(Date.now()) };
    setChapterData(temp);
  };

  const deleteChapter = (idx) => {
    const temp = chapterData.filter((_, curIdx) => curIdx != idx);
    setChapterData(temp);
  };

  const deleteHandler = (idx) => {
    const deleteAction = () => {
      deleteChapter(idx);
    };

    const temp = deleteData;
    temp.action = deleteAction;
    setDeleteData(temp);
    toggleDelete();
  };

  const editHandler = (e, idx) => {
    setEditData({ idx, data: chapterData[idx] });
    toggleEditChapter(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getAllChapter(id)
      .then((res) => {
        const { data } = res.data;
        data.map((val) => {
          deleteChapterFromStory(id, val.id).catch((err) => console.log(err));
        });
      })
      .finally(() => {
        updateStory(id, storyData)
          .then(() => {
            chapterData.forEach((val) => {
              addChapterToStory(id, val).catch((err) => console.log(err));
            });
          })
          .catch((err) => console.log(err))
          .finally(() => nav("/"));
      });
  };

  const inputTags = (e) => {
    storyDataHandler(e);
    const text = e.target.value;
    const tags = text.split(" ");
    const inputTags = document.getElementById("input-tags");
    while (inputTags.firstChild) {
      inputTags.removeChild(inputTags.firstChild);
    }
    tags.forEach((val) => {
      if (val != "") {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.innerText = val;
        inputTags.appendChild(tag);
      }
    });
  };

  useEffect(() => {
    getStoryById(id)
      .then((res) => {
        const { data } = res.data;
        setStoryData({ ...data[0], image: null });
        const tags = data[0].tag.split(" ");
        const inputTags = document.getElementById("input-tags");
        tags.forEach((val) => {
          if (val != "") {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.innerText = val;
            inputTags.appendChild(tag);
          }
        });

        getAllChapter(id).then((res) => {
          const { data } = res.data;
          setChapterData(data);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {showChapter && (
        <AddChapter
          addChapter={addChapter}
          toggleAddChapter={toggleAddChapter}
        />
      )}
      {showEditChapter && (
        <EditChapter
          editChapter={editChapter}
          toggleEditChapter={toggleEditChapter}
          idx={editData.idx}
          data={editData.data}
        />
      )}
      {deleteData.show && (
        <DeleteModal cancel={toggleDelete} action={deleteData.action} />
      )}
      <form className="card flex flex-col gap-2" onSubmit={submitHandler}>
        <h1 className="mb-8">Edit Story</h1>
        <div className="flex gap-2">
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="input-text"
              onChange={storyDataHandler}
              defaultValue={storyData.title}
              required
            />
          </div>
          <div>
            <label htmlFor="Writer Name" className="block">
              Writer Name
            </label>
            <input
              type="text"
              name="writer"
              id="writer"
              placeholder="Writer Name"
              className="input-text"
              onChange={storyDataHandler}
              defaultValue={storyData.writer}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="synopsis" className="block">
            Synopsis
          </label>
          <textarea
            name="synopsis"
            id="synopsis"
            placeholder="Synopsis"
            className="input-text w-full"
            onChange={storyDataHandler}
            required
            defaultValue={storyData.synopsis}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="category" className="block">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-full p-2 rounded-md"
              onChange={storyDataHandler}
              required
            >
              <option value="financial">Financial</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="" className="hidden">
                Category
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="tag" className="block">
              Tags/Keyword Story
            </label>
            <section className="relative overflow-auto">
              <input
                type="text"
                name="tag"
                id="tag"
                className="input-text w-full text-white"
                onChange={inputTags}
                defaultValue={storyData.tag}
              ></input>
              <div
                className="absolute flex gap-1 left-1 z-10 top-0 h-full py-1"
                id="input-tags"
              ></div>
            </section>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <label htmlFor="image" className="block">
              Cover Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="p-1 bg-gray-50 rounded-md "
              onChange={storyDataHandler}
            />
          </div>
          <div className="w-full">
            <label htmlFor="status" className="block">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="w-full p-2 rounded-md"
              onChange={storyDataHandler}
              required
            >
              <option value="1">Publish</option>
              <option value="0">Draft</option>
              <option value="" className="hidden">
                Status
              </option>
            </select>
          </div>
        </div>
        <hr className="my-4" />
        <header className="flex justify-end mb-2">
          <button className="btn-primary" onClick={toggleAddChapter}>
            Add Chapter
          </button>
        </header>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chapterData.map((val, idx) => (
              <tr key={idx}>
                <th>{val.title}</th>
                <th>{formateDate(val.updated_at)}</th>
                <th>
                  <Icon
                    icon="material-symbols:more-horiz"
                    onClick={() => toggleActionMenu(idx)}
                    className="cursor-pointer"
                  />
                  <ActionMenu
                    id={idx}
                    name={["Delete", "Edit"]}
                    action={[
                      () => deleteHandler(idx),
                      (e) => editHandler(e, idx),
                    ]}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="flex justify-end gap-2">
          <Link className="btn-secondary" to={"/"}>
            Cancel
          </Link>
          <button className="btn-primary">Save</button>
        </footer>
      </form>
    </>
  );
};

export default EditStory;
