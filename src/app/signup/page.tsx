'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: উইক ৪-এ এখানে আমরা ব্যাকএন্ড API কানেক্ট করব
    console.log('Signup data:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400 transition">
              sign in to your existing account
            </Link>
          </p>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
