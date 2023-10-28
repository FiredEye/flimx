import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/Api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import "./App.css";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConfig();
    genresCall();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");
      const url = {
        backdrop: (await res?.images.secure_base_url) + "original",
        poster: (await res?.images.secure_base_url) + "original",
        profile: (await res?.images.secure_base_url) + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.log(error);
    }
  };
  const genresCall = async () => {
    try {
      let promises = [];
      const endPoints = ["tv", "movie"];
      let allGenres = {};
      endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });
      const data = await Promise.all(promises);
      data.map(({ genres }) => {
        genres.map((item) => {
          allGenres[item.id] = item;
        });
      });
      dispatch(getGenres(allGenres));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
