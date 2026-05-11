"use client";
import { signIn } from "@/app/lib/auth_client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const SignIn = () => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: callbackURL,
    });
    router.push(callbackURL);
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: callbackURL });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-100 p-8 space-y-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField.Root
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <TextField.Root
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <Button type="button" onClick={handleGoogle}>
            Sign In with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
