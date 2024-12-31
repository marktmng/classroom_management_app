// pages/dashboard.tsx or pages/teacher/dashboard.tsx (for example)
import { RedirectToSignIn, useUser } from '@clerk/nextjs';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  const role = user.publicMetadata?.role;

  if (role === 'teacher') {
    return <StudentDashboard />;
  }

  if (role === 'student') {
    return <TeacherDashboard />;
  }

  return <div>Unknown role.</div>;
};

export default Dashboard;
