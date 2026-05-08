"use client";
import { signUp } from "@/app/lib/auth_client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@radix-ui/themes";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField.Root placeholder="Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <TextField.Root
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div>
            <TextField.Root
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <TextField.Root
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              suppressHydrationWarning
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
