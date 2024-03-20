import React, { useEffect, useState } from 'react'
import BaseURL from '../../../apiconfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AddTargetingToDisplay } from '../../../Reduxs/action';
import { useDispatch } from 'react-redux';
import { addThisImage } from '../../../Reduxs/action';

const SearchFunction = () => {

    const HomeDispatch = useDispatch()
    const [apiData,setApiData] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const [searchText, setSearchtext] = useState('');

    const carReqData=apiData.data

    console.log(searchText)


    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const response = await axios.get(`${BaseURL}/cars`, {
              mode:'no-cors',
              headers: {
                Accept: 'application/json',
              },
            });
      
            if (response.status >= 200 && response.status < 300) {
              const data = response.data;
              if(data){
                setApiData(data)
              }
            } else {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(error.message)
          }
          finally{
            setIsLoading(false)
          }
        };
      
        fetchData();
      }, []);


      const handleNavigateToExtendSelectedAdd =(id, image, make)=>{
        HomeDispatch(addThisImage(image, make))
        HomeDispatch(AddTargetingToDisplay(id))
      }
  return (
    <div style={{paddingBottom:'300px'}} className="Home-Main-div">
    <div className='Home-Search-div'>
      <Link to={'/SearchFunction'}><i style={{width:'20px'}} className="fa-solid fa-magnifying-glass Home-Search-icon"></i></Link>
      <input onChange={(e)=>setSearchtext(e.target.value)} type="text" placeholder='Search'/>
      {/* <i className="fa-solid fa-chart-simple Home-Filter-icon"></i> */}
    </div>
    <div className="Home-sub-div">
      <div className="Home-Listing-Header">
      </div>
      <div className="Home-middle-content">
        {carReqData && carReqData.length > 0 ? (
          carReqData.filter((item) => {
            return searchText ? item.make.toLowerCase().includes(searchText.toLowerCase()) : false;
          }).length > 0 ? (
            carReqData.filter((item) => {
              return searchText ? item.make.toLowerCase().includes(searchText.toLowerCase()) : false;
            }).map((items)=>(
              <div key={items.id} className="card card-width-18">
                <div className='Home-middle-content-image-div'>
                  <Link  onClick={()=>handleNavigateToExtendSelectedAdd(items.id,items.image,items.make)} to={'/DisplayCarDetails'}><img src={items.image[0]} className="card-img-top" alt="No Images Available"/></Link>
                </div>
                <div className="card-body home-card-body">
                  <div className='car-home-main-title-div'>
                    <h6 className="card-title car-home-main-title">{items.make.length>23?`${items.make.slice(0,23)}...`:items.make}</h6>               
                  </div>
                  <div className="card-text">
                    {items.model.length>20?`${items.model.slice(0,20)}...`:items.model}
                    <div className='car-cost-heading-div'>
                      <h5 className='car-cost-heading5'>₹{items.sale_value}</h5>
                      <p>{items.km_driven}kms</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6 style={{ width: '100vw', margin: 'auto', textAlign: 'center',marginTop:'100px' }}>No matches found</h6>
          )) : (
            isLoading ? <h6 style={{ width: '100vw', margin: 'auto', textAlign: 'center' }}>Search...</h6> :
              <h6 style={{ width: '100vw', margin: 'auto', textAlign: 'center' }}>404 : Error Fetching Adds</h6>
          )}
      </div>
      <div className="Home-page-navigation-div"></div>
    </div>
  </div>
  )
}

export default SearchFunction