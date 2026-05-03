import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
			className='group block border border-gray-50 rounded-xl'>
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
				<h3 className='font-semibold text-black mb-0.5 group-hover:text-primary transition-colors'>
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
						.join(' , ')}
				</p>
				<div className='flex items-center justify-between'>
					<div className='flex items-baseline'>
						<h1 className='text-xl leading-7.5 font-bold text-black'>
							${price}
						</h1>
						<span className='text-xs text-[#6B7280]'>/night</span>
					</div>
					{rating && (
						<span className='flex items-center gap-1 text-xs text-neutral-600'>
							<Star
								size={14}
								className='text-[#C9922A]'
							/>
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
