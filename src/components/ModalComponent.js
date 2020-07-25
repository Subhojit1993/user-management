import React, { useState, useEffect } from 'react';

export const ModalComponent = (props) => {
	const { setModalData, modalData, isEmpty, handleUpdate } = props;
	const F_NAME = 'fname';
	const L_NAME = 'lname';
	const E_MAIL = 'email';
	// validation // number test
	const numReg = new RegExp('^[0-9]*$');
	const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	// field object set
	const fieldObj = {...modalData};
	const [values, setValues] = useState(fieldObj);
	let isDiv = 'Loading..';
	// save button click handle
	const modalButtonClick = (e) => {
		handleUpdate(values);
		setModalData(prevData => {});
	}
	// cancel button click handle
	const cancelClick = (e) => {
		setModalData(prevData => {});
	}
	const handleChange = (e, type) => {
		// e.preventDefault();
		let changedValue = e.target.value;
		if(type === F_NAME)
			setValues(prevData => ({
				...prevData,
				first_name: changedValue
			}));
		else if(type === L_NAME)
			setValues(prevData => ({
				...prevData,
				last_name: changedValue
			}));
		else if(type === E_MAIL)
			setValues(prevData => ({
				...prevData,
				email: changedValue
			}));
	}
	const inputFields = (value, type) => {
		return(
			<div>
				<input 
					type="text" 
					value={value} 
					className="content_inputFields" 
					onChange={(e) => handleChange(e, type)}
				/>
			</div>
		);
	}
	const errorFields = (value, type) => {
		let errText = '';
		if(value === '')
			errText = "Please fill the field";
		if(numReg.test(value) && (type === F_NAME || type === L_NAME))
			errText = (
				<div>
					{"Only texts allowed!"}
				</div>
			);
		else if(type === E_MAIL && !emailReg.test(value) && value !== '')
			errText = (
				<div>
					{"Enter a valid email id!"}
				</div>
			);
		return errText;
	}
	// handle button state
	let fname = values.first_name;
	let lname = values.last_name;
	let email = values.email;
	let isDisabled = (fname === '' || lname === '' || numReg.test(fname) || numReg.test(lname) || !emailReg.test(email));
	if(!isEmpty(values)) {
		isDiv = (
			<div>
				<h2>Edit Details</h2>
				<div className="content">
					<div className="content_fieldsOuter">
						{inputFields(values.first_name, F_NAME)}
						{errorFields(values.first_name, F_NAME)}
					</div>
					<div className="content_fieldsOuter">
						{inputFields(values.last_name, L_NAME)}
						{errorFields(values.last_name, L_NAME)}
					</div>
					<div className="content_fieldsOuter">
						{inputFields(values.email, E_MAIL)}
						{errorFields(values.email, E_MAIL)}
					</div>
				</div>
				<div className="actions">
					<div className="button_outer">
						<button 
							className="toggle-button" 
							disabled={isDisabled} 
							onClick={modalButtonClick}
						>
							Save
						</button>
					</div>
					<div className="button_outer">
						<button className="toggle-button" onClick={cancelClick}>Cancel</button>
					</div>
				</div>
			</div>
		);
	}
	return(
		<div className="modal" id="modal">
			{isDiv}
		</div>
	);
}