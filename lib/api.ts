import { JobPost, JobPostingsProps } from '../types';

export const fetchJobById = async (id: string): Promise<JobPost[]> => {
    const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const result: JobPostingsProps = await response.json();
    return result.data 
};

export const fetchJobs = async (): Promise<JobPost[]> => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch('https://akil-backend.onrender.com/opportunities/search',{
        method: "GET",
        headers: {
            "content-Type":"application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    })
    ;
    if (!response.ok) throw new Error('Network response was not ok');
    const result: JobPostingsProps = await response.json();
    return result.data;
  
};