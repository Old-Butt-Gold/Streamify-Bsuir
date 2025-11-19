import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: async () => {
            toast.success("Request sent!");
            await queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
        },
        onError: async (error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
            await queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
        }
    });

    return {
        sendRequestMutation: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};
export default useSendFriendRequest;