import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainHome from "./views/MainHome";
import Error from "./views/Error";
import Login from "./views/Login";
import ExamList from "./views/Exam/ExamList";
import CreateExam from "./views/Exam/CreateExam";
import Exams from "./views/Exam/Exams";
import ExamView from "./views/Exam/View";
import Detail from "./views/Exam/Detail";
import Registration from "./views/Registration";
import Take from "./views/Exam/Take";
import ResultView from "./views/Result/View";
import ResultShow from "./views/Result/Show";

ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainHome />} />

            <Route path="/exam" element={<Exams />} >
                <Route path="show" element={<ExamList />} />
                <Route path="create" element={<CreateExam />} />
            </Route>

            <Route path="/take_exam/:result_id/:exam_id" element={<Take />} />
            <Route path="/exam_view/:exam_id" element={<Detail />} />
            <Route path="/result_view/:result_id" element={<ResultView />} />
            <Route path="/results" element={<ResultShow />} />
            <Route path="/exam_detail/:exam_id" element={<ExamView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>),
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
