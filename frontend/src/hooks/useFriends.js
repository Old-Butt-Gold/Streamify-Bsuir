import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";

const useFriends = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    return {
        isLoading,
        error,
        friends: data || []
    };
};
export default useFriends;