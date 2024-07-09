import React, { useEffect, useState } from "react";
import "./UserTips.css";
import { useArticleStore } from "../hooks/use-article-store";
import { getAllArticlesByCatigoryIdRequest } from "../lib/api/article";

const LIFESTYLE_ID = 3;
const UserTips = () => {

  const { setArticles, articles } = useArticleStore();

  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticlesByCatigoryIdRequest(
        LIFESTYLE_ID
      );
      setArticles(fetchedArticles);
    };
    fetchArticles();
  }, []);

  return (
    <div className="UserApp">
      {articles?.map((page) => (
        <div key={page.id} className="Userpage">
          <h2>
            <b>{page.name}</b>
          </h2>
          {page.id !== 5 && page.id !== 7 && !page.editing ? (
            <div>
              <pre>{page.content }</pre>
            </div>
          ) : (
            <div>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default UserTips;
