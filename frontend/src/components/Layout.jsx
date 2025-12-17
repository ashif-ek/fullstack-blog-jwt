import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-white font-sans leading-normal tracking-normal text-slate-900">
            <Navbar />
            <div className="container w-full md:max-w-4xl mx-auto pt-12 px-6 pb-20">
                {children}
            </div>
        </div>
    );
}

export default Layout;
