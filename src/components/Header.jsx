import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

    const {cartItems} = useSelector(state =>state.cartReducer);
    const {user} = JSON.parse(localStorage.getItem('currentUser'));

    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/shopee.png" width="26" alt="img not found" />
                    <Link className="navbar-brand" to="/">
                      &nbsp; Tech Store
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/menu-rounded.png" width="24" alt="" />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admin">
                                <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-user-interface-kiranshastry-solid-kiranshastry-1.png" width="22" alt="img not found" />
                                &nbsp; {user.email.substring(0, user.email.length-10)}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">
                                <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/ffffff/external-shopping-bag-e-commerce-kmg-design-glyph-kmg-design-1.png" width="22" alt="img not found" />
                                    &nbsp; Orders
                                </Link>
                            </li>
                            <li className="nav-item" onClick={logout}>
                                <div className="nav-link ">
                                <img src="https://img.icons8.com/ios-filled/50/ffffff/power-off-button.png" width="22" alt="img not found" />
                                    &nbsp; Logout
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/ffffff/external-shopping-cart-e-commerce-kmg-design-glyph-kmg-design-2.png" width="22" alt="img not found" />
                                    &nbsp; {cartItems.length}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;