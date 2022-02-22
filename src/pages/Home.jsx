import React, { useState } from 'react';
import Layout from '../components/Layout';
import { collection, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fireproducts } from '../fireproducts-eccomerce';


function Home() {

  const [products, setProducts] = useState([]);
  const {cartItems} = useSelector(state=>state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      setLoading(true)
      const users = await getDocs(collection(fireDB, "products"))
      const productsArray = []
      users.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        productsArray.push(obj);
        setLoading(false)
      });
      //  console.log(productsArray);

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({type: 'ADD_TO_CART', payload:product})
  }


  return (

    <Layout loading={loading}>

      <div className="container">
      <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"

          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="tools">Tools</option>
          </select>
        </div>
        <div className="row">
          {products
          .filter((obj) => obj.name.toLowerCase().includes(searchKey))
          .filter((obj) => obj.category.toLowerCase().includes(filterType))
          .map((product, i) => {

            return (
            <div key={i} className="col-md-4">
              <div className="m-2 p-1 product position-relative">
                <div className='product-content'>
                <p>{product.name}</p>
                <div className='text-center'>
                  <img src={product.imageURL} alt="" className='product-img' />
                </div>
                </div>
                <div className='product-actions'>
                  <h2>$ {product.price} dlls</h2>
                  <div className="flex">
                    <button className='mx-2' onClick={()=>addToCart(product)}>
                    <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/ffffff/external-add-to-cart-e-commerce-kmg-design-glyph-kmg-design-1.png" width="22" alt="" />
                     &nbsp; Add to Cart
                    </button>
                    <button onClick={() => {
                      navigate(`/productdetail/${product.id}`)
                    }}>
                    <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/ffffff/external-View-essential-collection-bearicons-glyph-bearicons-3.png" width="22" alt="" />
                     &nbsp; View
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>


    </Layout >

  );
}

export default Home;