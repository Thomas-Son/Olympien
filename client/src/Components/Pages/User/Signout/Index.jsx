import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signout } from "../../../../store/slice/user";


function Signout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(signout());
        navigate("/accueil");
    }, [dispatch, navigate, signout]);

    return null;
}

export default Signout;