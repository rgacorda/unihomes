import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from '@/app/auth/login/actions';

export function NavbarModalRegistration({ isOpen, onClose, openModal }) {
	const [formData, setFormData] = React.useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'confirmPassword') {
			setConfirmPassword(value);
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage('');

		if (formData.password !== confirmPassword) {
			setErrorMessage('Passwords do not match');
			setIsLoading(false);
			return;
		}

		const data = new FormData();
		data.append('email', formData.email);
		data.append('password', formData.password);
		data.append('firstname', formData.fname);
		data.append('lastname', formData.lname);

		try {
			const response = await signup(data);

			if (response && response.error) {
				setErrorMessage(response.error);
			} else {
				onClose();
			}
		} catch (error) {
			console.error('Signup failed:', error);
			setErrorMessage('An error occurred during signup');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-[425px] bg-white text-black rounded-[20px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl'>Create an Account</DialogTitle>
					<DialogDescription>
						Fill out the form to create a new account.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<div className='text-black'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label htmlFor='fname' className='font-semibold'>
									First Name
								</Label>
								<Input
									id='fname'
									name='fname'
									placeholder='Pedro'
									className='border-gray-400'
									value={formData.fname}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Label htmlFor='lname' className='font-semibold'>
									Last Name
								</Label>
								<Input
									name='lname'
									id='lname'
									placeholder='Duarte'
									className='border-gray-400'
									value={formData.lname}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div className='mt-2'>
							<Label htmlFor='email' className='font-semibold'>
								Email
							</Label>
							<Input
								id='email'
								name='email'
								placeholder='asdas@peduarte.com'
								className='border-gray-400'
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>

						<div className='mt-2'>
							<Label htmlFor='password' className='font-semibold'>
								Password
							</Label>
							<Input
								name='password'
								id='password'
								type='password'
								className='border-gray-400'
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>

						<div className='mt-2'>
							<Label htmlFor='confirmPassword' className='font-semibold'>
								Confirm Password
							</Label>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								value={confirmPassword}
								onChange={handleInputChange}
								placeholder='Confirm Password'
							/>
						</div>

						{/* Display the error message */}
						{errorMessage && (
							<p className='mt-4 text-red-500 text-center'>{errorMessage}</p>
						)}
					</div>

					<DialogFooter>
						<div className='w-full'>
							<Button
								type='submit'
								className='w-full bg-black text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-800'
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<span className='loader mr-2'></span> Creating Account...
									</>
								) : (
									'Create Account'
								)}
							</Button>
							<div className='mt-4 text-center text-black'>
								<p>
									Already have an account?{' '}
									<a
										href='#'
										className='text-blue-500 hover:underline'
										onClick={() => {
											onClose();
											openModal('login');
										}}
									>
										Login
									</a>
								</p>
							</div>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
