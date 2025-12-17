import { useState, useEffect } from "react";
import api from "../api";
import Layout from "../components/Layout";

function Profile() {
    const [profile, setProfile] = useState({ full_name: "", bio: "", institution: "" });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const res = await api.get("/api/profile/");
            setProfile(res.data);
            setEmail(res.data.email);
            setLoading(false);
        } catch (err) {
            alert("Failed to load profile.");
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch("/api/profile/", profile);
            alert("Profile updated successfully.");
        } catch (err) {
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Layout><div className="text-center mt-20 text-slate-500 font-serif animate-pulse">Loading Credentials...</div></Layout>;

    return (
        <Layout>
            <div className="bg-white border border-gray-200 p-10 shadow-sm max-w-3xl mx-auto">
                <div className="flex items-center gap-6 mb-2 border-b-2 border-slate-900 pb-6">
                    <div className="w-20 h-20 bg-slate-900 rounded-none flex items-center justify-center text-3xl font-bold text-white font-serif">
                        {profile.full_name ? profile.full_name.charAt(0) : "U"}
                    </div>
                    <div>
                         <h1 className="text-3xl font-serif font-bold text-slate-900">Researcher Profile</h1>
                         <p className="text-slate-500 font-sans text-xs uppercase tracking-widest font-bold mt-1">Manage Personal Information</p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-8 mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 font-sans">Email (ReadOnly)</label>
                            <input
                                type="text"
                                value={email}
                                disabled
                                className="w-full bg-gray-100 border border-gray-300 px-4 py-3 text-slate-500 font-mono text-sm rounded-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-900 mb-3 font-sans">Full Name</label>
                            <input
                                type="text"
                                value={profile.full_name}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                className="w-full bg-white border border-gray-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-900 transition font-serif rounded-none placeholder-gray-400"
                                placeholder="Dr. Jane Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-900 mb-3 font-sans">Institution / Affiliation</label>
                        <input
                            type="text"
                            value={profile.institution}
                            onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                            className="w-full bg-white border border-gray-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-900 transition font-serif rounded-none placeholder-gray-400"
                            placeholder="Department of Computer Science..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-900 mb-3 font-sans">Bio / Research Interests</label>
                        <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full bg-white border border-gray-300 px-4 py-3 h-40 text-slate-900 focus:outline-none focus:border-blue-900 transition font-serif rounded-none placeholder-gray-400 resize-none leading-relaxed"
                            placeholder="Detail your primary research focus..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-slate-900 hover:bg-slate-700 text-white font-sans font-bold py-3 px-8 uppercase tracking-widest text-xs rounded-none transition duration-300 shadow-sm"
                        >
                            {saving ? "Updating..." : "Update Credentials"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Profile;
