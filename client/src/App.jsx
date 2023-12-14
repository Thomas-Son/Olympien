import { BrowserRouter, Routes, Route } from "react-router-dom";

import HOC from "./Components/HOC/Index"

import Header from "./Components/Containers/Header/Index"
import Footer from "./Components/Containers/Footer/Index"
import UserList from "./Components/Pages/Admin/User/Index"
import UserPost from "./Components/Pages/Admin/Post/Index"
import RoleList from "./Components/Pages/Admin/Role/Index"
import CategoryList from "./Components/Pages/Admin/Category/Index"

import Home from "./Components/Pages/Home/Publication/Index"
import Sub from "./Components/Pages/Subscription/Index"
import SubDetail from "./Components/Pages/Subscription/Detail/Index"
import SubCategory from "./Components/Pages/Subscription/SubCategory/Index"
import Search from "./Components/Pages/Research/Index"
import Messages from "./Components/Pages/Messaging/Index"
import Post from "./Components/Pages/Post/Index"
import Profile from "./Components/Pages/User/Profile/Index"

import Signin from "./Components/Pages/User/Signin/Index";
import Signup from "./Components/Pages/User/Signup/Index";
import Signout from "./Components/Pages/User/Signout/Index";

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <HOC child={Header} />

      <Routes>
        <Route path="/admin">
          <Route path="utilisateur" element={<HOC child={UserList} auth={true} />} />
          <Route path=":alias" element={<HOC child={UserPost} auth={true} />} />
          <Route path="role" element={<HOC child={RoleList} auth={true} />} />
          <Route path="categorie" element={<HOC child={CategoryList} auth={true} />} />
        </Route>

        <Route path="/utilisateur">
          <Route path="connexion" element={<HOC child={Signin} />} />
          <Route path="inscription" element={<HOC child={Signup} />} />
          <Route path="deconnexion" element={<HOC child={Signout} />} />
        </Route>

        <Route path="/accueil" element={<HOC child={Home} />} />
        <Route path="abonnement" element={<HOC child={Sub} />} />
        <Route path="/abonnement/:id" element={<HOC child={SubDetail} />} />
        <Route path="/abonnement/categorie/:categorie" element={<HOC child={SubCategory} />} />
        
        <Route path="/recherche" element={<HOC child={Search} />} />

        <Route path="messages" element={<HOC child={Messages} />} />
        <Route path="poster" element={<HOC child={Post} />} />
        <Route path=":alias" element={< HOC child={Profile} />} />
                
      </Routes>

      <HOC child={Footer} />
    </BrowserRouter>
  );
}

export default App;
