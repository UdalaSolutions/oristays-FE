'use client';

import { useRef } from 'react';
import { Upload, X, Info } from 'lucide-react';

const MIN_PHOTOS = 5;

export default function StepPhotos({ photos, setPhotos }) {
	const fileInputRef = useRef(null);

	function handleFileChange(e) {
		const files = Array.from(e.target.files);
		const newPhotos = files.map((file) => ({
			id: crypto.randomUUID(),
			url: URL.createObjectURL(file),
		}));
		setPhotos((prev) => [...prev, ...newPhotos]);
		e.target.value = '';
	}

	function removePhoto(id) {
		setPhotos((prev) => prev.filter((p) => p.id !== id));
	}

	const remaining = Math.max(0, MIN_PHOTOS - photos.length);

	return (
		<div className='max-w-lg'>
			<p className='text-xs font-medium text-neutral-500 mb-1'>Step 3/8</p>
			<h2 className='text-xl font-bold text-neutral-900 mb-2'>Photos</h2>
			<p className='text-sm text-neutral-500 mb-6'>
				Upload high-quality images of your property.
			</p>

			<input
				ref={fileInputRef}
				type='file'
				multiple
				accept='image/*'
				className='hidden'
				onChange={handleFileChange}
			/>

			<div
				onClick={() => fileInputRef.current?.click()}
				className='border-2 border-dashed border-neutral-300 rounded-xl py-12 flex flex-col items-center justify-center cursor-pointer hover:border-neutral-400 transition-colors mb-4'>
				<Upload size={28} strokeWidth={1.5} className='text-neutral-400 mb-3' />
				<p className='text-sm font-bold text-neutral-700'>Click to upload Images</p>
				<p className='text-xs text-neutral-400 mt-1'>
					PNG, JPG up to 10MB each (Min 5 images)
				</p>
			</div>

			{photos.length > 0 && photos.length < MIN_PHOTOS && (
				<div className='flex items-center gap-2 text-primary mb-5'>
					<Info size={16} strokeWidth={1.5} className='shrink-0' />
					<p className='text-sm'>
						Upload at least {remaining} more photo{remaining !== 1 ? 's' : ''} to
						continue
					</p>
				</div>
			)}

			{photos.length > 0 && (
				<div>
					<p className='text-sm text-neutral-500 mb-4'>
						Click and drag photos to arrange them in the order you&apos;d like guests
						to see.
					</p>
					<div className='flex flex-wrap gap-3'>
						{photos.map((photo, index) => (
							<div
								key={photo.id}
								className='relative rounded-xl overflow-hidden w-[185px] h-[130px] bg-neutral-100'>
								<img
									src={photo.url}
									alt=''
									className='w-full h-full object-cover'
								/>
								{index === 0 && (
									<span className='absolute top-2 left-2 bg-white text-xs font-semibold text-neutral-700 px-2.5 py-1 rounded-full shadow-sm'>
										Cover photo
									</span>
								)}
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation();
										removePhoto(photo.id);
									}}
									className='absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-neutral-100 transition-colors'>
									<X size={14} strokeWidth={2} />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
