import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router'; 
import { saveUserInDb } from '../../../components/api/utils';
import toast from 'react-hot-toast'; 

const SocialLogin = () => {
    const { signInWithGoogle } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            
            const userData = {
                name: user?.displayName || "Anonymous", // Fallback for displayName
                email: user?.email,
                role: "user", 
                photoURL: user?.photoURL || '' 
            };

            await saveUserInDb(userData); // Save or update user in your database

            
            toast.success('Google login successful! Welcome!');
          
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Google login failed:', error); 
            toast.error(error.message || 'Google login failed. Please try again.');
            
        }
    };

    return (
        <div className='text-center'>
            <p className='mb-4'>OR</p>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;