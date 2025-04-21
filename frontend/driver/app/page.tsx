import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import Hero from "@/components/home/hero"
import Feature from "@/components/home/feature"
import Categories from "@/components/home/categories"
import Partners from "@/components/home/partners"
import Footer from "@/components/home/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Feature />
      <Categories />
      <Partners />
      <Footer />
      
    </main>
  )
}

