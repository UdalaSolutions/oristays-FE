import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

function Section({ number, title, children }) {
	return (
		<div className='mb-7'>
			<h2 className='text-sm font-semibold text-neutral-900 mb-2'>
				{number}. {title}
			</h2>
			{children}
		</div>
	);
}

function Para({ children }) {
	return (
		<p className='text-sm text-neutral-600 leading-relaxed mb-2'>{children}</p>
	);
}

function SubSection({ title, children }) {
	return (
		<div className='mb-3'>
			<p className='text-sm font-medium text-neutral-800 mb-1'>{title}</p>
			{children}
		</div>
	);
}

function List({ items }) {
	return (
		<ul className='space-y-1 mb-2'>
			{items.map((item, i) => (
				<li
					key={i}
					className='flex items-start gap-2 text-sm text-neutral-600'>
					<span className='mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0' />
					{item}
				</li>
			))}
		</ul>
	);
}

export default function PrivacyPage() {
	return (
		<>
			<Navbar />

			<main className='max-w-200 mx-auto px-6 py-16'>
				<h1 className='text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-10'>
					Privacy Policy
				</h1>

				<p className='text-sm text-neutral-500 mb-8'>Last Updated: June 2026</p>

				<Para>
					Your privacy matters to us. This Privacy Policy explains how we
					collect, use, protect, and share your information when you use our
					platform to book stays, airport transfers, and ride services. By
					creating an account or using our platform, you agree to the practices
					described in this Privacy Policy.
				</Para>

				<Section
					number='1'
					title='Information We Collect'>
					<Para>
						To provide a safe and seamless experience, we may collect the
						following information:
					</Para>
					<SubSection title='Personal Information'>
						<List
							items={[
								'Full name',
								'Email address',
								'Phone number',
								'Profile photo',
								'Date of birth',
							]}
						/>
					</SubSection>
					<SubSection title='Booking Information'>
						<Para>When you book a stay, we collect information such as:</Para>
						<List
							items={[
								'Apartment booked',
								'Check-in and check-out dates',
								'Number of guests',
								'Special requests',
							]}
						/>
					</SubSection>
					<SubSection title='Ride Information'>
						<Para>When you request a ride, we may collect:</Para>
						<List
							items={[
								'Pickup location',
								'Destination',
								'Flight date and time (for airport transfers)',
								'Airport details',
							]}
						/>
					</SubSection>
					<SubSection title='Payment Information'>
						<Para>
							Payments are securely processed by trusted payment providers. We
							do not store your full card details on our servers.
						</Para>
					</SubSection>
					<SubSection title='Device Information'>
						<Para>
							When you use our platform, we may automatically collect:
						</Para>
						<List
							items={[
								'IP address',
								'Device type',
								'Browser information',
								'Operating system',
								'App usage information',
							]}
						/>
					</SubSection>
				</Section>

				<Section
					number='2'
					title='How We Use Your Information'>
					<Para>We use your information to:</Para>
					<List
						items={[
							'Create and manage your account',
							'Process accommodation and ride bookings',
							'Confirm reservations',
							'Arrange airport transfers',
							'Process payments and refunds',
							'Send booking updates and notifications',
							'Provide customer support',
							'Improve our products and services',
							'Prevent fraud and protect users',
							'Comply with legal obligations',
						]}
					/>
				</Section>

				<Section
					number='3'
					title='Sharing Your Information'>
					<Para>
						We only share your information when necessary to provide our
						services.
					</Para>
					<Para>Your information may be shared with:</Para>
					<List
						items={[
							'Hosts to manage your accommodation',
							'Drivers to complete your ride',
							'Payment providers to process transactions',
							'Customer support providers assisting with your requests',
							'Government authorities where required by law',
						]}
					/>
					<Para>
						We do not sell your personal information to third parties.
					</Para>
				</Section>

				<Section
					number='4'
					title='Protecting Your Information'>
					<Para>
						We use industry-standard security measures to help protect your
						personal information from unauthorized access, misuse, or
						disclosure.
					</Para>
					<Para>
						While we work hard to keep your information secure, no online
						service can guarantee absolute security.
					</Para>
				</Section>

				<Section
					number='5'
					title='Your Choices'>
					<Para>You may:</Para>
					<List
						items={[
							'Update your personal information',
							'Change your communication preferences',
							'Request a copy of your personal data',
							'Opt out of promotional emails at any time',
							'Delete your account',
						]}
					/>
					<Para>
						Deleting your account may limit access to certain services and
						booking history.
					</Para>
				</Section>

				<Section
					number='6'
					title='Cookies'>
					<Para>We use cookies and similar technologies to:</Para>
					<List
						items={[
							'Keep you signed in',
							'Improve website performance',
							'Remember your preferences',
							'Understand how our platform is used',
						]}
					/>
					<Para>You can manage cookies through your browser settings.</Para>
				</Section>

				<Section
					number='7'
					title='Data Retention'>
					<Para>
						We keep your information only for as long as necessary to:
					</Para>
					<List
						items={[
							'Provide our services',
							'Meet legal and regulatory obligations',
							'Resolve disputes',
							'Prevent fraud',
						]}
					/>
				</Section>

				<Section
					number='8'
					title="Children's Privacy">
					<Para>
						Our services are intended for users who are legally able to enter
						into contracts. We do not knowingly collect personal information
						from children without appropriate consent.
					</Para>
				</Section>

				<Section
					number='9'
					title='Changes to This Policy'>
					<Para>
						We may update this Privacy Policy from time to time. Any changes
						will be posted on this page with the updated effective date.
					</Para>
				</Section>

				<Section
					number='10'
					title='Contact Us'>
					<Para>
						If you have any questions about this Privacy Policy or how your
						information is handled, please contact our support team through the{' '}
						<a
							href='/help'
							className='text-primary hover:underline'>
							Help center
						</a>{' '}
						or the email address provided on our website.
					</Para>
				</Section>
			</main>

			<Footer />
		</>
	);
}
