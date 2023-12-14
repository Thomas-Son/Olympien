import { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

function CategoryList() {

    const [category, setCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const categorys = await (await fetch("/api/v1/admin/category/all")).json();
                setCategoryList(categorys.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/category/add", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category }),
        });
        
        navigate("/admin");
    }

    return (
        <main id="categoryList">
            {!categoryList ? (
                <Loading />
            ) : (
                categoryList.map((datas) => <p>{datas.label}</p>)
            )}

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Entrer la nouvelle catégorie"
                    type="text"
                    name="label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">Ajouter la nouvelle catégorie</button>

            </form>
        </main>
    );
}

export default CategoryList;