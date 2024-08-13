"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../components/JobCard';
import { JobPost } from '../../types';
import Card from './card'

const BookmarkedPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://akil-backend.onrender.com/bookmarks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setBookmarkedJobs(response.data.data); 
      } catch (error) {
        setError('Failed to load bookmarked jobs');
        console.error('Error fetching bookmarked jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedJobs();
  }, []);

  const handleBookmarkChange = (jobId: string, isBookmarked: boolean) => {
    if (!isBookmarked) {
      setBookmarkedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[80%] pl-24 py-8 font-Epilogue">
      <nav className="flex justify-between items-center py-4 border-b border-gray-300 mb-6">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold text-[#25324B]">Bookmarked Jobs</p>
        </div>
        <a href="/listing" className="text-[#4640DE] font-semibold hover:text-[#25324B] transition-colors duration-300">
                Jobs
              </a>
      </nav>

      <div className="space-y-10">
        {bookmarkedJobs.length > 0 ? (
          bookmarkedJobs.map((job) => (
            <div
              key={job.id}
              className="relative flex w-[1200px] border border-solid border-custom-border rounded-3xl w-full bg-clip-border text-gray-700"
            >
              <div className="flex border-solid p-6 mb-7 gap-2">
                <Card job={job} onBookmarkChange={handleBookmarkChange} />
              </div>
            </div>
          ))
        ) : (
          <p>No bookmarked jobs available</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedPage;
