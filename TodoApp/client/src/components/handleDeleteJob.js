import axios from 'axios';


export default function handleDeleteJob(id) {
    const confirmation = window.confirm(`Are you sure you want to delete this job have id = ${id}?`);
    if (confirmation) {
        axios.delete(`http://localhost:6205/api/jobs/${id}`)
            .then(() => {
                window.location.href = '/';
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to delete job!');
            });
    }
} 