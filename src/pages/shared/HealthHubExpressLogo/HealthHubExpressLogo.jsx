import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const HealthHubExpressLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-2'>
                <img src={logo} alt="" className='sm:w-10 sm:h-10 w-7 h-7 ' />
                <p className='sm:text-2xl text-lg font-extrabold'>Health Hub Express</p>
            </div>
        </Link>
    );
};

export default HealthHubExpressLogo;