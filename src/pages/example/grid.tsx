import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const GridCommonFeature = dynamic(() => import('@components/Grid'), {
	ssr: false,
})

const GridPage: NextPage = () => {
	return <GridCommonFeature />
}

export default GridPage
