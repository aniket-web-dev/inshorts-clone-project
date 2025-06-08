// src/components/NewsList.js
import React, { useEffect, useState } from "react";
import { fetchNewsFromAPI } from "../util/ApiService";
import NewsCard from "./NewsCard";
import "./NewsList.css";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [nextOffset, setNextOffset] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (offset) => {
    console.log("fetchNews", offset);
    setLoading(true);
    try {
      const data = await fetchNewsFromAPI(offset);

      if (data?.data?.news_list?.length > 0) {
        setNewsList((prev) => [...prev, ...data.data.news_list]);
        if (data.data.min_news_id) {
          setNextOffset(data.data.min_news_id);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (newsList.length === 0) {
      // If newsList is empty, fetch initial news
      fetchNews(nextOffset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="news-container">
      <h1>Inshorts Clone</h1>

      {newsList.length === 0 && !loading && <p>No news found.</p>}

      {newsList.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}

      {loading && <p>Loading...</p>}

      {hasMore && !loading && (
        <button className="load-more-btn" onClick={() => fetchNews(nextOffset)}>
          Load More
        </button>
      )}

      {!hasMore && newsList.length > 0 && <p>No more news to load.</p>}
    </div>
  );
};

export default NewsList;
