import ReactDOM from 'react-dom'
import styled from 'styled-components'

// style
const Modal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);

	.modal-area {
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`

const Portal: React.FC<{
	open: boolean
	selector?: '#portal-container' | string
	onClose(): void
}> = ({
	children,
	open,
	selector = '#portal-container',
	onClose = () => {},
}) => {
	const element =
		typeof window !== 'undefined' &&
		(document.querySelector(selector) as HTMLDivElement)
	const close = () => {
		typeof onClose === 'function' && onClose()
	}

	if (open) {
		return element && children
			? ReactDOM.createPortal(
					<Modal>
						<div className="modal-area">
							{children}
							<button type="button" onClick={close}>
								close
							</button>
						</div>
					</Modal>,
					element,
			  )
			: null
	} else {
		return null
	}
}

export default Portal
