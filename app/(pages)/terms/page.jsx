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
	return <p className='text-sm text-neutral-600 leading-relaxed mb-2'>{children}</p>;
}

function List({ items }) {
	return (
		<ul className='space-y-1 mb-2'>
			{items.map((item, i) => (
				<li key={i} className='flex items-start gap-2 text-sm text-neutral-600'>
					<span className='mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0' />
					{item}
				</li>
			))}
		</ul>
	);
}

export default function TermsPage() {
	return (
		<>
			<Navbar />

			<main className='max-w-2xl mx-auto px-6 py-16'>
				<h1 className='text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-10'>
					Terms of Service
				</h1>

				<p className='text-sm text-neutral-500 mb-6'>Last Updated: June 2026</p>

				<Para>
					Welcome to Orí Stays. The Terms of Service govern your use of our website, mobile application,
					and services. By creating an account, making a booking, or using our platform, you agree to
					these Terms. If you do not agree, please do not use our services.
				</Para>

				<Section number='1' title='Eligibility'>
					<Para>To use our platform, you must:</Para>
					<List items={[
						'Be at least 18 years old or the legal age required to enter into a binding agreement in your country.',
						'Provide accurate and up-to-date information.',
						'Use the platform only for lawful purposes.',
					]} />
					<Para>You are responsible for maintaining the confidentiality of your account credentials and for all activities carried out under your account.</Para>
				</Section>

				<Section number='2' title='Your Account'>
					<Para>When creating an account, you agree to:</Para>
					<List items={[
						'Provide accurate personal information.',
						'Keep your contact details updated.',
						'Protect your login credentials.',
						'Notify us immediately if you suspect unauthorized access to your account.',
					]} />
					<Para>We reserve the right to suspend or remove accounts that contain false information or violate these Terms.</Para>
				</Section>

				<Section number='3' title='Booking Stays'>
					<Para>Our platform allows you to discover and book verified accommodation.</Para>
					<Para>When making a reservation, you agree to:</Para>
					<List items={[
						'Review the listing details carefully before booking.',
						'Ensure the number of guests matches your reservation.',
						'Follow any house rules provided by the host.',
						'Complete payment within the required timeframe.',
					]} />
					<Para>A reservation is only confirmed after successful payment and confirmation by the platform where applicable.</Para>
				</Section>

				<Section number='4' title='Ride Services'>
					<Para>Guests may book airport transfers and other ride services available on the platform.</Para>
					<Para>To ensure a smooth experience, you should:</Para>
					<List items={[
						'Provide accurate pickup and destination details.',
						'Enter the correct flight date and time for airport transfers.',
						'Be ready at the agreed pickup time.',
						'Notify us as soon as possible if your travel plans change.',
					]} />
					<Para>Ride availability may vary depending on location and demand.</Para>
				</Section>

				<Section number='5' title='Payments'>
					<Para>Payments must be completed using the payment methods available on the platform.</Para>
					<Para>Depending on the booking, you may be required to:</Para>
					<List items={[
						'Pay a deposit to secure your reservation.',
						'Complete the remaining balance before check-in or as otherwise stated.',
					]} />
					<Para>Failure to complete payment may result in cancellation of your reservation.</Para>
				</Section>

				<Section number='6' title='Reservation Changes'>
					<Para>Guests may request changes to their reservation, including:</Para>
					<List items={['Check-in or check-out dates', 'Number of guests', 'Reserved apartment (where applicable)']} />
					<Para>Changes require approval from both parties before they take effect.</Para>
					<Para>Any additional charges resulting from the requested changes must be accepted before the reservation is updated.</Para>
				</Section>

				<Section number='7' title='Reservation Extensions'>
					<Para>If you wish to extend your stay, you may submit a request through the platform.</Para>
					<Para>Extensions are subject to:</Para>
					<List items={['Availability of the property', 'Approval by the host', 'Payment of any additional charges']} />
					<Para>Your reservation is only extended once the request has been approved and payment has been completed where applicable.</Para>
				</Section>

				<Section number='8' title='Cancellations & Refunds'>
					<Para>Cancellation and refund eligibility depends on the cancellation policy associated with your booking.</Para>
					<Para>Where a refund applies, it will be processed using your original payment method.</Para>
					<Para>Some bookings or deposits may be non-refundable. Please review the cancellation policy before confirming your reservation.</Para>
				</Section>

				<Section number='9' title='Guest Responsibilities'>
					<Para>By using our platform, you agree to:</Para>
					<List items={[
						'Respect hosts, drivers, and other users.',
						'Follow property rules during your stay.',
						'Keep accommodation clean and avoid unnecessary damage.',
						'Use ride services responsibly.',
						'Provide accurate booking information.',
						'Comply with applicable laws and regulations.',
					]} />
					<Para>You may be held responsible for damages caused during your stay or ride.</Para>
				</Section>

				<Section number='10' title='Reviews & Ratings'>
					<Para>Guests may leave reviews after completing a stay or ride.</Para>
					<Para>Reviews should:</Para>
					<List items={[
						'Reflect your genuine experience.',
						'Be respectful and free from offensive language.',
						'Not contain false, misleading, or defamatory information.',
					]} />
					<Para>We reserve the right to remove reviews that violate our community standards.</Para>
				</Section>

				<Section number='11' title='Prohibited Activities'>
					<Para>You must not use the platform to:</Para>
					<List items={[
						'Create fraudulent bookings.',
						'Provide false or misleading information.',
						'Harass, threaten, or abuse other users.',
						'Damage or misuse any property.',
						'Engage in illegal activities.',
						'Circumvent payments or fees outside the platform.',
						'Attempt to gain unauthorized access to our systems.',
					]} />
					<Para>Violation of these Terms may result in account suspension or permanent removal.</Para>
				</Section>

				<Section number='12' title='Service Availability'>
					<Para>While we strive to keep our platform available at all times, we cannot guarantee uninterrupted access.</Para>
					<Para>We may temporarily suspend services for maintenance, updates, or circumstances beyond our control.</Para>
				</Section>

				<Section number='13' title='Limitation of Liability'>
					<Para>We work to provide a reliable booking experience by partnering with verified hosts and service providers. However, we do not own or operate the listed properties or personally provide transportation services.</Para>
					<Para>To the extent permitted by law, our liability is limited to the amount you paid through the platform for the affected booking or ride.</Para>
					<Para>Nothing in these Terms limits any rights you may have under applicable consumer protection laws.</Para>
				</Section>

				<Section number='14' title='Changes to These Terms'>
					<Para>We may update these Terms from time to time to reflect changes to our services or legal requirements.</Para>
					<Para>Where significant changes are made, we will notify you through the platform or by email where appropriate.</Para>
					<Para>Your continued use of the platform after the updated Terms become effective constitutes your acceptance of the revised Terms.</Para>
				</Section>

				<Section number='15' title='Contact Us'>
					<Para>
						If you have any questions about these Terms or need assistance, please contact our support
						team through the{' '}
						<a href='/help' className='text-primary hover:underline'>Help center</a>{' '}
						or the email address provided on our website.
					</Para>
				</Section>
			</main>

			<Footer />
		</>
	);
}
