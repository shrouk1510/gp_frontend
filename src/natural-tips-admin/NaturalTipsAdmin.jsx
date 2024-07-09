import React, { useEffect, useState } from "react";
import "./NaturalTipsAdmin.css";
import aloeVera from "./NatAdmin/aloe_vera.jpg";
// import ginger from "./NatAdmin/ginger.jpg";
// import fenugreek from "./NatAdmin/fenugreek.jpg";
// import appleCiderVinegar from "./NatAdmin/apple_cider_vinegar.jpg";
// import magnesium from "./NatAdmin/magnesium.jpg";
// import berberine from "./NatAdmin/berberine.jpeg";
// import cinnamon from "./NatAdmin/cinnamon.jpg";
// import zinc from "./NatAdmin/zinc.jpg";
import toast from "react-hot-toast";
// import { useAuthContext } from "../contexts/auth-context";
import {
  addArticleRequest,
  deleteArticleRequest,
  getAllArticlesByCatigoryIdRequest,
  updateArticleRequest,
  uploadArticlePhotoRequest,
} from "../lib/api/article";
import { useArticleStore } from "../hooks/use-article-store";
// import { backendBaseURL } from "../axios";
import { convertImageBytesToUrl } from "../lib/helpers/convert-image-blob";

// const tipsData = [
//   {
//     articleId: 1,
//     image: aloeVera,
//     name: "aloe",
//     content:
//       "Aloe vera may help people with prediabetes or type 2 diabetes lower fasting blood sugar and A1C levels.",
//   },
//   {
//     articleId: 2,
//     image: ginger,
//     name: "ginger",
//     content:
//       "Ginger improves the body's sensitivity to insulin and helps increase insulin secretion.",
//   },
//   {
//     articleId: 3,
//     image: fenugreek,
//     name: "Fenugreek",
//     content: "Fenugreek helps in lowering blood sugar and cholesterol levels.",
//   },
//   {
//     articleId: 4,
//     image: appleCiderVinegar,
//     name: "apple",
//     content:
//       "Apple cider vinegar can reduce fasting blood sugar levels when taken before meals.",
//   },
//   {
//     articleId: 5,
//     image: magnesium,
//     name: "Magnesium",
//     content:
//       "Magnesium improves insulin sensitivity and helps control blood sugar levels.",
//   },
//   {
//     articleId: 6,
//     image: berberine,
//     name: "Berberine",
//     content: "Berberine lowers blood sugar and improves insulin sensitivity.",
//   },
//   {
//     articleId: 7,
//     image: cinnamon,
//     name: "Cinnamon",
//     content:
//       "Cinnamon helps lower blood sugar levels and improves lipid profiles.",
//   },
//   {
//     articleId: 8,
//     image: zinc,
//     name: "Zinc",
//     content:
//       "Zinc improves glycemic control and promotes healthy triglyceride levels.",
//   },
// ];

const NATURAL_TIPS_ID = 2;

