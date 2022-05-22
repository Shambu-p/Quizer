import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1111/"
});

export async function Request(type: string, url: string, request_data?: (object | FormData)): Promise<any>{
    try{

        let data = request_data ? prepareData(request_data) : new FormData();
        let response = ((type == "post") ? await api.post(url, data) : await api.get(url));
        if(response.data.header.error === "true"){
            throw new Error(response.data.header.message);
        }

        return response.data.data;

    }catch(error){
        throw error;
    }
}

function prepareData(request_data: any): FormData{

    if(typeof request_data !== "object"){
        return new FormData();
    }

    let req_data = new FormData();
    let arr = Object.keys(request_data);

    if(arr.length > 0){
        arr.forEach(key => {req_data.append(key, request_data[key])});
    }

    return req_data;

}

export default api;