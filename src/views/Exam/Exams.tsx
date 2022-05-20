import {useNavigate, Outlet} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import store, {loginAuth} from "../../Auth";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    const navigate = useNavigate();
    const [my_state, setState] = useState(false);

    useEffect(function (){

        let checkAuth = async () => {
            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            setState(true);

        };

        checkAuth();

    }, []);

    return (
        <div className="container p-0 mt-4">
            <MainAppbar  />
            <div>
                <Outlet/>
            </div>
        </div>
    );
}