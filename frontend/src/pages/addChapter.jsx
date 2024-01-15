import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddChapter = ({ addChapter, toggleAddChapter }) => {
  const [story, setStory] = useState("");

  return (
    <div className="fixed z-10 top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-900">
      <form className="card">
        <h1 className="mb-8">Add Chapter</h1>
        <section className="mb-4">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-text w-full"
          />
        </section>
        <section>
          <label htmlFor="story">Story</label>
          <ReactQuill
            theme="snow"
            value={story}
            onChange={setStory}
            className="bg-gray-50"
          />
        </section>
        <footer className="mt-4 flex justify-end gap-2">
          <button className="btn-secondary" onClick={toggleAddChapter}>
            Cancel
          </button>
          <button className="btn-primary">Save</button>
        </footer>
      </form>
    </div>
  );
};

export default AddChapter;
