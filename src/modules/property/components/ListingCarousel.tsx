'use client';

import ResponsiveLayout from '@/components/ResponsiveLayout';
import { Card } from '@/components/ui/card';

export function ListingCarousel() {
	return (
		<ResponsiveLayout className='my-32'>
			<div className='grid grid-cols-2'>
				<div className='grid grid-cols-3 gap-2'>
					<div className='col-span-2'>
						<Card>helo</Card>
					</div>
					<div className='div'>
						<Card>helo</Card>
					</div>
				</div>
				<div className=''>
					<Card>helo</Card>
				</div>
			</div>
		</ResponsiveLayout>
	);
}
