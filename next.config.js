const nextConfig = {
	publicRuntimeConfig: {
		AppName: 'SANDBOX'
	},
	eslint: {
		ignoreDuringBuilds: true,
		dirs: ['.']
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'api-entrytest.sandboxindonesia.id',
				port: '',
				pathname: '/media/tourist_object/**'
			}
		]
	},
	env: {
		API_HOST: process.env.NEXT_PUBLIC_API_HOST,
		SESSION_KEY: process.env.SESSION_KEY
	},
	poweredByHeader: false,
	trailingSlash: true,
	transpilePackages: ['antd'],
	reactStrictMode: false,
	distDir: 'dist'
}

module.exports = nextConfig
