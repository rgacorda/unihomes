import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	fetchUserData,
	checkUnitReservationStatus,
	createReservation,
	checkExistingReservation,
} from '@/actions/listings/booking-process';
import { toast } from 'sonner';
import {
	onsiteNotification,
	reservationNotification,
} from '@/actions/notification/notification';

interface BookingCardProps {
	isOpen: boolean;
	onClose: () => void;
	unitID: number;
	availableSpots: number | null;
	unitPrice: number | null;
	accountID: string | null;
	propertyTitle: string;
	unitTitle: string;
}

export const ReviewModal: React.FC<BookingCardProps> = ({
	isOpen,
	onClose,
	unitID,
	availableSpots,
	unitPrice,
	accountID,
	propertyTitle,
	unitTitle,
}) => {
	const [date, setDate] = useState<Date | undefined>();
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedService, setSelectedService] = useState<string>('');
	const [numGuests, setNumGuests] = useState<number>(1);
	const [paymentOption, setPaymentOption] = useState<string>('Online Payment');
	const [hasReservation, setHasReservation] = useState<boolean>(false);
	const [isUnitReserved, setIsUnitReserved] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | null>(null);

	const today = new Date();

	useEffect(() => {
		const initializeData = async () => {
			const fetchedUserId = await fetchUserData();
			setUserId(fetchedUserId);

			if (fetchedUserId) {
				const existingReservation = await checkExistingReservation(
					fetchedUserId,
					unitID
				);
				setHasReservation(existingReservation);
			}

			const unitReservedStatus = await checkUnitReservationStatus(unitID);
			setIsUnitReserved(unitReservedStatus);
		};

		initializeData();
	}, [unitID]);

	const handleReserve = async () => {
		if (!userId || !date || !selectedService) return;

		const result = await createReservation(
			userId,
			unitID,
			selectedService,
			date,
			numGuests,
			paymentOption
		);
		if (result.success) {
			setHasReservation(true);
			if (selectedService === 'Room Reservation') setIsUnitReserved(true);
			toast.success('Reservation successfully created!');
			await (selectedService === 'On-Site Visit'
				? onsiteNotification
				: reservationNotification)(accountID, propertyTitle, unitTitle);
		} else {
			toast.error(`Error: ${result.error}`);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-[80%] bg-white dark:bg-secondary shadow-lg rounded-lg'>
				<DialogHeader>
					<DialogTitle>Book Now</DialogTitle>
					<DialogDescription className='border-b border-gray-300 dark:text-gray-200 pb-2'>
						Complete your booking details below.
					</DialogDescription>
				</DialogHeader>

				<div className='grid w-full items-center gap-5'>
					{/* Service Selection */}
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='service' className='font-semibold'>
							Service Option
						</Label>
						<RadioGroup
							value={selectedService}
							name='service'
							onValueChange={setSelectedService}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='On-Site Visit'
									id='r1'
									className='dark:border-blue-300 dark:text-white'
								/>
								<Label htmlFor='r1' className='dark:text-gray-200 font-normal'>
									On-Site Visit
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='Room Reservation'
									id='r2'
									className='dark:border-blue-300 dark:text-white'
								/>
								<Label htmlFor='r2' className='dark:text-gray-200 font-normal'>
									Room Reservation
								</Label>
							</div>
						</RadioGroup>
					</div>

					{/* Date Picker */}
					<div className='relative'>
						<Label htmlFor='date' className='font-semibold'>
							{selectedService === 'On-Site Visit'
								? 'Visit Date'
								: 'Date of Move'}
						</Label>
						<p className='text-xs text-gray-500 mb-2 dark:text-gray-300'>
							{selectedService === 'On-Site Visit'
								? 'Select the date for your visit.'
								: 'Select your move-in date.'}
						</p>
						<div className='flex items-center pb-1'>
							<Input
								id='date'
								type='text'
								value={date ? format(date, 'MM/dd/yyyy') : ''}
								onFocus={() => setIsCalendarOpen(true)}
								readOnly
								className='border-gray-400 pr-10'
							/>
							<button
								type='button'
								className='absolute right-3 top-1/2 transform -translate-y-1/2'
								onClick={() => setIsCalendarOpen((prev) => !prev)}
							>
								<CalendarIcon className='h-4 w-4 mt-10 text-gray-500 dark:text-gray-300' />
							</button>
						</div>
						{isCalendarOpen && (
							<div className='absolute z-10 mt-2 left-2/3 transform -translate-x-1/2'>
								<Calendar
									mode='single'
									selected={date}
									onSelect={(selectedDate) => {
										setDate(selectedDate);
										setIsCalendarOpen(false);
									}}
									disabled={(date) => date < today}
									className='rounded-md border shadow bg-white'
								/>
							</div>
						)}
					</div>

					{/* Pricing Breakdown */}
					{selectedService === 'Room Reservation' && (
						<>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='guests' className='font-semibold'>
									How many guests will be accompanying you?
								</Label>
								<p className='text-xs text-gray-500 dark:text-gray-300'>
									Please enter the total number of guests, including yourself.
								</p>
								<Input
									id='guests'
									type='number'
									value={numGuests}
									onChange={(e) => setNumGuests(Number(e.target.value))}
									className='border-gray-400 mt-3'
									min={1}
									max={availableSpots}
								/>
							</div>

							{/* Payment Option */}
							<div className='flex flex-col space-y-2'>
								<Label
									htmlFor='payment'
									className='font-semibold flex items-center'
								>
									Payment Option
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<span className='ml-auto cursor-pointer'>
													<Info className='w-4 h-4 text-gray-500 dark:text-gray-300 mr-3' />
												</span>
											</TooltipTrigger>
											<TooltipContent className='w-[250px]'>
												<p className='font-normal text-xs'>
													Select your preferred payment method. After completing
													the payment, please send the proof to the owner
													through the{' '}
													<span className='font-bold'>Messages</span> tab.
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Label>
								<RadioGroup
									value={paymentOption}
									onValueChange={setPaymentOption}
								>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='Online Payment'
											id='paymentOnline'
											className='dark:border-blue-300 dark:text-white'
										/>
										<Label
											htmlFor='paymentOnline'
											className='dark:text-gray-200 font-normal'
										>
											Online Payment
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<RadioGroupItem
											value='Cash (On-Site)'
											id='paymentCash'
											className='dark:border-blue-300 dark:text-white'
										/>
										<Label
											htmlFor='paymentCash'
											className='dark:text-gray-200 font-normal'
										>
											Cash (On-Site)
										</Label>
									</div>
								</RadioGroup>
							</div>

							{/* Pricing Table */}
							<div className='mt-4 border-t border-gray-300 pt-4'>
								<h3 className='font-semibold text-lg mb-2 dark:text-gray-200'>
									Pricing Breakdown
								</h3>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300'>
									<li className='flex justify-between'>
										<span>1-month Advance:</span>
										<span>₱{unitPrice}</span>
									</li>
									<li className='flex justify-between'>
										<span>1-month Deposit:</span>
										<span>₱{unitPrice}</span>
									</li>
									<li className='flex justify-between font-semibold'>
										<span>Total:</span>
										<span>₱{unitPrice * 2}</span>
									</li>
								</ul>
								<div className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
									*You may upload your receipt on Message Section
								</div>
							</div>
						</>
					)}
				</div>

				<Button
					className='w-full mt-4'
					onClick={handleReserve}
					disabled={
						!date || !selectedService || hasReservation || isUnitReserved
					}
				>
					{hasReservation
						? 'Already Has a Reservation'
						: isUnitReserved
						? 'Already Reserved'
						: 'Reserve'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
