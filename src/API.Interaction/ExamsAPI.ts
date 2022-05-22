import {Request} from "./api";
import Exam from "../Models/Exam";
import ExamQuestion from "../Models/ExamQuestion";

/**
 * all the api fetch request methods for Exam api
 */
export default class Exams {

    /**
     * this method will fetch all the examination available in the exam table
     */
    static async all(): Promise<Exam[]> {

        try{
            return await Request("post", "/Exam/show");
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

            return await Request("post", "/Exam/view", {
                exam_id: exam_id.toString()
            });

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

            return await Request("post", "/Exam/detail", {
                exam_id: exam_id.toString()
            });

        } catch (error) {
            throw error;
        }

    }

    /**
     * this method will request for the creation of Exam entity in exam table
     * @param exam_data
     *      exam_data should contain title, subject name and exam description
     */
    static async createExam(exam_data: { title: string, subject: string, description: string}): Promise<Exam>{

        try{
            return await Request("post", "/Exam/save", exam_data);
        }catch(error){
            throw error;
        }

    }

}