import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "./login-form"

export function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center py-12">
      <header className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your JobPilot account
        </p>
      </header>

      <Card>
        <CardContent className="pt-5">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}