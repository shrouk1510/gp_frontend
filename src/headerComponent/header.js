import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './header.css'


function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
    // Function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      // Save search query to localStorage
      localStorage.setItem('searchQuery', searchQuery);
      // Perform search functionality
      // Add your search logic here
      console.log('Searching for:', searchQuery);
      // Clear search input content
      setSearchQuery('');
      setShowSearchDropdown(false);
      // Update previous searches
      updatePreviousSearches(searchQuery);
    };
  
    // Function to handle input change
    const handleChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    // Function to load previous search queries from localStorage
    const loadPreviousSearches = () => {
      const previousSearchesJson = localStorage.getItem('previousSearches');
      if (previousSearchesJson) {
        setPreviousSearches(JSON.parse(previousSearchesJson));
      }
    };
  
    // Function to update previous searches in localStorage
    const updatePreviousSearches = (query) => {
      const updatedSearches = [query, ...previousSearches.filter(item => item !== query)].slice(0, 10);
      setPreviousSearches(updatedSearches);
      localStorage.setItem('previousSearches', JSON.stringify(updatedSearches));
    };
  
    // Load previous search queries from localStorage on component mount
    useEffect(() => {
      const previousSearchQuery = localStorage.getItem('searchQuery');
      if (previousSearchQuery) {
        setSearchQuery(previousSearchQuery);
        updatePreviousSearches(previousSearchQuery);
      }
      loadPreviousSearches(); // Load previous searches from localStorage
      const isDropdownShown = localStorage.getItem('showSearchDropdown') === 'true';
      setShowSearchDropdown(isDropdownShown);
    }, []);
  
    // Function to handle search item click
    const handleSearchItemClick = (query) => {
      setSearchQuery(query);
      setShowSearchDropdown(false);
    };
  
    // Function to handle search input focus
    const handleSearchInputFocus = () => {
      setShowSearchDropdown(true);
      loadPreviousSearches(); // Load previous searches from localStorage
      localStorage.setItem('showSearchDropdown', 'true');
    };
  
    // Function to handle search input blur
    const handleSearchInputBlur = () => {
      setShowSearchDropdown(false);
      localStorage.setItem('showSearchDropdown', 'false');
    };  
    return (
     
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="Home.html"><img className="img" src="imgs/logo3.jpg" alt="" /></a>
            <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon Building"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="links collapse_ul bg-success">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item home">
                    <Link to="/Home" className="nav-link" >Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Reviews" className="nav-link" href="diabetes-level-reports.html">Reviews</Link>
                  </li>
                  <li className="nav-item dropdown nature">
                    <a to='/Articles'className="nav-link" href="#">
                      Articles
                    </a>
                    <ul className="item-menu">
                        <Link to='/NaturalTips'><li>Natural Tips</li></Link>
                        <Link to='/lifestyle'><li>Lifestyle Tips</li></Link>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="btns">
                <Link to="/Sign-Up" className="btn1 bg-success" href="Sign-up.html">Sign Up</Link>
                <Link to="/Sign-In" className="btn2 bg-success" href="Sign-in.html">Sign in</Link>
              </div>
              <form className="d-flex  position-relative" onSubmit={handleSubmit} role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search for articles"
                aria-label="Search"
                value={searchQuery}
                onChange={handleChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
              />
              <button className="btnsearch  btn-outline-success" type="submit">Search</button>
              <div className='search-input'>
                {showSearchDropdown && (
                  <ul className="search-dropdown position-absolute list-unstyled m-0">
                    {previousSearches.map((item, index) => (
                      <li key={index} onClick={() => handleSearchItemClick(item)}>{item}</li>
                    ))}
                  </ul>
                )}
              </div> 
            </form>
            </div>
          </div>
        </nav>
      </header>
    );
  }


  export default Header;
