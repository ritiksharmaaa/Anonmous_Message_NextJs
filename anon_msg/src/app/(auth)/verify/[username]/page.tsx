"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { verifySchema } from "@/schemas/verifySchema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ApiResponse } from "@/types/ApiResponse";

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyPage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const params = useParams();
	const username = params?.username as string | undefined;

	const form = useForm<VerifyFormValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: { code: "" },
	});

	const onSubmit = async (data: VerifyFormValues) => {
		if (!username) {
			toast.error("Username is missing from URL");
			return;
		}
		setLoading(true);
		try {
			const res = await axios.post("/api/user-otp-verification", {
				username: encodeURIComponent(username),
				code: encodeURIComponent(data.code),
			});
			if (res.data.success) {
				toast.success(res.data.message || "Verification successful!");
				router.replace("/sign-in");
			} else {
				toast.error(res.data.message || "Verification failed");
			}
		} catch (err) {
            const axiosError = err as AxiosError<ApiResponse>;
			toast.error(axiosError.response?.data?.message || "Server error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow">
			<h1 className="text-2xl font-bold mb-4 text-center">Verify Your Account</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verification Code</FormLabel>
								<FormControl>
									<Input
										id="code"
										type="text"
										maxLength={6}
										placeholder="Enter 6-digit code"
										autoComplete="one-time-code"
										className="mt-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Verifying..." : "Verify"}
					</Button>
				</form>
			</Form>
		</div>
	);
}