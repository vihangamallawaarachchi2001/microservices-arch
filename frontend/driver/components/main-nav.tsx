// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Utensils, ShoppingCart, Bell, User, Menu, Sun, Moon } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { useState, useEffect } from "react"
// import { useTheme } from "next-themes"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export function MainNav() {
//   const pathname = usePathname()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [isMounted, setIsMounted] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { theme, setTheme } = useTheme()

//   // Toggle login state for demo purposes
//   const toggleLogin = () => {
//     setIsLoggedIn(!isLoggedIn)
//   }

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     window.addEventListener("scroll", handleScroll)
//     setIsMounted(true)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   if (!isMounted) {
//     return null
//   }

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/restaurants", label: "Restaurants" },
//     { href: "/about", label: "About Us" },
//     { href: "/contact", label: "Contact Us" },
//   ]

//   return (
//     <header
//       className={cn(
//         "sticky top-0 z-50 w-full transition-all duration-300",
//         isScrolled ? "nav-blur py-2" : "bg-transparent py-4",
//       )}
//     >
//       <div className="container flex items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2">
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
//             <Utensils className="h-5 w-5 text-primary" />
//           </div>
//           <span className="font-bold text-xl">QuickBite</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-1">
//           {navLinks.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={cn(
//                 "px-4 py-2 rounded-full text-sm font-medium transition-colors",
//                 pathname === item.href
//                   ? "text-primary bg-primary/10"
//                   : "text-foreground/70 hover:text-primary hover:bg-primary/10",
//               )}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop Right Side */}
//         <div className="hidden md:flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="rounded-full"
//           >
//             {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//           </Button>

//           {isLoggedIn ? (
//             <>
//               <Button variant="ghost" size="icon" className="relative rounded-full">
//                 <ShoppingCart className="h-5 w-5" />
//                 <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
//                   3
//                 </Badge>
//               </Button>
//               <Button variant="ghost" size="icon" className="relative rounded-full">
//                 <Bell className="h-5 w-5" />
//                 <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
//                   2
//                 </Badge>
//               </Button>
//               <Link href="/profile">
//                 <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary transition-colors">
//                   <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
//                   <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
//                 </Avatar>
//               </Link>
//             </>
//           ) : (
//             <>
//               <Button variant="ghost" className="rounded-full" asChild>
//                 <Link href="/signin">Sign In</Link>
//               </Button>
//               <Button className="rounded-full gradient-bg text-white" asChild>
//                 <Link href="/signup">Get Started</Link>
//               </Button>
//             </>
//           )}

//           {/* Demo toggle button - remove in production */}
//           <Button variant="outline" size="sm" onClick={toggleLogin} className="ml-2 text-xs border-dashed rounded-full">
//             {isLoggedIn ? "Demo: Logout" : "Demo: Login"}
//           </Button>
//         </div>

//         {/* Mobile Menu */}
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="ghost" size="icon" className="md:hidden rounded-full">
//               <Menu className="h-6 w-6" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between py-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
//                     <Utensils className="h-5 w-5 text-primary" />
//                   </div>
//                   <span className="font-bold text-xl">QuickBite</span>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                   className="rounded-full"
//                 >
//                   {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//                 </Button>
//               </div>

//               <nav className="flex flex-col space-y-1 py-8">
//                 {navLinks.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={cn(
//                       "px-4 py-3 rounded-lg text-base font-medium transition-colors",
//                       pathname === item.href
//                         ? "bg-primary/10 text-primary"
//                         : "text-foreground/70 hover:text-primary hover:bg-primary/10",
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//               </nav>

//               <div className="mt-auto space-y-4">
//                 {isLoggedIn ? (
//                   <div className="flex flex-col space-y-2">
//                     <Link href="/cart">
//                       <Button variant="outline" className="w-full justify-start rounded-lg">
//                         <ShoppingCart className="mr-2 h-5 w-5" />
//                         Cart
//                         <Badge className="ml-auto bg-primary text-white">3</Badge>
//                       </Button>
//                     </Link>
//                     <Link href="/notifications">
//                       <Button variant="outline" className="w-full justify-start rounded-lg">
//                         <Bell className="mr-2 h-5 w-5" />
//                         Notifications
//                         <Badge className="ml-auto bg-primary text-white">2</Badge>
//                       </Button>
//                     </Link>
//                     <Link href="/profile">
//                       <Button variant="outline" className="w-full justify-start rounded-lg">
//                         <User className="mr-2 h-5 w-5" />
//                         Profile
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col space-y-2">
//                     <Button className="w-full rounded-lg gradient-bg text-white" asChild>
//                       <Link href="/signup">Get Started</Link>
//                     </Button>
//                     <Button variant="outline" className="w-full rounded-lg" asChild>
//                       <Link href="/signin">Sign In</Link>
//                     </Button>
//                   </div>
//                 )}

//                 {/* Demo toggle button - remove in production */}
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={toggleLogin}
//                   className="w-full text-xs border-dashed rounded-lg"
//                 >
//                   {isLoggedIn ? "Demo: Logout" : "Demo: Login"}
//                 </Button>
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   )
// }

