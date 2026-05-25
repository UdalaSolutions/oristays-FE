'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HostRegisterPage() {
	const router = useRouter();
	const [step, setStep] = useState(1);

	// Step 1 fields
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [isBusinessRegistered, setIsBusinessRegistered] = useState('');
	const [registrationNumber, setRegistrationNumber] = useState('');

	// Step 2 – OTP
	const [otp, setOtp] = useState(['', '', '', '', '']);
	const [timeLeft, setTimeLeft] = useState(220); // 3:40
	const otpRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	// Step 3 – Password
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	// OTP countdown
	useEffect(() => {
		if (step !== 2) return;
		if (timeLeft === 0) return;
		const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
		return () => clearInterval(id);
	}, [step, timeLeft]);

	function formatTime(secs) {
		const m = Math.floor(secs / 60);
		const s = secs % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	// OTP input handlers
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

	// Step 1 validation
	const step1Valid =
		firstName.trim() &&
		lastName.trim() &&
		email.trim() &&
		phone.trim() &&
		address.trim() &&
		isBusinessRegistered !== '' &&
		(isBusinessRegistered !== 'yes' || registrationNumber.trim());

	// Step 2 validation
	const otpComplete = otp.every((d) => d !== '');

	// Step 3 validation
	const passwordValid = password.length >= 8;
	const step3Valid = passwordValid && confirmPassword === password;

	function handleStep1() {
		if (!step1Valid) return;
		setStep(2);
	}

	function handleVerify() {
		if (!otpComplete) return;
		setStep(3);
	}

	function handleComplete() {
		if (!step3Valid) return;
		// Dummy: save host user to localStorage
		const hostUser = {
			firstName,
			lastName,
			email,
			phone,
			address,
			isBusinessRegistered,
			registrationNumber,
			role: 'host',
		};
		localStorage.setItem('hostUser', JSON.stringify(hostUser));
		localStorage.setItem('isLoggedIn', 'true');
		router.push('/host/dashboard');
	}

	return (
		<main className='min-h-screen bg-neutral-50 flex items-center justify-center p-4'>
			<div className='bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-card'>
				{/* ── STEP 1 ── */}
				{step === 1 && (
					<>
						<div className='text-center mb-7'>
							<p className='text-xl font-bold text-primary mb-2'>Orí Stays</p>
							<h1 className='text-lg font-bold text-neutral-900 mb-1'>
								Welcome to Orí Stays
							</h1>
							<p className='text-sm text-neutral-500'>
								Fill in the following information to get started.
							</p>
						</div>

						<div className='space-y-4'>
							{/* First + Last name */}
							<div className='grid grid-cols-2 gap-3'>
								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>
										First name
									</label>
									<input
										type='text'
										placeholder='e.g. John'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
								</div>
								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>
										Last name
									</label>
									<input
										type='text'
										placeholder='e.g. Simon'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Email address
								</label>
								<input
									type='email'
									placeholder='e.g. johnsimon@gmail.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
							</div>

							{/* Phone */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Phone number
								</label>
								<div className='flex items-stretch border border-neutral-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent'>
									<div className='flex items-center gap-1.5 px-3 border-r border-neutral-200 bg-white flex-shrink-0'>
										<span className='text-base'>🇳🇬</span>
										<span className='text-sm text-neutral-700'>+234</span>
										<svg
											className='w-3 h-3 text-neutral-400'
											fill='none'
											stroke='currentColor'
											strokeWidth={2}
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</div>
									<input
										type='tel'
										placeholder='e.g. 081 XXXX XXX'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className='flex-1 px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none'
									/>
								</div>
							</div>

							{/* Address */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Residential address
								</label>
								<input
									type='text'
									placeholder='Enter address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								/>
							</div>

							{/* Business registered */}
							<div>
								<label className='block text-sm text-neutral-700 mb-1.5'>
									Is your business registered?
								</label>
								<div className='relative'>
									<select
										value={isBusinessRegistered}
										onChange={(e) => setIsBusinessRegistered(e.target.value)}
										className='w-full appearance-none border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
										<option
											value=''
											disabled>
											Select option
										</option>
										<option value='yes'>Yes</option>
										<option value='no'>No</option>
									</select>
									<svg
										className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400'
										fill='none'
										stroke='currentColor'
										strokeWidth={2}
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</div>
							</div>

							{/* Registration number – conditional */}
							{isBusinessRegistered === 'yes' && (
								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>
										Registration number
									</label>
									<input
										type='text'
										placeholder='Select option'
										value={registrationNumber}
										onChange={(e) => setRegistrationNumber(e.target.value)}
										className='w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
								</div>
							)}

							{/* Continue button */}
							<button
								onClick={handleStep1}
								disabled={!step1Valid}
								className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors mt-2 ${
									step1Valid
										? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
										: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
								}`}>
								Continue
							</button>
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

						{/* OTP inputs */}
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

						{/* Timer + resend */}
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
							onClick={handleVerify}
							disabled={!otpComplete}
							className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors ${
								otpComplete
									? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
									: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
							}`}>
							Verify email
						</button>
					</>
				)}

				{/* ── STEP 3 – Create password ── */}
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
								Create password
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
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											strokeWidth={1.5}
											viewBox='0 0 24 24'>
											{showPassword ? (
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
									</button>
								</div>
								{/* Validation hint */}
								{password.length > 0 && !passwordValid && (
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
								)}
								{password.length === 0 && (
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
								)}
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
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											strokeWidth={1.5}
											viewBox='0 0 24 24'>
											{showConfirm ? (
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
									</button>
								</div>
							</div>

							{/* Complete registration */}
							<button
								onClick={handleComplete}
								disabled={!step3Valid}
								className={`w-full font-semibold py-3.5 rounded-xl text-sm transition-colors mt-2 ${
									step3Valid
										? 'bg-primary hover:bg-primary-hover text-white cursor-pointer'
										: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
								}`}>
								Complete registration
							</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
