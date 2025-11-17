import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";

const useSendFriendRequest = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
        },
    });

    return {
        sendRequestMutation: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};
export default useSendFriendRequest;