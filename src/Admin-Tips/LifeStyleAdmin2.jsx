import React, { useState } from 'react';
import './LifeStyleAdmin.css';
import sunday from './AdminPhotoes/1.PNG';
import monday from './AdminPhotoes/2.PNG';
import tuesday from './AdminPhotoes/3.PNG';
import wednesday from './AdminPhotoes/4.PNG';
import thursday from './AdminPhotoes/5.PNG';
import friday from './AdminPhotoes/6.PNG';
import saturday from './AdminPhotoes/7.PNG';
const tipsData = [
  {
    image: sunday,
    description: `<p><b>Sunday</b></br> Breakfast: Bircher muesli</br>
        Lunch: Hearty minestrone soup</br>
        Dinner: Grilled lemon and chilli chicken with couscous</br>
        Pudding: Full of fruit sundaes</br>
        Snacks: Greek yogurt, a peach, a medium banana, 30g plain almonds, 40g carrot sticks and 30g houmous</br>
        Milk: 225ml whole milk</p>`
  },
  {
    image: monday,
    description: `<p><b>Monday</b></br>Breakfast: 30g oat flakes with 125g Greek yogurt,80g raspberries and 85g banana</br>
        Lunch: Salmon, red onion and sweet pepper wraps</br>
        Dinner: Cod Portugaise with boiled new potatoes and side salad</br>
        Pudding: Apple,blackberry,oat and seed crumble</br>
        Snacks: One apple and crunchy peanut butter, two oatcakes with cottage cheese and cucumber,one orange</br>
        Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: tuesday,
    description: `<p><b>Tuesday</b></br> Breakfast: Bircher muesli</br>
        Lunch: Hearty Spanish omelette with salad</br>
        Dinner: Galician stew with roasted butternut squash</br>
        Pudding: One medium banana</br>
        Snacks: Honeydew melon and Greek yogurt,plain almonds,oatcakes and houmous</br>
        Milk: 225ml whole milk </p>`
  },
  {
    image: wednesday,
    description: `<p><b>Wednesday</b></br> Breakfast: Two slices of medium granary toast with crunchy peanut butter, and a banana</br>
        Lunch: Chickpea and tuna salad</br>
        Dinner: Greek style chicken pittas</br>
        Pudding: Blackcurrant and raspberry ice cream made with calcium fortified soya milk</br>
        Snacks: Warm exotic fruit salad with Greek yogurt, 50g cottage cheese with 80g cherry tomatoes and 30g pumpkin seeds, one orange</br>
        Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: thursday,
    description: `<p><b>Thursday</b></br> Breakfast: Very berry porridge</br>
        Lunch: Minted aubergine with spinach and pine nuts, paired with grilled chicken breast</br>
        Dinner: Crisp salmon salad</br>
        Pudding: Apple, blackberry, oat and seed crumble</br>
        Snacks: One peach, Greek yogurt with plain almonds, spicy roasted chickpeas</br>
        Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: friday,
    description: `<p><b>Friday</b></br>Breakfast: Two poached eggs with rye bread and vegetable oil-based spread</br>
        Lunch: Roast mackerel with a curried coriander crust with baby new potatoes and broccoli</br>
        Dinner: Aubergine and courgette parmesan bake and peas</br>
        Pudding: Fruity chocolate tray bake</br>
        Snacks: 80g raspberries with Greek yogurt, two oatcakes with cottage cheese and cucumber, plain almonds</br>
        Milk: 225ml whole milk</p>`
  },
  {
    image: saturday,
    description:`<p><b>Saturday</b></br> Breakfast: Oat flakes and Greek yogurt with raspberries and banana</br>
        Lunch: Hearty minestrone soup</br>
        Dinner: Greek homestyle chicken with Tomato, olive, asparagus and bean salad</br>
        Pudding: Warm exotic fruit salad with Greek yogurt</br>
        Snacks: Plain almonds, two satsumas, and a portion of spicy roasted chickpeas</br>
        Milk: 225ml semi-skimmed milk</p>`
  },
];

const LifeStyleAdmin2 = () => {
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
    <div className="admin-container">
      <div className="admin">
        {visibleTips.map((tip, index) => (
          <div key={index} className={`tip-group ${showMore ? 'slide-in' : ''}`}>
            <img src={tip.image} alt={`Tip ${index + 1}`} className="tip-img" />
            <div className="tip-text" dangerouslySetInnerHTML={{ __html: tip.description }}></div>
            <div className="buttons-g">
              <button className="edite" onClick={() => handleEditTip(index)}>Edit</button>
              <button className="deletee" onClick={() => handleDeleteTip(index)}>Delete</button>
            </div>
          </div>
        ))}
        {isAddingTip && (
          <div className="tip-group new-tip-group">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.image && <p className="errory">{errors.image}</p>}
            <textarea
              name="description"
              value={newTip.description}
              onChange={handleInputChange}
              placeholder="Enter tip description"
              className={`add-tip-text ${errors.description ? 'input-errory' : ''}`}
            />
            {errors.description && <p className="errory">{errors.description}</p>}
            <button className="savey" onClick={handleSaveTip}>Save Tip</button>
          </div>
        )}
      </div>
      <div className="buttons-grg">
        <button className="morey" onClick={handleShowMore}>
          {showMore ? 'View less' : 'View more '}
        </button>
        <button className="addd-new-tips" onClick={handleAddTipClick}>+</button>
      </div>
    </div>
  );
};

export default LifeStyleAdmin2;
