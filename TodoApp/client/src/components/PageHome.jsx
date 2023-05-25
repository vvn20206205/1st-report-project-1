import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import HandleDeleteJob from './handleDeleteJob';

const PageHome = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    
  useEffect(() => {
    axios.get('http://localhost:6205/api/jobs')
      .then(response => {
        setJobs(response.data.jobs);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  const handlePageChange = ({ selected }) => {
        setCurrentPage(selected+1);
    };
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div className="container">
            <h3> Home </h3>
            <table className="table table-hover table-bordered" >
                <thead>
                    <tr className="table-primary" >
                        <th style={{ width: 'auto' }}>ID</th>
                        <th style={{ width: '100%' }}>Name job</th>
                        <th style={{ width: '20px' }}>View</th>
                        <th style={{ width: '20px' }}>Edit</th>
                        <th style={{ width: '20px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentJobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.name}</td>
                            <td>
                                <Link to={`/view/${job.id}`}>
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/edit/${job.id}`}>
                                    <i className="fa-sharp fa-solid fa-pen"> </i>
                                </Link>
                            </td>
                            <td>
                                <Link onClick={() => HandleDeleteJob(job.id)}>
                                    <i className="fa-sharp fa-solid fa-trash"> </i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pagination */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(jobs.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'} 
                
                previousClassName={'page-item'} 
                pageClassName={'page-item'} 
                nextClassName={'page-item'} 

                previousLinkClassName={'page-link'} 
                pageLinkClassName={'page-link'} 
                nextLinkClassName={'page-link'} 
            />
        </div>
    );
};

export default PageHome;