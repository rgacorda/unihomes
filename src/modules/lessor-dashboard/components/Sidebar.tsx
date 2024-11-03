import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Menu } from './Menu';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import SidebarToggle from './SidebarToggle';

import React from 'react';

const Sidebar = () => {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;
	return (
		<aside
			className={cn(
				'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
				sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			<div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800'>
				<Button
					className={cn(
						'transition-transform ease-in-out duration-300 ',
						sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
					)}
					variant='link'
					asChild
				>
					<Link href='/dashboard' className='flex items-center'>
						<img src='/Logo.png' alt='Logo' className='w-20 h-auto' />
						<h1
							className={cn(
								'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
								sidebar?.isOpen === false
									? '-translate-x-96 opacity-0 hidden'
									: 'translate-x-0 opacity-100'
							)}
						>
							UniHomes
						</h1>
					</Link>
				</Button>
				<Menu isOpen={sidebar?.isOpen} />
			</div>
		</aside>
	);
};

export default Sidebar;
