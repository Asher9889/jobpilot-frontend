import { GuestGuard } from "@/features/auth/components/guest-guard"

export const instant = false

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>
}