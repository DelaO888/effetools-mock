export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-blue-700">
      <ul className="flex items-center justify-end gap-6 px-6 py-4">
        <li className="text-white cursor-pointer">Home</li>
        <li className="text-white cursor-pointer">Login</li>
        <li className="text-white cursor-pointer">About us</li>
      </ul>
    </nav>
  )
}