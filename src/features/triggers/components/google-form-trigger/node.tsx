import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { memo, useState } from "react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchGoogleFormTriggerRealtimeToken,} from "./actions";
import { GoogleFromTriggerDialog } from "./dialog";
import { GOOGLE_FORM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/google-form-trigger";

export const GoogleFormTrigger = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const nodeStatus = useNodeStatus({
                nodeId: props.id,
                channel: GOOGLE_FORM_TRIGGER_CHANNEL_NAME,
                topic: "status",
                refreshToken: fetchGoogleFormTriggerRealtimeToken,
            });

    const handleOpenSettings = () => setDialogOpen(true);
    return (
        <>
        <GoogleFromTriggerDialog
        open = {dialogOpen}
        onOpenChange={setDialogOpen}

        />
        <BaseTriggerNode 
        {...props}
        icon = "/logos/googleform.svg"
        name = "Google Form"
        description = "When form is submitted"
        status = {nodeStatus} 
        onSettings={handleOpenSettings} 
        onDoubleClick={handleOpenSettings} 
        />
        </>
    )
})