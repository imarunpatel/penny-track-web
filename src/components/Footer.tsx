'use client'

import { HomeIcon, ChartBarIcon, UserCircleIcon, PlusIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useState } from "react";
import { useCategoryStore } from "../store";
import { Link, useLocation } from "react-router-dom";
import { AuthAPI } from "../apis/authAPI";
import AddExpense from "./AddUpdateExpense";

const MenuIcons = [
    <HomeIcon key="Home" className="w-6" />,
    <ChartBarIcon key="Chart" className="w-6" />,
    <ListBulletIcon key="Calendar" className="w-6" />,
    <UserCircleIcon key="User" className="w-6" />
]

const Footer = () => {
    const { categories } = useCategoryStore()
    const [isOpen, setIsOpen] = useState(false);
    const avatar = AuthAPI.getUser().avatar;
    const location = useLocation();

    return (
        <footer className="fixed bottom-0 w-full bg-white">
            <div className="flex border-t-2 max-w-lg mx-auto">
                <MenuItem active={location.pathname === '/home'} to="home" icon={MenuIcons[0]} />
                <MenuItem active={location.pathname === '/stats'} to="stats" icon={MenuIcons[1]} />
                <div className="flex-1 mx-3 flex items-center justify-center" onClick={() => setIsOpen(true)}>
                    <div className="bg-violet-800 rounded-full flex items-center justify-center p-2 text-white">
                        <PlusIcon className="w-10" />
                    </div>
                </div>
                <MenuItem active={location.pathname === '/todo'} to="todo" icon={MenuIcons[2]} />
                <MenuItem active={location.pathname === '/profile'} to="profile" icon={MenuIcons[3]} img={avatar} />
            </div>
            <AddExpense type="Add" isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} categories={categories} />
        </footer>
    )
}

export default Footer;


const MenuItem: React.FC<{icon: ReactNode, to: string, img?: string, active?: boolean}> = (props) => {
    return (
        <Link to={props.to} className={`flex-1 py-6 h-full flex justify-center items-center ${props.active ? 'text-violet-800' : 'text-gray-400'}`}>
            {props.img ? <div className="border border-violet-800" style={{height: "25px", width: "25px", display: "block", background: `url("${props.img}")`, backgroundSize: "contain", borderRadius: "50px"}}></div> : props.icon}
        </Link>
    )
}