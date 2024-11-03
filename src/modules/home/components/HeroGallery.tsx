import { Card } from '@/components/ui/card';
import Image from 'next/image';
import G1 from './../../../../public/G1.jpg';

const HeroGallery = () => {
	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1'>
			<div className='grid auto-rows-max items-start gap-4 md:gap-8'>
				<div className='grid gap-4 sm:grid-cols-2'>
					<Card className='sm:col-span-2 relative h-64'>
						<Image
							src={G1}
							alt='Image 1'
							className='absolute inset-0 h-full w-full object-cover rounded-md'
							width={600}
							height={300}
						/>
					</Card>

					<Card className='relative h-64'>
						<Image
							src={G1}
							alt='Image 2'
							className='absolute inset-0 h-full w-full object-cover rounded-md'
							width={600}
							height={300}
						/>
					</Card>

					<Card className='relative h-64'>
						<Image
							src={G1}
							alt='Image 3'
							className='absolute inset-0 h-full w-full object-cover rounded-md'
							width={600}
							height={300}
						/>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default HeroGallery;
