'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepMethod from '@/app/components/host/listing-steps/StepMethod';
import StepUnits from '@/app/components/host/listing-steps/StepUnits';
import StepLocation from '@/app/components/host/listing-steps/StepLocation';
import StepBasicDetails from '@/app/components/host/listing-steps/StepBasicDetails';
import StepSetupUnits from '@/app/components/host/listing-steps/StepSetupUnits';
import StepPhotos from '@/app/components/host/listing-steps/StepPhotos';
import StepPhotosMulti from '@/app/components/host/listing-steps/StepPhotosMulti';
import StepAmenities from '@/app/components/host/listing-steps/StepAmenities';
import StepHouseRules from '@/app/components/host/listing-steps/StepHouseRules';
import StepBookingSettings from '@/app/components/host/listing-steps/StepBookingSettings';
import StepSetPrice from '@/app/components/host/listing-steps/StepSetPrice';
import StepSetPriceMulti from '@/app/components/host/listing-steps/StepSetPriceMulti';

const TOTAL_STEPS = 8;

function createUnit() {
	return {
		id: crypto.randomUUID(),
		expanded: true,
		name: '',
		type: '',
		description: '',
		guests: 0,
		bedrooms: 0,
		beds: 0,
		bathrooms: 0,
		photos: [],
		price: 25,
	};
}

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

	const [units, setUnits] = useState([createUnit()]);

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

	const isMultiple = unitType === 'multiple';

	const step3Valid = isMultiple
		? units.length > 0 && !!units[0].name.trim() && !!units[0].type
		: !!propertyName.trim() && !!propertyType;

	const step8Valid = isMultiple ? units.every((u) => (u.price ?? 0) > 0) : price > 0;

	const canProceed = [
		!!method,
		!!unitType,
		!!address.trim(),
		step3Valid,
		true,
		selectedAmenities.length > 0,
		true,
		!!bookingType,
		step8Valid,
	][step] ?? false;

	function addUnit() {
		setUnits((prev) => [...prev, createUnit()]);
	}

	function deleteUnit(id) {
		setUnits((prev) => prev.filter((u) => u.id !== id));
	}

	function updateUnit(id, field, value) {
		setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
	}

	function toggleUnitExpanded(id) {
		setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, expanded: !u.expanded } : u)));
	}

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
				{step === 3 && !isMultiple && (
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
				{step === 3 && isMultiple && (
					<StepSetupUnits
						units={units}
						onAdd={addUnit}
						onDelete={deleteUnit}
						onUpdate={updateUnit}
						onToggleExpanded={toggleUnitExpanded}
					/>
				)}
				{step === 4 && !isMultiple && (
					<StepPhotos photos={photos} setPhotos={setPhotos} />
				)}
				{step === 4 && isMultiple && (
					<StepPhotosMulti units={units} onUpdateUnit={updateUnit} />
				)}
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
				{step === 8 && !isMultiple && <StepSetPrice price={price} setPrice={setPrice} />}
				{step === 8 && isMultiple && (
					<StepSetPriceMulti units={units} onUpdateUnit={updateUnit} />
				)}
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
