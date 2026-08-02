'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from './lib/useAuth';
import { StatsBar } from './components/home/StatsBar';
import { ApartmentSection } from './components/home/ApartmentSection';
import { FAQSection } from './components/home/FAQSection';
import { HowItWorks } from './components/home/HowItWorks';
import { UpcomingTrip } from './components/home/UpcomingTrip';
import SearchBar from './components/home/Searchbar';
import Footer from './components/layout/Footer';
import LoginModal from './components/modals/Loginmodal';
import Navbar from './components/layout/Navbar';

const MOCK_APARTMENTS = Array.from({ length: 4 }, (_, i) => ({
	id: `apt-${i}`,
	slug: `modern-loft-apartment-${i}`,
	name: "Da'ville Apartment",
	guests: 2,
	bedrooms: 1,
	beds: 1,
	baths: 1,
	price: 70,
	rating: 4.9,
	tier: ['Standard', 'Premium', 'Luxury', 'Standard'][i],
	image: '/images/apartment-placeholder.jpg',
}));

const RECENT_SEARCHES = [{ name: 'Surulere', meta: 'March 18 - 20 · 1 guest' }];

export default function HomePage() {
	const { isLoggedIn, user, login, logout } = useAuth();
	const [loginOpen, setLoginOpen] = useState(false);

	function handleLoginSuccess(email) {
		login(email);
		setLoginOpen(false);
	}

	return (
		<>
			<Navbar
				isLoggedIn={isLoggedIn}
				user={user}
				onSignupClick={() => setLoginOpen(true)}
				onLoginClick={() => setLoginOpen(true)}
				onLogout={logout}
			/>

			<main>
				<section className='relative min-h-[90vh] md:min-h-153 flex flex-col justify-center'>
					<div className='absolute inset-0'>
						<Image
							src='/images/hero-pool.svg'
							alt='Orí Stays hero'
							height={0}
							width={0}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent' />
					</div>

					<div className='relative z-10 max-w-335 mx-auto px-6 py-12 md:py-16 w-full'>
						<span className='inline-block bg-primary/30 text-[#EB997A] text-sm px-3 py-1.5 rounded-full mb-6 border border-primary'>
							Lagos, Nigeria 2026
						</span>
						<h1 className='text-3xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-4 max-w-xl'>
							Arrive in Lagos,
							<br />
							leave the rest to us.
						</h1>
						<p className='text-[#F7F7F7] text-sm md:text-lg mb-8 max-w-sm leading-relaxed md:max-w-138.25'>
							Verified apartments and dedicated human support, available 24/7
							from your first click to your last night.
						</p>

						<div className='md:max-w-278'>
							<SearchBar recent={RECENT_SEARCHES} />
						</div>
					</div>
				</section>

				<StatsBar />

				<div className='max-w-335 mx-auto px-6 py-10 md:py-14 space-y-10 md:space-y-14'>
					<UpcomingTrip />
					<ApartmentSection
						title='Favorites in Lekki'
						apartments={MOCK_APARTMENTS}
						viewAllHref='/apartments?area=lekki'
					/>
					<ApartmentSection
						title='Top stays in Victoria Island'
						apartments={MOCK_APARTMENTS}
						viewAllHref='/apartments?area=victoria-island'
					/>
					<ApartmentSection
						title='Popular in Ikoyi'
						apartments={MOCK_APARTMENTS}
						viewAllHref='/apartments?area=ikoyi'
					/>
				</div>

				<div className='py-10 md:py-14 space-y-10 md:space-y-14'>
					<HowItWorks />
					<FAQSection />
				</div>
			</main>

			<Footer />

			<LoginModal
				isOpen={loginOpen}
				onClose={() => setLoginOpen(false)}
				onSuccess={handleLoginSuccess}
			/>
		</>
	);
}
