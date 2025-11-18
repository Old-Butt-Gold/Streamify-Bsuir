import { useState, useRef, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { CameraIcon, MapPinIcon, UserIcon, SaveIcon, XIcon, PencilIcon, MailIcon, CalendarIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import toast from "react-hot-toast";
import LanguageFlag from "../components/LanguageFlag.jsx";

const ProfilePage = () => {
    const { authUser } = useAuthUser();
    const { updateProfileMutation, isUpdating } = useUpdateProfile();

    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "", bio: "", location: "", nativeLanguage: "", learningLanguage: "", profilePic: "",
    });

    useEffect(() => {
        if (authUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                fullName: authUser.fullName || "", bio: authUser.bio || "", location: authUser.location || "",
                nativeLanguage: authUser.nativeLanguage || "", learningLanguage: authUser.learningLanguage || "", profilePic: authUser.profilePic || "",
            });
        }
    }, [authUser]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormData({ ...formData, profilePic: reader.result });
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            { field: 'fullName', label: 'Full Name' },
            { field: 'bio', label: 'Bio' },
            { field: 'nativeLanguage', label: 'Native Language' },
            { field: 'learningLanguage', label: 'Learning Language' },
            { field: 'location', label: 'Location' }
        ];

        const missingFields = requiredFields.filter(({ field }) => {
            const value = formData[field];
            return typeof value === 'string' ? !value.trim() : !value;
        });

        if (missingFields.length > 0) {
            toast.error(
                <div>
                    <p className="font-bold">Please fill in all required fields:</p>
                    <ul className="list-disc pl-5 mt-1">
                        {missingFields.map(({ label }) => (
                            <li key={label} className="text-sm">{label}</li>
                        ))}
                    </ul>
                </div>,
                { duration: 5000 }
            );
            return;
        }

        updateProfileMutation(formData, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    const formattedDate = authUser?.createdAt
        ? new Date(authUser.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long' })
        : "";

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-full">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Profile</h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-outline btn-sm sm:btn-md"
                        >
                            <PencilIcon className="size-4 mr-2" />
                            Edit Profile
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT COLUMN: Avatar & Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="card bg-base-200 shadow-sm">
                            <div className="card-body flex flex-col items-center text-center p-6">
                                <div className="relative group">
                                    <div className="avatar size-32 sm:size-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                        <img
                                            src={formData.profilePic || "/avatar.png"}
                                            alt="Profile"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {isEditing && (
                                        <>
                                            <div
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <CameraIcon className="size-8 text-white" />
                                            </div>
                                            <input
                                                type="file"
                                                hidden
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="mt-4 w-full">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm w-full text-center font-bold"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            placeholder="Full Name"
                                        />
                                    ) : (
                                        <h2 className="text-xl font-bold">{authUser?.fullName}</h2>
                                    )}

                                    <div className="flex items-center justify-center gap-2 mt-2 text-sm opacity-70">
                                        <MailIcon className="size-4" />
                                        <span>{authUser?.email}</span>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 mt-1 text-sm opacity-50">
                                        <CalendarIcon className="size-4" />
                                        <span>Joined {formattedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LANGUAGES CARD */}
                        <div className="card bg-base-200 shadow-sm">
                            <div className="card-body p-5">
                                <h3 className="font-bold text-lg mb-3">Languages</h3>
                                <div className="space-y-4">
                                    {/* Native Language */}
                                    <div className="form-control">
                                        <label className="label py-0 mb-1">
                                            <span className="label-text text-xs font-bold uppercase tracking-wider opacity-60">Native</span>
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="select select-bordered select-sm w-full"
                                                value={formData.nativeLanguage}
                                                onChange={(e) => setFormData({...formData, nativeLanguage: e.target.value})}
                                            >
                                                <option value="" disabled>Select Language</option>
                                                {LANGUAGES.map(lang => (
                                                    <option key={lang} value={lang}>{lang}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="flex items-center gap-2 p-2 bg-base-300 rounded-lg">
                                                <LanguageFlag language={formData.nativeLanguage} />
                                                <span className="font-medium capitalize">{formData.nativeLanguage || "Not set"}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Learning Language */}
                                    <div className="form-control">
                                        <label className="label py-0 mb-1">
                                            <span className="label-text text-xs font-bold uppercase tracking-wider opacity-60">Learning</span>
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="select select-bordered select-sm w-full"
                                                value={formData.learningLanguage}
                                                onChange={(e) => setFormData({...formData, learningLanguage: e.target.value})}
                                            >
                                                <option value="" disabled>Select Language</option>
                                                {LANGUAGES.map(lang => (
                                                    <option key={lang} value={lang}>{lang}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="flex items-center gap-2 p-2 bg-base-300 rounded-lg">
                                                <LanguageFlag language={formData.learningLanguage} />
                                                <span className="font-medium capitalize">{formData.learningLanguage || "Not set"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details & Bio */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card bg-base-200 shadow-sm h-full">
                            <div className="card-body p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <UserIcon className="size-5 text-primary" />
                                    Personal Information
                                </h3>

                                <div className="space-y-6">
                                    {/* LOCATION */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Location</span>
                                        </label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <MapPinIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-4 opacity-50" />
                                                <input
                                                    type="text"
                                                    className="input input-bordered w-full pl-10"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                    placeholder="City, Country"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-base-content/80">
                                                <MapPinIcon className="size-4" />
                                                {formData.location || "Not specified"}
                                            </div>
                                        )}
                                    </div>

                                    {/* BIO */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">About Me</span>
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                className="textarea textarea-bordered h-32 resize-none"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                                placeholder="Tell us about yourself..."
                                            ></textarea>
                                        ) : (
                                            <div className="bg-base-300/50 p-4 rounded-xl min-h-[8rem] whitespace-pre-wrap text-sm leading-relaxed">
                                                {formData.bio || "No bio provided yet."}
                                            </div>
                                        )}
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    {isEditing && (
                                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-300">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        ...formData,
                                                        ...authUser
                                                    });
                                                }}
                                                className="btn btn-ghost"
                                                disabled={isUpdating}
                                            >
                                                <XIcon className="size-4 mr-2" />
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <>
                                                        <SaveIcon className="size-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;