import {Request} from "./api";
import Question from "../Models/Question";
import Choice from "../Models/Choice";
import ExamQuestionCombination from "../Models/ExamQuestionCombination";

export default class Questions {

    static async find(id: number): Promise<{ question: Question, choices: Choice[]}>{
        try{
            return await Request("post", "/Question/view", {question_id: id.toString()});
        }catch(error){
            throw error;
        }
    }

    static async addQuestion(question_data: {text: string, exam_id: number, token: string, subject: string}): Promise<ExamQuestionCombination>{
    
        try {
            return await Request("post", "/Exam/add_question", question_data);
        }catch (error){
            throw error;
        }

    }

    static async addChoice(choice_data: {question_id: number, text: string}){

        try {
            return await Request("post", "/Question/add_choice", choice_data);
        }catch (error){
            throw error;
        }

    }

    static async chooseAnswer(question_id: number, answer: number){
        try{
            return await Request("post", "/Question/update_answer", {
                question_id: question_id,
                answer: answer
            });
        }catch(error){

        }
    }

}