"use client";

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
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
    email :z.email("Please enter a valid email address."),
    password : z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL : "/",
        }, {
            onSuccess: () => {
                toast.success("Successfully logged in!");
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(`Login failed: ${ctx.error.message}`);
            },

        })
        
    };

    const isPending = form.formState.isSubmitting;

    // Assume LoginForm, Card, CardHeader, etc. are imported
// Assume form, onSubmit, and isPending are defined outside the return statement

    return (
        <div className = "flex flex-col gap-6">

            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Welcome Back!
                    </CardTitle>
                    <CardDescription>
                        Please sign in to your account
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
                                    <Image alt = "GitHub" src ="/logos/github.svg" width={20} height={20} >

                                    </Image>
                                        Continue with GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                    <Image alt = "Google" src ="/logos/google.svg" width={20} height={20} >

                                    </Image>
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
                                    <Button 
                                    type="submit"
                                    disabled={isPending}>
                                        Login  
                                    </Button>
                                </div>
                                <div className = "text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className= "underline underline-offset-4">
                                        Sign Up
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