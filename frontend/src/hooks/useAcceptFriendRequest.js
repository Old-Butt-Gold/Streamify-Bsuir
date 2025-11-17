import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../lib/api";

const useAcceptFriendRequest = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["friendRequests"] }),
                queryClient.invalidateQueries({ queryKey: ["friends"] })
            ]);
        },
    });

    return {
        acceptRequestMutation: mutation.mutate,
        isPending: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};
export default useAcceptFriendRequest;