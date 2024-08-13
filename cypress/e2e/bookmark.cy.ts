describe('JobCard Bookmark Functionality', () => {
  const job = {
    id: '65509e9353a7667de6ef5a60',
    title: 'Volunteer Software Development Mentor',
    description: 'Join A2SV (Africa to Silicon Valley) as a Volunteer Software Development Mentor and make a meaningful impact on the next generation of African tech talent. As a mentor, you will play a crucial role in guiding and supporting aspiring software developers, helping them navigate the world of technology and gain valuable skills. This is an opportunity to contribute to the growth of the African tech ecosystem and foster innovation.',
    responsibilities: 'Conduct one-on-one or group mentorship sessions with aspiring software developers. Provide guidance on coding practices, problem-solving techniques, and industry trends. Assist mentees in setting and achieving learning goals. Offer constructive feedback on code reviews and project work. Share industry insights and experiences to help mentees navigate the software development landscape. Collaborate with other mentors and A2SV organizers to enhance the mentorship program.',
    requirements: 'Proficiency in a variety of programming languages, including but not limited to Java, Python, JavaScript, or others.',
    idealCandidate: 'The ideal candidate for the Volunteer Software Development Mentor role at A2SV possesses a blend of technical expertise, mentoring skills, and a passion for contributing to the development of the African tech community.',
    categories: ['Education Access and Quality Improvement', 'Youth Empowerment and Development'],
    opType: 'inPerson',
    startDate: new Date('2006-01-02'),
    endDate: new Date('2006-01-02'),
    deadline: new Date('2006-01-02'),
    location: ['Addis Ababa'],
    requiredSkills: ['Accountant'],
    whenAndWhere: 'Abrehot Library, Addis Ababa, Ethiopia',
    orgID: '65509e3f53a7667de6ef5a5b',
    datePosted: new Date('2024-07-17'),
    status: 'open',
    applicantsCount: 6,
    viewsCount: 9457,
    orgName: 'Africa to Silicon Valley',
    logoUrl: 'https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg',
    isBookmarked: false,
    isRolling: false,
    questions: null,
    perksAndBenefits: null,
    createdAt: new Date('0001-01-01'),
    updatedAt: new Date('0001-01-01'),
    orgPrimaryPhone: '+251987654321',
    orgEmail: 'lensa@a2sv.org',
    orgWebsite: 'https://www.a2sv.org',
    average_rating: 0,
    total_reviews: 0,
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000/listing');

    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: {
        id: 'user123',
        email: 'makda.yoseph@a2sv.org',
        name: 'Makda Yoseph',
      },
    });

    cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search').as('getOpportunities');
    cy.wait('@getOpportunities');
  });

  it('should render the job card with correct details', () => {
    cy.contains(job.title).should('be.visible');
    cy.contains(job.orgName).should('be.visible');
    cy.contains(job.location[0]).should('be.visible');
    cy.contains(job.description).should('be.visible');
    cy.get('img[alt="Africa to Silicon Valley logo"]').should('be.visible');
  });

  it('should toggle bookmark state and verify the job appears in bookmarked list', () => {
    
    cy.wait(500); 
    cy.visit('http://localhost:3000/bookmarked');
   
  });

  it('should handle the bookmark button click and toggle state correctly', () => {
    
    cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks', {
      statusCode: 200,
      body: {},
    }).as('bookmarkToggle');

  });
});
