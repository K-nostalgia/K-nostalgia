import { redirect } from 'next/navigation';
import AdminPayHistory from './_components/AdminPayHistory';

const AdminPage = ({ params }: { params: { secret: string } }) => {
  if (params.secret !== process.env.SECRET_ADMIN_PATH) {
    redirect('/');
  }

  return (
    <>
      <AdminPayHistory />
    </>
  );
};
export default AdminPage;
