import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStoryById } from "../services/story";

const DetailStory = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    getStoryById(id)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card">
      <header className="flex items-end gap-2 mb-4">
        <h1>{data.title}</h1>
        <p>by {data.writer}</p>
      </header>
      <section className="grid grid-cols-12 gap-4 max-w-[900px]">
        <img
          src={data.image}
          className="aspect-[3/4] object-contain bg-gray-500 rounded-md col-span-4"
        />
        <div className="col-span-5">
          <h2>Synopsis</h2>
          <p className="text-justify">{data.synopsis}</p>
        </div>
        <div className="flex flex-col gap-8 col-span-3">
          <section>
            <h2>Status</h2>
            <p>{data.status == "1" ? "Publish" : "Draft"}</p>
          </section>
          <section>
            <h2>Category</h2>
            <p>{data.category}</p>
          </section>
          <section>
            <h2>Tags</h2>
            <p>{data.tag}</p>
          </section>
        </div>
      </section>
      <hr className="my-4" />
      <footer className="flex justify-end">
        <button className="btn-secondary" onClick={() => nav("/")}>
          Close
        </button>
      </footer>
    </div>
  );
};

export default DetailStory;
