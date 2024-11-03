import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface ProfileAlertDetailsProps {
	name: {
		name: string;
		dorm_name: string;
		email: string;
		contact: string;
		imageSrc?: string; // Optional imageSrc
	};
	buttonLabel: string;
	buttonAction: string;
	onButtonClick?: () => void;
}

export function ProfileAlertDetails({
	name,
	buttonLabel,
	buttonAction,
	onButtonClick,
}: ProfileAlertDetailsProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='outline'>{buttonLabel}</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='bg-white dark:bg-popover'>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<div className='flex items-center p-2'>
							<Avatar className='mr-4'>
								{name.imageSrc ? (
									<AvatarImage src={name.imageSrc} alt='Profile Picture' />
								) : (
									<AvatarFallback>{getInitials(name.name)}</AvatarFallback>
								)}
							</Avatar>
							<div className='flex flex-col'>
								<h2 className='font-bold text-lg'>{name.name}</h2>
								<p className='text-sm text-gray-500'>{name.dorm_name}</p>
							</div>
						</div>
					</AlertDialogTitle>
					<AlertDialogDescription>
						<Table className='min-w-full'>
							<TableBody>
								<TableRow>
									<TableCell className='font-semibold'>
										Contact Number:
									</TableCell>
									<TableCell>{name.contact}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className='font-semibold'>Email:</TableCell>
									<TableCell>{name.email}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={onButtonClick}>
						{buttonAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

// Helper function to get initials
const getInitials = (name: string) => {
	const names = name.split(' ');
	if (names.length === 0) return 'NN'; // Default to 'NN' if no name is provided
	const firstInitial = names[0].charAt(0).toUpperCase();
	const lastInitial =
		names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
	return `${firstInitial}${lastInitial}`;
};
