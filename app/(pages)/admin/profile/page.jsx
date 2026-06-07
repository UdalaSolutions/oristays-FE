'use client';

import { useState } from 'react';
import { CircleUser, Bell, Lock, ChevronRight } from 'lucide-react';

const SUB_NAV = [
	{ key: 'personal', label: 'Personal details', icon: CircleUser },
	{ key: 'notifications', label: 'Notifications', icon: Bell },
	{ key: 'security', label: 'Login & security', icon: Lock },
];

function Toggle({ on, onToggle }) {
	return (
		<button
			onClick={onToggle}
			className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${on ? 'bg-neutral-700' : 'bg-neutral-300'}`}>
			<span
				className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`}
			/>
		</button>
	);
}

function SectionRow({ label, value, onClick, chevron }) {
	const inner = (
		<>
			<div className='flex-1 min-w-0'>
				<p className='text-sm font-medium text-neutral-900'>{label}</p>
				{value && <p className='text-sm text-neutral-400 mt-0.5'>{value}</p>}
			</div>
			{chevron && <ChevronRight size={16} strokeWidth={1.5} className='text-neutral-400 shrink-0' />}
		</>
	);

	if (onClick) {
		return (
			<button onClick={onClick} className='w-full flex items-center gap-3 py-4 border-b border-neutral-100 text-left hover:bg-neutral-50/50 px-1 -mx-1 rounded-lg transition-colors'>
				{inner}
			</button>
		);
	}
	return (
		<div className='flex items-center gap-3 py-4 border-b border-neutral-100'>
			{inner}
		</div>
	);
}

function PersonalDetailsSection() {
	return (
		<div>
			<h2 className='text-base font-bold text-neutral-900 mb-5'>Personal details</h2>

			<div className='flex items-center justify-between mb-5 pb-5 border-b border-neutral-100'>
				<div className='w-16 h-16 rounded-full bg-brand-dark flex items-center justify-center shrink-0'>
					<span className='text-white text-2xl font-bold'>A</span>
				</div>
				<button className='text-sm font-medium text-primary bg-primary-light px-4 py-2 rounded-xl hover:opacity-90 transition-opacity'>
					Change photo
				</button>
			</div>

			<SectionRow label='Name' value='Adaeze Okonkwo' chevron onClick={() => {}} />
			<SectionRow label='Email address' value='adaezeokon@gmail.com' chevron onClick={() => {}} />
		</div>
	);
}

function NotificationsSection() {
	const [notifs, setNotifs] = useState({
		account: true,
		reservation: true,
		reminders: true,
	});

	function toggle(key) {
		setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
	}

	return (
		<div>
			<h2 className='text-base font-bold text-neutral-900 mb-5'>Notifications</h2>

			<div className='flex items-center justify-between py-4 border-b border-neutral-100'>
				<p className='text-sm font-medium text-neutral-900'>Account activities</p>
				<Toggle on={notifs.account} onToggle={() => toggle('account')} />
			</div>
			<div className='flex items-center justify-between py-4 border-b border-neutral-100'>
				<p className='text-sm font-medium text-neutral-900'>Reservation notifications</p>
				<Toggle on={notifs.reservation} onToggle={() => toggle('reservation')} />
			</div>
			<div className='flex items-center justify-between py-4 border-b border-neutral-100'>
				<p className='text-sm font-medium text-neutral-900'>Reminders</p>
				<Toggle on={notifs.reminders} onToggle={() => toggle('reminders')} />
			</div>
		</div>
	);
}

function SecuritySection() {
	return (
		<div>
			<h2 className='text-base font-bold text-neutral-900 mb-5'>Login & security</h2>
			<SectionRow label='Password' chevron onClick={() => {}} />
			<SectionRow label='Device management' chevron onClick={() => {}} />
		</div>
	);
}

const SECTIONS = {
	personal: PersonalDetailsSection,
	notifications: NotificationsSection,
	security: SecuritySection,
};

export default function AdminProfilePage() {
	const [section, setSection] = useState('personal');
	const ActiveSection = SECTIONS[section];

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Profile</h1>
			</div>

			<div className='flex flex-1 overflow-hidden'>
				<div className='w-56 shrink-0 border-r border-neutral-100 px-4 py-6 space-y-1'>
					{SUB_NAV.map(({ key, label, icon: Icon }) => (
						<button
							key={key}
							onClick={() => setSection(key)}
							className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
								section === key
									? 'bg-neutral-100 text-neutral-900 font-semibold'
									: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
							}`}>
							<Icon size={16} strokeWidth={1.5} />
							{label}
						</button>
					))}
				</div>

				<div className='flex-1 overflow-auto px-10 py-8 max-w-2xl'>
					<ActiveSection />
				</div>
			</div>
		</>
	);
}
