import { HtmlToText } from 'html-to-text';

const htmlFormatter = (html) => {
	const converter = new HtmlToText();
	return converter.convert(html);
};

export default htmlFormatter
