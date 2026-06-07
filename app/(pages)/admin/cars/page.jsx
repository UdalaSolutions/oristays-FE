'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ADMIN_CARS, getStatusStyle } from '@/app/lib/data/admin';

function StatusBadge({ status }) {
	return (
		<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(status)}`}>
			{status}
		</span>
	);
}

export default function AdminCarsPage() {
	const [cars] = useState(ADMIN_CARS);

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100 flex items-center justify-between'>
				<h1 className='text-xl font-bold text-neutral-900'>Cars</h1>
				<button className='flex items-center gap-2 bg-brand-dark text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-brand-dark/90 transition-colors'>
					<Plus size={16} strokeWidth={2} />
					Add car
				</button>
			</div>

			<div className='flex-1 overflow-auto px-8 py-6'>
				<div className='border border-neutral-100 rounded-2xl'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-neutral-100'>
								{['Car ID', 'Registration', 'Category', 'Model', 'Driver', 'Capacity', 'Status'].map((h) => (
									<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{cars.map((car, i) => (
								<tr key={i} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
									<td className='px-5 py-3.5 text-sm font-medium text-neutral-900'>{car.id}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{car.regNumber}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{car.category}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{car.model}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{car.driver}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-700'>{car.capacity}</td>
									<td className='px-5 py-3.5'><StatusBadge status={car.status} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
