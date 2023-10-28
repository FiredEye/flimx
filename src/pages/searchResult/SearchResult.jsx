import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./searchResult.scss";

import { fetchDataFromApi } from "../../utils/Api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResult from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await fetchDataFromApi(
        `/search/multi?query=${query}&page=${pageNum}`
      );
      setData(res);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromApi(
        `/search/multi?query=${query}&page=${pageNum}`
      );
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res?.results] });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data?.results?.length > 1 ? "results" : "result"
              } of '${query}'`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item) => {
                  if (
                    item.media_type === "person" ||
                    item.media_type === undefined ||
                    item.id === undefined
                  )
                    return;
                  return (
                    <MovieCard
                      key={item.id}
                      data={item}
                      fromSearch={true}
                      mediaType={item.media_type}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
