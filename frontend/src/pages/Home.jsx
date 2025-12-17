import { useState, useEffect } from "react";
import api from "../api";
import PostCard from "../components/PostCard";
import Layout from "../components/Layout";

function Home() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api.get("/api/blog/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => alert("Error fetching posts"));
    };

    const deletePost = (id) => {
        if (window.confirm("Are you sure you want to delete this citation?")) {
            api.delete(`/api/blog/posts/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        setPosts(posts.filter(post => post.id !== id));
                    }
                    else alert("Failed to delete post.");
                })
                .catch((error) => alert(error));
        }
    };

    const createPost = (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        api.post("/api/blog/posts/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    alert("Research Published Successfully!");
                    setTitle("");
                    setContent("");
                    setImage(null);
                    setIsCreating(false);
                    getPosts();
                } else alert("Failed to make post.");
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    };

    return (
        <Layout>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-12 border-b-2 border-slate-900 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Research Feed</h1>
                    <p className="text-slate-500 mt-2 font-sans text-sm uppercase tracking-wide">Recent Publications & Findings</p>
                </div>
                <button 
                    onClick={() => setIsCreating(!isCreating)}
                    className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-none shadow-sm transition duration-300 font-sans uppercase tracking-widest text-xs"
                >
                    {isCreating ? "Discard Draft" : "Submit Paper"}
                </button>
            </div>

            {/* Create Post Form */}
            {isCreating && (
                <div className="bg-white border border-gray-200 p-10 shadow-sm mb-16 animate-fade-in-down">
                    <h2 className="text-2xl font-serif font-bold mb-8 text-slate-900 flex items-center gap-3">
                         Submit New Finding
                    </h2>
                    <form onSubmit={createPost}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-slate-700 text-xs font-bold mb-2 font-sans uppercase tracking-widest">Title</label>
                            <input
                                type="text"
                                id="title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="bg-white border border-gray-300 w-full py-4 px-5 text-slate-900 leading-tight focus:outline-none focus:border-slate-900 focus:ring-0 transition font-serif text-xl placeholder-gray-400 rounded-none"
                                placeholder="Enter paper title..."
                            />
                        </div>
                         <div className="mb-6">
                            <label htmlFor="image" className="block text-slate-700 text-xs font-bold mb-2 font-sans uppercase tracking-widest">Figure / Illustration (Optional)</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition"
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="content" className="block text-slate-700 text-xs font-bold mb-2 font-sans uppercase tracking-widest">Abstract / Content</label>
                            <textarea
                                id="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="bg-white border border-gray-300 w-full py-4 px-5 text-slate-900 leading-relaxed focus:outline-none focus:border-slate-900 focus:ring-0 h-56 transition font-serif text-lg placeholder-gray-400 resize-none rounded-none"
                                placeholder="Summarize your findings..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-10 transition duration-300 font-sans uppercase tracking-widest text-xs rounded-none"
                            >
                                {loading ? "Publishing..." : "Publish Findings"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} onDelete={deletePost} />
                    ))
                ) : (
                    <p className="text-slate-500 text-center col-span-2 py-20 font-serif italic text-lg border border-dashed border-gray-300">
                        No research papers available.
                    </p>
                )}
            </div>
        </Layout>
    );
}

export default Home;
