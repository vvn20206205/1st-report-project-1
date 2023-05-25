import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function PageEditJob() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [isJobEdited, setIsJobEdited] = useState(0);

    useEffect(() => {
        if (isJobEdited === 1 || isJobEdited === -1) {
            const timer = setTimeout(() => {
                setIsJobEdited(0);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isJobEdited]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:6205/api/jobs/${id}`, { name: name })  
            .then(response => {
                console.log(response.data);
                setIsJobEdited(1);
            })
            .catch(error => {
                setIsJobEdited(-1);
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h3>Edit Job</h3>
            <form className="text-center" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">ID:</span>
                    </div>
                    <input type="text" value={id} readOnly className="form-control" />
                </div>

                <div className="input-group mb-3">
                    <input
                        className="form-control mb-2 mr-sm-2"
                        placeholder="Enter job name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="submit">Edit</button>
                    </div>
                </div>
            </form>

            <div>
                {isJobEdited === 1 && (
                    <div className="alert alert-success" onClose={() => setIsJobEdited(0)} dismissible="true">
                        <strong>Job edited successfully!</strong>
                    </div>
                )}
                {isJobEdited === -1 && (
                    <div className="alert alert-danger" onClose={() => setIsJobEdited(0)} dismissible="true">
                        <strong>Error: Failed to edit job!</strong>
                    </div>
                )}
            </div>
        </div>
    );
}
