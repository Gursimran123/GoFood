import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])
  const [search,setSearch]=useState('')

  const onChange= (e)=>{
    setSearch(e.target.value);
  }
  const loadData = async() =>{
    let response = await fetch("http://localhost:5000/api/foodData",{
    method:"POST",
    headers:{
    'Content-Type':'application/json'
    }
  });
  response=await response.json();
  setFoodItem(response[0]);
  setFoodCat(response[1]);
}
useEffect(()=>{
   loadData();
},[])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
       <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain center  !important"}}>
  <div className="carousel-inner" id="carousel">
  <div className="carousel-caption" style={{zIndex:"10"}}>
     <div className="d-flex justify-content-center" role="search">
      <input className="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/100*100?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/100*100?burger" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/100*100?noodles" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="container">
        {
          foodCat !== [] 
          ? foodCat.map((data)=>{
            return (<div className="row mb-3">
              <div className="fs-3 m-3" key={data._id}>
               {data.CategoryName}
              </div>
              <hr />
              {foodItem!==[]
              ? foodItem.filter((item)=>(item.CategoryName===data.CategoryName) &&
              (item.name.toLowerCase().includes(search.toLowerCase())))
              .map(filterItems =>{
                return(
                  <div key={filterItems._id} className="col-12 col-lg-3 col-md-6 mx-3">
                    <Card foodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                )
              }):<div>No Such data found</div>
              }
              </div>
            )
          
          }):<div>Category Not found</div>
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

