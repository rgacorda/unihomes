import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import spiels from "@/lib/constants/spiels";

interface ApproveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleApprove: () => void;
}

const ApproveConfirmationModal = ({
  isOpen,
  onClose,
  handleApprove,
}: ApproveConfirmationModalProps) => {
  return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white dark:bg-secondary'>
				<DialogHeader>
					<DialogTitle>{spiels.MODAL_APPROVE}</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<p className="text-md">{spiels.MODAL_APPROVE_HEADER}</p>
				</DialogDescription>
				<DialogFooter>
					<Button onClick={handleApprove}>{spiels.BUTTON_YES_APPROVE}</Button>
					<Button onClick={onClose} variant='outline'>
						{spiels.BUTTON_CANCEL}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ApproveConfirmationModal;
