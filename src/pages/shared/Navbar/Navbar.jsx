import React, { useState } from 'react';
// Corrected import: use 'react-router-dom' for Link, NavLink, useNavigate
import { Link, NavLink, useNavigate } from 'react-router';
import HealthHubExpressLogo from '../HealthHubExpressLogo/HealthHubExpressLogo';
import UseAuth from '../../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { MdShoppingCart } from "react-icons/md";
import { Helmet } from 'react-helmet'; // Import Helmet for dynamic titles

const Navbar = () => {
    const { user, loading, logOut } = UseAuth();
    const navigate = useNavigate();

    // No need for isLanguagesOpen state if using DaisyUI dropdowns directly

    // Determine login status based on Firebase user object
    const isLoggedIn = !!user && !loading;

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut() // Call the logOut function from your Firebase AuthContext
                    .then(() => {
                        Swal.fire(
                            'Logged Out!',
                            'You have been successfully logged out.',
                            'success'
                        );
                        navigate('/'); // Redirect to home page after logout
                    })
                    .catch((error) => {
                        console.error("Error logging out:", error);
                        Swal.fire(
                            'Error!',
                            'Failed to log out. Please try again.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-full fixed top-0 left-0 z-50 bg-base-100 shadow-sm">
          
        <div className='navbar max-w-7xl mx-auto px-4'>
                <Helmet>
                <title>HealthHub Express</title>
                <meta name="description" content="HealthHub Express - Your trusted online pharmacy." />
            </Helmet>

            <div className="navbar-start">
                {/* Mobile Dropdown (Hamburger Menu) */}
                {/* This div contains the hamburger icon and the mobile menu content. */}
                {/* The hamburger icon is hidden on large screens (`lg:hidden`). */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {/* The mobile menu items are placed here */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {/* These items are VISIBLE IN THE MOBILE DROPDOWN */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/shop'>Shop</NavLink></li>
                        <li><NavLink to="/cart">Cart</NavLink></li> {/* Cart link for mobile */}

                        {/* Languages Dropdown for Mobile */}
                        <li className="dropdown dropdown-hover dropdown-right">
                            <div tabIndex={0} role="button" className="m-1">Languages</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                <li><a>English</a></li>
                                <li><a>বাংলা</a></li>
                            </ul>
                        </li>

                        {/* Conditional Join Us / Profile / Logout for Mobile */}
                        {!isLoggedIn ? (
                            <li><NavLink to="/register">Join Us</NavLink></li>
                        ) : (
                            <>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Logo and Website Name - Always visible */}
                <Link to="/" className="btn btn-ghost text-xl">
                    <HealthHubExpressLogo /> {/* Your custom logo component */}
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* These items are for DESKTOP NAVIGATION */}
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/shop'>Shop</NavLink></li>
                    <li><NavLink to='/about'>About Us</NavLink></li>
                </ul>
            </div>
           
            <div className="navbar-end space-x-2">
                
                <Link to="/cart" className="btn btn-circle hidden lg:flex">
                    <MdShoppingCart size={24} /> {/* Increased icon size for better visibility */}
                    {/* Optional: Cart item count badge - if you have cart items count */}
                    {/* <div className="badge badge-sm badge-secondary absolute -top-1 -right-1">3</div> */}
                </Link>

                {/* Languages Dropdown (Desktop Only) - HIDDEN on mobile (`hidden`) */}
                {/* This will only be visible on large screens (`lg:flex`) */}
                <div className="dropdown dropdown-end hidden lg:flex">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        Languages
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li><a>English</a></li>
                        <li><a>বাংলা</a></li>
                        {/* Add more languages */}
                    </ul>
                </div>

                {/* Conditional Login/Profile Section - Always visible, but content changes */}
                {!isLoggedIn ? (
                    <Link to="/register" className="btn btn-primary">Join Us</Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user?.photoURL || 'https://via.placeholder.com/40'} // Use user.photoURL from Firebase
                                    alt={user?.displayName || user?.email || 'User Profile'} // Fallback alt text
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a className="font-bold">{user?.displayName || user?.email}</a></li> {/* Display user name/email */}
                            <li><NavLink to="/update-profile">Update Profile</NavLink></li>
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li> {/* Link to user/seller dashboard */}
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default Navbar;