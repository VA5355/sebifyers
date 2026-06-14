import axios from "axios";
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants, isNullOrUndefined,environment} from "@/utils/constants";
interface EmailInvitePayload {
    email: string;
    virtualId?: string;
    platform?: string;
    inviteType?: string;
}

interface EmailInviteResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export const sendTradingInviteEmail = async (
    body: EmailInvitePayload
): Promise<EmailInviteResponse> => {

    try {

        // BACKEND BASE URL
        let baseUrl =
            window.location.hostname === "localhost" ||
            window.location.hostname.includes("192.168")
                ? "https://onedinaar.com"
                : "";
         let lU = environment.netlifyBackend.urlVerify;
        // REMOTE EMAIL SERVICE PATH
        const remoteUrl = "/write";

        // FINAL NETLIFY FUNCTION URL
        const endpoint =
            `${baseUrl}/.netlify/functions/netlifyproxyemailer${lU}${remoteUrl}`;

        console.log(
            "sendTradingInviteEmail endpoint",
            endpoint
        );

        console.log(
            "sendTradingInviteEmail payload",
            body
        );

        // HEADERS
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        // AXIOS REQUEST
        const response = await axios.post(
            endpoint,
            body,
            {
                headers,
                withCredentials: true,
                timeout: 30000
            }
        );

        console.log(
            "sendTradingInviteEmail response",
            response.data
        );

        return {
            success: true,
            data: response.data,
            message: "Invite email sent successfully"
        };

    } catch (err: any) {

        console.log(
            "sendTradingInviteEmail error",
            err
        );

        // AXIOS RESPONSE ERROR
        if (err.response) {

            return {
                success: false,
                message:
                    err.response?.data?.message ||
                    err.response?.data ||
                    "Server responded with error"
            };
        }

        // NETWORK ERROR
        if (err.request) {

            return {
                success: false,
                message:
                    "No response received from server"
            };
        }

        // UNKNOWN ERROR
        return {
            success: false,
            message:
                err.message ||
                "Unexpected error occurred"
        };
    }
};
