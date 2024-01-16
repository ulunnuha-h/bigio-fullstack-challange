import axios from "axios";

const URL = import.meta.env.VITE_API_URL + "/api";

const getAllChapter = async (id) => {
  try {
    const res = await axios.get(`${URL}/chapter/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

const addChapterToStory = async (id, data) => {
  const { title, story } = data;
  try {
    const res = await axios.post(`${URL}/chapter/${id}`, { title, story });
    return res;
  } catch (err) {
    return err;
  }
};

const deleteChapter = async (id, chapterId) => {
  try {
    const res = await axios.delete(`${URL}/chapter/${id}/${chapterId}`);
    return res;
  } catch (err) {
    return err;
  }
};

export { getAllChapter, deleteChapter, addChapterToStory };
