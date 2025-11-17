import { useQuery } from "@tanstack/react-query";
import { getOutgoingFriendReqs } from "../lib/api";

const useOutgoingFriendReqs = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    });

    return {
        isLoading,
        error,
        outgoingFriendReqs: data
    };
};
export default useOutgoingFriendReqs;