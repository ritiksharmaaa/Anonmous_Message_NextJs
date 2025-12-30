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
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans selection:bg-red-600 selection:text-white">
			<div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-zinc-100">
				<div className="text-center mb-8">
					<Link href="/" className="inline-block mb-6">
						<svg width="140" height="44" viewBox="0 0 140 44" fill="none" xmlns="http://www.w3.org/2000/svg">
							<text x="50%" y="32" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="bold" fontSize="32">
								<tspan fill="black">anon</tspan><tspan fill="#E11D48">msg</tspan>
							</text>
						</svg>
					</Link>
					<h1 className="text-2xl font-black tracking-tight text-zinc-900">Verify Account</h1>
					<p className="text-zinc-500 mt-2 text-sm">
						Enter the verification code sent to your email for <span className="font-bold text-zinc-900">@{username}</span>
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-zinc-700 font-semibold">Verification Code</FormLabel>
									<FormControl>
										<Input
											id="code"
											type="text"
											maxLength={6}
											placeholder="123456"
											autoComplete="one-time-code"
											className="bg-zinc-50 border-zinc-200 focus-visible:ring-red-600 h-11 text-center text-lg tracking-widest font-mono"
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
							className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 rounded-lg transition-all"
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
					<p className="text-sm text-zinc-500">
						Didn't receive the code?{" "}
						<button className="text-red-600 hover:text-red-700 font-bold hover:underline bg-transparent border-none cursor-pointer">
							Resend
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}