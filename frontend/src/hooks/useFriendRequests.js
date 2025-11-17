import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const useFriendRequests = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    });

    return {
        isLoading,
        error,
        friendRequests: data,
        incomingRequests: data?.incomingReqs || [],
        acceptedRequests: data?.acceptedReqs || [],
    };
};
export default useFriendRequests;