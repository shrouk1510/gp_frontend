import React, { useState, useEffect } from "react";
import "./AdminTips.css";
import { useArticleStore } from "../hooks/use-article-store";
import {
  deleteArticleRequest,
  getAllArticlesByCatigoryIdRequest,
  updateArticleRequest,
} from "../lib/api/article";
import toast from "react-hot-toast";

const LIFESTYLE_ID = 3;
const AdminTips = () => {
  const { setArticles, articles, removeArticle, updateArticle } =
    useArticleStore();

  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingArticleId, setEditingArticleId] = useState();

  const handleEdit = (article) => {
    setEditingArticleId(article.articleId);
    setNewContent(article.content); // Set current content in the form
    setNewName(article.name);
  };

  const handleSave = async (id) => {
    try {
      const updatedArticle = await updateArticleRequest(
        {
          categoryId: LIFESTYLE_ID,
          content: newContent,
          name: newName,
        },
        id
      );

      updateArticle(updatedArticle);

      toast.success("article updated");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    } finally {
      setEditingArticleId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticleRequest(id);
      removeArticle(id);
      toast.success("article deleted");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

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
    <div className="application">
      {articles?.map((article) => (
        <div key={article.id} className="page">
          <h2>
            <b>{article.name}</b>
          </h2>
          {editingArticleId !== article.articleId ? (
            <div>
              <pre>{article.content}</pre>
              <div className="bb">
                <button className="edit" onClick={() => handleEdit(article)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(article.articleId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter article name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <div className="bb">
                <button
                  className="save"
                  onClick={() => handleSave(article.articleId)}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default AdminTips;
