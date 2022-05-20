import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import store from "../Auth";
import api from "../api";
import {Outlet} from "react-router";

export default function (){

    const navigate = useNavigate();
    const params = useParams();
    let [exams, setExam] = useState([]);
    let exams_components = {};

    useEffect(()=> {
        let getExams = async () => {
            try {

                let data = new FormData();
                let response = await api.get("/Exam/show");
                if(response.data.data.header === "true"){
                    return;
                }

                setExam(response.data.data);

            }catch (error){
                console.log(error.message);
            }
        };


    }, []);


    return (
        <div className="container p-0 mt-4">
            <div className="d-flex justify-content-between rounded shadow-sm mb-3 p-3">
                <h2 className='card-title mb-0'>Absoft Examination Center </h2>
                <div className="btn-group">
                    <button className="btn btn-dark btn-sm" onClick={() => {navigate("/login")}}>Login</button>
                    <button className="btn btn-dark btn-sm" onClick={() => {navigate("/register")}}>Register</button>
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