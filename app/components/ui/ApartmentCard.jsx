import Link from 'next/link';
import Image from 'next/image';

const TIER_STYLES = {
	Standard: 'bg-white text-neutral-700',
	Premium: 'bg-white text-neutral-700',
	Luxury: 'bg-white text-neutral-700',
};

export default function ApartmentCard({ apartment }) {
	const {
		id,
		image,
		tier,
		name,
		guests,
		bedrooms,
		beds,
		baths,
		price,
		rating,
		slug,
	} = apartment;

	return (
		<Link
			href={`/apartments/${slug || id}`}
			className='group block border border-gray-50 rounded-b-xl'>
			<div className='relative aspect-4/3 rounded-tr-xl rounded-tl-xl overflow-hidden bg-neutral-100 mb-3'>
				{image ?
					<Image
						src={image}
						alt={name}
						fill
						sizes='(max-width: 768px) 50vw, 25vw'
						className='object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				:	<div className='w-full h-full bg-neutral-200' />}
				{tier && (
					<span
						className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${TIER_STYLES[tier] || TIER_STYLES.Standard}`}>
						{tier}
					</span>
				)}
			</div>

			<div className='py-4 px-3 flex flex-col gap-2 '>
				<h3 className='text-sm font-semibold text-neutral-900 mb-0.5 group-hover:text-primary transition-colors'>
					{name}
				</h3>
				<p className='text-xs text-neutral-500 mb-2'>
					{[
						guests && `${guests} guests`,
						bedrooms && `${bedrooms} bedroom`,
						beds && `${beds} bed`,
						baths && `${baths} bath`,
					]
						.filter(Boolean)
						.join(' · ')}
				</p>
				<div className='flex items-center justify-between'>
					<div>
						<span className='text-sm font-bold text-neutral-900'>${price}</span>
						<span className='text-xs text-neutral-500'>/night</span>
					</div>
					{rating && (
						<span className='flex items-center gap-1 text-xs text-neutral-600'>
							<svg
								className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400'
								viewBox='0 0 20 20'>
								<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
							</svg>
							{rating}
						</span>
					)}
				</div>
				<p className='text-xs text-neutral-400 mt-1'>
					✓ All-in pricing. No hidden fees.
				</p>
			</div>
		</Link>
	);
}
