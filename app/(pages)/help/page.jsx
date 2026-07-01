'use client';

import { useState } from 'react';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import LoginModal from '@/app/components/modals/Loginmodal';
import { Phone, Mail } from 'lucide-react';

export default function HelpPage() {
	const [loginOpen, setLoginOpen] = useState(false);
	const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
	const [sent, setSent] = useState(false);

	function handleChange(e) {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		setSent(true);
	}

	return (
		<>
			<Navbar onSignupClick={() => setLoginOpen(true)} onLoginClick={() => setLoginOpen(true)} />

			<main className='max-w-3xl mx-auto px-6 py-16'>
				<div className='text-center mb-12'>
					<h1 className='text-3xl md:text-4xl font-bold text-neutral-900 mb-4'>
						We&apos;re Here to Help
					</h1>
					<p className='text-neutral-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto'>
						Need assistance, have a question, or want to report an issue? Our support team is here to
						make sure your experience is smooth from start to finish. We&apos;re committed to resolving
						your concerns as quickly as possible.
					</p>
				</div>

				<div className='border border-neutral-200 rounded-2xl overflow-hidden mb-12'>
					<div className='h-1 bg-primary w-full' />
					<div className='p-8'>
						{sent ? (
							<div className='text-center py-8'>
								<div className='w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
									<Mail size={24} className='text-green-600' strokeWidth={1.5} />
								</div>
								<h2 className='text-lg font-bold text-neutral-900 mb-2'>Message sent!</h2>
								<p className='text-sm text-neutral-500'>
									We&apos;ll get back to you within 24 hours.
								</p>
								<button
									onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
									className='mt-6 text-sm text-primary font-medium hover:underline'>
									Send another message
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-5'>
								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>Full name</label>
									<input
										type='text'
										name='name'
										value={form.name}
										onChange={handleChange}
										placeholder='Enter your full name'
										required
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
									/>
								</div>

								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>Email</label>
									<input
										type='email'
										name='email'
										value={form.email}
										onChange={handleChange}
										placeholder='Enter your email address'
										required
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
									/>
								</div>

								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>Subject</label>
									<input
										type='text'
										name='subject'
										value={form.subject}
										onChange={handleChange}
										placeholder='Briefly describe your issue'
										required
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
									/>
								</div>

								<div>
									<label className='block text-sm text-neutral-700 mb-1.5'>How can we help you?</label>
									<textarea
										name='message'
										value={form.message}
										onChange={handleChange}
										placeholder='Write your message here..'
										required
										rows={5}
										className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none'
									/>
								</div>

								<div className='flex justify-center pt-1'>
									<button
										type='submit'
										className='bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-10 py-3 rounded-xl transition-colors'>
										Send message
									</button>
								</div>
							</form>
						)}
					</div>
				</div>

				<div className='text-center'>
					<p className='text-sm font-semibold text-neutral-900 mb-6'>You can also contact us via:</p>
					<div className='flex items-center justify-center gap-6 flex-wrap'>
						<div className='flex items-center gap-3'>
							<div className='w-11 h-11 rounded-full border border-primary flex items-center justify-center shrink-0'>
								<Phone size={18} strokeWidth={1.5} className='text-primary' />
							</div>
							<span className='text-sm font-medium text-neutral-800'>+234 801 234 5678</span>
						</div>
						<div className='flex items-center gap-3'>
							<div className='w-11 h-11 rounded-full border border-primary flex items-center justify-center shrink-0'>
								<Mail size={18} strokeWidth={1.5} className='text-primary' />
							</div>
							<a
								href='mailto:oristays@support.ng'
								className='text-sm font-medium text-neutral-800 hover:text-primary transition-colors'>
								oristays@support.ng
							</a>
						</div>
					</div>
				</div>
			</main>

			<Footer />
			<LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
		</>
	);
}
