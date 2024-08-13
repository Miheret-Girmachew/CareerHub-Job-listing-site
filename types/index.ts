export interface JobPost {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirments: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  requiredSkills: string[];
  whenAndWhere: string;
  orgId: string;
  location: string[];
  startDate: Date;
  endDate: Date;
  deadline: Date;
  datePosted: Date;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: Date;
  updatedAt: Date;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

export interface JobPostingsProps {
  success: boolean;
  message: string;
  data: JobPost[];
}
