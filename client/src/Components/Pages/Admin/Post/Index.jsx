import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import PanelAdmin from "../Panel/Index";

function UserPost() {

    const [userPost, setUserPost] = useState(null);

    const params = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const posts = await (await fetch("/api/v1/admin/" + params.alias)).json();
                setUserPost(posts.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <main id="userPost">
            <PanelAdmin />

            {!userPost ? (
                <Loading />
            ) : (
                userPost.map((datas) => <p>{datas.label}</p>)
            )}
        </main>
    );
}

export default UserPost;