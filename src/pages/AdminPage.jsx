import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { Modal, Tabs, Tab } from "react-bootstrap";
import Swal from 'sweetalert2';


function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);

      handleClose();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Product update failed',
            showConfirmButton: false,
            timer: 1500
          })
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product added successfully',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Product add failed',
            showConfirmButton: false,
            timer: 1500
          })
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      getData();
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Product delete failed',
            showConfirmButton: false,
            timer: 1500
          })
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" alt="" />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                    <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/ff0000/external-trash-can-graphic-design-bearicons-glyph-bearicons.png"
                       className="buttonAdm"
                       width="26" 
                       alt=""
                       onClick={() => {
                         deleteProduct(item);
                       }}
                    />

                    
                    <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/50/008000/external-edit-interface-kiranshastry-solid-kiranshastry.png"
                        className="buttonAdm"
                        width="26" 
                        alt=""
                        onClick={() => editHandler(item)}
                    />

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "Add a product" : "Edit Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.imageURL}
                  placeholder="image url"
                  className="form-control"
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.price}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>
              {add ? (
                <button onClick={addProduct}>Save</button>
              ) : (
                <button onClick={updateProduct}>Save</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
            return (
              <table className="table mt-3 order">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.imageURL} height="80" width="80" alt=""/>
                        </td>

                        <td>{item.name}</td>
                        <td>$ {item.price} dlls</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default AdminPage;