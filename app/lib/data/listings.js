export const LISTINGS = [
	{
		id: '0',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '1',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '2',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '3',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '4',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '5',
		title: 'Modern loft apartment',
		location: '20 Sangotedo street, Lekki, Lagos',
		image: '/images/apartment-placeholder.jpg',
	},
];

export const APARTMENTS = [
	{
		id: '1',
		name: "Da'ville Apartment",
		badge: 'Standard',
		guests: 2,
		beds: 1,
		baths: 1,
		price: 70,
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '2',
		name: "Da'ville Apartment",
		badge: 'Standard',
		guests: 2,
		beds: 1,
		baths: 1,
		price: 70,
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '3',
		name: "Da'ville Apartment",
		badge: 'Premium',
		guests: 2,
		beds: 1,
		baths: 1,
		price: 70,
		image: '/images/apartment-placeholder.jpg',
	},
	{
		id: '4',
		name: "Da'ville Apartment",
		badge: 'Standard',
		guests: 2,
		beds: 1,
		baths: 1,
		price: 70,
		image: '/images/apartment-placeholder.jpg',
	},
];

export const METHOD_OPTIONS = [
	{
		value: 'import',
		label: 'Import listing from other travel site',
		description: 'Easily import your property from other travel site for quick setup.',
	},
	{
		value: 'manual',
		label: 'Create listing manually',
		description: 'Build your listing from scratch with our easy-to-follow, step-by-step guide.',
	},
];

export const UNIT_OPTIONS = [
	{
		value: 'one',
		label: 'One unit',
		description: 'One rentable unit, which can only be rented in its entirety',
	},
	{
		value: 'multiple',
		label: 'Multiple units',
		description:
			'Multiple rentable units, which are located at the same street address or building',
	},
];

export const PROPERTY_TYPES = [
	'Apartment',
	'House',
	'Villa',
	'Studio',
	'Penthouse',
	'Duplex',
	'Bungalow',
	'Townhouse',
];

export const BOOKING_OPTIONS = [
	{
		value: 'request',
		label: 'Request to book',
		description: 'Let guests request to book',
	},
	{
		value: 'instant',
		label: 'Instant book',
		description: 'Let guests book automatically',
	},
];

export const HOUSE_RULES = [
	{ id: 'smoking', label: 'Smoking allowed' },
	{ id: 'parties', label: 'Parties/events allowed' },
	{ id: 'pets', label: 'Pets allowed' },
	{ id: 'children', label: 'Children allowed' },
];

export const TIME_OPTIONS = [
	'12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
	'3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
	'6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
	'9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
	'12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
	'3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
	'6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
	'9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
];

export const AMENITY_CATEGORIES = ['Essentials', 'Comfort', 'Features', 'Safety'];

export const AMENITIES = [
	{ id: 'wifi', label: 'Wifi', category: 'Essentials', icon: 'Wifi' },
	{ id: 'ac', label: 'Air conditioning', category: 'Essentials', icon: 'Wind' },
	{ id: 'kitchen', label: 'Kitchen', category: 'Essentials', icon: 'UtensilsCrossed' },
	{ id: 'breakfast', label: 'Breakfast', category: 'Essentials', icon: 'Coffee' },
	{ id: 'parking', label: 'Free parking', category: 'Comfort', icon: 'Car' },
	{ id: 'workspace', label: 'Dedicated workspace', category: 'Comfort', icon: 'Monitor' },
	{ id: 'hottub', label: 'Hot tub', category: 'Comfort', icon: 'Thermometer' },
	{ id: 'gym', label: 'Gym', category: 'Features', icon: 'Dumbbell' },
	{ id: 'pool', label: 'Swimming pool', category: 'Features', icon: 'Waves' },
	{ id: 'camera', label: 'Exterior security camera', category: 'Safety', icon: 'Camera' },
	{ id: 'firstaid', label: 'First aid kit', category: 'Safety', icon: 'HeartPulse' },
	{ id: 'fire', label: 'Fire extinguisher', category: 'Safety', icon: 'Flame' },
];
