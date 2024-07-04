import React from 'react';
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
// import Welcome from './Welcome.js';
// import Home from './Home.js'
import SigninForm from '../src/components/signup-login-forms-User/SigninForm.jsx'
import ParentComponent from '../src/components/signup-login-forms-User/ParentComponent.jsx'
// import Header from './headerComponent/header.js';
import Welcome from './firstpageComponent/Welcome';
import Home from './homePageComponent/Home';
import ChoosePage from './chooseComponent/Choose.js';
import ReviewsPage from './ReviewsPageComponent/Review.js';
import RegisteredNav from './RegisteredNavComponent/RegisteredNav.js';
import NaturalTips from './natural-tips/NaturalTips.jsx';
import Signin from './Sign_up_admin/Signin.jsx';
import UserRev from './UserReviewsComponent/userRev.js';
import NewNat from './newNaturalComponent/NewNat.js';
import UploadData from './uploadDataComponent/data.js';
import Medicalbody from './MDataComponent/MLBody.js';
import Lifestyle from './lifeStyleUserComponent/lifeStyle.js';
import ReLifestyle from './Registeredlifestylecomponent/RegLife.js';
import AdminNav from './adminNavComponent/AdminNav.js';
import GlucoseDataGraph from './graph/GlucoseDataGraph.jsx';
// import AdminTips from './Admin-Tips/AdminTips.jsx';
import AdminLife from './adminLifeComponent/AdminLife.js';
import NatTips from './NatAdminComponent/NatTip.js';
import SignupForm from './Sign_up_admin/SignupForm.jsx';
import DiabetesPrediction from './FinalPredictComponent/Diabetes.js';
import MedicationForm from './MedicationFormComponent/mediction.js';
import Medical from './FinalMedicalComponent/medical.js';
import PrivateRoute from './routes/private-route.jsx';
import BlockedRoute from './routes/blocked-route.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-In" element={<BlockedRoute><ChoosePage /></BlockedRoute>} />
        <Route path="/Sign-Up" element={<BlockedRoute><ParentComponent /></BlockedRoute>} />
        <Route path="/user" element={<BlockedRoute><SigninForm /></BlockedRoute>} />
        {/* <Route path="/admin" element={<ParentComponent/>}/> */}
        <Route path="/Reviews" element={<ReviewsPage />} />
        <Route path="/Registered" element={<PrivateRoute><UserRev /></PrivateRoute>} />
        {/* <Route path="/UrgentSign" element={<Signin/>}/> */}
        <Route path="/NaturalTips" element={<NaturalTips />} />
        <Route path="/admin" element={<Signin />} />
        {/* <Route path="/userReviews" element={<UserRev/>}/> */}
        <Route path="/NewNat" element={<NewNat />} />
        <Route path="/uploadData" element={<UploadData />} />
        <Route path="/viewData" element={<Medicalbody />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/userlifestyle" element={<ReLifestyle />} />
        <Route path="/logout" element={<Welcome />} />
        <Route path="/AdminSignIn" element={<AdminNav />} />
        <Route path="/graph" element={<GlucoseDataGraph />} />
        <Route path="/AdminLifestyle" element={<AdminLife />} />
        <Route path="/NatTips" element={<NatTips />} />
        <Route path="/addAdmin" element={<SignupForm />} />
        <Route path="/predict" element={<DiabetesPrediction />} />
        <Route path="/Location" element={<Medical />} />







        {/* not found page*/}
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;