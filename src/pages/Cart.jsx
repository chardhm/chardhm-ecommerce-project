import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Modal } from "react-bootstrap";
import { addDoc, collection } from 'firebase/firestore';
import fireDB from '../fireConfig';
import Swal from 'sweetalert2';


function Cart() {

  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + Number(cartItem.price)
    });
    setTotalAmount(temp)
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product })
  }

  const placeOrder = async () => {
    const addressInfo = { name, address, pincode, phoneNumber };
    console.log(addressInfo);
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userId: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order Placed Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Order Failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };


  return (
    <Layout loading={loading}>

      <table className='table table-striped mt-2'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            return <tr key={index}>
              <td><img src={item.imageURL} height="80" width="80" alt="" /></td>

              <td>{item.name} </td>
              <td>$ {item.price}</td>
              <td><img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-trash-can-graphic-design-bearicons-glyph-bearicons.png" width="26" alt="" className='basura'
                onClick={() => deleteFromCart(item)}
              />
              </td>
            </tr>
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-end'>
        <h1 className='total-amount'>Total Amout = $ {totalAmount} dlls</h1>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button onClick={handleShow}>Place Order</button>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2 className='text-center'>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              maxLength={50}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              type="text"
              className="form-control mt-3"
              rows={3}
              placeholder="Address"
              maxLength={100}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Zip Code"
              maxLength={5}
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>
            Order
          </button>
        </Modal.Footer>
      </Modal>

    </Layout>
  );
}

export default Cart;