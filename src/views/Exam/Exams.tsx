import {Outlet} from 'react-router-dom';
import React from "react";
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