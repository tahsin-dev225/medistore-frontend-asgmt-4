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
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This feild is required."),
  password: z.string().min(4, "Minimum length is 8"),
  email: z.email(),
  role: z.string(),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [userRole, setUserRole] = useState<string>("CUSTOMER");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: userRole,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User.");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        form.reset();
        toast.success("User created successfully", { id: toastId });
        return router.push("/dashboard");
      } catch (err) {
        return toast.error("Someting went wrong, Error in signup catch.", {
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
        <CardTitle className="text-green-600">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
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
        <div className="flex gap-5 my-3">
          <Button
            onClick={() => {
              setUserRole("CUSTOMER");
            }}
            className={`${userRole === "CUSTOMER" ? "bg-green-600 text-white" : "text-black"} hover:bg-green-500 cursor-pointer hover:text-white`}
            variant="outline"
            type="button"
          >
            Register as Customer
          </Button>

          <Button
            className={`${userRole === "SELLER" ? "bg-green-600 text-white" : "text-black"} hover:bg-green-500 cursor-pointer hover:text-white`}
            onClick={() => {
              setUserRole("SELLER");
            }}
            variant="outline"
            type="button"
          >
            Register as Seller
          </Button>
        </div>
      </CardContent>

      <CardFooter className="felx gap-2.5 flex-col">
        <Button
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-500"
          form="login-form"
          type="submit"
        >
          Register
        </Button>
        <h1>
          Already have a account?{" "}
          <Link href={"/login"} className="text-sky-500">
            Login
          </Link>
        </h1>
      </CardFooter>
      <div className="absolute -z-20 top-48 left-0 size-44 rounded-full blur-3xl bg-green-200"></div>
      <div className="absolute z-20 top-60 right-10 size-44 rounded-full blur-3xl bg-green-200"></div>
    </Card>
  );
}
