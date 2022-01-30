import { CracoConfig } from '@craco/craco'

// @types 미지원
const CracoAlias = require('craco-alias')

const config: CracoConfig = {
	eslint: {
		enable: true,
	},
	typescript: {
		enableTypeChecking: true,
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				tsConfigPath: './tsconfig.paths.json',
			},
		},
	],
}

export default config
