
// import { useState } from 'react'
// import './App.css'

// import SignIn from './Pages/LogInFinale'
// import SignUp from './Pages/SignUpFinale'
// import NavBar from './Components/NavBarFinale'
// import ProfilePage from './Pages/ProfilePageFinale'
// import NavBarNotLoged from './Components/NavBarNotLoggedFinale'
// import AddCar from './Pages/AddCar'
// import  DataGrid from './Components/DataGrid'
// import MyCollectionPage from './Pages/MyCollectionPage'
// import Explore from "./Pages/Explore"
// import DisplayCollection from './Pages/DisplayColectionPage'
// //import HomePageNotLoged from './Pages/HOME_NOTLOGED'

// import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
// import Collections from './Pages/CollectionsPage'


// function App() {
  
//   if (sessionStorage.getItem("isLogged") == null){
//     sessionStorage.setItem("isLogged", "false");
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/signIn" element={<SignIn/>} />
//         <Route path="/" element={<NavBar/>} />
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/ss" element={<SignUp/>} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/addCar" element={<AddCar />} />
//         <Route path="/test" element={<DataGrid />} />
//         <Route path="/myCollection" element={<MyCollectionPage />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/collections" element={<Collections />} />
//         <Route path="/coll/:collection_name" element={<DisplayCollection />} />
//         {/* <Route path="/homeNotLoged" element={<HomePageNotLoged />} /> */}
//       </Routes>
//     </Router>
//   )
// }

// export default App
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import SignIn from './Pages/LogInFinale';
import SignUp from './Pages/SignUpFinale';
import NavBar from './Components/NavBarFinale';
import AddCar from './Pages/AddCar';
import MyCollectionPage from './Pages/MyCollectionPage';
import Explore from "./Pages/Explore";
import DisplayCollection from './Pages/DisplayColectionPage';
import Collections from './Pages/CollectionsPage';

// Protected Route Component
const ProtectedRoute = () => {
  const isLogged = sessionStorage.getItem("isLogged") === "true";
  return isLogged ? <Outlet /> : <Navigate to="/signIn" />;
};

function App() {
  useEffect(() => {
    if (sessionStorage.getItem("isLogged") == null) {
      sessionStorage.setItem("isLogged", "false");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Explore />} />
            <Route path="addCar" element={<AddCar />} />
            <Route path="myCollection" element={<MyCollectionPage />} />
            <Route path="explore" element={<Explore />} />
            <Route path="collections" element={<Collections />} />
            <Route path="coll/:collection_name" element={<DisplayCollection />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/signIn" />} />
      </Routes>
    </Router>
  );
}

export default App;