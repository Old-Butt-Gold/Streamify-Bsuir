import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { LoaderIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import useOnboarding from "../hooks/useOnboarding.js";
import {getRandomAvatar} from "../lib/utils.js";

const OnboardingPage = () => {
    const { authUser } = useAuthUser();

    const [formState, setFormState] = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || "",
    });

    const { isPending, onboardingMutation } = useOnboarding();

    const handleSubmit = (e) => {
        e.preventDefault();
        onboardingMutation(formState);
    };

    const handleRandomAvatar = () => {
        const randomAvatar = getRandomAvatar();

        setFormState({ ...formState, profilePic: randomAvatar });
        toast.success("New avatar generated!");
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
                <div className="card-body p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* PROFILE PIC CONTAINER */}
                        <div className="flex flex-col items-center justify-center space-y-4">
                            {/* IMAGE PREVIEW */}
                            <div className="size-32 rounded-full bg-base-300 overflow-hidden ring-4 ring-base-100 shadow-lg">
                                {formState.profilePic ? (
                                    <img
                                        src={formState.profilePic}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-secondary/20 text-base-content/40 font-medium">
                                        No Img
                                    </div>
                                )}
                            </div>

                            {/* Generate Random Avatar BTN */}
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent btn-sm">
                                    <ShuffleIcon className="size-4 mr-2" />
                                    Randomize Look
                                </button>
                            </div>
                        </div>

                        {/* FULL NAME */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formState.fullName}
                                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                className="input input-bordered w-full"
                                placeholder="Your full name"
                            />
                        </div>

                        {/* BIO */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea
                                name="bio"
                                value={formState.bio}
                                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Tell others about yourself and your language learning goals"
                            />
                        </div>

                        {/* LANGUAGES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* NATIVE LANGUAGE */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Native Language</span>
                                </label>
                                <select
                                    name="nativeLanguage"
                                    value={formState.nativeLanguage}
                                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select your native language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`native-${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* LEARNING LANGUAGE */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Learning Language</span>
                                </label>
                                <select
                                    name="learningLanguage"
                                    value={formState.learningLanguage}
                                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select language you're learning</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* LOCATION (Optional removed MapPin for cleaner look if needed, but kept based on request) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formState.location}
                                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                                className="input input-bordered w-full"
                                placeholder="City, Country"
                            />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button className="btn btn-primary w-full" disabled={isPending} type="submit">
                            {!isPending ? (
                                <>
                                    <ShipWheelIcon className="size-5 mr-2" />
                                    Complete Onboarding
                                </>
                            ) : (
                                <>
                                    <LoaderIcon className="animate-spin size-5 mr-2" />
                                    Onboarding...
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default OnboardingPage;