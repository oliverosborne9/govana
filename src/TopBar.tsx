import GameTimer, {type GameTimerProps} from './Clock';
import Modal from './Modal';

export default function TopBar(props: GameTimerProps) {
	return (
		<div className='absolute inset-x-0 top-0'>
			<div className='flex justify-center'>
				<div className='w-10/12 flex py-2 justify-between'>
					<div className='flex font-mono font-bold text-fuchsia-600'>
						<p>GuessThe</p>
						<div className='box'>
							<ul>
								<li className='item-1'>LemonCurd</li>
								<li className='item-2'>Word</li>
								<li className='item-4'>Songbird</li>
								<li className='item-4'>Absurd</li>
								<li className='item-5'>LemonCurd</li>
							</ul>
						</div>
					</div>
					<div className='flex'>
						<GameTimer startDate={props.startDate} />
						<Modal />
					</div>
				</div>
			</div>
		</div>
	);
}
