import React, {useState, useEffect} from "react";
import api from "../../api";
import {useNavigate} from "react-router-dom";
import {loginAuth} from "../../Auth";
import Subject from "../../Models/Subject";
import {Request} from "../../API.Interaction/api";
import Exams from "../../API.Interaction/ExamsAPI";

export default function (){

    const [inputs, setInputs] = useState({
        title: "",
        subject: "",
        description: ""
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);

    const navigate = useNavigate();

    useEffect(() => {

        let getSubjects = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try{

                let response = await Request("post", "/Subjects/show");

                setSubjects(response);
                setInputs({...inputs, subject: response[0].name});

            }catch({message}){
                console.log(message);
            }
        };

        getSubjects();

    }, []);


    let titleOnChange = (event: any) => {
        setInputs({...inputs, title: event.target.value});
    };

    let subjectOnChange = (event: any) => {
        setInputs({...inputs, subject: event.target.value});
    };

    let descriptionOnChange = (event: any) => {
        setInputs({...inputs, description: event.target.value});
    };

    async function createExam(event: any){

        event.preventDefault();

        try{

            await Exams.createExam({
                title: inputs.title,
                subject: inputs.subject,
                description: inputs.description
            });

            event.target.reset();
            navigate("/exam/show");

        }catch({message}){
            console.log(message);
        }

    }

    let index = -1;
    let options = subjects.map(subject => {
        index += 1;
        return (<option key={index} value={subject.name}> {subject.name} </option>);
    })

    return (
        <div className="d-flex">
            <div className="col" />
            <form onSubmit={createExam} className="col-8">
                <input id="input_title" type="text" placeholder='Exam Title' className='form-control mb-3' onChange={titleOnChange}/>
                <textarea className="form-control mb-3" placeholder="Examination Description" rows={5} onChange={descriptionOnChange} />
                <select title='Select Subject' className='form-control mb-3' onChange={subjectOnChange}>
                    {options}
                </select>
                <button className="btn btn-block btn-dark" type="submit">Create</button>
            </form>
            <div className="col" />
        </div>
    );
}