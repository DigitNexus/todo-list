"use client"
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { registerAPI } from '@/url/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerAPI({ name, email, password });
      console.log("res",res)
      if (res.status===200 || res.status===204) {
        toast.success(res.data.message || ' Login to manage your contacts');
        router.push('/');
      } else {
        toast.error(res.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log("error",error)
      toast.error(error.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
            {loading ? 'Registering...' : 'Register'}
            </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
