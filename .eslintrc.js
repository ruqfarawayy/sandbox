module.exports = {
	env: {
		browser: true,
		es2021: true,
		amd: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'next'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', 'import', 'unicorn', 'unused-imports'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'no-template-curly-in-string': 'off',
		'no-undef': 'error',
		'no-mixed-spaces-and-tabs': 'off',
		'no-unused-vars': 'off',
		'no-dupe-keys': 'warn',
		'react/prop-types': 'off',
		'no-console': 'warn',
		'react/display-name': 'off',
		'no-extra-boolean-cast': 'off',
		'prefer-const': 'error',
		"unicorn/no-empty-file": "error",
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'index', 'external', 'parent', 'sibling', 'internal', 'type', 'object', 'unknown']
			}
		]
	}
}