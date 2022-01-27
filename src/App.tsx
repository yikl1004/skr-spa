import React from 'react'
import { RouterGuard } from '@components/layout'
import AppRouter from './AppRouter'

const App: React.FC = () => {
	return (
		<RouterGuard>
			<AppRouter />
		</RouterGuard>
	)
}

export default App
