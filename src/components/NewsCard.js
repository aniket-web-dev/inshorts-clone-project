import React from "react";
import "./NewsCard.css";

const NewsCard = ({ news }) => {
  const { news_obj } = news;

  if (!news_obj) return null; // Safety check

  return (
    <div className="news-card">
      <h3>{news_obj.title}</h3>
      <p>{news_obj.content}</p>
      <p className="author-date">
        <strong>{news_obj.author_name}</strong>
      </p>
      {news_obj.image_url && (
        <div>
          <img src={news_obj.image_url} alt={news_obj.title} />
        </div>
      )}
      <p>
        <a
          href={news_obj.source_url || "#"}
          target="_blank"
          rel="noreferrer"
          className="read-more"
        >
          Read More
        </a>
      </p>
    </div>
  );
};

export default NewsCard;
