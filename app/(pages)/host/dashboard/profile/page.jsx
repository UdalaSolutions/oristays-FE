'use client';

import { useState } from 'react';
import {
	CircleUser,
	CreditCard,
	Bell,
	Lock,
	ScanFace,
	ChevronRight,
	ShieldCheck,
	X,
	ChevronDown,
	CircleCheck,
} from 'lucide-react';

const NIGERIAN_BANKS = [
	'Access Bank',
	'Citibank Nigeria',
	'Ecobank Nigeria',
	'Fidelity Bank',
	'First Bank of Nigeria',
	'First City Monument Bank',
	'Guaranty Trust Bank',
	'Heritage Bank',
	'Keystone Bank',
	'Kuda Bank',
	'Moniepoint',
	'OPay',
	'PalmPay',
	'Polaris Bank',
	'Providus Bank',
	'Stanbic IBTC Bank',
	'Standard Chartered Bank',
	'Sterling Bank',
	'Union Bank',
	'United Bank for Africa',
	'Unity Bank',
	'Wema Bank',
	'Zenith Bank',
];

const SUB_NAV = [
	{ key: 'personal', label: 'Personal details', icon: CircleUser },
	{ key: 'payout', label: 'Payout details', icon: CreditCard },
	{ key: 'notifications', label: 'Notifications', icon: Bell },
	{ key: 'security', label: 'Login & security', icon: Lock },
	{ key: 'identity', label: 'Identity verification', icon: ScanFace },
];