const NaturalTipsAdmin = () => {
  // const { activeUser } = useAuthContext();
  const { articles, setArticles, addArticle, removeArticle, updateArticle } =
    useArticleStore();
  const [showMore, setShowMore] = useState(false);
  // const [tips, setTips] = useState(tipsData);
  const [isAddingTip, setIsAddingTip] = useState(false);
  const [newTip, setNewTip] = useState({
    name: "",
    articlePhoto: "",
    content: "",
    hide: false,
  });
  const [articlePhoto, setArticlePhoto] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleAddTipClick = () => {
    setIsAddingTip(true);
    setEditingIndex(null);
    setNewTip({ name: "", articlePhoto: "", content: "", hide: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTip({ ...newTip, [name]: value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setArticlePhoto(file);
          setNewTip({ ...newTip, articlePhoto: reader.result });
        };
        reader.readAsDataURL(file);
      }
      // toast.success("article image updated");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setNewTip({ ...newTip, image: reader.result });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTip.articlePhoto) {
      newErrors.articlePhoto = "Image is required";
    }
    if (!newTip.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!newTip.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTip = async () => {
    if (validateForm()) {
      try {
        if (editingIndex !== null) {
          // const updatedTips = [...tips];
          // updatedTips[editingIndex] = newTip;
          // setTips(updatedTips);

          const updatedArticle = await updateArticleRequest(
            {
              name: newTip.name,
              content: newTip.content,
              hide: newTip.hide,
              categoryId: NATURAL_TIPS_ID,
            },
            newTip.articleId
          );

          updateArticle(updatedArticle);
          toast.success("article updated");

          if (articlePhoto) {
            const updatedArticleImage = await uploadArticlePhotoRequest(
              { photo: articlePhoto },
              updatedArticle.articleId
            );

            updateArticle(updatedArticleImage);
            toast.success("article image updated");
          }
        } else {
          const createdArticle = await addArticleRequest({
            name: newTip.name,
            content: newTip.content,
            categoryId: NATURAL_TIPS_ID,
          });

          addArticle(createdArticle);

          toast.success("article created");

          if (articlePhoto) {
            const updatedArticle = await uploadArticlePhotoRequest(
              { photo: articlePhoto },
              createdArticle.articleId
            );

            updateArticle(updatedArticle);
            toast.success("article image updated");
          }
        }

        setIsAddingTip(false);
        setNewTip({ name: "", articlePhoto: "", content: "", hide: false });
        setArticlePhoto(null);
      } catch (error) {
        typeof error === "string" ? toast.error(error) : alert(error);
      }
    }
  };

  const handleEditTip = (article) => {
    setEditingIndex(article.articleId);
    setNewTip(article);
    setIsAddingTip(true);
  };

  // aproved
  const handleDeleteTip = async (articleId) => {
    // console.log(articleId);
    try {
      await deleteArticleRequest(articleId);

      removeArticle(articleId);

      toast.success("Tip deleted");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticlesByCatigoryIdRequest(
        NATURAL_TIPS_ID
      );

      setArticles(fetchedArticles);
    };
    fetchArticles();
  }, []);

  const visibleTips = showMore ? articles : articles?.slice(0, 3);

  return (
    <div className="natural-tips-container">
      <h1 className="title">Natural Tips for Diabetes</h1>
      <div className="tips-grid">
        {visibleTips?.map((tip, index) => (
          <div
            key={index}
            className={`tip-card-admin ${showMore ? "slide-in" : ""}`}
          >
            <img
              src={
                tip?.articlePhoto
                  ? convertImageBytesToUrl(tip?.articlePhoto || "")
                  : aloeVera
              }
              alt={`Tip ${tip.name}`}
              className="tip-image"
            />
            <h2>{tip.name}</h2>
            <p className="tip-description">{tip.content}</p>
            <div className="button-group">
              <button
                className="edit-button"
                onClick={() => handleEditTip(tip)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteTip(tip.articleId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {isAddingTip && (
          <div className="tip-card-admin new-tip-card-admin">
            {newTip?.articlePhoto && (
              <img
                src={
                  articlePhoto
                    ? newTip.articlePhoto
                    : convertImageBytesToUrl(newTip?.articlePhoto || "") || ""
                }
                alt={`tip image`}
                style={{
                  width: "5rem",
                  // height: "10px",
                  objectFit: "cover",
                }}
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.image && <p className="error">{errors.image}</p>}
            <input
              type="text"
              name="name"
              value={newTip.name}
              onChange={handleInputChange}
              placeholder="Enter tip title"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <textarea
              name="content"
              value={newTip.content}
              onChange={handleInputChange}
              placeholder="Enter tip description"
              className={errors.content ? "input-error" : ""}
            />
            {errors.content && <p className="error">{errors.content}</p>}
            <button className="save-button" onClick={handleSaveTip}>
              Save Tip
            </button>
          </div>
        )}
      </div>
      <div className="Adminbuttons-container">
        {articles?.length > 3 && (
          <button className="Naturalview-more-button" onClick={handleShowMore}>
            {showMore
              ? "View Less Natural Effects"
              : "View More Natural Effects"}
          </button>
        )}
        <button className="add-tip-button" onClick={handleAddTipClick}>
          Add Tip
        </button>
      </div>
    </div>
  );
};

export default NaturalTipsAdmin;
