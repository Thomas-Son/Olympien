import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../../assets/img/logo.png";
import styles from "./Header.module.css";

function Header() {

    const { userInfos, isLogged } = useSelector((state) => state.user);

    return (
        <header>

            <div>
                <img src={logo} alt="logo Olympien" />
                <h1>Réunir le monde autour du sport !</h1>
            </div>
            

            <nav>
                <NavLink to={"/accueil"}>accueil</NavLink>
                <NavLink to={"abonnement"}>abonnement</NavLink>

                {!isLogged ?
                    <NavLink to={"utilisateur/connexion"}>connexion</NavLink>
                    :
                    <>
                        <NavLink to={"recherche"}>recherche</NavLink>
                        {/* <NavLink to={"messages"}>messages</NavLink> */}
                        <NavLink to={"poster"}>poster</NavLink>
                        <NavLink to={userInfos.alias}>profil</NavLink>

                        {localStorage.user_role === "admin" && 
                        <>
                            <NavLink to={"admin"}>administrateur</NavLink>
                            {/* <div>
                                <NavLink to={"admin/utilisateur"}>utilisateurs</NavLink>
                                <NavLink to={"admin/role"}>rôles</NavLink>
                                <NavLink to={"admin/categorie"}>catégories</NavLink>
                                <NavLink to={"admin/commentaire"}>commentaires</NavLink>
                            </div> */}
                        </>}

                        <NavLink to={"utilisateur/deconnexion"}>déconnexion</NavLink>
                    </>
                }

            </nav>

        </header>
    );
}

export default Header;