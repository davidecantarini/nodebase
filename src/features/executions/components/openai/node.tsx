"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { AVAILABLE_MODELS, OpenaiDialog, OpenAiFormValues,  } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { OPENAI_CHANNEL_NAME } from "@/inngest/channels/openai";
import { fetchOpenAiRealtimeToken } from "./actions";




type OpenaiNodeData = {
    variableName?: string;
    model?: string;
    systemPrompt?: string;
    userPrompt?: string;
};

type OpenaiNodeType = Node<OpenaiNodeData>;


export const OpenaiNode = memo((props: NodeProps<OpenaiNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { setNodes } = useReactFlow(); 

    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: OPENAI_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchOpenAiRealtimeToken,
    });

    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values: OpenAiFormValues) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === props.id ) {
                return {
                    ...node, 
                    data: {
                        ...node.data, 
                        ...values,
                    }
                }
            }
            return node;
        }))
    }

    const nodeData = props.data;
    const description = nodeData?.userPrompt
        ? `${nodeData.model || AVAILABLE_MODELS[0]}: ${nodeData.userPrompt.slice(0, 50)}...` 
        : "Not configured";

    

    return ( 
            <>
                <OpenaiDialog
                open = {dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                defaultValues={nodeData}
                />
                <BaseExecutionNode 
                {...props}
                id = {props.id}
                icon = "/logos/openai.svg"
                name = "OpenAi"
                description= {description}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                status = {nodeStatus}
                />
            </>
        )
});

OpenaiNode.displayName = "OpenAiNode";


