import React, { ReactNode } from "react";
import scss from "./Modal.module.scss";

interface ModalProps {
	openIs: boolean;
	closeOn: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ openIs, closeOn, children }) => {
	if (!openIs) return null;
	return (
		<div className={scss.modalOverlay} onClick={closeOn}>
			<div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
				<button className={scss.closeButton} onClick={closeOn}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
