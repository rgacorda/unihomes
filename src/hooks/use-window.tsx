import { useEffect, useState } from 'react';

export function useWindowSize() {
	const [breakPoint, setBreakPoint] = useState(0);
	useEffect(() => {
		const handleResize = () => {
			setBreakPoint(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [setBreakPoint]);
	return breakPoint;
}
