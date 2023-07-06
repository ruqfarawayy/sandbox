// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const QuillEditor = ({ value, onChange }) => {
	return (
		<ReactQuill
			value={value}
			onChange={onChange}
			theme="snow"
			modules={{
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
					['link', 'image', 'clean']
				]
			}}
		/>
	)
}

export default QuillEditor
