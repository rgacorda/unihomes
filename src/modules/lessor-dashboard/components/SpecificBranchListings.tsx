import SpecificListings from './SpecificListings';

interface Room {
	room_id: number;
	room_title: string;
	room_capacity: number;
	lifestyle: string;
	description: string;
	price: number;
	availability: boolean;
}

interface SpecificBranchListingsProps {
	listings: Room[];
}

export default function SpecificBranchListings({
	listings,
}: SpecificBranchListingsProps) {
	return (
		<div className='grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 xlg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-2'>
			{listings.map((item) => (
				<div key={item.room_title}>
					<SpecificListings {...item} />
				</div>
			))}
		</div>
	);
}
