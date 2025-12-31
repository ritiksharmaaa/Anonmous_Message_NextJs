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
import Link from "next/link";
import { Loader2 } from "lucide-react";

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
				username: username, // No need to encodeURIComponent here, axios handles JSON body
				code: data.code,
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
		<div className="flex min-h-screen items-center justify-center bg-surface-muted px-4 font-sans transition-colors">
			<div className="w-full max-w-md p-8 bg-surface rounded-2xl shadow-xl border border-border-muted">
				<div className="text-center mb-8">
					<Link href="/" className="inline-block mb-6">
						<svg width="140" height="44" viewBox="0 0 140 44" fill="none" xmlns="http://www.w3.org/2000/svg">
							<text x="50%" y="32" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="bold" fontSize="32">
								<tspan className="fill-text-primary">anon</tspan><tspan className="fill-brand">msg</tspan>
							</text>
						</svg>
					</Link>
					<h1 className="text-2xl font-black tracking-tight text-text-primary">Verify Account</h1>
					<p className="text-text-muted mt-2 text-sm">
						Enter the verification code sent to your email for <span className="font-bold text-text-primary">@{username}</span>
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-text-secondary font-semibold">Verification Code</FormLabel>
									<FormControl>
										<Input
											id="code"
											type="text"
											maxLength={6}
											placeholder="123456"
											autoComplete="one-time-code"
											className="bg-surface-muted border-border focus-visible:ring-focus-ring h-11 text-center text-lg tracking-widest font-mono"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button 
							type="submit" 
							disabled={loading} 
							className="w-full bg-brand hover:bg-brand-hover text-brand-foreground font-bold h-11 rounded-lg transition-all"
						>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Verifying...
								</>
							) : (
								"Verify Account"
							)}
						</Button>
					</form>
				</Form>
				
				<div className="mt-8 text-center">
					<p className="text-sm text-text-muted">
						Didn't receive the code?{" "}
						<button className="text-brand hover:text-brand-hover font-bold hover:underline bg-transparent border-none cursor-pointer">
							Resend
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}