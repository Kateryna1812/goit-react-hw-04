import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/search/photos",
  headers: {
    Authorization: "Client-ID 5ho7ECBsZ43808ffErETWXIKz8LvCilsz75AIEe33bs",
    "Content-Type": "application/json",
  },
});

const getPhotos = async ({ query, page }) => {
  try {
    const response = await instance.get("", {
      params: {
        query,
        page,
        per_page: 20,
        orientation: "landscape",
      },
    });
    return response;
  } catch (error) {
    throw new Error("bad request");
  }
};

export default getPhotos;