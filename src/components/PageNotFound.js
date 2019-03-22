import React from 'react'
import { Link } from 'react-router-dom'


const PageNotFound =()=>{
  return(
    <div className='ui segment'>
      <h3 className="ui red block header">404 - Page Not Found</h3>
      <h2> The page you requested was not found.</h2>
      <Link className="ui button"
        to='/'>
        Go to home page.
      </Link>
    </div>
    )
}

export default PageNotFound;
