import React, { useState } from 'react';
import './NaturalTips.css';
import aloeVera from './Assets/aloe_vera.jpg';
import ginger from './Assets/ginger.jpg';
import fenugreek from './Assets/fenugreek.jpg';
import appleCiderVinegar from './Assets/apple_cider_vinegar.jpg';
import magnesium from './Assets/magnesium.jpg';
import berberine from './Assets/berberine.jpeg';
import cinnamon from './Assets/cinnamon.jpg';
import zinc from './Assets/zinc.jpg';


const tips = [
  {
    image: aloeVera,
    description: 'Aloe vera may help people with prediabetes or type 2 diabetes lower fasting blood sugar and A1C levels.'
  },
  {
    image: ginger,
    description: 'Ginger improves the body\'s sensitivity to insulin and helps increase insulin secretion.'
  },
  {
    image: fenugreek,
    description: 'Fenugreek helps in lowering blood sugar and cholesterol levels.'
  },
  {
    image: appleCiderVinegar,
    description: 'Apple cider vinegar can reduce fasting blood sugar levels when taken before meals.'
  },
  {
    image: magnesium,
    description: 'Magnesium improves insulin sensitivity and helps control blood sugar levels.'
  },
  {
    image: berberine,
    description: 'Berberine lowers blood sugar and improves insulin sensitivity.'
  },
  {
    image: cinnamon,
    description: 'Cinnamon helps lower blood sugar levels and improves lipid profiles.'
  },
  {
    image: zinc,
    description: 'Zinc improves glycemic control and promotes healthy triglyceride levels.'
  }
];

const NaturalTips = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleTips = showMore ? tips : tips.slice(0, 3);

  return (
    <div className="natural-tips-container">
      <h1 className="title">Natural Tips for Diabetes</h1>
      <div className="tips-grid">
        {visibleTips.map((tip, index) => (
          <div key={index} className={`tip-card ${showMore ? 'slide-in' : ''}`}>
            <img src={tip.image} alt={`Tip ${index + 1}`} className="tip-image" />
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
      <button className="view-more-button" onClick={handleShowMore}>
        {showMore ? 'View Less Natural Effects' : 'View More Natural Effects'}
      </button>
    </div>
  );
};

export default NaturalTips;
