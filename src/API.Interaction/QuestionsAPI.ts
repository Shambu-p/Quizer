import api from "./api";
import Question from "../Models/Question";
import Choice from "../Models/Choice";

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

    static async addQuestion({text, exam_id, subject, token}: {text: string, exam_id: number, token: string, subject: string}){
    
        try {

            let data = new FormData();
            data.append("text", text);
            data.append("exam_id", exam_id.toString());
            data.append("subject", subject);
            data.append("token", token);
            let response = await api.post("/Exam/add_question", data);
            if(response.data.header.error === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        }catch ({message}){
            console.log(message);
        }

    }

    static async addChoice({question_id, text}: {question_id: number, text: string}){

        try {

            let data = new FormData();
            data.append("question_id", question_id.toString());
            data.append("text", text);
            let response = await api.post("/Question/add_choice", data);
            if(response.data.data.header === "true"){
                throw new Error(response.data.header.message);
            }

            return response.data.data;

        }catch (error){
            throw error;
        }

    }

}