export default function ProfilePage() {
	const [section, setSection] = useState('personal');

	const [payoutData, setPayoutData] = useState(null);
	const [showPayoutModal, setShowPayoutModal] = useState(false);

	const [notifications, setNotifications] = useState({
		accountActivities: false,
		reservationNotifications: false,
		reminders: false,
	});

	function toggleNotification(key) {
		setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
	}

	function handlePayoutSave(data) {
		setPayoutData(data);
		setShowPayoutModal(false);
	}

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Profile</h1>
			</div>

			<div className='flex flex-1 overflow-hidden'>
				<div className='w-56 shrink-0 px-4 py-6 border-r border-neutral-100 overflow-auto'>
					<nav className='space-y-1'>
						{SUB_NAV.map(({ key, label, icon: Icon }) => {
							const active = section === key;
							return (
								<button
									key={key}
									onClick={() => setSection(key)}
									className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
										active
											? 'bg-neutral-100 font-semibold text-neutral-900'
											: 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
									}`}>
									<Icon
										size={16}
										strokeWidth={1.5}
										className={active ? 'text-neutral-900' : 'text-neutral-400'}
									/>
									{label}
								</button>
							);
						})}
					</nav>
				</div>

				<div className='flex-1 overflow-auto px-10 py-8'>
					{section === 'personal' && <PersonalDetailsSection />}
					{section === 'payout' && (
						<PayoutSection
							data={payoutData}
							onSetup={() => setShowPayoutModal(true)}
							onEdit={() => setShowPayoutModal(true)}
						/>
					)}
					{section === 'notifications' && (
						<NotificationsSection
							notifications={notifications}
							onToggle={toggleNotification}
						/>
					)}
					{section === 'security' && <SecuritySection />}
					{section === 'identity' && <IdentitySection />}
				</div>
			</div>

			{showPayoutModal && (
				<PayoutModal
					initial={payoutData}
					onClose={() => setShowPayoutModal(false)}
					onSave={handlePayoutSave}
				/>
			)}
		</>
	);
}

function SectionHeader({ title }) {
	return (
		<>
			<h2 className='text-lg font-bold text-neutral-900 mb-1'>{title}</h2>
			<div className='border-b border-neutral-100 mb-6' />
		</>
	);
}

function ProfileRow({ label, value, last }) {
	return (
		<button
			type='button'
			className={`w-full text-left flex items-center justify-between py-4 ${
				!last ? 'border-b border-neutral-100' : ''
			}`}>
			<div>
				<p className='text-sm font-medium text-neutral-900'>{label}</p>
				<p className='text-sm text-neutral-400 mt-0.5'>{value}</p>
			</div>
			<ChevronRight size={18} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
		</button>
	);
}

function ToggleRow({ label, checked, onChange, last }) {
	return (
		<div
			className={`flex items-center justify-between py-4 ${
				!last ? 'border-b border-neutral-100' : ''
			}`}>
			<p className='text-sm font-medium text-neutral-900'>{label}</p>
			<button
				onClick={onChange}
				role='switch'
				aria-checked={checked}
				className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
					checked ? 'bg-neutral-900' : 'bg-neutral-300'
				}`}>
				<span
					className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
						checked ? 'translate-x-5' : 'translate-x-0'
					}`}
				/>
			</button>
		</div>
	);
}

function PersonalDetailsSection() {
	return (
		<div className='max-w-2xl'>
			<SectionHeader title='Personal details' />

			<div className='flex items-start justify-between mb-4'>
				<div>
					<div className='w-16 h-16 rounded-full bg-brand-dark flex items-center justify-center mb-3'>
						<span className='text-xl font-bold text-white'>A</span>
					</div>
					<div className='flex items-center gap-1.5 text-green-600'>
						<ShieldCheck size={15} strokeWidth={1.5} />
						<p className='text-sm font-medium'>Identity verified</p>
					</div>
				</div>
				<button
					type='button'
					className='px-4 py-2 text-sm font-semibold text-primary bg-primary-light rounded-xl hover:bg-primary/10 transition-colors'>
					Change photo
				</button>
			</div>

			<div className='mt-6'>
				<ProfileRow label='Name' value='Adaeze Okonkwo' />
				<ProfileRow label='Email address' value='adaezeokon@gmail.com' />
				<ProfileRow label='Phone number' value='+234 802-233-4455' />
				<ProfileRow label='Gender' value='Not selected' />
				<ProfileRow label='Residential address' value='Add your address' last />
			</div>
		</div>
	);
}

function PayoutSection({ data, onSetup, onEdit }) {
	if (!data) {
		return (
			<div className='max-w-2xl'>
				<SectionHeader title='Payout details' />
				<p className='text-base font-bold text-neutral-900 mb-1'>How you&apos;ll get paid</p>
				<p className='text-sm text-neutral-400 mb-6'>
					Add a payment method to receive your earnings.
				</p>
				<button
					onClick={onSetup}
					className='px-10 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors'>
					Set up
				</button>
			</div>
		);
	}

	return (
		<div className='max-w-2xl'>
			<SectionHeader title='Payout details' />
			<div className='border-b border-neutral-100'>
				<PayoutDataRow label='Bank name' value={data.bankName} />
				<PayoutDataRow label='Account name' value={data.accountName} />
				<PayoutDataRow label='Account number' value={data.accountNumber} />
				<PayoutDataRow label='Address' value={data.address} last />
			</div>
			<div className='flex justify-end mt-5'>
				<button
					onClick={onEdit}
					className='px-6 py-2.5 text-sm font-semibold text-primary bg-primary-light rounded-xl hover:bg-primary/10 transition-colors'>
					Edit
				</button>
			</div>
		</div>
	);
}

function PayoutDataRow({ label, value, last }) {
	return (
		<div className={`py-4 ${!last ? 'border-b border-neutral-100' : ''}`}>
			<p className='text-sm font-medium text-neutral-900'>{label}</p>
			<p className='text-sm text-neutral-400 mt-0.5'>{value}</p>
		</div>
	);
}

function NotificationsSection({ notifications, onToggle }) {
	return (
		<div className='max-w-2xl'>
			<SectionHeader title='Notifications' />
			<ToggleRow
				label='Account activities'
				checked={notifications.accountActivities}
				onChange={() => onToggle('accountActivities')}
			/>
			<ToggleRow
				label='Reservation notifications'
				checked={notifications.reservationNotifications}
				onChange={() => onToggle('reservationNotifications')}
			/>
			<ToggleRow
				label='Reminders'
				checked={notifications.reminders}
				onChange={() => onToggle('reminders')}
				last
			/>
		</div>
	);
}

function SecuritySection() {
	return (
		<div className='max-w-2xl'>
			<SectionHeader title='Login & security' />
			<button
				type='button'
				className='w-full text-left flex items-center justify-between py-4 border-b border-neutral-100'>
				<p className='text-sm font-medium text-neutral-900'>Password</p>
				<ChevronRight size={18} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
			</button>
			<button
				type='button'
				className='w-full text-left flex items-center justify-between py-4'>
				<p className='text-sm font-medium text-neutral-900'>Device management</p>
				<ChevronRight size={18} strokeWidth={1.5} className='text-neutral-400 shrink-0' />
			</button>
		</div>
	);
}

function IdentitySection() {
	return (
		<div className='max-w-2xl'>
			<SectionHeader title='Identity verification' />
			<p className='text-base font-bold text-neutral-900 mb-2'>
				Complete verification on mobile
			</p>
			<p className='text-sm text-neutral-400 mb-6'>
				We&apos;ll send a secure link to your email. Use your phone to open the link and
				complete your verification.
			</p>
			<button
				type='button'
				className='px-8 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors'>
				Send verification link
			</button>
		</div>
	);
}

function PayoutModal({ initial, onClose, onSave }) {
	const [bankName, setBankName] = useState(initial?.bankName ?? '');
	const [accountNumber, setAccountNumber] = useState(initial?.accountNumber ?? '');
	const [address, setAddress] = useState(initial?.address ?? '');
	const [zipCode, setZipCode] = useState(initial?.zipCode ?? '');

	const verifiedName = accountNumber.length === 10 ? 'John Isaiah Adeyemi' : null;
	const canSave = bankName && accountNumber.length === 10 && address && zipCode;

	function handleSave() {
		if (!canSave) return;
		onSave({
			bankName,
			accountName: 'John Adeyemi',
			accountNumber,
			address: `${address}, ${zipCode}`,
			zipCode,
		});
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
			<div className='bg-white rounded-2xl shadow-modal w-full max-w-md mx-4 overflow-hidden'>
				<div className='px-8 py-6'>
					<div className='flex items-center justify-between mb-6'>
						<p className='text-base font-bold text-neutral-900'>Payout details</p>
						<button
							onClick={onClose}
							className='text-neutral-400 hover:text-neutral-700 transition-colors'>
							<X size={18} strokeWidth={1.5} />
						</button>
					</div>

					<div className='space-y-5'>
						<div>
							<label className='block text-sm text-neutral-600 mb-2'>Bank name</label>
							<div className='relative'>
								<select
									value={bankName}
									onChange={(e) => setBankName(e.target.value)}
									className='w-full appearance-none border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary bg-white pr-10 cursor-pointer'>
									<option value=''>Select option</option>
									{NIGERIAN_BANKS.map((b) => (
										<option key={b} value={b}>
											{b}
										</option>
									))}
								</select>
								<ChevronDown
									size={16}
									strokeWidth={1.5}
									className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm text-neutral-600 mb-2'>
								Account number
							</label>
							<input
								type='text'
								inputMode='numeric'
								maxLength={10}
								value={accountNumber}
								onChange={(e) =>
									setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
								}
								placeholder='Enter account number'
								className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							/>
							{verifiedName && (
								<div className='flex items-center gap-1.5 mt-1.5 text-green-600'>
									<CircleCheck size={14} strokeWidth={1.5} />
									<p className='text-sm font-medium'>{verifiedName}</p>
								</div>
							)}
						</div>

						<div>
							<label className='block text-sm text-neutral-600 mb-2'>Address</label>
							<input
								type='text'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								placeholder='Add address associated with this account'
								className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							/>
						</div>

						<div>
							<label className='block text-sm text-neutral-600 mb-2'>ZIP code</label>
							<input
								type='text'
								value={zipCode}
								onChange={(e) => setZipCode(e.target.value)}
								placeholder='Enter postal code'
								className='w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end px-8 py-5'>
					<button
						onClick={handleSave}
						disabled={!canSave}
						className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
							canSave
								? 'bg-primary text-white hover:bg-primary-hover'
								: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
						}`}>
						Save details
					</button>
				</div>
			</div>
		</div>
	);
}
