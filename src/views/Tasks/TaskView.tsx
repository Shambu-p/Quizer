import React, {useState, useEffect} from "react";
import api from "../../api";
import {useParams, useNavigate} from 'react-router-dom';
import store, {loginAuth} from "../../Auth";
import add from "../../components/todo/add";

export default function TaskView(){

    let {taskId} = useParams();
    let navigation = useNavigate();
    const [task, setTask] = useState({});
    const [userInput, setUserInput] = useState(task !== null ? task.users : "");
    const [users, setUsers] = useState([]);
    const [taskCollaborators, setCollaborators] = useState([]);

    useEffect(() => {

        const getTask = async () => {

            if(!await loginAuth()){
                navigation("/login", {replace: true});
                return;
            }

            try {
                let data = new FormData();
                data.append("task_id", taskId);
                let response = await api.post("/Tasks/view", data);
                if(response.data.header.error === "true"){
                    return;
                }

                setTask(response.data.data);
                getUsers(response.data.data.project);

            }catch (error){
                console.log(error.message);
            }

            try {
                let data = new FormData();
                data.append("task_id", taskId);
                let response = await api.post("/UserTasks/show", data);
                if(response.data.header.error === "true"){
                    return;
                }

                setCollaborators(response.data.data);

            }catch (error){
                console.log(error.message);
            }

        };

        let getUsers = async (project) => {

            try {
                let data = new FormData();
                data.append("project_id", project);
                data.append("token", store.logged_user.token);
                let response = await api.post("/Users/by_project", data);
                if(response.data.header.error === "true"){
                    return;
                }

                setUsers(response.data.data);
            }catch (error){
                console.log(error.message);
            }

        };

        getTask();

    }, []);

    let userInputOnChange = event => {
        setUserInput(event.target.value);
    };

    async function finishTask(){

        let data = new FormData();
        data.append("id", task.id);
        data.append("title", task.title);
        data.append("description", task.description);
        data.append("end_date", task.end_date);
        data.append("status", "finished");

        try{
            let response = await api.post("/Tasks/update", data);
            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }
            setTask(response.data.data);
        }catch(error){
            console.log(error.message);
        }

    }

    async function extendTaskDeadline(){

        let data = new FormData();
        data.append("id", task.id);
        data.append("title", task.title);
        data.append("description", task.description);
        data.append("end_date", task.end_date);
        data.append("status", "active");

        try{
            let response = await api.post("/Tasks/update", data);
            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }
            setTask(response.data.data);
        }catch(error){
            console.log(error.message);
        }

    }

    async function deleteTask(){

        if(!window.confirm("Do you really want to delete this task? the operation cannot be undone!")){
            return;
        }
        try{

            let data = new FormData();
            data.append("task_id", task.id);

            let response = await api.post("/Tasks/delete", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }

            navigation("/", {replace: true});

        }catch(error){
            console.log(error.message);
        }
    }

    let compute = (start, deadline) => {

        let current = Math.ceil((new Date().getTime()) / 1000);

        if(current >= deadline){
            return 100;
        }
        return Math.round((current - start) / (deadline - start) * 100);

    }

    let expectation = compute(task.date, task.end_date);



    let addCollaborator = async () => {

        try{

            let data = new FormData();
            data.append("task", task.id);
            data.append("users", userInput);

            let response = await api.post("/UserTasks/save", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                alert(response.data.header.message);
                return;
            }

            setCollaborators(response.data.data);

        }catch(error){
            console.log(error.message);
        }

    };

    let removeCollaborator = async (user) => {
        try{

            let data = new FormData();
            data.append("task", taskId);
            data.append("users", user);

            let response = await api.post("/UserTasks/delete", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                alert(response.data.header.message);
                return;
            }

            let collaborators_filter = [];
            taskCollaborators.forEach(coll => {
                if(coll.UserTasks_users !== user || coll.UserTasks_task !== taskId){
                    collaborators_filter.push(coll);
                }
            });

            setCollaborators(collaborators_filter);

        }catch(error){
            console.log(error.message);
        }
    };
    let setUserOptions = () => {
        allUsers = users.map(user => {
            return (<option key={user.user_id} value={user.user_id}>{user.user_fullname}</option>);
        });
    };

    let participants, allUsers, add_user_component = null;

    users.forEach(user => {

        if(user.UserProjects_users === store.logged_user.id && user.UserProjects_role === "manager"){

            setUserOptions();

            add_user_component = (
                <div className="card-body d-flex">
                    <div className="input-group">
                        <select className="form-control form-control-sm" onChange={userInputOnChange} title="select Collaborator" aria-describedby="add_collaborator_btn">
                            {allUsers}
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary btn-sm" onClick={addCollaborator} type="button" id="add_collaborator_btn">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            );

        }

    });

    participants = ((taskCollaborators.length === 0) ? ([(
        <div key={1} className="card-body">
            <h6 className="card-subtitle text-center">No Collaborator found! <br/> Try to add one</h6>
        </div>
    )]) : (taskCollaborators.map(participant => {
        return (
            <div key={participant.UserTasks_users} className="card-body d-flex justify-content-between">
                <div className="d-flex">
                    <div className="bg-dark rounded-circle mr-3" style={{width: "40px", height: "40px"}} />
                    <div className="pt-2">
                        <h5 className="card-subtitle">{participant.user_fullname}</h5>
                    </div>
                </div>
                <div>
                    <button className="btn btn-sm btn-danger" onClick={() => {removeCollaborator(participant.UserTasks_users)}}>remove</button>
                </div>
            </div>
        );
    })));

    return (
        <div className='container mt-5'>
            <div className="shadow-sm p-3 mb-4 d-flex justify-content-between">
                <span>
                    <h3 className='card-title mb-0'> {task.title} </h3>
                    <small className="text-muted mr-3"><b>Start Date:</b> {new Date(parseInt(task.date) * 1000).toUTCString()}</small>
                    <small className="text-muted"><b>Deadline:</b> {new Date(parseInt(task.end_date) * 1000).toUTCString()}</small>
                </span>
                <div>
                    <div className="btn-group">
                        <button className="btn btn-dark btn-sm" onClick={finishTask}>Finish</button>
                        <button className="btn btn-dark btn-sm" onClick={extendTaskDeadline}>Extend</button>
                        <button className="btn btn-dark btn-sm">Cancel</button>
                        <button className="btn btn-dark btn-sm" onClick={deleteTask}>Delete</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="p-3 shadow-sm">
                        <h5 className='card-subtitle'>Description</h5>
                        <p>{task.description}</p>
                    </div>
                </div>
                <div className="col-4">

                    <div className="card shadow-sm">

                        {participants}

                        {add_user_component}

                    </div>

                </div>
            </div>

            <div className='p-2 rounded shadow-sm mt-3 mb-3 bg-light'>
                <div className="progress bg-primary rounded text-center" style={{width: expectation + "%"}}>
                    <h5 className='text-center text-white'>Expected {expectation}%</h5>
                </div>
            </div>

            <div className='p-2 rounded shadow-sm mt-3 mb-3 bg-light'>
                <div className="progress bg-success rounded text-center" style={{width: "40%"}}>
                    <h5 className='text-center text-white'>Current 40%</h5>
                </div>
            </div>

        </div>
    );

};