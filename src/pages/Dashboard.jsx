import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import { Intro } from '../components';
import { toast } from 'react-toastify';

export function dashboardLoader() {
  const userName = fetchData('userName');
  return { userName };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem('userName', JSON.stringify(formData.userName));
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (error) {
    throw new Error('There was a problem creating your account.');
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;
