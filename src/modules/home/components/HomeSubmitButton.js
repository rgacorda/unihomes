import { Button } from '@/components/ui/button';
import spiels from '../../../lib/constants/spiels';

export function HomeSubmitButton() {
	return <Button>{spiels.BUTTON_SUBMIT}</Button>;
}
