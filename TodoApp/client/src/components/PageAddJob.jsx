import React, { useState, useEffect } from 'react';
import axios from 'axios';
 

export default function PageAddJob() {
    const [name, setName] = useState('');
    const [isJobAdded, setIsJobAdded] = useState(0);

    useEffect(() => {
        if (isJobAdded === 1 || isJobAdded === -1) {
            const timer = setTimeout(() => {
                setIsJobAdded(0);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isJobAdded]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:6205/api/jobs', { name });
   
    if (response.status === 201) {
                setIsJobAdded(1);
            }
        } catch (error) {
            setIsJobAdded(-1);
            console.error(error);
        }
        setName('');
    };

    return (
        <div className="container">
            <h3>Add new job</h3>
            <form className="text-center" onSubmit={handleSubmit}>
                <label>
                    <strong>
                        THE NAME OF THE JOB:
                    </strong>
                </label>
                <br />
                <br />
                <div className="input-group mb-3">
                    <input className="form-control mb-2 mr-sm-2" placeholder="Enter name job" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="submit">Add</button>
                    </div>
                </div>
            </form>

            <div>
                {isJobAdded === 1 && (
                    <div className="alert alert-success" onClose={() => setIsJobAdded(0)} dismissible="true">
                        <strong>
                            Job added successfully!
                        </strong>
                    </div>
                )}
                {isJobAdded === -1 && (
                    <div className="alert alert-danger" onClose={() => setIsJobAdded(0)} dismissible="true">
                        <strong>
                            Error: Failed to add job!
                        </strong>
                    </div>
                )}
            </div>

        </div>
    );
};