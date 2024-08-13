import React, { useState, useEffect } from 'react';
import { JobPost } from '../../types';
import Link from 'next/link';
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

interface JobCardProps {
  job: JobPost;
  onBookmarkChange?: (jobId: string, isBookmarked: boolean) => void;
}

const parseDate = (date: string | Date | undefined): string => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(parsedDate.getTime()) ? parsedDate.toDateString() : 'Invalid Date';
};

const card = ({ job, onBookmarkChange }: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('https://akil-backend.onrender.com/bookmarks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        if (data.includes(job.id)) {
          setIsBookmarked(true);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [job.id]);

  const handleBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const token = localStorage.getItem('accessToken');
    try {
      const method = isBookmarked ? 'DELETE' : 'POST';
      const response = await axios({
        method: method,
        url: `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const newIsBookmarked = !isBookmarked;
        setIsBookmarked(newIsBookmarked);
        onBookmarkChange?.(job.id, newIsBookmarked); 
      } else {
        console.error('Failed to bookmark/unbookmark:', response.statusText);
      }
    } catch (error) {
      console.error('Error during bookmark action:', error);
    }
  };

  return (
    <div className="flex justify-between">
      <Link href={`/jobs/${encodeURIComponent(job.id)}`} passHref>
        <div className="flex border-solid p-6 mb-7 gap-2 cursor-pointer">
          {job.logoUrl ? (
            <img src={job.logoUrl} alt={`${job.orgName} logo`} className="h-12 w-12" />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center border border-gray rounded-full text-gray-500">
              No Logo
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <span>{job.orgName}</span>
              <span className="mx-2">•</span>
              <span>{job.location?.length ? job.location : 'Location not specified'}</span>
            </div>
            <p className="mb-4 text-semibold">{job.description || 'Description not available'}</p>

            <div className="flex gap-3 mt-2">
              <button className="bg-green-100 w-auto rounded-full text-green-semibold border border-green-400 h-8 px-4">
                In person
              </button>
              <button className="bg-orange-100 w-auto rounded-full text-orange-semibold border border-orange-400 h-8 px-4">
                Education
              </button>
              <button className="w-auto rounded-full text-Slate-Blue border border-Slate-Blue h-8 px-4">
                IT
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default card;
