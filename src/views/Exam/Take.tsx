import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {loginAuth} from "../../API.Interaction/AuthAPI";
import Taking from "../../components/Question/Taking";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import ExamResult from "../../Models/ExamResult";
import Exam from "../../Models/Exam";
import {Exams} from "../../Fetch";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";
import ResultsAPI from "../../API.Interaction/ResultsAPI";
import useGlobalState from "../../GlobalState";
import Users from "../../Models/Users";

let examPlaceholder: Exam = {
    id: 0,
    title: "",
    data: 0,
    subject: "",
    description: "",
    count: 0
}

export default function (){

    const [result, setResult] = useState<ExamResult>();
    const [exam, setExam] = useState<Exam>();
    const [questions, setQuestions] = useState<ExamQuestionCombination[]>([]);
    const [logged_user, setLog] = useState<Users | null>(null);
    const [count, setCount] = useState(0);
    const params: any = useParams();
    const navigate = useNavigate();

    useEffect(function (){
        let getExam = async  () => {

            let auth = await loginAuth();
            if(!auth.status){
                navigate("/login", {replace: true});
                return;
            }

            setLog(auth.data);

            try {

                let response = await ResultsAPI.find(params.result_id, (logged_user && logged_user.token) ? logged_user.token : "");
                setResult(response.result);

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

            await ResultsAPI.answerQuestion({
                choice: choice_id,
                result_id: params.result_id,
                question: question_id,
                token: (logged_user && logged_user.token) ? logged_user.token : ""
            });

            if(questions.length - 1 === count){
                navigate("/result_view/" + (result ? result.id : ""));
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
    let question_component = questions.map(question => {
        let id = "question_" + simple_count;
        simple_count += 1;
        return (simple_count === 1) ?
            (<Taking key={question.question} question={question} identifier={id} visibility_type={true} answer_method={giveAnswer} />) :
            (<Taking key={question.question} question={question} identifier={id} visibility_type={false} answer_method={giveAnswer} />);
    });

    return (
        <div className="container mt-4">
            <ExamAppbar exam={exam ?? examPlaceholder} />
            {question_component}
        </div>
    );

}