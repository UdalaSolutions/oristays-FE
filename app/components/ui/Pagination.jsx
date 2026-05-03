import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	return (
		<div className='flex items-end justify-end gap-4'>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='w-8 h-8 flex items-center justify-center  text-primary  disabled:opacity-40 disabled:cursor-not-allowed'>
				<ArrowLeft />
			</button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
						page === currentPage ?
							'bg-[#B5451B1A] text-primary font-bold'
						:	'text-[#6B7280] hover:bg-neutral-100'
					}`}>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='w-8 h-8 flex items-center justify-center text-primary hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed'>
				<ArrowRight />
			</button>
		</div>
	);
}
