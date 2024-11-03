'use client';

import spiels from '@/lib/constants/spiels';
import { SearchIcon } from 'lucide-react';
import { MdOutlineMyLocation } from 'react-icons/md';
import React, { useContext, useRef, useEffect } from 'react';
import { MapContext } from './ListingsPage';
import { toast } from 'sonner';

interface HeroSectionProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}


export default function ListingHero({
	searchTerm,
	setSearchTerm,
}: HeroSectionProps) {

	const [deviceLocation,setDeviceLocation] = useContext(MapContext);
	const inputRef = useRef(null);

	const initAutocomplete = async () => {
		const [{Autocomplete}] = await Promise.all([
			google.maps.importLibrary("places"),
		]);
		const autocomplete = new Autocomplete(inputRef.current);
		autocomplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
		const bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(16.25, 120.396),
			new google.maps.LatLng(16.569, 120.778)
		);
		autocomplete.setBounds(bounds);
		autocomplete.setOptions({ strictBounds: true });
		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();
			if (place.geometry) {
				const { lat, lng } = place.geometry.location.toJSON();
				setDeviceLocation({
					lat,
					lng
				});
			}
		});
	}
	const handleCurrentLocationClick = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position.coords.accuracy > 100) {
				toast.error("Location accuracy is too low. Manually search location or use a mobile device instead.");
			}else{
				toast.success("Device Location Retrieved!");
				setDeviceLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}
		});
	}
};

useEffect(() => {
    initAutocomplete();
  }, []);
	
	return (
		<div className='flex items-center justify-center h-[250px] w-screen'>
			<div className='w-full px-2 py-8'>
				<div className='flex flex-col items-center text-center'>
					<h1 className='text-pretty font-bold lg:text-5xl md:text-3xl sm:text-xl xs:text-xl text-white'>
						Explore UniHomes Listings
					</h1>
					<p className='text-pretty lg:text-lg md:text-md sm:text-sm text-slate-300'>
						Find homes you would never have known to search for.
					</p>
					<form className='flex mt-5 w-full max-w-4xl justify-center'>
						<label htmlFor='search' className='sr-only'>
							{spiels.BUTTON_SEARCH}
						</label>
						<div className='relative flex lg:w-full md:w-[75%] xs:w-[50%]'>
							<SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black dark:text-muted-foreground' />
							<input
								ref={inputRef}
								type='search'
								name='search'
								id='search'
								className='block w-full rounded-3xl border-0 bg-white px-10 py-2 text-black dark:text-muted-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent'
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

