'use client';

import React from 'react';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
// import { SignOut } from "@/app/(authentication)/login/actions";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { BsBuildingGear } from 'react-icons/bs';
import { IoAnalyticsOutline } from 'react-icons/io5';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';

import { useMediaQuery } from '@/hooks/use-media-query';

import {
	Menu,
	MessageCircleMore,
	X,
	LogOut,
	LayoutDashboard,
} from 'lucide-react';
import { NotificationPopover } from '@/components/navbar/NotificationPopover';
import { ModeToggle } from '@/components/mode-toggle';
import { logout } from '@/app/auth/login/actions';
import { IconExchange } from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';

function TopNavigation() {
	/*
        used useEffect and state so that all possible static routes stay static
    */
	const [user, setUser] = React.useState<User | null>(null);
	const [open, setOpen] = React.useState<boolean>(false);
	const [profileUrl, setProfileUrl] = React.useState<string | null>(null);

	const isDesktop = useMediaQuery('(min-width: 950px)');

	const pathname = usePathname();

	// to check if user is logged in without being dynamic
	React.useEffect(() => {
		const { auth } = createClient();

		auth.getSession().then(({ data }) => {
			setUser(data.session?.user);
		});

		const { data: authListener } = auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session?.user || null);
			} else if (event === 'SIGNED_OUT') {
				setUser(null);
			}
		});

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	React.useEffect(() => {
		const { auth } = createClient();

		const fetchUserData = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				const userId = data.session.user.id;

				// Fetch profile_url from the Supabase database
				const { data: profileData, error } = await createClient()
					.from('account')
					.select('profile_url')
					.eq('id', userId)
					.single();

				if (profileData && !error) {
					setProfileUrl(profileData.profile_url);
				}

				setUser(data.session.user);
			}
		};

		fetchUserData();
	}, []);

	// for scrolling while mobile
	React.useEffect(() => {
		if (open) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [open]);

	if (!user) {
		return (
			<Skeleton className='h-[68px] w-full'/>
		);
	}

	return (
		<nav className='py-3 sticky z-[999] airBnbDesktop:z-999 top-0 w-full bg-white/95 shadow backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background'>
			<div className='w-full grid md1:grid-cols-3 grid-flow-col px-5'>
				<div className='flex flex-nowrap items-center justify-start h-11'>
					<Image
						src='/Logo.png'
						alt='UniHomes logo'
						width={120}
						height={120}
						priority
						className='w-14 h-14 object-contain aspect-square'
					/>
					{/* <span className='text-xl font-bold'>Proprietor Dashboard</span> */}
				</div>
				{isDesktop ? (
					<>
						<ul className='flex flex-nowrap items-center justify-center gap-4'>
							<li>
								<Link
									href='/hosting'
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'rounded-full relative',
										"after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-current after:rounded-full after:transition-all after:duration-200",
										pathname === '/hosting' ? 'after:w-8' : 'after:w-0',
										'hover:after:w-0'
									)}
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href='/hosting/properties'
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'rounded-full relative',
										"after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-current after:rounded-full after:transition-all after:duration-200",
										pathname === '/hosting/properties'
											? 'after:w-8'
											: 'after:w-0',
										'hover:after:w-0'
									)}
								>
									Properties
								</Link>
							</li>
							<li>
								<Link
									href='/chat/inbox'
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'rounded-full relative',
										"after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-current after:rounded-full after:transition-all after:duration-200",
										pathname === '/chat/inbox' ? 'after:w-8' : 'after:w-0',
										'hover:after:w-0'
									)}
								>
									Messages
								</Link>
							</li>
							<li>
								<Link
									href='/hosting/transaction_history'
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'rounded-full relative',
										"after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-current after:rounded-full after:transition-all after:duration-200",
										pathname === '/hosting/transaction_history'
											? 'after:w-8'
											: 'after:w-0',
										'hover:after:w-0'
									)}
								>
									Transactions
								</Link>
							</li>
							<li>
								<Link
									href='/hosting/insights'
									className={cn(
										buttonVariants({ variant: 'ghost' }),
										'rounded-full relative',
										"after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:bg-current after:rounded-full after:transition-all after:duration-200",
										pathname === '/test' ? 'after:w-8' : 'after:w-0',
										'hover:after:w-0'
									)}
								>
									Insights
								</Link>
							</li>
							{/* <li>
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button
											variant='ghost'
											className={cn(
												'rounded-full inline-flex items-center gap-2 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out [&_svg]:data-[state=open]:rotate-180 [&_svg]:data-[state=closed]:rotate-0 data-[state=open]:ring-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
											)}
										>
											<span>Menu</span>
											<ChevronDown className={`h-4 w-4`} />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side='bottom'
										align='start'
										className='border-none z-[999] border-0 w-full min-w-[200px] px-0 py-5'
									>
										<DropdownMenuGroup>
											<DropdownMenuItem
												asChild
												className='py-2 px-3 rounded-none font-[500]'
											>
												<Link href={`/hosting/properties`}>Properties</Link>
											</DropdownMenuItem>
											<DropdownMenuItem className='py-2 px-3 rounded-none font-[500]'>
												<Link href={`/hosting/transaction_history`}>
													Reservations
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem className='py-2 px-3 rounded-none font-[500]'>
												Insights
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</li> */}
						</ul>

						<div className='flex flex-nowrap items-center justify-end gap-5'>
							<ModeToggle />
							<NotificationPopover />
							<Separator orientation='vertical' className='bg-gray-300' />
							{user ? (
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger className='rounded-full'>
										<Avatar className='w-9 h-9 select-none'>
											<AvatarImage src={profileUrl || ''} alt='User Avatar' />
											<AvatarFallback className='text-base leading-none font-normal bg-primary text-white dark:text-foreground'>
												{user?.user_metadata.firstname.charAt(0).toUpperCase()}
												{user?.user_metadata.lastname.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side='bottom'
										align='end'
										className='border-gray-200 border-1 w-full min-w-56 px-0 pt-3 bg-white dark:bg-secondary z-[999] shadow-xl'
										forceMount
									>
										<DropdownMenuLabel className='font-normal'>
											<div className='flex flex-col space-y-1'>
												<p className='text-sm font-medium leading-none truncate'>
													{user?.user_metadata.firstname}{' '}
													{user?.user_metadata.lastname}
												</p>
												<p className='text-xs leading-none text-muted-foreground truncate'>
													{user?.user_metadata.email}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem
												onClick={() => {
													window.location.href = '/hosting/company';
												}}
											>
												<BsBuildingGear className='mr-2 h-4 w-4' />
												<Link href={`/client/profile`}>
													Manage Company Profile
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													window.location.href = '/';
												}}
											>
												<AiOutlineUserSwitch className='mr-2 h-4 w-4' />
												<span>Switch to Client View</span>
											</DropdownMenuItem>
										</DropdownMenuGroup>

										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={async () => {
												await logout();
												window.location.href = '/';
											}}
										>
											<LogOut className='mr-2 h-4 w-4' />
											<span>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<div className='flex flex-nowrap items-center justify-end gap-4'>
									<Link
										href='/register'
										className={cn(
											buttonVariants({ variant: 'default' }),
											'rounded-full'
										)}
									>
										Sign up
									</Link>
									<Link
										href='/login'
										className={cn(
											buttonVariants({ variant: 'outline' }),
											'rounded-full'
										)}
									>
										Login
									</Link>
								</div>
							)}
						</div>
					</>
				) : (
					// mobile view
					<div className='flex flex-nowrap items-center justify-end gap-2'>
						<>
							<ModeToggle />
							<NotificationPopover />
							<Separator
								orientation='vertical'
								className='ml-2 mr-1 bg-gray-300'
							/>
						</>

						<Sheet open={open} onOpenChange={setOpen} modal={false}>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='[&_svg]:size-6 hover:bg-transparent'
								>
									{open ? <X /> : <Menu />}
								</Button>
							</SheetTrigger>
							<SheetContent
								className={`h-[calc(100vh-80px)] mt-[calc(80px-12px)] py-0 bg-white dark:bg-background ${
									open ? '' : ''
								}`}
								side='top'
							>
								<ScrollArea className='h-[calc(100vh-80px)]'>
									<SheetClose className='sr-only'>Close</SheetClose>
									<SheetHeader className='sr-only'>
										<SheetTitle>Navigation menu</SheetTitle>
										<SheetDescription>Mobile navigation menu.</SheetDescription>
									</SheetHeader>
									<div className='grid gap-11 py-7'>
										{/* menu */}
										<ul className='flex flex-col gap-2 [&_svg]:size-6'>
											<li className='mb-2'>MENU</li>
											<li>
												<Link
													href={`/hosting`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<LayoutDashboard /> Dashboard
												</Link>
											</li>
											<li>
												<Link
													href={`/hosting/properties`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<BiBuildingHouse />
													Properties
												</Link>
											</li>
											<li>
												<Link
													href={`/chat/inbox`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<MessageCircleMore />
													Messages
												</Link>
											</li>
											<li>
												<Link
													href={`/hosting/transaction_history`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<IconExchange />
													Transactions
												</Link>
											</li>
											<li>
												<Link
													href={`/hosting/insights`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<IoAnalyticsOutline />
													Insights
												</Link>
											</li>
										</ul>
										<Separator />
										{/* account */}
										<ul className='flex flex-col gap-2 [&_svg]:size-6'>
											<li className='mb-2'>ACCOUNT</li>
											{/* <li>
												<Link
													href={`/test`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-none px-0 gap-2'
													)}
												>
													<UserCircle2 /> Profile
												</Link>
											</li> */}
											<li>
												<Link
													href={`/hosting/company`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<BsBuildingGear />
													Manage Company
												</Link>
											</li>
											<li>
												<Link
													href={`/`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-lg px-0 gap-2 hover:rounded-lg hover:p-1 transition-all duration-300'
													)}
												>
													<AiOutlineUserSwitch />
													Switch to Client View
												</Link>
											</li>
											{/* <li>
												<Link
													href={`/test`}
													className={cn(
														buttonVariants({ variant: 'ghost' }),
														'w-full justify-start rounded-none px-0 gap-2'
													)}
												>
													<Settings />
													Settings
												</Link>
											</li> */}
										</ul>
										<Separator />
										{/* sign out */}
										<div className='flex flex-col gap-2 [&_svg]:size-6'>
											<Button
											// onClick={async () => {
											//     SignOut();
											// }}
											>
												Sign out
											</Button>
										</div>
									</div>
								</ScrollArea>
							</SheetContent>
						</Sheet>
					</div>
				)}
			</div>
		</nav>
	);
}

export default TopNavigation;
