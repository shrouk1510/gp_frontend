import React, { useState } from 'react';
import './NaturalTipsAdmin.css';
import aloeVera from './NatAdmin/aloe_vera.jpg';
import ginger from './NatAdmin/ginger.jpg';
import fenugreek from './NatAdmin/fenugreek.jpg';
import appleCiderVinegar from './NatAdmin/apple_cider_vinegar.jpg';
import magnesium from './NatAdmin/magnesium.jpg';
import berberine from './NatAdmin/berberine.jpeg';
import cinnamon from './NatAdmin/cinnamon.jpg';
import zinc from './NatAdmin/zinc.jpg';

const tipsData = [
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

const NaturalTipsAdmin = () => {
  const [showMore, setShowMore] = useState(false);
  const [tips, setTips] = useState(tipsData);
  const [isAddingTip, setIsAddingTip] = useState(false);
  const [newTip, setNewTip] = useState({ image: '', description: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleAddTipClick = () => {
    setIsAddingTip(true);
    setEditingIndex(null);
    setNewTip({ image: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTip({ ...newTip, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTip({ ...newTip, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTip.image) {
      newErrors.image = 'Image is required';
    }
    if (!newTip.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTip = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        const updatedTips = [...tips];
        updatedTips[editingIndex] = newTip;
        setTips(updatedTips);
      } else {
        setTips([...tips, newTip]);
      }
      setNewTip({ image: '', description: '' });
      setIsAddingTip(false);
      setErrors({});
    }
  };

  const handleEditTip = (index) => {
    setEditingIndex(index);
    setNewTip(tips[index]);
    setIsAddingTip(true);
  };

  const handleDeleteTip = (index) => {
    setTips(tips.filter((_, i) => i !== index));
  };

  const visibleTips = showMore ? tips : tips.slice(0, 3);

  return (
    <div className="natural-tips-container">
      <h1 className="title">Natural Tips for Diabetes</h1>
      <div className="tips-grid">
        {visibleTips.map((tip, index) => (
          <div key={index} className={`tip-card-admin ${showMore ? 'slide-in' : ''}`}>
            <img src={tip.image} alt={`Tip ${index + 1}`} className="tip-image" />
            <p className="tip-description">{tip.description}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditTip(index)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteTip(index)}>Delete</button>
            </div>
          </div>
        ))}
        {isAddingTip && (
          <div className="tip-card-admin new-tip-card-admin">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.image && <p className="error">{errors.image}</p>}
            <textarea
              name="description"
              value={newTip.description}
              onChange={handleInputChange}
              placeholder="Enter tip description"
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <p className="error">{errors.description}</p>}
            <button className="save-button" onClick={handleSaveTip}>Save Tip</button>
          </div>
        )}
      </div>
      <div className="Adminbuttons-container">
        <button className="Naturalview-more-button" onClick={handleShowMore}>
          {showMore ? 'View Less Natural Effects' : 'View More Natural Effects'}
        </button>
        <button className="add-tip-button" onClick={handleAddTipClick}>Add Tip</button>
      </div>
    </div>
  );
};

export default NaturalTipsAdmin;
