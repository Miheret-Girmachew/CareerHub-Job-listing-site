import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import JobCard from '../components/JobCard';
import '@testing-library/jest-dom';

const job = {
    id: '1',
    title: 'Software Engineer',
    description: 'Develop and maintain software applications.',
    responsibilities: 'Write code, review PRs, deploy software.',
    requirments: 'Strong knowledge of JavaScript, React, Node.js.',
    idealCandidate: 'Self-motivated, excellent problem solver, team player.',
    categories: ['IT', 'Software Development'],
    opType: 'Full-time',
    requiredSkills: ['JavaScript', 'React', 'Node.js'],
    whenAndWhere: 'Remote, available immediately.',
    orgId: '12345',
    location: ['Remote', 'Global'],
    startDate: new Date('2023-08-01'),
    endDate: new Date('2024-08-01'),
    deadline: new Date('2024-07-01'),
    datePosted: new Date('2023-07-01'),
    status: 'Open',
    applicantsCount: 10,
    viewsCount: 100,
    orgName: 'Tech Corp',
    logoUrl: 'https://example.com/logo.png',
    isBookmarked: false,
    isRolling: true,
    questions: 'What are your expected salary requirements?',
    perksAndBenefits: 'Health insurance, remote work, flexible hours.',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-07-01'),
    orgPrimaryPhone: '123-456-7890',
    orgEmail: 'contact@techcorp.com',
    average_rating: 4.5,
    total_reviews: 50,
  };

  test('renders job card with correct details', () => {
    render(<JobCard job={job} />);
  
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Remote'))).toBeInTheDocument();
    expect(screen.getByText('Develop and maintain software applications.')).toBeInTheDocument();
    expect(screen.getByAltText('Tech Corp logo')).toBeInTheDocument();
  });

  afterEach(cleanup);
  
  test('renders fallback for missing logo', () => {
    render(<JobCard job={{ ...job, logoUrl: '' }} />);
  
    expect(screen.getByText('No Logo')).toBeInTheDocument();
  });
  afterEach(cleanup);
  
  test('renders correct bookmark icon based on isBookmarked state', () => {

    render(<JobCard job={{ ...job, isBookmarked: true }} />);
    
    expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toHaveClass('bg-yellow-500');
  
    render(<JobCard job={{ ...job, isBookmarked: false }} />);
    
  
  });

  afterEach(cleanup);
  
  test('handles bookmark button click', async () => {
    const mockBookmarkChange = jest.fn();
    render(<JobCard job={job} onBookmarkChange={mockBookmarkChange} />);
  
    const bookmarkButton = screen.getByTestId('bookmark-button');
    fireEvent.click(bookmarkButton);
  
    const updatedButton = await screen.findByTestId('bookmark-button');
  });

  afterEach(cleanup);