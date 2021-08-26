import React, {useEffect} from 'react';
import ReactDom from 'react-dom';
//
import css from './Modal.module.css'

const Modal = props => {
	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		}
	});

	const handleKeydown = e => {
		if (e.keyCode === 27) props.onDismiss();
	};

	return ReactDom.createPortal(
		<div onClick={props.onDismiss} className={`${css.active} ${css.modal_shadow}`}>
			<div onClick={e => e.stopPropagation()} className={css.modal}>
				<div className={css.modal_header}>{props.header}</div>
				<div className={css.modal_content}>{props.content}</div>
				<div className={css.modal_actions}>{props.actions}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;