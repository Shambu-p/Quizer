import {Request} from "./api";
import ResultView from "../Models/ResultView";
import api from "../api";
import ExamResult from "../Models/ExamResult";
import Exam from "../Models/Exam";
import ExamResultQuestion from "../Models/ExamResultQuestion";
import Examination from "../Models/Examination";
import variables from "../Auth";

/**
 * this class contains all the method used for 
 * fetching data that are related with examination result views
 */
 export default class Result {

    static async byUser(token: string): Promise<any>{

        try {

            return await Request("post", "/ExamResult/show", {token: token});

        }catch (error){
            throw error;
        }

    }

    static async find(result_id: number, token: string): Promise<Examination>{

        try {

            return await Request("post", "/ExamResult/view", {
                result_id: result_id,
                token: token
            });

        }catch (error){
            throw error;
        }

    }

    static async addResult(exam_id: number, token: string): Promise<ExamResult>{

        try{
            return await Request("post", "/ExamResult/save", {
                exam_id: exam_id,
                token: token
            });
        }catch (error) {
            throw error;
        }

    }

    static async answerQuestion(answer_data: {
        choice: number,
        result_id: number,
        question: number,
        token: string
    }): Promise<ExamResultQuestion> {

        try{
            return await Request("post", "/ExamResult/add_result", answer_data);
        }catch(error){
            throw error;
        }

    }

}
