import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import SigninForm from '../src/components/signup-login-forms-User/SigninForm.jsx'
import ParentComponent from '../src/components/signup-login-forms-User/ParentComponent.jsx'
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
import AdminLife from './adminLifeComponent/AdminLife.js';
import NatTips from './NatAdminComponent/NatTip.js';
import SignupForm from './Sign_up_admin/SignupForm.jsx';
import DiabetesPrediction from './FinalPredictComponent/Diabetes.js';


import Locations from './finalLoccationComponent/locations.js';
import AdminReviewsPage from './AdminReviews/ReviewsPage.jsx';
import DeleteAdmin from './delete-admin/DeleteAdmin.jsx';
import AdminProfile from './admin-profile/AdminProfile.jsx';
import UserProfile from './user-profile/UserProfile.jsx';
import Natural from './finalNatComponent/naturalTips.js';
import UnReNature from './UnRegisteredComponent/UnRegisteredNat.js';
import ViewData from './finalViewDataComponent/ViewData.js';


import ReviewsAdmin from './finalAgmin RevComponent/AdminR.js';
import Graph from './finalGraphComponent/finalGraph.js';


import PrivateRoute from './routes/private-route.jsx';
import BlockedRoute from './routes/blocked-route.jsx';
import AdminRoute from './routes/admin-route.jsx'
import Reviews from './ReviewsPageComponent/Review.js';
import MultiStepForm from './multistepComponent/MultiStepForm.js';

const ModalProvider = lazy(() => import("./providers/modal-provider"))
const ToasterProvider = lazy(() => import("./providers/toaster-provider"))

function App() {

  return (

    <BrowserRouter>
      <Suspense fallback={<>loading...</>}>
        <ToasterProvider />
        <ModalProvider />
      </Suspense>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-In" element={<BlockedRoute><ChoosePage /></BlockedRoute>} />
        <Route path="/Sign-Up" element={<BlockedRoute><ParentComponent /></BlockedRoute>} />
        <Route path="/user" element={<BlockedRoute><SigninForm /></BlockedRoute>} />

        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Registered" element={<PrivateRoute><UserRev /></PrivateRoute>} />
        <Route path="/NaturalTips" element={<UnReNature />} />
        <Route path="/admin" element={<Signin />} />
        <Route path="/NewNat" element={<NewNat />} />
        <Route path="/uploadData" element={<UploadData />} />
        <Route path="/viewData" element={<ViewData />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/userlifestyle" element={<ReLifestyle />} />
        {/* <Route path="/logout" element={<Welcome />} /> */}
        <Route path="/AdminLifestyle" element={<AdminLife />} />
        <Route path="/NatTips" element={<AdminRoute><NatTips /></AdminRoute>} />
        <Route path="/addAdmin" element={<AdminRoute><SignupForm /></AdminRoute>} />
        <Route path="/predict" element={<DiabetesPrediction />} />


        <Route path="/Location" element={<Locations />} />
        <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/AdminReview" element={<AdminRoute><ReviewsAdmin /></AdminRoute>} />
        <Route path="/delete" element={<AdminRoute><DeleteAdmin /></AdminRoute>} />
        <Route path="/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />

        <Route path="/NewNat" element={<Natural />} />
        <Route path="/UrgentSign" element={<ParentComponent />} />
        <Route path="/MedicationL" element={<MultiStepForm />} />
        <Route path="/reviewsB" element={<PrivateRoute><UserRev /></PrivateRoute>} />
        {/* <Route path="/Submit" element={<PrivateRoute><UserRev /></PrivateRoute>} /> */}
        <Route path="/AdminSignIn" element={<AdminRoute><ReviewsAdmin /></AdminRoute>} />
        {/* <Route path="/ProfileLogout" element={<Welcome />} /> */}
        {/* <Route path="/AdminLogout" element={<Welcome />} /> */}
        <Route path="/AdminSign" element={<AdminRoute><ReviewsAdmin /></AdminRoute>} />
        <Route path="/graph" element={<PrivateRoute><Graph /></PrivateRoute>} />


        {/* not found page*/}
        <Route path='*' element={<Navigate to={'/'} />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App;