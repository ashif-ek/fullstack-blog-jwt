import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { email, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Display specific error messages from Django (e.g., "User with this email already exists")
                const errorData = error.response.data;
                let errorMessage = "An error occurred.";
                
                if (typeof errorData === 'object') {
                     // Check for common error fields like 'email', 'password', or 'detail'
                     const messages = [];
                     for (const key in errorData) {
                         if (Array.isArray(errorData[key])) {
                             messages.push(`${key}: ${errorData[key].join(' ')}`);
                         } else {
                             messages.push(`${key}: ${errorData[key]}`);
                         }
                     }
                     errorMessage = messages.join('\n');
                }
                alert(errorMessage);
            } else {
                alert(error.message || "Something went wrong!");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-900 p-10 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h1 className="text-3xl font-serif font-bold mb-8 text-center text-slate-900 tracking-tight uppercase">{name}</h1>
            <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 font-sans">Email</label>
                <input
                    className="w-full bg-white border border-gray-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 transition font-sans rounded-none placeholder-gray-400"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                />
            </div>
            <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2 font-sans">Password</label>
                <input
                    className="w-full bg-white border border-gray-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-900 transition font-sans rounded-none placeholder-gray-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
            </div>
            {loading && <div className="text-center mb-6 text-slate-500 font-bold text-sm tracking-widest animate-pulse">AUTHENTICATING...</div>}
            <button 
                className="w-full bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-4 transition duration-300 font-sans uppercase tracking-widest text-xs rounded-none" 
                type="submit"
                disabled={loading}
            >
                {name}
            </button>
            <p className="mt-6 text-center text-slate-500 text-sm">
                {method === "login" ? (
                    <>
                        New Researcher? <Link to="/register" className="text-blue-900 hover:text-blue-700 font-bold ml-1 transition border-b border-blue-900">Apply for Access</Link>
                    </>
                ) : (
                    <>
                        Already have credentials? <Link to="/login" className="text-blue-900 hover:text-blue-700 font-bold ml-1 transition border-b border-blue-900">Log In</Link>
                    </>
                )}
            </p>
        </form>
    );
}

export default Form;
