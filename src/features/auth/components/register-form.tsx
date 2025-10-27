"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const registerSchema = z.object({
    email :z.email("Please enter a valid email address."),
    password : z.string().min(1, "Password is required"),
    confirmPassword : z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path : ["confirmPassword" ],
});

type registerFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = async (values: registerFormValues) => {
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: "/", 
            },
            {
                onSuccess: () => {
                    toast.success("Account created successfully!");
                    router.push("/");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    
                },
        
            }

        )
    };

    const isPending = form.formState.isSubmitting;

    // Assume LoginForm, Card, CardHeader, etc. are imported
// Assume form, onSubmit, and isPending are defined outside the return statement

    return (
        <div className = "flex flex-col gap-6">

            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started!
                    </CardTitle>
                    <CardDescription>
                        Create an account to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with Google
                                    </Button>
                                </div>
                                
                                {/* Start of Email and Password Fields */}
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> {/* <-- Missing closing tag for FormField */}
                                    
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="password"
                                                        placeholder="Your password"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="password"
                                                        placeholder="Your password"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button 
                                    type="submit"
                                    disabled={isPending}>
                                        Sign Up  
                                    </Button>
                                </div>
                                <div className = "text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className= "underline underline-offset-4">
                                        Login 
                                    </Link>
                                </div>
                                
                                
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}