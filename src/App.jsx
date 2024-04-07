import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import getPhotos from "./js/API";
//======import====components======//
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  // trigger================================
  const [trigger, setTrigger] = useState("");
  // modal==================================
  const [photoModal, setPhotoModal] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (photo) => {
    setPhotoModal(photo.urls.regular);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPhotoModal("");
  };

  // =========================================

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setError(false);
        setLoader(true);
        if (query.trim() == "") {
          return;
        }
        const photosData = await getPhotos({ query, page });
        if (photosData.data.results.length === 0) {
          toast.error("ми не знайшли нічого по запиту " + query);
          setError(true);
          return;
        }

        if (trigger === "search") {
          setGallery(photosData.data.results);
        } else {
          setGallery((prevGallery) => [
            ...prevGallery,
            ...photosData.data.results,
          ]);
        }
      } catch (error) {
        toast.error("Oops, bad reguest");
      } finally {
        setLoader(false);
      }
    };
    fetchPhoto();
  }, [query, page, trigger]);

  const onSearch = (searchQuery) => {
    if (searchQuery.trim() == "") {
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setTrigger("search");
  };
  const onLoadMore = () => {
    window.scrollBy(0, 60);
    setPage((prevPage) => prevPage + 1);
    setTrigger("loadMore");
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <ImageGallery gallery={gallery} handleImageClick={handleImageClick} />
      {error && <ErrorMessage />}
      {loader && <Loader />}
      {gallery.length > 0 && !loader && <LoadMoreBtn onLoadMore={onLoadMore} />}
      <ImageModal
        isOpen={showModal}
        closeModal={closeModal}
        imageUrl={photoModal}
        alt="Selected Image"
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
