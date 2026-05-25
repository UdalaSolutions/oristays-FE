export default function TabBar({ tabs, active, onChange }) {
	return (
		<div className='flex items-center gap-1'>
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => onChange(tab)}
					className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
						active === tab
							? 'bg-neutral-900 text-white'
							: 'text-neutral-500 hover:text-neutral-800'
					}`}>
					{tab}
				</button>
			))}
		</div>
	);
}
