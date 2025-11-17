import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

const useStreamToken = (authUser) => {
    const query = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        isSuccess: query.isSuccess,
    };
};

export default useStreamToken;