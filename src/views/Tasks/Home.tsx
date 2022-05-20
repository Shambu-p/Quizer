import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TodoShow from "../../components/todo/show";
import AddTodo from "../../components/todo/add";
import api from "../../api";
import store, {loginAuth} from "../../Auth";

export default function (){

    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState({});
    const [isManager, setIsManager] = useState(false);
    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {

        const getTasks = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
            }

            try {

                let data = new FormData();
                data.append("project_id", params.project_id);
                data.append("token", store.logged_user.token);
                let response = await api.post("/Projects/view", data);
                if(response.data.header.error === "true"){
                    alert(response.data.header.message);
                    return;
                }

                setTasks(response.data.data.tasks);
                setProject(response.data.data.project);

                if(response.data.data.project.manager === store.logged_user.id){
                    setIsManager(true);
                }

            }catch (error){
                console.log(error.message);
            }

        };

        getTasks();

    }, []);

    async function addNewTask(title, description, start_date, end_date){

        try{

            let data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("end_date", end_date);
            data.append("start_date", start_date);
            data.append("project_id", params.project_id);
            data.append("token", store.logged_user.token);

            let response = await api.post("/Tasks/save", data);
            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }
            //

            setTasks([...tasks, response.data.data]);

        }catch(error){
            console.log(error.message);
        }
    }

    let conditioned = isManager ? (
        <div className="row">
            <div className="col-8">
                <TodoShow tasks={tasks} />
            </div>
            <div className="col">
                <AddTodo project_id={params.project_id} add_task={addNewTask}/>
            </div>
        </div>
    ) : (<TodoShow tasks={tasks} />);

    return (
        <div className='container mt-4'>
            <div className="shadow-sm p-3 mb-4 d-flex justify-content-between">
                <span>
                    <h3 className='card-title mb-0'> {project.name} </h3>
                    <small className="text-muted"><b>Today:</b> {new Date().toUTCString()}</small>
                </span>
                <div>
                    <div className="btn-group">
                        <button className="btn btn-dark btn-sm" onClick={() => {}}>Delete</button>
                        <button className="btn btn-dark btn-sm" onClick={() => {}}>Finish</button>
                        <button className="btn btn-dark btn-sm">Stop</button>
                    </div>
                    <div className="btn-group ml-3">
                        <button className="btn btn-dark btn-sm" onClick={() => {navigate("/project_detail/" + project.id)}}>Detail</button>
                    </div>
                </div>
            </div>
            {conditioned}
        </div>
    );

}