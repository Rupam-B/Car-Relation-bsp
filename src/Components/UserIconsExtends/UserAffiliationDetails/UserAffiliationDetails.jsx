import React from 'react'
import './UserAffiliationStyle.css'
import { Link } from 'react-router-dom'

const EditAffiliation = () => {

    const UserAffiliationDetails = localStorage.getItem('car-relation-user-AffId')
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
                <h4><span className='Affliation-date-span'>Affiliation no : </span> {UserAffiliationDetails}</h4>
                </div>
                <div className='Affliation-date-div'>
                <h4><span className='Affliation-date-span'>Affiliated Since :  </span>22 Jan 2024</h4>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditAffiliation