'use client';

import Link from 'next/link';
import { Bell, CreditCard, Home, Car, LayoutGrid, TrendingUp, TrendingDown } from 'lucide-react';
import {
	CHART_MONTHS, CHART_HOMES, CHART_RIDES,
	ACTIVITY_FEED, RECENT_BOOKINGS, RECENT_RIDES, getStatusStyle,
} from '@/app/lib/data/admin';

const STATS = [
	{ label: 'Total Revenue', value: '₦137,000', icon: CreditCard, iconBg: 'bg-orange-100 text-orange-500', trend: '+4.7%', up: true },
	{ label: 'Active Booking', value: '955', icon: Home, iconBg: 'bg-green-100 text-green-600', trend: '+4.7%', up: true },
	{ label: 'Total Rides', value: '230', icon: Car, iconBg: 'bg-purple-100 text-purple-600', trend: '-4.7%', up: false },
	{ label: 'Total Listings', value: '1,120', icon: LayoutGrid, iconBg: 'bg-rose-100 text-rose-500', viewAll: true },
];

const W = 560, H = 200;
const PAD = { t: 10, r: 10, b: 30, l: 38 };
const cw = W - PAD.l - PAD.r;
const ch = H - PAD.t - PAD.b;
const Y_GRIDS = [0, 20, 40, 60, 80, 100];

function px(i) { return PAD.l + (i / 11) * cw; }
function py(v) { return PAD.t + (1 - v / 100) * ch; }

function smoothLine(data) {
	const pts = data.map((v, i) => [px(i), py(v)]);
	let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const [x1, y1] = pts[i];
		const [x2, y2] = pts[i + 1];
		const cpx = (x2 - x1) * 0.4;
		d += ` C ${(x1 + cpx).toFixed(1)},${y1.toFixed(1)} ${(x2 - cpx).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
	}
	return d;
}

function areaPath(data) {
	const line = smoothLine(data);
	return `${line} L ${px(11).toFixed(1)},${(PAD.t + ch).toFixed(1)} L ${px(0).toFixed(1)},${(PAD.t + ch).toFixed(1)} Z`;
}

function RevenueChart() {
	return (
		<svg viewBox={`0 0 ${W} ${H}`} className='w-full' style={{ height: 220 }}>
			<defs>
				<linearGradient id='a-homes' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='0%' stopColor='#818cf8' stopOpacity='0.3' />
					<stop offset='100%' stopColor='#818cf8' stopOpacity='0.02' />
				</linearGradient>
				<linearGradient id='a-rides' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='0%' stopColor='#4ade80' stopOpacity='0.35' />
					<stop offset='100%' stopColor='#4ade80' stopOpacity='0.02' />
				</linearGradient>
			</defs>

			{Y_GRIDS.map((v) => (
				<line key={v} x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)} stroke='#f0f0f0' strokeWidth='1' />
			))}
			{Y_GRIDS.map((v) => (
				<text key={v} x={PAD.l - 5} y={py(v) + 4} textAnchor='end' fontSize='10' fill='#9ca3af'>
					{v}
				</text>
			))}

			<path d={areaPath(CHART_RIDES)} fill='url(#a-rides)' />
			<path d={areaPath(CHART_HOMES)} fill='url(#a-homes)' />
			<path d={smoothLine(CHART_RIDES)} fill='none' stroke='#4ade80' strokeWidth='2' />
			<path d={smoothLine(CHART_HOMES)} fill='none' stroke='#818cf8' strokeWidth='2' />

			{CHART_HOMES.map((v, i) => (
				<circle key={i} cx={px(i).toFixed(1)} cy={py(v).toFixed(1)} r='3' fill='white' stroke='#818cf8' strokeWidth='1.5' />
			))}
			{CHART_RIDES.map((v, i) => (
				<circle key={i} cx={px(i).toFixed(1)} cy={py(v).toFixed(1)} r='3' fill='white' stroke='#4ade80' strokeWidth='1.5' />
			))}

			{CHART_MONTHS.map((m, i) => (
				<text key={m} x={px(i).toFixed(1)} y={H - 6} textAnchor='middle' fontSize='10' fill='#9ca3af'>
					{m}
				</text>
			))}
		</svg>
	);
}

function StatusBadge({ status }) {
	return (
		<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(status)}`}>
			{status}
		</span>
	);
}

