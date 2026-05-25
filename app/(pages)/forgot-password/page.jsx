'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
	const router = useRouter();
	const [step, setStep] = useState(1);

	// Step 1
	const [email, setEmail] = useState('');

	// Step 2 – OTP
	const [otp, setOtp] = useState(['', '', '', '', '']);
	const [timeLeft, setTimeLeft] = useState(220);
	const otpRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	// Step 3 – New password
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	useEffect(() => {
		if (step !== 2 || timeLeft === 0) return;
		const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
		return () => clearInterval(id);
	}, [step, timeLeft]);

	function formatTime(secs) {
		const m = Math.floor(secs / 60);
		const s = secs % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	function handleOtpChange(i, value) {
		if (!/^\d*$/.test(value)) return;
		const next = [...otp];
		next[i] = value.slice(-1);
		setOtp(next);
		if (value && i < 4) otpRefs[i + 1].current?.focus();
	}

	function handleOtpKeyDown(i, e) {
		if (e.key === 'Backspace' && !otp[i] && i > 0) {
			otpRefs[i - 1].current?.focus();
		}
	}

	function handleResend() {
		setOtp(['', '', '', '', '']);
		setTimeLeft(220);
		otpRefs[0].current?.focus();
	}

	const otpComplete = otp.every((d) => d !== '');
	const passwordValid = password.length >= 8;
	const step3Valid = passwordValid && confirmPassword === password;

	function handleLogin() {
		if (!step3Valid) return;
		router.push('/login');
	}

	return (
		<main className='min-h-screen bg-neutral-50 flex items-center justify-center p-4'>
			<div className='bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-card'>
				{/* ── STEP 1 – Reset your password ── */}
				{step === 1 && (
					<>
						<Link
							href='/login'
							className='flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-6'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
								/>
							</svg>
							Back
						</Link>

						<div className='text-center mb-7'>
							<p className='text-xl font-bold text-primary mb-2'>Orí Stays</p>
							<h1 className='text-lg font-bold text-neutral-900 mb-1'>
								Reset your password
							</h1>
							<p className='text-sm text-neutral-500'>
								Enter your email address to reset your password
							</p>
						</div>

						<div className='space-y-4'>
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Email address
								</label>
								<input
									type='email'
									placeholder='e.g. john20@gmail.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
							</div>

							<button
								onClick={() => email.trim() && setStep(2)}
								disabled={!email.trim()}
								className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors ${
									email.trim()
										? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
										: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
								}`}>
								Verify email
							</button>

							<p className='text-center text-sm text-neutral-600'>
								Don&apos;t have an account?{' '}
								<Link
									href='/host/register'
									className='font-semibold text-primary hover:text-primary-hover'>
									Create account
								</Link>
							</p>
						</div>
					</>
				)}

				{/* ── STEP 2 – Verify email ── */}
				{step === 2 && (
					<>
						<button
							onClick={() => setStep(1)}
							className='flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-6'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
								/>
							</svg>
							Back
						</button>

						<div className='text-center mb-7'>
							<p className='text-xl font-bold text-primary mb-2'>Orí Stays</p>
							<h1 className='text-lg font-bold text-neutral-900 mb-1'>
								Verify your email
							</h1>
							<p className='text-sm text-neutral-500 leading-relaxed'>
								Enter the{' '}
								<span className='font-semibold text-neutral-700'>5 digit code</span>{' '}
								sent to your email address{' '}
								<span className='font-semibold text-neutral-700'>{email}</span>{' '}
								below.
							</p>
						</div>

						<div className='flex gap-3 justify-center mb-5'>
							{otp.map((digit, i) => (
								<input
									key={i}
									ref={otpRefs[i]}
									type='text'
									inputMode='numeric'
									maxLength={1}
									value={digit}
									onChange={(e) => handleOtpChange(i, e.target.value)}
									onKeyDown={(e) => handleOtpKeyDown(i, e)}
									className='w-12 h-12 text-center text-lg font-semibold border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-900'
								/>
							))}
						</div>

						<div className='text-center space-y-2 mb-6'>
							<p className='text-sm text-neutral-500'>
								Code expires in{' '}
								<span className='font-semibold text-neutral-700'>
									{formatTime(timeLeft)}s
								</span>
							</p>
							<p className='text-sm text-neutral-500'>
								Didn&apos;t receive code?{' '}
								<button
									onClick={handleResend}
									className='text-primary font-semibold hover:text-primary-hover'>
									Resend code
								</button>
							</p>
						</div>

						<button
							onClick={() => otpComplete && setStep(3)}
							disabled={!otpComplete}
							className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors ${
								otpComplete
									? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
									: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
							}`}>
							Continue
						</button>
					</>
				)}

				{/* ── STEP 3 – Create new password ── */}
				{step === 3 && (
					<>
						<button
							onClick={() => setStep(2)}
							className='flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-6'>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								strokeWidth={1.5}
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
								/>
							</svg>
							Back
						</button>

						<div className='text-center mb-7'>
							<p className='text-xl font-bold text-primary mb-2'>Orí Stays</p>
							<h1 className='text-lg font-bold text-neutral-900 mb-1'>
								Create new password
							</h1>
							<p className='text-sm text-neutral-500'>
								Create a strong password to complete registration.
							</p>
						</div>

						<div className='space-y-4'>
							{/* Password */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Password
								</label>
								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter a unique password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='w-full border border-neutral-200 rounded-lg px-4 py-3 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
									<button
										type='button'
										onClick={() => setShowPassword((v) => !v)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'>
										<EyeIcon open={showPassword} />
									</button>
								</div>
								<p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
									<svg
										className='w-3.5 h-3.5'
										fill='currentColor'
										viewBox='0 0 20 20'>
										<path
											fillRule='evenodd'
											d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
											clipRule='evenodd'
										/>
									</svg>
									At least 8 characters
								</p>
							</div>

							{/* Confirm password */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Confirm password
								</label>
								<div className='relative'>
									<input
										type={showConfirm ? 'text' : 'password'}
										placeholder='Confirm password'
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className='w-full border border-neutral-200 rounded-lg px-4 py-3 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
									<button
										type='button'
										onClick={() => setShowConfirm((v) => !v)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600'>
										<EyeIcon open={showConfirm} />
									</button>
								</div>
							</div>

							<button
								onClick={handleLogin}
								disabled={!step3Valid}
								className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors mt-2 ${
									step3Valid
										? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
										: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
								}`}>
								Log in
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}

function EyeIcon({ open }) {
	return (
		<svg
			className='w-5 h-5'
			fill='none'
			stroke='currentColor'
			strokeWidth={1.5}
			viewBox='0 0 24 24'>
			{open ? (
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
				/>
			) : (
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
				/>
			)}
		</svg>
	);
}
