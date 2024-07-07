import React, { useState, useEffect } from "react";
import "./NaturalTips.css";
import aloeVera from "./Assets/aloe_vera.jpg";

import { useArticleStore } from "../hooks/use-article-store";
import { getAllArticlesByCatigoryIdRequest } from "../lib/api/article";
import { convertImageBlobToUrl } from "../lib/helpers/convert-image-blob";

// const tips = [
//   {
//     image: aloeVera,
//     description: 'Aloe vera may help people with prediabetes or type 2 diabetes lower fasting blood sugar and A1C levels.'
//   },
//   {
//     image: ginger,
//     description: 'Ginger improves the body\'s sensitivity to insulin and helps increase insulin secretion.'
//   },
//   {
//     image: fenugreek,
//     description: 'Fenugreek helps in lowering blood sugar and cholesterol levels.'
//   },
//   {
//     image: appleCiderVinegar,
//     description: 'Apple cider vinegar can reduce fasting blood sugar levels when taken before meals.'
//   },
//   {
//     image: magnesium,
//     description: 'Magnesium improves insulin sensitivity and helps control blood sugar levels.'
//   },
//   {
//     image: berberine,
//     description: 'Berberine lowers blood sugar and improves insulin sensitivity.'
//   },
//   {
//     image: cinnamon,
//     description: 'Cinnamon helps lower blood sugar levels and improves lipid profiles.'
//   },
//   {
//     image: zinc,
//     description: 'Zinc improves glycemic control and promotes healthy triglyceride levels.'
//   }
// ];

const NATURAL_TIPS_ID = 2;

const NaturalTips = () => {
  const { setArticles, articles } = useArticleStore();
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
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
          <div key={index} className={`tip-card ${showMore ? "slide-in" : ""}`}>
            <img
              src={
                tip?.articlePhoto
                  ? convertImageBlobToUrl(tip?.articlePhoto || "")
                  : aloeVera
              }
              alt={`Tip ${index + 1}`}
              className="tip-image"
            />
            <h2>{tip.name}</h2>
            <p className="tip-description">{tip.content}</p>
          </div>
        ))}
      </div>
      {articles?.length > 3 && (
        <button className="view-more-button" onClick={handleShowMore}>
          {showMore ? "View Less Natural Effects" : "View More Natural Effects"}
        </button>
      )}
    </div>
  );
};

export default NaturalTips;
