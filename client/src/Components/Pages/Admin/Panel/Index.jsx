import { Link } from "react-router-dom";

import styles from "./Panel.module.css";

function PanelAdmin() {
    
    return (
        <nav className={styles.panel}>
            <Link to={"/admin/utilisateur"}>utilisateurs</Link>
            <Link to={"/admin/role"}>rôles</Link>
            <Link to={"/admin/categorie"}>catégories</Link>
            <Link to={"/admin/publication"}>publications</Link>
        </nav>
    )
}

export default PanelAdmin;