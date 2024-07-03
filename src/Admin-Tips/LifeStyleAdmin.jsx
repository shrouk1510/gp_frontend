import React, { useState } from 'react';
import './LifeStyleAdmin.css';
import sunday from './AdminPhotoes/first.PNG';
import monday from './AdminPhotoes/second.PNG';
import tuesday from './AdminPhotoes/third.PNG';
import wednesday from './AdminPhotoes/fourth.PNG';
import thursday from './AdminPhotoes/fifth.PNG';
import friday from './AdminPhotoes/sixth.PNG';
import saturday from './AdminPhotoes/seventh.PNG';
const tipsData = [
  {
    image: sunday,
    description: `<p><b>Sunday</b></br>Breakfast: Baked eggs with two slices of rye bread </br> Lunch: Chilli bean soup with avocado salsa </br>
                  Dinner: Mackerel tomatoes served with leeks and broccoli </br>Pudding: Apple strudel</br> snacks: reek yogurt, two satsumas, plain almonds, one apple</br>
                  Milk: 225ml semi-skimmed milk</p> `
  },
  {
    image: monday,
    description: `<p><b>Monday</b></br>Breakfast: Porridge made with 30g porridge oats, 200ml almond milk, 40g blueberries and 10g pumpkin seeds</br>
        Lunch: Bang bang chicken salad</br>
        Dinner: Minced beef and vegetable filo pie </br>
        Pudding: 80g strawberries </br>
        Snacks: Avocado, brazil nuts, celery and peanut butter </br>
        Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: tuesday,
    description: `<p><b>Tuesday</b></br>Breakfast: Mushroom and spring onion omelette </br>
        Lunch: Butterbean paté with carrots, tomatoes and mini wholemeal pitta bread </br>
        Dinner: Aubergine and courgette parmesan bake with rocket,tomato and tinned kidney beans </br>
        Pudding: 80g melon </br>
        Snacks: One apple and peanut butter,one pear with almonds, natural yogurt and pumpkin seeds </br>
        Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: wednesday,
    description: `<p><b>Wednesday</b></br>Breakfast: Summerberry smoothie </br>
    Lunch: Chickpea and tuna salad</br>
    Dinner: Chicken tikka masala and cauliflower pilaf</br>
    Pudding: Summer berry posset</br>
    Snacks: Greek yogurt, two satsumas, one orange, almonds, two oatcakes topped with smooth peanut butter</br>
    Milk: 225ml semi-skimmed milk </p>`
  },
  {
    image: thursday,
    description: `<p><b>Thursday</b></br> Breakfast: Baked eggs with two slices of rye bread</br>
        Lunch: Two slices of medium wholemeal bread with grated cheddar, vegetable oil- based spread, tomato and cucumber</br>
        Dinner: Grilled salmon steak with baked sweet potato, broccoli and cabbage</br>
        Pudding: Sugar - free jelly</br>
        Snacks: raspberries, melon, avocado, plain almonds</br>
        Milk: 225ml semi - skimmed milk </p>`
  },
  {
    image: friday,
    description: `<p><b>Friday</b></br> Breakfast: Welsh leek rarebit</br>
        Lunch: Cauliflower and leek soup with 25g cheddar</br>
        Dinner: Butternut squash and borlotti bean stew</br>
        Pudding: Tinned peaches in juice</br>
        Snacks: One apple, 30g almonds, Greek yogurt, small pear and almonds, 60g pistachios with shells</br>
        Milk: 225ml semi- skimmed milk </p>`
  },
  {
    image: saturday,
    description: `<p><b>Saturday</b></br>Breakfast: Omelette made with two eggs and milk along with 80g spinach,80g mushrooms,1tsp of vegetable oil,25g grated cheddar.Pair with a slice of rye bread with 1tsp of unsaturated margarine</br>
        Lunch: Smoked mackerel on granary toast with 1sp of veg spread, rocket, tomato and cucumber.</br>
        Dinner: Greek homestyle chicken with broccoli and leeks</br>
        Pudding: 80g raspberries and 80g melon</br>
        Snacks: Low - fat Greek yogurt with almonds and pumpkin seeds, spicy roasted chickpeas, one small pear</br>
        Milk: 225ml semi - skimmed milk</p>`
  },
];

const LifeStyleAdmin = () => {
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

export default LifeStyleAdmin;
