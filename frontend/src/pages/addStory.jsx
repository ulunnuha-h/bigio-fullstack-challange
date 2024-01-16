import { useState } from "react";
import AddChapter from "./addChapter";
import { Link, useNavigate } from "react-router-dom";
import { addStory } from "../services/story";

const AddStory = () => {
  const [showChapter, setShowChapter] = useState(false);
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

  const storyDataHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    let temp = storyData;
    if (name == "image") {
      temp[name] = e.target.files[0];
    } else {
      temp[name] = e.target.value;
    }

    setStoryData(temp);
  };

  const toggleAddChapter = (e) => {
    e.preventDefault();
    setShowChapter(!showChapter);
  };

  const addChapter = (title, story) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    addStory(storyData)
      .then((res) => nav(-1))
      .catch((err) => console.log(err));
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

  return (
    <>
      {showChapter && (
        <AddChapter
          addChapter={addChapter}
          toggleAddChapter={toggleAddChapter}
        />
      )}
      <form className="card flex flex-col gap-2" onSubmit={submitHandler}>
        <h1 className="mb-8">Add Story</h1>
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
              defaultValue={""}
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
              required
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
              defaultValue={""}
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

export default AddStory;
