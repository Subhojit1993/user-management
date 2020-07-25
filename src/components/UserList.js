import React, { useState, useEffect } from 'react';
import { ModalComponent } from './ModalComponent';
import { SuccessComponent } from './successComponent';
import { updateUsers } from "../actions/userActions";
import { connect } from "react-redux";
// with router import
import { withRouter } from 'react-router-dom';

export const UserList = (props) => {
	const { persons, lastUserRef, loadingText, updatedUser, updateUsers } = props;
	const dataObj = {};
	const [modalData, setModalData] = useState(dataObj);
	const [successModalData, setSuccessData] = useState({});
	let peopleList = '';
	let modalDiv = '';
	let successModal = '';
	let isUpdate = false;
	const isEmpty = obj => {
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}
	const handleClick = (e, data) => {
		setModalData(prevData => ({...data}));
	}
	const handleUpdate = data => {
	    setSuccessData(prevData => ({...data}));
	    updateUsers(data);
	}
	const handleOkClick = e => {
		setSuccessData(prevData => ({}));
	}

	// niyo movie listing logic
	/*if(index == movies.length - 1)
		return(
			<div ref={lastMovieRef} key={movie.movieKey} className="movies_cardOuter">
				{movieCards}
			</div>
		);
	else*/

	if(!isEmpty(modalData))
		modalDiv = (
			<div id="myModal" className="myModal">
				<ModalComponent 
					setModalData={setModalData} 
					modalData={modalData} 
					isEmpty={isEmpty}
					handleUpdate={handleUpdate}
				/>
			</div>
		);
	if(!isEmpty(successModalData))
		successModal = (
			<div id="myModal" className="myModal">
				<SuccessComponent 
					handleOkClick={handleOkClick}
					modalData={successModalData}
				/>
			</div>
		);
	if(persons.length > 0)
		peopleList = persons.map((person, index) => {
			let personsCard = (
				<div className="persons_card">
					<div className="persons_Avatar">
						<img src={person.avatar} className="persons_img"/>
					</div>
					<div className="persons_fullName persons_textFont">
						{person.first_name + ' ' + person.last_name}
					</div>
					<div className="persons_email persons_textFont">
						{person.email}
					</div>
				</div>
			);
			if(index == persons.length - 1){
				return(
					<div ref={lastUserRef} key={person.id} className="persons_cardOuter" onClick={(e) => handleClick(e, person)}>
						{personsCard}
					</div>
				)
			}
			else {
				return(
					<div key={person.id} className="persons_cardOuter" onClick={(e) => handleClick(e, person)}>
						{personsCard}
					</div>
				)
			}				
		})
	return(
		<div className="persons_classList_outer">
			{modalDiv}
			{successModal}
			<div className="persons_classList">
				{peopleList}
				{loadingText}
			</div>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    updateUsers: (dataAction) => {
      dispatch(updateUsers(dataAction))
    }
  };
}

export const UsersCardsList = withRouter(connect(null, mapDispatchToProps)(UserList));