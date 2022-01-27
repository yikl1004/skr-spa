import Portal from '@components/Portal'
import React from 'react'

export default function PortalPage() {
	const [open, setOpen] = React.useState(false)
	const openModal: React.MouseEventHandler = (event) => {
		setOpen(true)
	}
	const closeModal = () => {
		setOpen(false)
	}

	return (
		<div>
			<h1>createPortal 사용</h1>
			<button type="button" onClick={openModal}>
				open modal
			</button>
			<Portal open={open} onClose={closeModal}>
				<div>
					<h1>Modal</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Magnam laboriosam animi incidunt. Sunt labore, rem
						dolor placeat tenetur aliquam quos, laudantium dicta,
						consectetur consequatur eum explicabo et sed repellendus
						ex.
					</p>
				</div>
			</Portal>
		</div>
	)
}
