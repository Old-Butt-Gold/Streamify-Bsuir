import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "../lib/api";

const useRecommendedUsers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    return {
        isLoading,
        error,
        recommendedUsers: data || []
    };
};
export default useRecommendedUsers;