// Sidebar.jsx
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, XIcon } from "lucide-react";

const Sidebar = ({ isMobileOpen = false, onClose }) => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        // Изменены классы для мобильной версии
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-base-200 border-r border-base-300 transform transition-transform duration-300 ease-in-out flex flex-col h-screen ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
            <div className="p-5 border-b border-base-300 flex justify-between items-center">
                <Link to={"/"} className="flex items-center gap-2.5" onClick={onClose}>
                    <ShipWheelIcon className="size-9 text-primary" />
                    <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden sm:block">
                        Streamify Bsuir
                    </span>
                </Link>

                {/* Кнопка закрытия для мобильной версии */}
                {isMobileOpen && (
                    <button
                        className="lg:hidden btn btn-ghost btn-circle"
                        onClick={onClose}
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link
                    to={"/"}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                        currentPath === "/" ? "btn-active" : ""
                    }`}
                    onClick={onClose}
                >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span>Home</span>
                </Link>

                <Link
                    to={"/notifications"}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                        currentPath === "/notifications" ? "btn-active" : ""
                    }`}
                    onClick={onClose}
                >
                    <BellIcon className="size-5 text-base-content opacity-70" />
                    <span>Notifications</span>
                </Link>
            </nav>

            {/* USER PROFILE SECTION */}
            <div className="p-4 border-t border-base-300 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={authUser?.profilePic}
                                alt="User Avatar"
                                className="object-cover"
                                rel="noreferrer"
                            />
                        </div>
                    </div>
                    <div className="flex-1 hidden sm:block">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;