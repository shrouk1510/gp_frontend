import React, { useState } from 'react';
import './LifeStyleUser.css';
import sunday from './UserPhotoes/first.PNG';
import monday from './UserPhotoes/second.PNG';
import tuesday from './UserPhotoes/third.PNG';
import wednesday from './UserPhotoes/fourth.PNG';
import thursday from './UserPhotoes/fifth.PNG';
import friday from './UserPhotoes/sixth.PNG';
import saturday from './UserPhotoes/seventh.PNG';
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

const LifeStyleTipsUser = () => {
  const [showMore, setShowMore] = useState(false);
  const [tips] = useState(tipsData);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleTips = showMore ? tips : tips.slice(0, 3);

  return (
    <div className="user-container">
      <div className="user">
        {visibleTips.map((tip, index) => (
          <div key={index} className={`card ${showMore ? 'slide-in' : ''}`}>
            <img src={tip.image} alt={`Tip ${index + 1}`} className="img" />
            <div className="descripe" dangerouslySetInnerHTML={{ __html: tip.description }}></div>
          </div>
        ))}

      </div>
        <button className="view-more-button" onClick={handleShowMore}>
          {showMore ? 'View less' : 'View more '}
        </button>
    </div>
  );
};

export default LifeStyleTipsUser;
