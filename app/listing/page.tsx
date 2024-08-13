"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { fetchJobs } from '../../lib/api';
import JobCard from '../../components/JobCard';
import { JobPost } from '../../types/index';
import { cookies } from 'next/headers';

const ListingPage = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      }
    };

    const token = Cookie.get('token');

    loadJobs();
  }, []);

  return (
    <div className="w-[80%] pl-24 py-8 font-Epilogue">
     
      <nav className="flex justify-between items-center py-4 border-b border-gray-300 mb-6">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold text-[#25324B]">
            Jobs
          </p>
        </div>
        <div className="flex items-center gap-6">
          {!isAuthenticated && (
            <>
              <a href="/bookmarked" className="text-[#4640DE] font-semibold hover:text-[#25324B] transition-colors duration-300" data-testid="bookmark-button">
              
                Bookmarked
              </a>
            
              <a href="/" className="text-[#4640DE] font-semibold hover:text-[#25324B] transition-colors duration-300" onClick={()=>Cookie.remove("currentUser")}>
                Sign out
              </a>
            </>
          )}
          {isAuthenticated && (
            <a href="/profile" className="text-[#4640DE] font-semibold hover:text-[#25324B] transition-colors duration-300">
              Profile
            </a>
          )}
        </div>
      </nav>

      <div className="flex justify-between mt-6">
        <div className="pl-8">
          <h1 className="text-black-100 text-2xl font-black font-poppins">
            Opportunities
          </h1>
          <h2 className="font-normal font-epilogue text-base text-custom-gray">
            Showing {jobs.length} results
          </h2>
        </div>

        <div className="flex items-center gap-2 pr-16">
          <p className="text-[#7C8493]"> | </p>
          <p className="text-[#7C8493] cursor-pointer">
            Sort by:{" "}
            <span className="text-[#25324B] font-semibold">
              Most relevant{" "}
            </span>
          </p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6667 5.66663L8 10.3333L3.33333 5.66663" stroke="#4640DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.6667 5.66663L8 10.3333L3.33333 5.66663" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.6667 5.66663L8 10.3333L3.33333 5.66663" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-10">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="relative flex w-[1200px] border border-solid border-custom-border rounded-3xl w-full bg-clip-border text-gray-700">
              <div className="flex border-solid p-6 mb-7 gap-2">
                <JobCard job={job} />
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
