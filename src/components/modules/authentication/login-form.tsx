"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(4, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Login in.....");
      // console.log(value);
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Login in successful.", { id: toastId });
        form.reset();
        router.push("/");
      } catch (err) {
        return toast.error("Someting went wrong, Error in login catch.", {
          id: toastId,
        });
      }
    },
  });

  // const handleGoogleLogin = async () => {
  //   const data = authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: "http://localhost:3000",
  //   });

  //   console.log(data);
  // };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-green-600">Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login on your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <FieldGroup>
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="felx gap-2.5 flex-col">
        <Button
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-500"
          form="login-form"
          type="submit"
        >
          Login
        </Button>
        <h1>
          Don't have an account?{" "}
          <Link href={"/register"} className="text-sky-500">
            Register
          </Link>
        </h1>
      </CardFooter>
      <div className="absolute -z-20 top-48 left-0 size-44 rounded-full blur-3xl bg-green-200"></div>
      <div className="absolute z-20 top-60 right-10 size-44 rounded-full blur-3xl bg-green-200"></div>
    </Card>
  );
}
