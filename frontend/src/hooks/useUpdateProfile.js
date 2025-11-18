import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: async () => {
            toast.success("Profile updated successfully");
            await queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    });

    return { updateProfileMutation: mutation.mutate, isUpdating: mutation.isPending };
};

export default useUpdateProfile;