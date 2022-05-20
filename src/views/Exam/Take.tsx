import React, {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import variables, {loginAuth} from "../../Auth";
import Taking from "../../components/Question/Taking";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import ExamResult from "../../Models/ExamResult";
import Exam from "../../Models/Exam";
import Question from "../../Models/Question";
import {Exams} from "../../Fetch";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";



export default function (){

    //@ts-ignore
    const [result, setResult] = useState<ExamResult>({});
    //@ts-ignore
    const [exam, setExam] = useState<Exam>({});
    const [questions, setQuestions] = useState<ExamQuestionCombination[]>([]);
    const [count, setCount] = useState(0);
    const params: any = useParams();
    const navigate = useNavigate();
    let question_component = [];

    useEffect(function (){
        let getExam = async  () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try {

                let data = new FormData();
                data.append("result_id", params.result_id)
                // @ts-ignore
                data.append("token", variables.logged_user.token)
                let response = await api.post("/ExamResult/view", data);
                if(response.data.data.header === "true"){
                    return;
                }

                setResult(response.data.data.result);

            }catch ({message}){
                console.log(message);
            }

            try {

                let response = await Exams.find(params.exam_id);

                setExam(response.exam);
                setQuestions(response.questions);

            }catch ({message}){
                console.log(message);
            }

        };

        getExam();

    }, []);

    let giveAnswer = async (choice_id: number, question_id: number) => {

        try {

            let data = new FormData();
            data.append("choice", choice_id.toString());
            data.append("result_id", params.result_id);
            data.append("question", question_id.toString());
            // @ts-ignore
            data.append("token", variables.logged_user.token);

            let response = await api.post("/ExamResult/add_result", data);
            if(response.data.header.error === "true"){
                return;
            }

            if(questions.length - 1 === count){
                navigate("/result_view/" + result.id);
                return;
            }

            //@ts-ignore
            window.document.getElementById("question_" + count).style.setProperty("display", "none");
            //@ts-ignore
            window.document.getElementById("question_" + (count + 1)).style.setProperty("display", "block");
            setCount(count + 1);

        }catch ({message}){
            console.log(message);
        }

    };

    let simple_count = 0;
    question_component = questions.map(question => {
        let id = "question_" + simple_count;
        simple_count += 1;
        return (simple_count === 1) ?
            (<Taking key={question.question} question={question} identifier={id} visibility_type={true} answer_method={giveAnswer} />) :
            (<Taking key={question.question} question={question} identifier={id} visibility_type={false} answer_method={giveAnswer} />);
        });

        return (
            <div className="container mt-4">
                <ExamAppbar exam={exam} />

                {((question_component[count]) ? question_component : "")}

            </div>
        );
}