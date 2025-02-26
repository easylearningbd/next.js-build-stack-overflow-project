import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";


interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export async function fetchHandler<T>(
    url: string,
    options: FetchOptions = {}
) : Promise<ActionResponse<T>> {
    const {
        timeout = 5000,
        headers: customeHeaders = {},
        ...restOptions
    } = options;

    const contoller = new AbortController();
    const id = setTimeout(() => contoller.abort(),timeout);

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json"
    };

    const headers: HeadersInit = { ...defaultHeaders, ...customeHeaders };
    const config: RequestInit = {
        ...restOptions,
        headers,
        signal: contoller.signal,
    };

    try {
        const response = await fetch(url, config);
        clearTimeout(id);

        if (!response.ok) {
            throw new RequestError(response.status, `HTTP error: ${response.status} `);
        }
        return await response.json(); 

    } catch (err) {
        const error = isError(err) ? err : new Error("Unkonw Error");

        if (error.name === "AbortError") {
            logger.warn(`Request to ${url} time out`);
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`);
        } 

        return handleError(error) as ActionResponse<T>
        
    } 
}