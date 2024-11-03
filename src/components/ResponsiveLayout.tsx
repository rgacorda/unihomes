import { cn } from '@/lib/utils';
import React from 'react';

function ResponsiveLayout({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className='dark:bg-secondary'>
			<div
				className={cn(
					className,
					'mx-auto px-5 py-3 max-w-xl md:max-w-3xl lg:max-w-7xl'
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default ResponsiveLayout;
