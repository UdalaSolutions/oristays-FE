import Link from 'next/link';
import { ADMIN_HOSTS, getStatusStyle } from '@/app/lib/data/admin';

function StatusBadge({ status }) {
	return (
		<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusStyle(status)}`}>
			{status}
		</span>
	);
}

export default function AdminHostsPage() {
	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>Hosts</h1>
			</div>

			<div className='flex-1 overflow-auto px-8 py-6'>
				<div className='border border-neutral-100 rounded-2xl'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-neutral-100'>
								{['Host', 'Email', 'Phone', 'Location', 'Member since', 'Listings', 'Status'].map((h) => (
									<th key={h} className='px-5 py-3 text-left text-xs font-medium text-neutral-400'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{ADMIN_HOSTS.map((host) => (
								<tr key={host.id} className='border-b border-neutral-50 hover:bg-neutral-50/50'>
									<td className='px-5 py-3.5'>
										<div className='flex items-center gap-2.5'>
											<div className='w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center shrink-0'>
												<span className='text-white text-xs font-bold'>{host.name[0]}</span>
											</div>
											<Link href={`/admin/hosts/${host.id}`} className='text-sm font-medium text-neutral-900 hover:text-primary'>
												{host.name}
											</Link>
										</div>
									</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{host.email}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{host.phone}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{host.location}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{host.since}</td>
									<td className='px-5 py-3.5 text-sm text-neutral-600'>{host.listings}</td>
									<td className='px-5 py-3.5'><StatusBadge status={host.status} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
