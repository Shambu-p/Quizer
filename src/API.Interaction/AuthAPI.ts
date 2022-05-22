import {Request} from "./api";
import * as cookies from "../cookies";
import globalState from '../GlobalState';

const [logged_user, setState] = globalState<"logged_user" | "is_logged_in">("logged_user");

export async function loginAuth(){

    let token = cookies.get("login_token");

    if(token){

        if(logged_user){
            return true;
        }

        return await information(token);

    }else{
        return false;
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

export async function Logout(token: string){

    try{

        await Request("post", "/Auth/logout", {token: token});
        cookies.remove("login_token");

    }catch (error){
        throw error;
    }

}

async function information(token: string){

    let ret = false;

    try{

        let response = await Request("post", "/Auth/authorization", {token: token});
        setState({...response, token: token});
        ret = true;

    }catch ({message}){
        console.log(message);
    }

    return ret;

}