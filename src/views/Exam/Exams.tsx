import {useNavigate, Outlet} from 'react-router-dom';
import React, {useEffect} from "react";
import {loginAuth} from "../../Auth";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    return (
        <div className="container p-0 mt-4">
            <MainAppbar page="exams"/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}