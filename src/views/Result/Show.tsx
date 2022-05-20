import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import variables, {loginAuth} from '../../Auth';
// @ts-ignore
import MainAppbar from '../../components/AppBars/Main';
import EmptyMessage from '../../components/Extra/EmptyMessage';
import {Result} from "../../Fetch";


export default function (){

    const navigate = useNavigate();
    let [results, setResults] = useState([]);

    useEffect(()=> {
        let getExams = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try {

                // @ts-ignore
                let response: never[] = await Result.byUser(variables.logged_user.token);

                setResults(response);

            }catch ({message}){
                console.log(message);
            }
        };

        getExams();

    }, []);

    let list = (results.length === 0) ? (
        <EmptyMessage 
            title="You did not take any Exam!" 
            subTitle="take some examinations"
        />
    ) : results.map(result => {
        console.log(result.exam_title)
        return (
            <div className="card mb-3" key={result.ExamResult_id}>
                <div className="card-body">
                    <h4 className="card-title">{result.exam_title}</h4>
                    <h5 className="card-subtitle mb-3">
                        Score: <span className="badge badge-success">{result.ExamResult_score ?? 0}</span>
                    </h5>
                    <button className="btn btn-sm btn-link" onClick={() => {navigate("/result_view/" + result.ExamResult_id)}}>
                        view
                    </button>
                </div>
            </div>
        );
    });

    return (
        <div className="container p-0 mt-4">
            <MainAppbar />
            <div>
                {list}
            </div>
        </div>
    );

}