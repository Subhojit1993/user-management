import React from 'react';

export const SuccessComponent = (props) => {
	const { modalData, handleOkClick } = props;
	return(
		<div className="modal">
			<div>
				<div className="content">
					<div className="content_successTextDiv">
						{modalData.first_name + ' ' + modalData.last_name + "'s details are updated!"}
					</div>
				</div>
				<div className="actions">
					<div className="button_outer">
						<button className="toggle-button" onClick={handleOkClick}>OK</button>
					</div>
				</div>
			</div>
		</div>
	);
}