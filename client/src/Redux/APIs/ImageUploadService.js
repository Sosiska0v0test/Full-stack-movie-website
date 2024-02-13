import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImagesService = async (file, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/upload", file);
    setLoading(false);
    toast.success("Файл успішно завантажено🧐");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Щось пішло не так🥵")
  }
}

export { uploadImagesService }