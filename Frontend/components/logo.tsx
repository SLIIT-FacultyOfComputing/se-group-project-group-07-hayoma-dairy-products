import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden">
        <Image src="/logo.svg" alt="Hayoma Dairy Logo" width={32} height={32} priority />
      </div>
      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Hayoma Dairy</span>
    </Link>
  )
}
