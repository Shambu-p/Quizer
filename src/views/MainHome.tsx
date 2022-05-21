import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {loginAuth} from "../Auth";

export default function (){

    const navigate = useNavigate();
    let [is_logged_in, setLog] = useState(false);

    useEffect(()=> {

        let authenticate = async () => {
            try {

                if(await loginAuth()){
                    // navigate("/exam", {replace: true});
                    setLog(true);
                    return;
                }

            }catch ({message}){
                console.log(message);
            }
        };

        authenticate();

    }, []);


    return (
        <div className="container p-0 mt-4">
            <div className="d-flex justify-content-between rounded shadow-sm mb-3 p-3">
                <h2 className='card-title mb-0'>Absoft Examination Center </h2>
                <div className="btn-group">
                    <button className="btn btn-dark btn-sm" style={{display: is_logged_in ? "none":""}} onClick={() => {navigate("/login")}}>Login</button>
                    <button className="btn btn-dark btn-sm" style={{display: is_logged_in ? "none":""}} onClick={() => {navigate("/register")}}>Register</button>
                    <button className="btn btn-dark btn-sm" style={{display: is_logged_in ? "":"none"}} onClick={() => {navigate("/exam/show")}}>Exams</button>
                </div>
            </div>
            <div className="mt-5 d-flex" style={{"padding": "40px 10px"}}>

                <p className="display-1 text-center">
                    Hello Students! <br/>
                    Do you want to be Tested? <br/>
                    Then you are at the right place.
                </p>

            </div>
        </div>
    );
}