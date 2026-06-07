export const CHART_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const CHART_HOMES = [65, 42, 50, 35, 45, 58, 62, 52, 60, 66, 72, 60];
export const CHART_RIDES = [22, 32, 42, 55, 65, 82, 72, 56, 65, 55, 48, 38];

export const ACTIVITY_FEED = [
	{ id: 1, type: 'booking', title: 'New booking', property: 'Royal Villa Ikoyi', guest: 'Adaeze O.', duration: '3 nights', time: '2 mins' },
	{ id: 2, type: 'listing', title: 'New listing', property: 'Happy Homes Lekki', guest: 'Adaeze O.', duration: '3 nights', time: '5 mins' },
	{ id: 3, type: 'booking', title: 'New booking', property: 'Royal Villa Ikoyi', guest: 'Adaeze O.', duration: '3 nights', time: '2 mins' },
	{ id: 4, type: 'booking', title: 'New booking', property: 'Royal Villa Ikoyi', guest: 'Adaeze O.', duration: '3 nights', time: '2 mins' },
];

export const RECENT_BOOKINGS = [
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦250,000', status: 'Confirmed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦250,000', status: 'Cancelled' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦250,000', status: 'Confirmed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦250,000', status: 'Cancelled' },
];

export const RECENT_RIDES = [
	{ id: 'RD-2026-001', type: 'Airport pick up', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Cancelled' },
	{ id: 'RD-2026-001', type: 'Airport pick up', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Cancelled' },
	{ id: 'RD-2026-001', type: 'Airport pick up', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
	{ id: 'RD-2026-001', type: 'Airport pick up', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
];

export const ADMIN_HOME_BOOKINGS = [
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦225,000', status: 'Ongoing' },
	{ id: 'BK-2026-001', property: '1bed apartment in Yaba', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 2, amount: '₦150,000', status: 'Ongoing' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 4, amount: '₦320,000', status: 'Confirmed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 2, amount: '₦300,000', status: 'Ongoing' },
	{ id: 'BK-2026-001', property: 'Luxury suite in Lekki', guest: 'Marcus Osei', checkIn: 'Mar 30, 2027', nights: 4, amount: '₦160,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 3, amount: '₦400,000', status: 'Confirmed' },
	{ id: 'BK-2026-001', property: '1bed apartment in Yaba', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 2, amount: '₦115,000', status: 'Confirmed' },
	{ id: 'BK-2026-001', property: 'Luxury suite in Lekki', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 4, amount: '₦120,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Marcus Osei', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦375,000', status: 'Cancelled' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 2, amount: '₦200,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Cozy rooftop in Ikoyi', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 5, amount: '₦135,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 1, amount: '₦75,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Modern loft apartment', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 3, amount: '₦155,000', status: 'Completed' },
	{ id: 'BK-2026-001', property: 'Cozy rooftop in Ikoyi', guest: 'Adaeze Okonkwo', checkIn: 'Mar 30, 2027', nights: 3, amount: '₦310,000', status: 'Cancelled' },
];

export const ADMIN_RIDES = [
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Cancelled' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Cancelled' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Ongoing' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Cancelled' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Completed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
	{ id: 'RD-2026-001', type: 'Full day hire', guest: 'Adaeze Okonkwo', driver: 'John Adeyemi', amount: '₦45,000', status: 'Confirmed' },
];

export const ADMIN_LISTINGS = [
	{ id: '1', name: 'Luxury 2bed in Victoria Island', address: '21 Green gate estate, Victoria Island, Lagos', host: 'Adebayo Johnson', price: '₦115,000', date: '20/04/2026', status: 'Pending' },
	{ id: '2', name: 'Luxury 2bed in Victoria Island', address: '21 Green gate estate, Victoria Island, Lagos', host: 'Adebayo Johnson', price: '₦115,000', date: '20/04/2026', status: 'Pending' },
	{ id: '3', name: 'Luxury 2bed in Victoria Island', address: '21 Green gate estate, Victoria Island, Lagos', host: 'Adebayo Johnson', price: '₦115,000', date: '20/04/2026', status: 'Rejected' },
	{ id: '4', name: 'Cozy 1bed in yaba', address: '45 Herbert Marcaulay road, Yaba, Lagos', host: 'John Adeyemi', price: '₦45,000', date: '20/04/2026', status: 'Approved' },
	{ id: '5', name: 'Cozy 1bed in yaba', address: '45 Herbert Marcaulay road, Yaba, Lagos', host: 'John Adeyemi', price: '₦45,000', date: '20/04/2026', status: 'Approved' },
	{ id: '6', name: 'Cozy 1bed in yaba', address: '45 Herbert Marcaulay road, Yaba, Lagos', host: 'John Adeyemi', price: '₦45,000', date: '20/04/2026', status: 'Approved' },
	{ id: '7', name: 'Cozy 1bed in yaba', address: '45 Herbert Marcaulay road, Yaba, Lagos', host: 'John Adeyemi', price: '₦45,000', date: '20/04/2026', status: 'Approved' },
	{ id: '8', name: 'Cozy 1bed in yaba', address: '45 Herbert Marcaulay road, Yaba, Lagos', host: 'John Adeyemi', price: '₦45,000', date: '20/04/2026', status: 'Approved' },
];

export const HOST_LISTINGS = [
	{ id: '1', name: 'Modern loft villa by Royal..', address: 'Block b2, Lekki phase 1, Lagos', price: '$75', date: 'Mar 30, 2026', status: 'Approved' },
	{ id: '2', name: 'Modern loft villa by Royal..', address: 'Block b2, Lekki phase 1, Lagos', price: '$75', date: 'Mar 30, 2026', status: 'Rejected' },
	{ id: '3', name: 'Modern loft villa by Royal..', address: 'Block b2, Lekki phase 1, Lagos', price: '$75', date: 'Mar 30, 2026', status: 'Pending' },
];

export const ADMIN_HOSTS = [
	{ id: '1', name: 'John Adeyemi', email: 'johnade@gmail.com', phone: '+234 802 345 6789', location: 'Lagos, Nigeria', since: 'March 2025', status: 'Verified', listings: 3 },
	{ id: '2', name: 'Adebayo Johnson', email: 'adebayo@gmail.com', phone: '+234 803 456 7890', location: 'Abuja, Nigeria', since: 'January 2025', status: 'Verified', listings: 2 },
	{ id: '3', name: 'Amaka Eze', email: 'amaka@gmail.com', phone: '+234 804 567 8901', location: 'Lagos, Nigeria', since: 'June 2025', status: 'Pending', listings: 1 },
];

export const ADMIN_CARS = [
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'SUV', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'In Trip' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'Executive saloon', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'In Trip' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'Electric car', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'Service' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'Executive saloon', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'Available' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'Executive saloon', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'Available' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'Electric car', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'Available' },
	{ id: 'Car-001', regNumber: 'ABJ-345ZG', category: 'SUV', model: 'Toyota Corolla', driver: 'John Adeyemi', capacity: '4 seats', status: 'Available' },
];

export function getStatusStyle(status) {
	const styles = {
		Confirmed: 'text-green-600 bg-green-50',
		Cancelled: 'text-red-500 bg-red-50',
		Ongoing: 'text-blue-600 bg-blue-50',
		Completed: 'text-neutral-500 bg-neutral-100',
		Approved: 'text-green-600 bg-green-50',
		Rejected: 'text-red-500 bg-red-50',
		Pending: 'text-orange-500 bg-orange-50',
		'In Trip': 'text-blue-600 bg-blue-50',
		Service: 'text-orange-500 bg-orange-50',
		Available: 'text-green-600 bg-green-50',
		Verified: 'text-green-600 bg-green-50 border border-green-200',
	};
	return styles[status] ?? 'text-neutral-500 bg-neutral-100';
}
