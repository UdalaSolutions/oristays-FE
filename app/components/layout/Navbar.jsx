'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
	BedDouble,
	CarFront,
	User,
	Briefcase,
	MessageCircle,
	Bell,
	HelpCircle,
	LogOut,
} from 'lucide-react';

const NAV_LINKS = [
	{ label: 'Homes', href: '/', icon: BedDouble },
	{ label: 'Car ride', href: '/car-ride', icon: CarFront },
];

const USER_MENU = [
	{ label: 'Profile', icon: User, href: '/profile' },
	{ label: 'Trips', icon: Briefcase, href: '/trips' },
	{ label: 'Messages', icon: MessageCircle, href: '/messages' },
	{ label: 'Notifications', icon: Bell, href: '/notifications' },
	{ label: 'Get help', icon: HelpCircle, href: '/help' },
	{ label: 'Log out', icon: LogOut, href: '/logout', danger: true },
];

export default function Navbar({
	isLoggedIn = false,
	user = null,
	onLoginClick,
	onSignupClick,
}) {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const isActive = (href) => {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	};

	return (
		<nav className='sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-[0px_0px_24px_1px_#A0C2DF33]'>
			<div className='max-w-335 mx-auto px-6 h-20 flex items-center justify-between'>
				<Link href='/'>
					<Image
						src='/images/ori-stays-logo.svg'
						alt='Orí Stays'
						height={46}
						width={140}
					/>
				</Link>

				<div className='hidden md:flex items-center justify-between gap-1 bg-white rounded-full p-2 h-12 shadow-[0px_0px_24px_1px_#A0C2DF33] w-100'>
					{NAV_LINKS.map((link) => {
						const Icon = link.icon;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`flex w-full items-center justify-center gap-2 px-4 py-2 rounded-full  font-bold  transition-colors ${
									isActive(link.href) ?
										'bg-transparent text-primary border border-primary'
									:	'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
								}`}>
								<Icon
									size={16}
									strokeWidth={1.5}
								/>
								{link.label}
							</Link>
						);
					})}
				</div>

				<div className='flex items-center gap-6'>
					<Link
						href='/about'
						className={`transition-colors ${
							pathname === '/about' ? 'text-primary' : (
								'text-[#6B7280] hover:text-primary'
							)
						}`}>
						About us
					</Link>

					{isLoggedIn && user ?
						<div
							className='relative'
							ref={menuRef}>
							<button
								onClick={() => setMenuOpen((v) => !v)}
								className='w-9 h-9 rounded-full bg-neutral-800 text-white text-sm font-semibold flex items-center justify-center hover:bg-neutral-700 transition-colors'>
								{user.initials}
							</button>

							{menuOpen && (
								<div className='absolute right-0 top-12 w-56 bg-white rounded-xl shadow-modal border border-neutral-200 py-2 z-50'>
									<div className='px-4 py-3 border-b border-neutral-100'>
										<p className='text-sm font-semibold text-neutral-900'>
											{user.name}
										</p>
										<p className='text-xs text-neutral-500 mt-0.5'>
											{user.email}
										</p>
									</div>
									{USER_MENU.map((item) => {
										const ItemIcon = item.icon;
										return (
											<Link
												key={item.label}
												href={item.href}
												onClick={() => setMenuOpen(false)}
												className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
													item.danger ?
														'text-red-600 hover:bg-red-50'
													:	'text-neutral-700 hover:bg-neutral-50'
												}`}>
												<ItemIcon
													size={16}
													strokeWidth={1.5}
													className='shrink-0'
												/>
												{item.label}
											</Link>
										);
									})}
								</div>
							)}
						</div>
					:	<button
							onClick={onSignupClick}
							className='bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors w-40'>
							Sign up
						</button>
					}
				</div>
			</div>
		</nav>
	);
}
