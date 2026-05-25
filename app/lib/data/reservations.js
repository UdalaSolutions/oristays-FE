export const RESERVATION_TABS = [
	'All',
	'Today',
	'Ongoing',
	'Upcoming',
	'Cancelled',
	'Completed',
];

export const STATUS_STYLES = {
	Today: 'bg-primary-light text-primary border border-primary/40',
	Ongoing: 'bg-green-50 text-green-600 border border-green-200',
	Upcoming: 'bg-purple-50 text-purple-600 border border-purple-200',
	Cancelled: 'bg-red-50 text-red-500 border border-red-200',
	Completed: 'bg-neutral-100 text-neutral-500 border border-neutral-200',
};

export function getStatusStyle(status) {
	return STATUS_STYLES[status] ?? 'bg-neutral-100 text-neutral-500 border border-neutral-200';
}

export function getReservationBySlug(slug) {
	return RESERVATIONS.find((r) => r.slug === slug) ?? RESERVATIONS[0];
}

export const RESERVATIONS = [
	{
		slug: '0',
		id: 'BK-2026-001',
		title: 'Modern loft apartment',
		subtitle: 'Entire studio apartment',
		specs: '1 bedroom · 1 bed · 1 bath',
		location: '20 Sangotedo street, Lekki, Lagos',
		checkIn: 'Mar 25, 2026',
		checkOut: 'Mar 28, 2026',
		guests: 2,
		guestLabel: '2 adults, 1 child',
		total: 210,
		nights: 3,
		pricePerNight: 70,
		booker: 'Adaeze Okonkwo',
		status: 'Today',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		slug: '1',
		id: 'BK-2026-002',
		title: 'Luxury penthouse suite',
		subtitle: 'Entire penthouse in Lekki',
		specs: '2 bedrooms · 2 beds · 2 baths',
		location: '20 Sangotedo street, Lekki, Lagos',
		checkIn: 'Mar 25, 2026',
		checkOut: 'Mar 28, 2026',
		guests: 2,
		guestLabel: '2 adults',
		total: 210,
		nights: 3,
		pricePerNight: 70,
		booker: 'Adaeze Okonkwo',
		status: 'Ongoing',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		slug: '2',
		id: 'BK-2026-003',
		title: 'Luxury penthouse suite',
		subtitle: 'Entire penthouse in Surulere',
		specs: '2 bedrooms · 2 beds · 2 baths',
		location: '12 Tejuosho street, Surulere, Lagos',
		checkIn: 'Mar 25, 2026',
		checkOut: 'Mar 28, 2026',
		guests: 2,
		guestLabel: '2 adults',
		total: 210,
		nights: 3,
		pricePerNight: 70,
		booker: 'Adaeze Okonkwo',
		status: 'Upcoming',
		image: '/images/apartment-placeholder.jpg',
	},
];
