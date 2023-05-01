// Creative-tim
import {useState, useEffect} from 'react';

export default function Modal() {
	const [showModal, setShowModal] = useState(false);
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			setShowModal(false);
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);
	return (
		<>
			<div className='px-2'>
				<button
					className='group relative w-full flex rounded-full justify-center
                py-1 px-2 border border-transparent text-xs font-medium
                text-white bg-cyan-500 hover:bg-cyan-600'
					type='button'
					onClick={() => {
						setShowModal(true);
					}}
				>
        ?
				</button>
			</div>
			{showModal ? (
				<>
					<div
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
					>
						<div className='relative w-auto my-6 mx-auto max-w-xs'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								<div className='flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t'>
									<h3 className='text-xl font-semibold'>
                                        Instructions
									</h3>

								</div>
								{/* body */}
								<div className='relative px-5 flex-auto text-slate-500'>
									<p className='py-2'>
                                        You have been given a set of 5 words, all of which rhyme with each other.
                                        For example:
									</p>
									<p className='py-2 text-center text-indigo-500 whitespace-pre-wrap'>
										{[
											'BIKE',
											'SPIKE',
											'UNSPORTSMANLIKE',
											'DISLIKE',
											'HITCHHIKE',
										].join('    ')}
									</p>
									<p className='py-2'>
                                        All you have to do is correctly identify each word from its image.
                                        When you type the correct answer,
                                        you will be moved onto the next question in the set.
									</p>
									<p className='py-2'>
                                        Press <code className='text-cyan-500'>{'CLUE'}</code> to reveal only the correct letters from the word.
									</p>
									<p className='py-2'>
                                        The timer in the top right corner shows how long you have taken.
									</p>
									<p className='py-2'>
                                        A new set of questions is published each day. Good luck!
									</p>
								</div>
								<div className='flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b'>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => {
											setShowModal(false);
										}}
									>
                                    Close
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-90 fixed inset-0 z-40 bg-fuchsia-900'></div>
				</>
			) : null}
		</>
	);
}
