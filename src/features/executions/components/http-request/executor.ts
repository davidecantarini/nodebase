import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as kyOptions} from "ky";

type HttpRequestData = {
    variableName?: string;
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string; 
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async({
    data,
    nodeId,
    context,
    step,
}) => {
    //TODO Publish "loading" state for Http Request

    if (!data.endpoint) {
        //TODO: Publish "error" state for http request
        throw new NonRetriableError("HTTP Request Node: No endpoint configured");
    }

    if (!data.variableName) {
        //TODO: Publish "error" state for http request
        throw new NonRetriableError("variableName not configured!");
    }



    const result = await step.run("http-request", async () => {
        const endpoint = data.endpoint!;
        const method = data.method || "GET";

        const options: kyOptions = { method };

        if (["POST", "PUT", "PATCH"].includes(method)) {
            options.body = data.body;
            options.headers = {
                "Content-type": "application/json"
            };
        }

        const response = await ky(endpoint, options);
        const contentType = response.headers.get("content-type");
        const responseData = contentType?.includes("application/json")
            ? await response.json()
            : await response.text();

        const responsePayload = {
            httpResponse: {
                status: response.status,
                statustext: response.statusText,
                data: responseData,
            }
        };

        if (data.variableName) {
            return {
                ...context,
                [data.variableName]: responsePayload,
            }
        }

        //FAllback to direct httpResponse for backward compatibility
        return {
            ...context,
            ...responsePayload,
        }
    });


    //TODO: Publish "success" state for Http Request

    return result;
};