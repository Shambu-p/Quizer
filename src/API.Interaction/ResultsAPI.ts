import api from "./api";
import ResultView from "../Models/ResultView";

/**
 * this class contains all the method used for 
 * fetching data that are related with examination result views
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
