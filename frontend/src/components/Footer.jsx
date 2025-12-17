function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-serif font-bold text-slate-900 text-lg mb-4">Academic<span className="text-blue-700">Blog</span></h3>
                        <p className="text-slate-500 text-sm font-sans leading-relaxed">
                            A platform for researchers and scholars to share findings, discuss theories, and advance knowledge through open publication.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-500 font-sans">
                            <li><a href="#" className="hover:text-blue-800 transition">Documentation</a></li>
                            <li><a href="#" className="hover:text-blue-800 transition">API Reference</a></li>
                            <li><a href="#" className="hover:text-blue-800 transition">Submission Guidelines</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-500 font-sans">
                            <li><a href="#" className="hover:text-blue-800 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-800 transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-800 transition">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-sans">
                    <p>&copy; {new Date().getFullYear()} AcademicBlog. All rights reserved.</p>
                    <p>Designed for Research.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
