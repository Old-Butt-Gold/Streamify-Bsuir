import {useMutation, useQueryClient} from "@tanstack/react-query";
import {completeOnboarding} from "../lib/api.js";
import toast from "react-hot-toast";


const useOnboarding = () => {
    const queryClient = useQueryClient();

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: async () => {
            toast.success("Profile onboarded successfully");
            await queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { isPending, onboardingMutation };
};

export default useOnboarding;