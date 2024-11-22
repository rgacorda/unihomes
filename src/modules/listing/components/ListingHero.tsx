'use client';

import spiels from '@/lib/constants/spiels';
import { SearchIcon } from 'lucide-react';
import { MdOutlineMyLocation } from 'react-icons/md';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { MapContext } from './ListingsPage';
import { toast } from 'sonner';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface HeroSectionProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

export default function ListingHero({
	searchTerm,
	setSearchTerm,
}: HeroSectionProps) {
	const [deviceLocation, setDeviceLocation] = useContext(MapContext);
	const inputRef = useRef<HTMLInputElement>(null);
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
	const [placesAutocomplete, setPlacesAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
	const places = useMapsLibrary('places');

	useEffect(() => {
		if (!places || !inputRef.current) return;

		const options = {
			bounds: new google.maps.LatLngBounds(
				new google.maps.LatLng(16.374445, 120.592389),
				new google.maps.LatLng(16.446445, 120.633389)
			),
			fields: ['geometry', 'name', 'formatted_address'],
			componentRestrictions: { country: 'ph' },
		};
		const autocomplete = new places.Autocomplete(inputRef.current, options);
		setPlacesAutocomplete(autocomplete);


		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			const location = place.geometry?.location;

			if (location) {

				setSearchTerm(place.formatted_address || place.name || '');
				setDeviceLocation({
					lat: location.lat(),
					lng: location.lng(),
				});
			}
		});
	}, [places]);

	const handleCurrentLocationClick = () => {
		console.log(places)
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				if (position.coords.accuracy > 100) {
					toast.error(
						'Location accuracy is too low. Manually search location or use a mobile device instead.'
					);
				} else {
					toast.success('Device Location Retrieved!');
					setDeviceLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setSearchTerm('Current Location');
				}
			});
		}
	};

	return (
		<div className='flex items-center justify-center h-[205px] w-screen rounded-b-3xl'>
			<div className='w-full px-2 py-8 w-7xl'>
				<div className='flex flex-col items-center text-center rounded-b-3xl'>
					<h1 className='text-pretty font-bold lg:text-5xl md:text-3xl text-2xl text-white'>
						Explore Listings
					</h1>
					<p className='text-pretty lg:text-lg md:text-md sm:text-sm text-gray-200'>
						Find your perfect space with UniHomes.
					</p>
					<form className='flex mt-5 w-full max-w-4xl justify-center'>
						<label htmlFor='search' className='sr-only'>
							{spiels.BUTTON_SEARCH}
						</label>
						<div className='relative flex lg:w-full md:w-[75%] xs:w-[70%]'>
							<SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black dark:text-muted-foreground' />
							<input
								ref={inputRef}
								type='search'
								name='search'
								id='search'
								className='block w-full rounded-lg border-0 bg-white px-10 py-2 text-black dark:text-muted-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent'
								placeholder='Search'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
							/>
							<button
								type='button'
								className='absolute inset-y-0 right-0 pr-3 flex items-center p-1 bg-transparent border-0 focus:outline-none'
								aria-label='Use my location'
								onClick={handleCurrentLocationClick}
							>
								<MdOutlineMyLocation className='h-5 w-5 text-black dark:text-muted-foreground' />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
