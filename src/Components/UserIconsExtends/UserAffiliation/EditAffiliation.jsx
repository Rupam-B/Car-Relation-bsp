import React from 'react'
import './EditAffiliationStyle.css'
import { Link } from 'react-router-dom'

const EditAffiliation = () => {
    return (
        <div className='User-Affliation-main-div'>
            <div className='User-Affliation-sub-div'>
                <Link to={'/UserDashboard'}><i className="fa-solid fa-arrow-left back-to-user-dashboard"></i></Link>
                <div className='Affliation-Top-Heading'>
                    <h1>Your Affiliation</h1>
                </div>
                <div className='Affliation-top-head-line'></div>
                <div className='Affliation-content-div'>
                <div className='Affliation-number-Show-div'>
                <i style={{color:'#520099'}} className="fa-brands fa-affiliatetheme"></i>
                <h4><span className='Affliation-date-span'>Affiliation no : </span> 876FGY54R</h4>
                </div>
                <div className='Affliation-date-div'>
                <h4><span className='Affliation-date-span'>Affiliated Since :  </span>2 Dec 2023</h4>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditAffiliation