import axios from "axios";
import jsonToFormData from "../utils/jsonToFormData";

const URL = import.meta.env.VITE_API_URL + "/api";

const getAllStory = async () => {
  try {
    const res = await axios.get(`${URL}/story`);
    return res;
  } catch (err) {
    return err;
  }
};

const getStoryById = async (id) => {
  try {
    const res = await axios.get(`${URL}/story/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

const addStory = async (data) => {
  const formData = jsonToFormData(data);

  try {
    const res = await axios.post(`${URL}/story`, formData);
    return res;
  } catch (err) {
    return err;
  }
};

const deleteStory = async (id) => {
  try {
    const res = await axios.delete(`${URL}/story/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

const updateStory = async (id, data) => {
  // if (data.image == null) {
  //   data.image = new FileList();
  // }

  const formData = jsonToFormData(data);

  try {
    const res = await axios.put(`${URL}/story/${id}`, formData);
    return res;
  } catch (err) {
    return err;
  }
};

export { getAllStory, getStoryById, deleteStory, updateStory, addStory };
