import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTitle } from "./setTitle";
import { signout } from "../../store/slice/user";

function HOC({ child, auth }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN = localStorage.getItem("auth");

    // const cart = JSON.parse(localStorage.getItem("cart"));

    const Child = child;

    useEffect(() => {
        window.scrollTo(0, 0);
        const title = setTitle(pathname);
        document.title = title;
    }, [pathname]);

    useEffect(() => {
        async function checkAuth() {
            if (auth) {
                if (!TOKEN) {
                    navigate("/");
                }
                if (TOKEN) {
                    const res = await fetch("/api/v1/user/check_token", {
                        headers: { Authentication: "Bearer " + TOKEN },
                    });
                    if (res.status === 401) {
                        localStorage.removeItem("auth")
                        dispatch(signout());
                        navigate("/");
                    }
                    if (res.status === 200) {
                        const json = await res.json();
                        console.log("200");
                        setTokenIsValid(true);
                    }
                }
            }
        }

        checkAuth();
    }, [auth]);

    return <>{(!auth || (auth && tokenIsValid)) && <Child />}</>;
}

export default HOC;