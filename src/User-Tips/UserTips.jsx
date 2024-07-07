import React, { useEffect, useState } from "react";
import "./UserTips.css";
import LifeStyleTipsUser from "./LifeStyleTipsUser";
import LifeStyleTipsUser2 from "./LifeStyleTipsUser2";
import { useArticleStore } from "../hooks/use-article-store";
import { getAllArticlesByCatigoryIdRequest } from "../lib/api/article";

const LIFESTYLE_ID = 3;
const UserTips = () => {
  // const [pages] = useState([
  //   {
  //     id: 1,
  //     title: "Diabetes Diet Plans to Lose Weight",
  //     content: `<p>You may have heard that diabetes can be controlled by diet. There is no such thing as a special diet exclusively for people with diabetes. There are a lot of different ways to lose weight – but there’s no one-size-fits-all diet.
  //     It starts with finding a way to eat fewer calories than you need. A calorie (or kcal) is a unit of energy, which is in the food and drink we consume. Your body uses energy for everything we do – from breathing and sleeping to exercising. When you eat, you’re replacing the energy you’ve used, which helps you to maintain a healthy weight.
  //     As a general guide, government recommendations are that men need around 2,500kcal a day to maintain a healthy weight, and women need around 2,000kcal a day. But most people need different amounts of calories based on how their bodies work, how active they are and any weight management goals. </p>`,
  //     editing: false,
  //   },
  //   {
  //     id: 2,
  //     title: "What’s a healthy weight to aim for?",
  //     content: `<p>Before you get started, you need to know what a healthy weight is and what numbers you’re aiming for. This is about working out your Body Mass Index (BMI) and your waist size.</p>
  //     <h5><b>Know your weight</b></h5>
  //     <p>Research shows that the more weight you lose, the greater the health benefits, but even losing just 5% of extra weight will improve your health.</p>
  //     <p>BMI uses your height and weight to work out if you're a healthy weight. It doesn’t look at how much fat you have around the middle, so that’s why you need to measure your waist too.</p>
  //     <h5><b>Know your waist size</b></h5>
  //     <p>A healthy waist size depends on your gender and ethnicity. It should be:</p>
  //     <ul>
  //       <li><p>less than 80cm (31.5in) for all women</p></li>
  //       <li><p>less than 94cm (37in) for most men</p></li>
  //       <li><p>less than 90cm (35in) for South Asian men.</p></li>
  //     </ul>`,
  //     editing: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Two different types of plans",
  //     content: `<h5><b>Firstly we would like to tell you that:</b></h5>
  //     <p>Evidence shows that the best approach is the one that you’re likely to stick to. So the key is to find a plan that you enjoy and fits in with the rest of your life. Everyone’s different and what works for some may not for others.</p>
  //     <ul>
  //       <li><p>Low-carb diet plan</p></li>
  //       <li><p>Mediterranean diet plan</u></p></li>
  //     </ul>`,
  //     editing: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Low-carb diet and meal plan",
  //     content: `<p>Eating a low-carb diet means cutting down on the amount of carbohydrates (carbs) you eat to less than 130g a day. But low-carb eating shouldn’t be no-carb eating.</p>
  //           <h5><b>What’s a low-carb diet?</b></h5>
  //           <p>But how low is low-carb? There are different types of low-carb diets. Generally, low-carb eating is when you reduce the total amount of carbs you consume in a day to less than 130g.</p>

  //           <p>To put this into context, a medium-sized slice of bread is about 15 to 20g of carbs, which is about the same as a regular apple. On the other hand, a large jacket potato could have as much as 90g of carbs, as does one litre of orange juice.</p>

  //           <p>A low-carb diet isn’t for everyone. The evidence shows they can be safe and effective in helping people with type 2 diabetes manage their weight, blood glucose (sugar) levels and risk of heart disease in the short term.</p>

  //           <p>But the evidence also shows they can affect growth in children, and so should not be recommended for them. And there is little evidence to show the benefits of this type of diet in people with type 1.</p>

  //           <p>If you do decide to follow a low-carb diet, it’s important to know all the potential benefits and how to manage any potential risks.</p>
  //           <p>Our low-carb meal plan aims to help you maintain a healthy balance while reducing the amount of carbs you eat. Varying amounts of carbohydrate are shown each day to help you choose which works best for you.</p>

  //           <p>It's nutritionally balanced, we’ve counted the calories for you, and it contains at least five portions of fruit and veg per day.</p>

  //           <p>We've included the values of fibre and protein too to help you make sure you are meeting your nutritional requirements.</p>
  //           <p2><b>Before starting any healthy eating programme you should:</b></p2>
  //           <p>Speak to your diabetes health care team before making significant changes to your diet.</p>
  //           <p>This is especially important if you treat your condition with insulin and diabetes medications that increase the risk of hypos (low blood sugar levels). Reducing your carbohydrate intake and changes to your body weight may mean your insulin and diabetes medication needs to be adjusted.</p>`,
  //     editing: false,
  //   },
  //   {
  //     id: 5,
  //     title: "Meal Routine for Low-Carb diet",
  //     content: "",
  //     editing: false,
  //   },
  //   {
  //     id: 6,
  //     title: "Mediterranean meal plan",
  //     content: `
  //           <p>Mediterranean diets have been associated with reduced risk of high blood pressure and cholesterol which are risk factors for heart disease. A Mediterranean style diet can therefore provide a great option for people with diabetes, as it could help reduce the risk of certain diabetes complications.</p>
  //           <p>There’s also evidence to show that the Mediterranean-style diet can promote weight loss and improve blood glucose management in people with type 2 diabetes.</p>
  //           <p>This is a diet largely based on plant foods and therefore includes a lot of fruits and vegetables, beans and pulses, nuts and seeds, wholegrains and olive oil. It also includes some dairy (milk and yogurts), lean protein like chicken, eggs and fish, in moderation. Red meat and processed foods are usually only consumed in much smaller amounts, and wine is included in moderation.</p>
  //           <p>We’ve developed this simple Mediterranean plan to make it easier for you to follow this diet. It's both calorie and carb counted for your convenience, and contains at least five portions of fruit and veg per day.</p>
  //           <p>We’ve included the values for fibre too to help you make sure you are meeting your nutritional requirements</p>
  //           <p2><b>Before starting any healthy eating programme you should:</b></p2>
  //           <p>Speak to your diabetes health care team before making significant changes to your diet.</p>
  //           <p>This is especially important if you treat your condition with insulin and diabetes medications that increase the risk of hypos (low blood sugar levels). Reducing your carbohydrate intake and changes to your body weight may mean your insulin and diabetes medication needs to be adjusted.</p>`,
  //     editing: false,
  //   },
  //   {
  //     id: 7,
  //     title: "Meal routine for Mediterranean diet",
  //     content: "",
  //     editing: false,
  //   },
  // ]);

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
              <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
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

      <div className="Userpage">
        <LifeStyleTipsUser />
      </div>
      <div className="Userpage">
        <LifeStyleTipsUser2 />
      </div>
    </div>
  );
};

export default UserTips;
