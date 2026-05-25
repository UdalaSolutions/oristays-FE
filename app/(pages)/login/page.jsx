'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [remember, setRemember] = useState(false);

	function handleLogin(e) {
		e.preventDefault();
		// Dummy sign-in: check localStorage for a registered host, else accept any credentials
		const stored = localStorage.getItem('hostUser');
		if (stored) {
			const host = JSON.parse(stored);
			if (host.email === email) {
				localStorage.setItem('isLoggedIn', 'true');
				router.push('/');
				return;
			}
		}
		// Fallback: accept any email + password (demo mode)
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem(
			'hostUser',
			JSON.stringify({ email, firstName: email.split('@')[0], role: 'host' })
		);
		router.push('/host/dashboard');
	}

	return (
		<main className='min-h-screen bg-neutral-50 flex items-center justify-center p-4'>
			<div className='bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-card'>
				<div className='text-center mb-8'>
					<p className='text-2xl font-bold text-primary mb-2'>Orí Stays</p>
					<h1 className='text-xl font-semibold text-neutral-900 mb-1'>
						Welcome back
					</h1>
					<p className='text-sm text-neutral-500'>
						Fill in the following information to login.
					</p>
				</div>

				<form
					onSubmit={handleLogin}
					className='space-y-4'>
					<div>
						<label className='block text-sm text-neutral-700 mb-1.5'>
							Email address
						</label>
						<input
							type='email'
							placeholder='e.g john20@gmail.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm text-neutral-700 mb-1.5'>
							Password
						</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='Enter your password here'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='w-full border border-neutral-200 rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							/>
							<button
								type='button'
								onClick={() => setShowPassword((v) => !v)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									strokeWidth={1.5}
									viewBox='0 0 24 24'>
									{showPassword ?
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									:	<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
										/>
									}
								</svg>
							</button>
						</div>
					</div>

					<div className='flex items-center justify-between'>
						<label className='flex items-center gap-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={remember}
								onChange={(e) => setRemember(e.target.checked)}
								className='w-4 h-4 rounded border-neutral-300 accent-primary'
							/>
							<span className='text-sm text-neutral-700'>Remember me</span>
						</label>
						<Link
							href='/forgot-password'
							className='text-sm font-medium text-primary hover:text-primary-hover'>
							Forgot password?
						</Link>
					</div>

					<button
						type='submit'
						className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl text-sm transition-colors'>
						Log in
					</button>

					<p className='text-center text-sm text-neutral-600'>
						Don&apos;t have an account?{' '}
						<Link
							href='/host/register'
							className='font-semibold text-primary hover:text-primary-hover'>
							Create account
						</Link>
					</p>
					<p className='text-center text-sm text-neutral-600'>
						Want to list your space?{' '}
						<Link
							href='/host'
							className='font-semibold text-primary hover:text-primary-hover'>
							Become a host
						</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
