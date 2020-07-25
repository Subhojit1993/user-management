import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from "react-redux";
import { fetchUsers } from "./actions/userActions";
import { UsersCardsList } from './components/UserList';
import { MyNote } from './components/MyNote';
// import logo from './logo.svg';
import './App.css';
// react router import
import { Switch, Route, withRouter } from 'react-router-dom';

function App(props) {
  const { users, loading, page, total_pages, updatedUser } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();
  let loadingText = '';
  // data fetch
  useEffect(() => {
    props.dispatch(fetchUsers(pageNumber));
  }, [pageNumber])
  let hasMore = false;
  if(page && total_pages && page !== total_pages)
    hasMore = true;
  // infinite scroll logic
  const lastUserRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if(node) observer.current.observe(node)
  }, [hasMore])
  
  // movie list infinite scroll logic
  /*const observer = useRef();
  let hasMore = false;
  if(movies.length < totalResults)
    hasMore = true;
  const lastMovieRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        let pageNumber = page + 1;
        setDropData(prevData => ({...prevData, pageNumber, reRender: !prevData.reRender, scrolled: true}));
      }
    })
    if(node) observer.current.observe(node)
  }, [hasMore])*/

  // loading text set
  if(loading)
    loadingText = "Loading...";
  return (
    <div className="App">
      <header className="App-header">
        <div className="display_Inline left_Align flex_Align">
          <a href="/" className="textFont font_important">
            Users
          </a>
        </div>
        <div className="display_Inline right_Align flex_Align">
          <a href="/note" className="textFont">
            Subhojit
          </a>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
          <UsersCardsList 
            persons={users} 
            lastUserRef={lastUserRef} 
            loadingText={loadingText}
            updatedUser={updatedUser} 
          />
        </Route>
        <Route exact path="/note">
          <MyNote/>
        </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users.persons,
    loading: state.users.loading,
    error: state.users.error,
    page: state.users.page,
    total_pages: state.users.total_pages,
    updatedUser: state.users.updatedUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
