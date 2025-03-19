import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="bg-white border-b sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/hayoma-logo.png" alt="Hayoma Dairy" width={50} height={50} className="mr-2" />
            <h1 className="text-2xl font-bold text-blue-600">Hayoma Dairy</h1>
          </div>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">Modern Dairy Management Solution</h2>
            <p className="text-xl mb-8 text-blue-600">
              Streamline your dairy business with our comprehensive platform for suppliers, shops, and drivers.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="order-first md:order-last">
            <Image
              src="/dairy-home.png"
              alt="Dairy Management"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">Complete Dairy Management Solution</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">For Suppliers</h3>
              <p className="text-blue-600">Manage inventory, track deliveries, and coordinate with Hayoma Dairy.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">For Shops</h3>
              <p className="text-blue-600">Place orders, track deliveries, and manage your dairy product inventory.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">For Drivers</h3>
              <p className="text-blue-600">View delivery schedules, optimize routes, and confirm deliveries.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          &copy; {new Date().getFullYear()} Hayoma Dairy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

