import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const Layout = ({ children, showSidebar = false }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(prev => !prev);
    };

    return (
        <div className="min-h-screen">
            <div className="flex">
                {showSidebar && (
                    <Sidebar
                        isMobileOpen={isMobileSidebarOpen && isMobile}
                        onClose={() => setIsMobileSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col">
                    <Navbar onToggleSidebar={isMobile ? toggleMobileSidebar : undefined} />

                    <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </div>
    );
};
export default Layout;