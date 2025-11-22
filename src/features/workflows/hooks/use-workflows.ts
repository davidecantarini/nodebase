// Hook to fetch all workflows using suspense

import { useTRPC } from "@/trpc/client";
import { dataTagErrorSymbol, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"; 
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const useSuspenseWorkflows = () => {

    const trpc = useTRPC(); 

    return useSuspenseQuery(trpc.workflows.getOne.queryOptions());

};

export const useCreateWorkflow = () => {
    
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success('Workflow "${data.name}" created successfully');
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions(),
                );
            },
            onError: (error) => {
                    toast.error(`Error creating workflow: ${error.message}`);
            },
        })
    );
}