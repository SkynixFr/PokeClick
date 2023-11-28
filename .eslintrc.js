module.exports = {
	extends: [
		'universe',

		'universe/native',

		'universe/web',

		'universe/shared/typescript-analysis',
		'plugin:prettier/recommended'
	],

	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.d.ts'],

			parserOptions: {
				project: './tsconfig.json'
			}
		}
	],

	plugins: ['react-hooks', 'prettier'],

	rules: {
		'import/order': 'off',

		'prettier/prettier': 'error'
	},

	env: {
		node: true
	}
};