export default function AdminDashboardPage() {
	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100 flex items-center justify-between'>
				<h1 className='text-xl font-bold text-neutral-900'>Dashboard</h1>
				<Bell size={20} strokeWidth={1.5} className='text-neutral-500' />
			</div>

			<div className='flex-1 overflow-auto px-8 py-6 space-y-6'>
				<div className='grid grid-cols-4 gap-4'>
					{STATS.map(({ label, value, icon: Icon, iconBg, trend, up, viewAll }) => (
						<div key={label} className='border border-neutral-100 rounded-2xl p-5'>
							<div className='flex items-start justify-between mb-3'>
								<p className='text-sm text-neutral-500'>{label}</p>
								<div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
									<Icon size={17} strokeWidth={1.5} />
								</div>
							</div>
							<p className='text-2xl font-bold text-neutral-900 mb-2'>{value}</p>
							{viewAll ? (
								<Link href='/admin/listings' className='flex items-center gap-1 text-xs font-medium text-primary'>
									View all <span>→</span>
								</Link>
							) : (
								<div className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
									{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
									{trend} <span className='text-neutral-400 font-normal'>vs last week</span>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='grid grid-cols-[1fr_300px] gap-4'>
					<div className='border border-neutral-100 rounded-2xl p-5'>
						<p className='text-sm font-bold text-neutral-900 mb-4'>Revenue Summary</p>
						<RevenueChart />
						<div className='flex items-center gap-4 mt-3 justify-center'>
							<div className='flex items-center gap-1.5'>
								<div className='w-3 h-3 rounded-full bg-indigo-400' />
								<span className='text-xs text-neutral-500'>Homes</span>
							</div>
							<div className='flex items-center gap-1.5'>
								<div className='w-3 h-3 rounded-full bg-green-400' />
								<span className='text-xs text-neutral-500'>Rides</span>
							</div>
						</div>
					</div>

					<div className='border border-neutral-100 rounded-2xl p-5'>
						<p className='text-sm font-bold text-neutral-900 mb-4'>Activity feed</p>
						<div className='space-y-4'>
							{ACTIVITY_FEED.map((item) => (
								<div key={item.id} className='flex items-start gap-3'>
									<div className='w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center shrink-0'>
										<Home size={14} strokeWidth={1.5} className='text-primary' />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-xs text-neutral-900'>
											<span className='font-bold'>{item.title}</span>
											<span className='text-neutral-400 ml-1.5'>{item.property}</span>
										</p>
										<p className='text-xs text-neutral-400 mt-0.5'>
											{item.guest} · {item.duration}
										</p>
									</div>
									<p className='text-xs text-neutral-400 shrink-0'>{item.time}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='border border-neutral-100 rounded-2xl'>
					<div className='flex items-center justify-between px-5 py-4 border-b border-neutral-100'>
						<p className='text-sm font-bold text-neutral-900'>Recent Bookings</p>
						<Link href='/admin/bookings' className='text-sm font-medium text-primary'>
							View all
						</Link>
					</div>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-neutral-100'>
								{['Booking ID', 'Property', 'Guest', 'Check in', 'Nights', 'Amount', 'Status'].map((h) => (
									<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{RECENT_BOOKINGS.map((b, i) => (
								<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.id}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.property}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.guest}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.checkIn}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.nights}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{b.amount}</td>
									<td className='px-5 py-3.5'><StatusBadge status={b.status} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='border border-neutral-100 rounded-2xl'>
					<div className='flex items-center justify-between px-5 py-4 border-b border-neutral-100'>
						<p className='text-sm font-bold text-neutral-900'>Recent Rides</p>
						<Link href='/admin/bookings' className='text-sm font-medium text-primary'>
							View all
						</Link>
					</div>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-neutral-100'>
								{['Ride ID', 'Ride type', 'Guest', 'Driver', 'Amount', 'Status'].map((h) => (
									<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{RECENT_RIDES.map((r, i) => (
								<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.id}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.type}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.guest}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.driver}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{r.amount}</td>
									<td className='px-5 py-3.5'><StatusBadge status={r.status} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
