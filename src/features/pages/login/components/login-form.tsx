"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useLogin } from "../hooks/uselogin"
import { loginFormSchema } from "../schema/login.schema"
import type { LoginFormValues } from "../types/types"

export function LoginForm() {
  const { login, isLoggingIn, isLoggedIn, error } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  function handleSubmit(values: LoginFormValues) {
    login(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoggedIn ? (
          <p role="status" className="text-xs font-medium text-emerald-600">
            Signed in successfully.
          </p>
        ) : (
          error && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {error.message}
            </p>
          )
        )}

        <Button type="submit" className="w-full" disabled={isLoggingIn}>
          {isLoggingIn && <LoaderCircle className="size-4 animate-spin" />}
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}