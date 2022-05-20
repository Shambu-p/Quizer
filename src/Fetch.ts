import api from "./api";
import Exam from "./Models/Exam";
import ExamQuestion from "./Models/ExamQuestion";
import ResultView from "./Models/ResultView";
import Question from "./Models/Question";
import Choice from "./Models/Choice";

/**
 * all the api fetch request methods for Exam api
 */
export class Exams {

    /**
     * this method will fetch all the examination available in the exam table
     */
    static async all(): Promise<Exam[]> {

        try{
            
            let response = await api.get("/Exam/show");
            if(response.data.header.error === "true"){
                throw new Error(response.data.header.message);
            }
            
            return response.data.data;

        }catch(error){
            throw error;
        }

    }

    /**
     * this method will fetch single examination and its related questions from ExamQuestion table
     * @param exam_id
     *      exam_id is number being used to identify certain examination
     */
    static async find(exam_id: number): Promise<ExamQuestion>{
        
        try{
            
            let data = new FormData();
            data.append("exam_id", exam_id.toString());
            let response: any = await api.post("/Exam/view", data);

            if(response.data.header.error === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        }catch(error){
            throw error;
        }

    }

    /**
     * this method fetch single examination from exam table
     * @param exam_id
     *      exam_id is number being used to identify certain examination
     */
    static async detail(exam_id: number): Promise<Exam>{
        
        try {

            let data = new FormData();
            data.append("exam_id", exam_id.toString());
            let response = await api.post("/Exam/detail", data);
            if (response.data.header.error === "true") {
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        } catch (error) {
            throw error;
        }

    }

}

/**
 * this class contains all the method used for fetching data that are related with examination result views
 * it will return something like the following
 *
 *
 */
export class Result {

    static async byUser(token: string): Promise<any>{

        try {

            let data = new FormData();
            data.append("token", token);
            let response: any = await api.post("/ExamResult/show", data);
            if(response.data.header.error === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        }catch (error){
            throw error;
        }

    }

    static async find(result_id: number, token: string): Promise<ResultView>{

        try {

            let data = new FormData();
            data.append("result_id", result_id.toString());
            data.append("token", token);
            let response = await api.post("/ExamResult/view", data);
            if(response.data.data.header === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        }catch (error){
            throw error;
        }

    }

}

export class Questions {

    static async find(id: number): Promise<{ question: Question, choices: Choice[]}>{
        try{

            let data = new FormData();
            data.append("question_id", id.toString());
            let response = await api.post("/Question/view", data);
            if(response.data.header.error === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;
                
        }catch(error){
            throw error;
        }
    }

}



