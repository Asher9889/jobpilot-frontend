import { z } from "zod"
import { loginFormSchema } from "../schema/login.schema"

export type LoginFormValues = z.infer<typeof loginFormSchema>