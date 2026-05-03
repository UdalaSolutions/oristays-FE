const STEPS = [
	{ number: 1, label: 'Booking details' },
	{ number: 2, label: 'Add ride' },
	{ number: 3, label: 'Review & pay' },
];

export default function BookingStepIndicator({ currentStep }) {
	return (
		<div className='flex items-center justify-center gap-0 w-full max-w-md mx-auto mb-8'>
			{STEPS.map((step, index) => {
				const done = currentStep > step.number;
				const active = currentStep === step.number;

				return (
					<div
						key={step.number}
						className='flex items-center flex-1'>
						<div className='flex flex-col items-center'>
							<div
								className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
									done ? 'bg-success text-white'
									: active ? 'bg-primary text-white'
									: 'bg-neutral-200 text-neutral-500'
								}`}>
								{done ?
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										strokeWidth={2.5}
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M5 13l4 4L19 7'
										/>
									</svg>
								:	step.number}
							</div>
							<span
								className={`text-xs mt-1.5 whitespace-nowrap ${active || done ? 'text-neutral-700 font-medium' : 'text-neutral-400'}`}>
								{step.label}
							</span>
						</div>

						{index < STEPS.length - 1 && (
							<div
								className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors ${
									currentStep > step.number ? 'bg-success' : 'bg-neutral-200'
								}`}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
