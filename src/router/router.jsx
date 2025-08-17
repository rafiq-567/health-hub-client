import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import DashBoardLayout from "../pages/DashBoard/DashBoardLayout";
import AdminHome from "../pages/DashBoard/AdminDashboard/AdminHome";
import SellerHome from "../pages/DashBoard/SellerDashboard/SellerHome";
import ManageUsers from "../pages/DashBoard/AdminDashboard/ManageUsers";
import ManageCategory from "../pages/DashBoard/AdminDashboard/ManageCategory";
import PaymentManagement from "../pages/DashBoard/AdminDashboard/PaymentManagement";
import SalesReport from "../pages/DashBoard/AdminDashboard/SalesReport";
import ManageAdvertisedMedicines from "../pages/DashBoard/AdminDashboard/ManageAdvertisedMedicines";
import ManageMedicines from "../pages/DashBoard/SellerDashboard/ManageMedicines";
import PaymentHistory from "../pages/DashBoard/SellerDashboard/PaymentHistory";
import AdvertiseRequest from "../pages/DashBoard/SellerDashboard/AdvertiseRequest";
import UserPaymentHistory from "../pages/DashBoard/UserDashboard/UserPaymentHistory";
import InvoicePage from "../pages/InvoicePage/InvoicePage";
import CheckoutPage from "../pages/CheckoutPage/CheckOutPage";
import CategoryDetailsPage from "../pages/CategoryDetailsPage/CategoryDetailsPage";
import Profile from "../pages/DashBoard/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import AboutUs from "../pages/AboutUs/AboutUs";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/shop',
                Component: Shop
            },
            {
                path: '/cart',
                Component: Cart
            },
            {
                path: '/about',
                Component: AboutUs
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,

            },
            {
                path: 'register',
                Component: Register
            }
        ],
    },
    {
        path: '/checkout',
        element: (
            <PrivateRoute>
                <CheckoutPage></CheckoutPage>
            </PrivateRoute>
        ),
    },
    {
        path: '/invoice',
        element: (
            <PrivateRoute>
                <InvoicePage></InvoicePage>
            </PrivateRoute>
        ),
    },
    {
        path: '/categories/:title',
        Component: CategoryDetailsPage,
    },
    {
        path: '/dashboard',

        element: (
            <PrivateRoute>
                <DashBoardLayout />
            </PrivateRoute>
        ),

        children: [
            {

                path: 'admin',
                element: (
                    <PrivateRoute>
                        <AdminHome />
                    </PrivateRoute>
                ),
            },
            {
                path: 'manage-users',
                element: (
                    <PrivateRoute>
                        <ManageUsers />
                    </PrivateRoute>
                )
            },
            {
                path: 'manage-category',
                element: (
                    <PrivateRoute>
                        <ManageCategory />
                    </PrivateRoute>
                )
            },
            {
                path: 'payment-management',
                element: (
                    <PrivateRoute>
                        <PaymentManagement />
                    </PrivateRoute>
                )
            },
            {
                path: 'sales-report',
                element: (
                    <PrivateRoute>
                        <SalesReport />
                    </PrivateRoute>
                )
            },
            {
                path: 'advertised-medicines',
                element: (
                    <PrivateRoute>
                        <ManageAdvertisedMedicines />
                    </PrivateRoute>
                )
            },
            {
                path: 'seller',
                element: (
                    <PrivateRoute>
                        <SellerHome />
                    </PrivateRoute>
                ),
            },
            {
                path: 'manage-medicine',
                element: (
                    <PrivateRoute>
                        <ManageMedicines />
                    </PrivateRoute>
                )
            },
            {
                path: 'payment-history',
                element: (
                    <PrivateRoute>
                        <PaymentHistory />
                    </PrivateRoute>
                )
            },
            {
                path: 'advertise-request',
                element: (
                    <PrivateRoute>
                        <AdvertiseRequest />
                    </PrivateRoute>
                )
            },
            {
                path: 'user-payment-history',
                element: (
                    <PrivateRoute>
                        <UserPaymentHistory />
                    </PrivateRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
        ]

        // children: [
        //     {
        //         path: 'admin',
        //         Component: AdminHome,
        //     },
        //     {
        //         path: 'manage-users',
        //         Component: ManageUsers
        //     },
        //     {
        //         path: 'manage-category',
        //         Component: ManageCategory
        //     },
        //     {
        //         path: 'payment-management',
        //         Component: PaymentManagement
        //     },
        //     {
        //         path: 'sales-report',
        //         Component: SalesReport
        //     },
        //     {
        //         path: 'advertised-medicines',
        //         Component: ManageAdvertisedMedicines
        //     },
        //     {
        //         path: 'seller',
        //         Component: SellerHome,
        //     },
        //     {
        //         path: 'manage-medicine',
        //         Component: ManageMedicines
        //     },
        //     {
        //         path: 'payment-history',
        //         Component: PaymentHistory
        //     },
        //     {
        //         path: 'advertise-request',
        //         Component: AdvertiseRequest
        //     },
        //     {
        //         path: 'user-payment-history',
        //         Component: UserPaymentHistory
        //     },
        //     {
        //         path: 'profile',
        //         Component: Profile,
        //     },
        // ]
    }
]);