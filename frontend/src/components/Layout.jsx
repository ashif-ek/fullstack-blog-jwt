import Footer from "./Footer";
import Navbar from "./Navbar";
function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans leading-normal tracking-normal text-slate-900">
            <Navbar />
            <div className="container w-full md:max-w-4xl mx-auto pt-12 px-6 pb-20 flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
