import { Message } from "@/model/User.model"; 

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    isAcceptingResponses?: boolean;
    messages?: Message[];
}
