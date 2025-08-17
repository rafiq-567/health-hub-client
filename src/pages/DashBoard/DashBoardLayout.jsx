// import React from 'react';
// import { Outlet } from "react-router";
// import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';

// const DashBoardLayout = () => {
//     return (
//         <div className="relative min-h-screen sm:flex bg-white">
//             {/* Left Side: Sidebar Component */}
//             <Sidebar />
//             {/* Right Side: Dashboard Dynamic Content */}
//             <div className='flex-1  sm:ml-64'>
//                 <div className='p-5'>
//                     {/* Outlet for dynamic contents */}
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashBoardLayout;

import React from 'react';
import { Outlet } from "react-router";
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';

const DashBoardLayout = () => {
    return (
        <div className="relative min-h-screen sm:flex bg-white">
            {/* This container is a block on mobile (default)
              and a flex container on small screens and up,
              placing the sidebar and content side-by-side.
            */}
            
            {/* The Sidebar component */}
            <Sidebar />
            
            {/* Right Side: Dashboard Dynamic Content */}
            <div className='flex-1 sm:ml-64'>
                {/* flex-1 makes this div grow to fill available space.
                  On screens >= 640px (sm), it adds a left margin of 64px 
                  to make space for the sidebar.
                */}
                <div className='p-5'>
                    {/* Outlet for dynamic contents based on the route */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;