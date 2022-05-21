import {useNavigate, Outlet} from 'react-router-dom';
import React, {useEffect} from "react";
import {loginAuth} from "../../Auth";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    const navigate = useNavigate();

    useEffect(function (){

        let checkAuth = async () => {
            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

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