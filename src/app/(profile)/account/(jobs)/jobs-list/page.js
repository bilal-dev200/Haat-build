import JobsListClient from './JobsListClient';

export const metadata = {
  title: "Job List | Haat",
  description:
    "Create and manage your professional Job List on Haat. Showcase your skills, experience, and qualifications to attract top employers and find your next opportunity.",
  robots: "index, follow",
};

export default function Page() {
  return <JobsListClient />;
}