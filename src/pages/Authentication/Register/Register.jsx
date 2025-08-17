import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useNavigate } from 'react-router'; // Corrected import for Link, useNavigate
import axios from 'axios';
import { saveUserInDb } from '../../../components/api/utils';
import toast from 'react-hot-toast'; // Import toast for notifications

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Upload image to imgbb
  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      return res.data?.data?.url || '';
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Image upload failed!'); // Already there, good!
      return '';
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    const imageFile = data.image[0];

    try {
      setUploading(true);

      // 1. Upload image
      const photoURL = await handleImageUpload(imageFile);
      if (!photoURL) {
        throw new Error('Failed to upload profile picture.');
      }

      // 2. Create user account
      const result = await createUser(email, password);
      // const user = result.user; // This line is commented out and 'user' variable is not used

      // 3. Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      // 4. Save user to DB
      const userData = {
        name,
        email,
        photoURL,
        role,
        created_at: new Date().toISOString()
      };

      await saveUserInDb(userData); // This function sends the userData to your backend

      // --- ADDED THIS LINE FOR SUCCESS NOTIFICATION ---
      toast.success('Registration successful! Welcome to HealthHub Express!');
      // --- END ADDITION ---

      // 5. Redirect
      reset();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed'); // Already there, good!
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">

            {/* Name */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name && <p className='text-red-500'>Name is required</p>}

            {/* Image */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register('image', { required: true })}
              accept="image/*"
              className="input"
            />
            {errors.image && <p className='text-red-500'>Profile picture is required</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className='text-red-500'>Email is required</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}

            {/* Role Selection */}
            <label className="label">Register as:</label>
            <select
              {...register('role', { required: true })}
              className="select select-bordered w-full mt-2"
            >
              <option value="user">User (Buyer)</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && <p className='text-red-500'>Please select a role</p>}

            <button type="submit" className="btn btn-neutral mt-4 w-full" disabled={uploading}>
              {uploading ? 'Creating Account...' : 'Register'}
            </button>
          </fieldset>

          <p className="text-center mt-4">
            <small>Already have an account? <Link className='btn btn-link' to='/login'>Login</Link></small>
          </p>
        </form>
        
      </div>
    </div>
  );
};

export default Register;