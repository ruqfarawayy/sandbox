import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => <App {...props} />
			})

		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			styles: <>{initialProps.styles}</>
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<>
						<title>{publicRuntimeConfig.AppName}</title>
					</>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
