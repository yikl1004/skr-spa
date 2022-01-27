import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@components/layout'

import Home from '@pages/index'
import NotFound from '@pages/NotFound'
import Counter from '@pages/example/counter'

const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Home />} />
					<Route path="example">
						<Route path="" element={<Counter />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
