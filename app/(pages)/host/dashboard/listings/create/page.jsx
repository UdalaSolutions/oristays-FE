'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepMethod from '@/app/components/host/listing-steps/StepMethod';
import StepUnits from '@/app/components/host/listing-steps/StepUnits';
import StepLocation from '@/app/components/host/listing-steps/StepLocation';
import StepBasicDetails from '@/app/components/host/listing-steps/StepBasicDetails';
import StepPhotos from '@/app/components/host/listing-steps/StepPhotos';
import StepAmenities from '@/app/components/host/listing-steps/StepAmenities';
import StepHouseRules from '@/app/components/host/listing-steps/StepHouseRules';
import StepBookingSettings from '@/app/components/host/listing-steps/StepBookingSettings';
import StepSetPrice from '@/app/components/host/listing-steps/StepSetPrice';

const TOTAL_STEPS = 8;

export default function CreateListingPage() {
	const router = useRouter();
	const [step, setStep] = useState(0);

	const [method, setMethod] = useState('');
	const [unitType, setUnitType] = useState('');

	const [address, setAddress] = useState('');
	const [unitNumber, setUnitNumber] = useState('');

	const [propertyName, setPropertyName] = useState('');
	const [propertyType, setPropertyType] = useState('');
	const [propertyDescription, setPropertyDescription] = useState('');
	const [guests, setGuests] = useState(0);
	const [bedrooms, setBedrooms] = useState(0);
	const [beds, setBeds] = useState(0);
	const [bathrooms, setBathrooms] = useState(0);

	const [photos, setPhotos] = useState([]);

	const [selectedAmenities, setSelectedAmenities] = useState([]);

	const [houseRules, setHouseRules] = useState({
		smoking: false,
		parties: false,
		pets: false,
		children: false,
	});
	const [checkInTime, setCheckInTime] = useState('2:00 PM');
	const [checkOutTime, setCheckOutTime] = useState('11:00 AM');
	const [quietHoursFrom, setQuietHoursFrom] = useState('11:00 PM');
	const [quietHoursTo, setQuietHoursTo] = useState('7:00 AM');

	const [bookingType, setBookingType] = useState('');

	const [price, setPrice] = useState(25);

	const canProceed = [
		!!method,
		!!unitType,
		!!address.trim(),
		!!propertyName.trim() && !!propertyType,
		true,
		selectedAmenities.length > 0,
		true,
		!!bookingType,
		price > 0,
	][step] ?? false;

	function toggleAmenity(id) {
		setSelectedAmenities((prev) =>
			prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
		);
	}

	function toggleRule(id, val) {
		setHouseRules((prev) => ({ ...prev, [id]: val }));
	}

	function handleNext() {
		if (!canProceed) return;
		if (step < TOTAL_STEPS) {
			setStep((s) => s + 1);
		} else {
			router.push('/host/dashboard/listings');
		}
	}

	function handleBack() {
		if (step > 0) {
			setStep((s) => s - 1);
		} else {
			router.push('/host/dashboard/listings');
		}
	}

	return (
		<>
			<div className='shrink-0 px-8 pt-8 pb-6 border-b border-neutral-100'>
				<h1 className='text-xl font-bold text-neutral-900'>My listings</h1>
			</div>

			<div className='flex-1 overflow-auto px-8 py-8 pb-28'>
				{step === 0 && <StepMethod selected={method} onSelect={setMethod} />}
				{step === 1 && <StepUnits selected={unitType} onSelect={setUnitType} />}
				{step === 2 && (
					<StepLocation
						address={address}
						setAddress={setAddress}
						unitNumber={unitNumber}
						setUnitNumber={setUnitNumber}
					/>
				)}
				{step === 3 && (
					<StepBasicDetails
						propertyName={propertyName}
						setPropertyName={setPropertyName}
						propertyType={propertyType}
						setPropertyType={setPropertyType}
						propertyDescription={propertyDescription}
						setPropertyDescription={setPropertyDescription}
						guests={guests}
						setGuests={setGuests}
						bedrooms={bedrooms}
						setBedrooms={setBedrooms}
						beds={beds}
						setBeds={setBeds}
						bathrooms={bathrooms}
						setBathrooms={setBathrooms}
					/>
				)}
				{step === 4 && <StepPhotos photos={photos} setPhotos={setPhotos} />}
				{step === 5 && (
					<StepAmenities selected={selectedAmenities} onToggle={toggleAmenity} />
				)}
				{step === 6 && (
					<StepHouseRules
						rules={houseRules}
						onToggleRule={toggleRule}
						checkInTime={checkInTime}
						setCheckInTime={setCheckInTime}
						checkOutTime={checkOutTime}
						setCheckOutTime={setCheckOutTime}
						quietHoursFrom={quietHoursFrom}
						setQuietHoursFrom={setQuietHoursFrom}
						quietHoursTo={quietHoursTo}
						setQuietHoursTo={setQuietHoursTo}
					/>
				)}
				{step === 7 && (
					<StepBookingSettings selected={bookingType} onSelect={setBookingType} />
				)}
				{step === 8 && <StepSetPrice price={price} setPrice={setPrice} />}
			</div>

			<div className='fixed bottom-0 left-60 right-0 bg-white border-t border-neutral-100 px-8 py-4 flex items-center justify-between'>
				<button
					onClick={handleBack}
					className='px-6 py-2.5 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors'>
					Back
				</button>
				<button
					onClick={handleNext}
					disabled={!canProceed}
					className={`px-8 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
						canProceed
							? 'bg-primary hover:bg-primary-hover text-white'
							: 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
					}`}>
					Next
				</button>
			</div>
		</>
	);
}
