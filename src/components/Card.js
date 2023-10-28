import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  let options=props.options;
  let priceOptions=Object.keys(options);
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");

  const onChangeQty = (e)=>{
    setQty(e.target.value);
  }
  const onChangeSize =(e)=>{
    setSize(e.target.value);
  }

  const handleAddToCart = async () => {
    let food=[]
    for (const item of data){
      if(item.id===props.foodItem._id){
        food=item;

        break;
      }
    }
    if(food!==[]){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
        return
      }
      else if(food.size!==size){
           await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
    //  await console.log(data);
         return
      }
      return
    }
     await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});

  }
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100  bg-success rounded" onChange={onChangeQty}>
                {Array.from(Array(7), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100  bg-success rounded"  ref={priceRef} onChange={onChangeSize}>
               {priceOptions.map((price)=>{
                return <option key={price} value={price}>{price}</option>
               })}
              </select>
              <div className="h-100 fs-5 d-inline">Rs.{finalPrice}/-</div>
            </div>
            <hr />
            <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
