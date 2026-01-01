import ProfileClient from './ProfileClient';

export const metadata = {
  title: "Job Profile | Haat",
  description:
    "Create and manage your professional Job Profile on Haat. Showcase your skills, experience, and qualifications to attract top employers and find your next opportunity.",
  robots: "index, follow",
};

export default function Page() {
  return <ProfileClient />;
}