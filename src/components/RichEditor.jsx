/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	CodeButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton,
} from 'draft-js-buttons';
import editorStyles from '../resources/rich-editor.css';
import '../resources/rich-editor.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import { EDITOR_PLACEHOLDER } from '../resources/constants'
class HeadlinesPicker extends Component {
	componentDidMount() {
		setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.onWindowClick);
	}

	onWindowClick = () => this.props.onOverrideContent(undefined);

	render() {
		const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
		return (
			<div>
				{buttons.map((Button, i) => // eslint-disable-next-line
					<Button key={i} {...this.props} />
				)}
			</div>
		);
	}
}

class HeadlinesButton extends Component {
	onClick = () =>
		this.props.onOverrideContent(HeadlinesPicker);

	render() {
		return (
			<div className="headlineButtonWrapper">
				<button onClick={this.onClick} className="headlineButton">
					H
        </button>
			</div>
		);
	}
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

export default class RichEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			updatedText: '',
		}
	}
	static getDerivedStateFromProps(props, state) {
		if(props.editorContentValue) {
			const contentState = convertFromRaw(JSON.parse(props.editorContentValue))
			const newText = contentState.getPlainText();
			if(state.updatedText !== newText) {
				return {
					editorState: EditorState.createWithContent(contentState),
					updatedText: newText
				}
			}
			return {
				...state
			}
		}
	}
	onChange = (editorState) => {
		const contentState = editorState.getCurrentContent();
		this.props.setEditorData(JSON.stringify(convertToRaw(contentState)));
		this.setState({
			editorState,
		});
	};

	focus = () => {
		this.editor.focus();
	};

	render() {
		return (
			<div>
				<div className={editorStyles.editor} onClick={this.focus}>
					<hr />
					<Toolbar>
						{
							(externalProps) => (
								<div>
									<BoldButton {...externalProps} />
									<ItalicButton {...externalProps} />
									<UnderlineButton {...externalProps} />
									<CodeButton {...externalProps} />
									<Separator {...externalProps} />
									<HeadlinesButton {...externalProps} />
									<UnorderedListButton {...externalProps} />
									<OrderedListButton {...externalProps} />
									<BlockquoteButton {...externalProps} />
									<CodeBlockButton {...externalProps} />
								</div>
							)
						}
					</Toolbar>
					<hr />
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						plugins={plugins}
						placeholder={EDITOR_PLACEHOLDER}
						ref={(element) => { this.editor = element; }}
					/>
				</div>
			</div>
		);
	}
}