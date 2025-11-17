// Navbar.jsx
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, MenuIcon } from "lucide-react";
import useLogout from "../hooks/useLogout.js";
import ThemeSelector from "./ThemeSelector.jsx";

const Navbar = ({ onToggleSidebar }) => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const { logoutMutation } = useLogout();

    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16">
            <div className="h-full px-4">
                <div className="flex items-center justify-between h-full">
                    {/* Левая часть - кнопка меню и логотип на странице чата */}
                    <div className="flex items-center gap-4 flex-1">
                        {onToggleSidebar && (
                            <button
                                className="lg:hidden btn btn-ghost btn-circle"
                                onClick={onToggleSidebar}
                            >
                                <MenuIcon className="h-6 w-6" />
                            </button>
                        )}

                        {isChatPage && (
                            <div className="hidden lg:flex items-center">
                                <Link to={"/"} className="flex items-center gap-2.5">
                                    <ShipWheelIcon className="size-9 text-primary" />
                                    <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                        Streamify Bsuir
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Центральная часть - логотип для мобильных на странице чата */}
                    {isChatPage && (
                        <div className="flex-1 flex justify-center lg:hidden">
                            <Link to={"/"} className="flex items-center gap-2.5">
                                <ShipWheelIcon className="size-7 text-primary" />
                                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                    Streamify
                                </span>
                            </Link>
                        </div>
                    )}

                    {/* Правая часть - все элементы управления */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>

                        <ThemeSelector />

                        <div className="avatar">
                            <div className="w-8 sm:w-9 rounded-full">
                                <img
                                    src={authUser?.profilePic}
                                    alt="User Avatar"
                                    className="object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-ghost btn-circle"
                            onClick={logoutMutation}
                            aria-label="Logout"
                        >
                            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;