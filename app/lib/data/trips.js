export const TRIP_TABS = ['Active', 'Past', 'Cancelled'];

export const TRIP_STATUS_STYLE = {
	Confirmed: 'bg-green-50 text-green-600',
	Completed: 'bg-neutral-100 text-neutral-500',
	Cancelled: 'bg-red-50 text-red-500',
	Ongoing: 'bg-blue-50 text-blue-600',
};

export function getTripStatusStyle(status) {
	return TRIP_STATUS_STYLE[status] ?? 'bg-neutral-100 text-neutral-500';
}

export const TRIPS = [
	{
		id: 'BK-2026-001',
		category: 'active',
		title: 'Modern loft apartment',
		subtitle: 'Entire studio apartment',
		specs: '1 bedroom · 1 bed · 1 bath',
		guestsShort: '2 guests',
		guestLabel: '2 adults, 1 child',
		dateRange: 'Mar 21 – 23',
		checkIn: 'Mar 25, 2026',
		checkOut: 'Mar 28, 2026',
		status: 'Confirmed',
		image: '/images/apartment-placeholder.jpg',
		booker: 'Adaeze Okonkwo',
		reference: 'BK-2026-001',
		price: 210,
		address: 'Block 20 Sangotedo street, Lekki, Lagos',
		host: { name: 'John Adeyemi', since: '5 years hosting', initials: 'J' },
		cancellationPolicy:
			'Cancel your booking free of charge up to 72 hours before check-in. After that, 50% cancellation fee applies.',
		houseRules: [
			'Check-in after 2:00 PM',
			'5 guests maximum',
			'No children allowed',
			'No parties or events',
			'Checkout before 12:00 PM',
			'No smoking',
		],
	},
	{
		id: 'BK-2026-002',
		category: 'past',
		title: 'Royal villa',
		subtitle: 'Entire villa in Ikoyi',
		specs: '2 bedrooms · 2 beds · 2 baths',
		guestsShort: '2 guests',
		guestLabel: '2 adults',
		dateRange: 'Jan 10 – 14',
		checkIn: 'Jan 10, 2026',
		checkOut: 'Jan 14, 2026',
		status: 'Completed',
		image: '/images/apartment-placeholder.jpg',
		booker: 'Adaeze Okonkwo',
		reference: 'BK-2026-002',
		price: 420,
		address: 'Block 20 Sangotedo street, Lekki, Lagos',
		host: { name: 'John Adeyemi', since: '5 years hosting', initials: 'J' },
		cancellationPolicy:
			'Cancel your booking free of charge up to 72 hours before check-in. After that, 50% cancellation fee applies.',
		houseRules: [
			'Check-in after 2:00 PM',
			'5 guests maximum',
			'No children allowed',
			'No parties or events',
			'Checkout before 12:00 PM',
			'No smoking',
		],
	},
];

export const TRIP_CATEGORY = {
	Active: 'active',
	Past: 'past',
	Cancelled: 'cancelled',
};

export function getTrip(id) {
	return TRIPS.find((t) => t.id === id) ?? TRIPS[0];
}
