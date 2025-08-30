import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Landing from "../pages/landing/Landing";
import Stats from "../pages/stats/Stats";
import Profile from "../pages/profile/Profile";
import Protected from "./Protected";
import Category from "../pages/category/Category";
import Todo from "../pages/todo/Todo";
import AuthLayout from "../layouts/AuthLayout";


const router = createBrowserRouter([
    {
        path: 'login',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Login />
            }
        ]
    },
    {
        path: '',
        element: <Landing />
    },
    {
        path: '',
        element: <Protected><MainLayout /></Protected>,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'stats',
                element: <Stats />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'todo',
                element: <Todo />
            },
            {
                path: 'category',
                element: <Category />
            }
        ]
    }
])

export default router;