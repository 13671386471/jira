import {QueryKey, useQueryClient } from "react-query";


export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any) => any[]) => {

    const queryClient = useQueryClient();
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) {
            // 缓存
            const previousProjects = queryClient.getQueryData(queryKey);
            if (previousProjects) {
                queryClient.setQueryData(queryKey, (old?: any[]) => {
                    return callback(target, old);
                })
            }
            return { previousProjects }
        },
        onError(error:any, newData: any, context: any) {
            if (context?.previousProjects) {
                queryClient.setQueryData(queryKey, context.previousProjects)
            }
        }
    }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(
    queryKey, 
    (target, old) => {
        return old?.filter((item: any) => item.id !== target.id) || []
    }
)

export const useEditConfig = (queryKey: QueryKey) => useConfig(
    queryKey, 
    (target, old) => {
        return old?.map((item: any) => item.id === target.id ? {...item, ...target} : item) || []
    }
)

export const useAddConfig = (queryKey: QueryKey) => useConfig(
    queryKey, 
    (target, old) => {
        return old? [...old, target]: []
    }
)



