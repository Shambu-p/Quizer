import {Request} from "./api";
import * as cookies from "../cookies";
import Users from "../Models/Users";

export async function loginAuth(): Promise<{status: boolean, data: (Users | null)}> {

    let token = cookies.get("login_token");

    if(token){
        return await information(token);
    }else{
        return {
            status: false,
            data: null
        };
    }

}

export async function Login(email: string, password: string){

    try{

        let response = await Request("post", "/Auth/login", {
            email: email,
            password: password
        });

        cookies.set("login_token", response.token, 2);
        return response;

    }catch(error){
        throw error;
    }

}

export async function Logout(token: string): Promise<void> {

    try{

        await Request("post", "/Auth/logout", {token: token});
        cookies.remove("login_token");

    }catch (error){
        throw error;
    }

}

async function information(token: string): Promise<{status: boolean, data: (Users | null)}> {

    try{

        let response = await Request("post", "/Auth/authorization", {token: token});

        return {
            status: true,
            data: {...response, token: token}
        };

    }catch ({message}){
        console.log(message);
    }

    return {
        status: false,
        data: null
    };

}
