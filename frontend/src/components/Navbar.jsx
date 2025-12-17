import { Link, useNavigate } from "react-router-dom"
import { ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"
import api from "../api"

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            setIsLoggedIn(true);
            // Fetch profile on mount if logged in to show avatar
            fetchProfilePic();
        } else {
            setIsLoggedIn(false);
        }
    }, [localStorage.getItem(ACCESS_TOKEN)]); // Warning: this dependency might cause loops if not careful, but okay for now

    const fetchProfilePic = async () => {
        try {
            const res = await api.get("/api/profile/");
            if (res.data.image) {
                setProfilePic(res.data.image);
            }
        } catch (e) {
            // silent fail
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setProfilePic(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo / Brand */}
                    <Link to="/" className="flex items-center py-4 px-2 group">
                        <span className="font-serif font-bold text-slate-900 text-xl tracking-tight group-hover:text-blue-900 transition duration-300">
                            Academic<span className="text-blue-700">Blog</span>
                        </span>
                    </Link>

                    {/* Primary Navbar items */}
                    <div className="hidden md:flex items-center space-x-6">
                        {isLoggedIn ? (
                            <>
                                <Link to="/" className="text-slate-600 hover:text-blue-900 font-sans uppercase tracking-widest text-xs font-bold transition">Research Feed</Link>
                                <Link to="/profile" className="flex items-center text-slate-600 hover:text-blue-900 font-sans uppercase tracking-widest text-xs font-bold transition">
                                    {profilePic && (
                                        <img src={profilePic} alt="Me" className="w-6 h-6 rounded-full object-cover mr-2 border border-gray-300" />
                                    )}
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="text-slate-400 hover:text-red-700 font-sans uppercase tracking-widest text-xs font-bold transition">Log Out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-blue-900 font-sans uppercase tracking-widest text-xs font-bold transition">Log In</Link>
                                <Link to="/register" className="px-5 py-2 text-white bg-slate-900 hover:bg-slate-700 rounded-none font-sans uppercase tracking-widest text-xs font-bold transition shadow-sm">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
