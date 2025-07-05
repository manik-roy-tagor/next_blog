import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';

const AddPost = dynamic(() => import('@/components/AddPost'), { ssr: false });
const UserBlogs = dynamic(() => import('@/components/UserBlogs'), { ssr: false });

export default function UserBlogPage() {
    return (
        <>
           <h3>User Profile</h3>
        </>
    );
}
