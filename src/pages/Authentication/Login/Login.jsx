import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router'; 
import SocialLogin from '../SocialLogin/SocialLogin';
import UseAuth from '../../../hooks/UseAuth';
import { saveUserInDb } from '../../../components/api/utils';
import toast from 'react-hot-toast'; 

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';


    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user; 
            const userData = {
                name: user.displayName || "Unknown User", 
                email: user.email,
                role: "user", 
                photoURL: user.photoURL || ''
            };

            await saveUserInDb(userData); // Save or update user in your database

           
            toast.success('Login successful! Welcome back!');
            

            navigate(from, { replace: true });

        } catch (error) {
            console.error('Login failed:', error); // Use console.error for errors
            // --- ADDED THIS LINE FOR ERROR NOTIFICATION ---
            toast.error(error.message || 'Login failed. Please check your credentials.');
            // --- END ADDITION ---
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* email field */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })} // Added required validation
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email && <p className='text-red-500'>Email is required</p>}


                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input"
                            placeholder="Password"
                        />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website?<Link className='btn btn-link' to='/register'>Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;