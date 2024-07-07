import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { searchArticlesRequest } from '../lib/api/article';
import { Loader } from 'lucide-react';
import { useModal } from '../hooks/use-modal-store';

import './Registered.css';
import { useAuthContext } from '../contexts/auth-context';

function RegisteredNav() {
  const { logoutAdmin, logoutUser, role } = useAuthContext()
  const { onOpen } = useModal()
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchField, setShowSearchField] = useState(false);
  const [isFetching, setIsFetching] = useState(false)
  const [articles, setArticles] = useState(null)

  const handleSearchIconClick = () => {
    setShowSearchField(!showSearchField);
  };

  const navigate = useNavigate()

  const handleSearch = async (event) => {
    event.preventDefault();
    // Save search query to localStorage
    localStorage.setItem('searchQuery', searchQuery);
    // Perform search functionality

    // Add your search logic here
    setIsFetching(true)
    try {
      const fetchedArticles = await searchArticlesRequest(searchQuery)

      setArticles(fetchedArticles)

      // console.log('Searching for:', searchQuery);
      // Clear search input content
      setSearchQuery('');

      toast.success('search success')
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error)
    } finally {
      setIsFetching(false)
      // Update previous searches
    }

  };


  const handleLogout = async () => {
    try {
      if (role === "ADMIN") {
        await logoutAdmin();
        toast.success("Admin logout");
      } else {
        await logoutUser();
        toast.success("User logout");
      }

      navigate("/");
    } catch (error) {
      typeof error === "string" ? toast.error(error) : alert(error);
    }
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
                <li className="nav-item">
                  <Link to='/reviewsB' className="nav-link">Reviews</Link>
                </li>
                <li className="nav-item dropdown nature">
                  <a className="nav-link" href="#">Articles</a>
                  <ul className="item-menu">
                    <Link to='/NewNat'><li>Natural Tips</li></Link>
                    <Link to='/userlifestyle'><li>Lifestyle Tips</li></Link>
                  </ul>
                </li>
                <li className="nav-item dropdown nature">
                  <Link to='/UploadData' className="nav-link">Records</Link>
                </li>
                <li className="nav-item dropdown nature">
                  <Link to='/MedicationL' className="nav-link">Health Lists</Link>
                </li>
                <li className="nav-item">
                  <Link to='/predict' className="nav-link">Predict diabetes</Link>
                </li>
                <li className="nav-item">
                  <Link to='/graph' className="nav-link">graphs</Link>
                </li>
                <li className="nav-item">
                  <Link to='/Location' className="nav-link">Locations</Link>
                </li>
              </ul>
            </div>
            <div className="icons">
              <Link className="icon1" onClick={handleSearchIconClick}>
                <span className="material-symbols-outlined">search</span>
              </Link>
              <Link to="/userprofile" className="icon1"><span className="material-symbols-outlined">person</span></Link>
              <div className="icon2" onClick={handleLogout} style={{ display: "inline-block", cursor: "pointer" }}><span className="material-symbols-outlined">logout</span></div>
            </div>
          </div>
        </div>
      </nav>
      {showSearchField && (
        <div className="search-field-container">
          <div style={{ display: "flex" }}><input type="text" className="form-control search-field" placeholder="Type your search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> <button className="btnsearch  btn-outline-success" onClick={handleSearch}>Search</button></div>
          {articles && !isFetching ? <ul className="search-dropdown position-absolute list-unstyled m-0">
            {articles.length > 0 ? articles?.map((article) => (
              <li style={{
                cursor: "pointer"
              }} key={article.articleId} onClick={() => onOpen("showArticle", { article })}>{article?.name}</li>
            )) : <li>no articles found</li>}

          </ul> : isFetching ? <ul className="search-dropdown position-absolute list-unstyled m-0"> <li><Loader /></li></ul> : null}
        </div>
      )}
    </header>
  );
}

export default RegisteredNav;
