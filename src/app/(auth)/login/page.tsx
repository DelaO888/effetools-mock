"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage(){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading]  = useState(false)

async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setError("")


    const result = await signIn("credentials", {
        email, password, redirect: false
    })

    if(result?.error){
        setError("Invalid email or password")
        setLoading(false)
    } else {
        router.push("/")
    }


}

return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">EFFETools</h1>
            <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>


            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required/>
                </div>
                 <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
            </form>
        </div>
    </div>
)
}