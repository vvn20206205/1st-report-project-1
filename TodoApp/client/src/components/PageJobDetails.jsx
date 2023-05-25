import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import HandleDeleteJob from './handleDeleteJob'


export default function PageJobDetails() {
    const [job, setJob] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get( `http://localhost:6205/api/jobs/${id}`)
            .then(response => setJob(response.data.job))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div className="container">
            <h3>Job Details</h3>
            <table className="table table-hover table-bordered" >
                <tbody>
                    <tr><th>ID:</th><td>{job.id}</td></tr>
                    <tr><th>Name:</th><td>{job.name}</td></tr>
                    <tr><th>Time:</th><td>{job.time}</td></tr>
                </tbody>
            </table>
            <Link style={{ marginRight: '10px' }} className="btn btn-outline-success " to={`/edit/${id}`}>Edit</Link>
            <Link className="btn btn-outline-danger" onClick={() => HandleDeleteJob(id)}>Delete</Link>
        </div>
    );
}

