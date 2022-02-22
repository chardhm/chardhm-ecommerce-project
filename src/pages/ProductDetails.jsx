import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getDoc, doc } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetail() {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();
  
  useEffect(() => {
    getData()
  });

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(fireDB, "products", params.productid))
      //console.log(productTemp.data())
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
  <Layout loading={loading}>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (<div>
              <p><b>{product.name}</b></p>
              <img src={product.imageURL} alt="" className='product-info-img' />
              <hr />
              <p>{product.description}</p>
              <div className="d-flex justify-content-end mt-3">
                <button onClick={()=>addToCart(product)} >Add to Cart</button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
  </Layout>
  );
}

export default ProductDetail;