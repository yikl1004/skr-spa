import { Link } from 'react-router-dom'
import type { To } from 'react-router-dom'

type Props = {
	to: To
}

export const Anchor: React.FC<Props> = ({ to, children }) => {
	return <Link to={to}>{children}</Link>
}
