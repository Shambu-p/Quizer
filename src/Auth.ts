import api from "./api";
import * as cookies from "./cookies";

let userPlaceholder = {
    token: "",
    id: 0,
    fullname: "",
    grade: 0,
    email: "",
    role: ""
};

const variables = {
    logged_user: null,
    getUser: () => {
        return variables.logged_user ?? userPlaceholder;
    }
};

export async function loginAuth(){

    let token = cookies.get("login_token");

    if(token){

        if(variables.logged_user){
            return true;
        }

        return await information(token);

    }else{
        return false;
    }

}

export async function Login(email: string, password: string){

    try{
        
        let data = new FormData();
        data.append("email", email);
        data.append("password", password);
        let response = await api.post("/Auth/login", data);

        if(response.data.header.error === "true"){
            throw new Error(response.data.header.message);
        }

        cookies.set("login_token", response.data.data.token, 2);
        return response.data.data;

    }catch(error){
        throw error;
    }

}

export async function Logout(token: string){

    try{

        let data = new FormData();
        data.append("token", token);

        let response = await api.post("/Auth/logout", data);
        if(response.data.header.error === "true"){
            throw new Error(response.data.header.message);
        }

        variables.logged_user = null;
        cookies.remove("login_token");

    }catch (error){
        throw error;
    }

}

async function information(token: string){

    let ret = false;

    try{

        let data = new FormData();
        data.append("token", token);

        let response = await api.post("/Auth/authorization", data);
        if(response.data.header.error === "false"){
            variables.logged_user = response.data.data;
            // @ts-ignore
            variables.logged_user.token = token;
            ret = true;
        }

    }catch ({message}){
        console.log(message);
    }

    return ret;

}

export default variables;