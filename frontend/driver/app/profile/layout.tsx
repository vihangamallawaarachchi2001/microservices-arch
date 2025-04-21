import Navbar from "@/components/navbar"
import { ProfileSidebar } from "@/components/profile-sidebar"
import type React from "react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6  mt-12" >
          <div className="md:w-1/4">
            <ProfileSidebar  />
          </div>
          <div className="md:w-3/4">{children}</div>
        </div>
      </div>
    </div>
  )
}
