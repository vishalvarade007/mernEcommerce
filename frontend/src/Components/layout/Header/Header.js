import React, { useRef, useState } from 'react';
import {Link} from "react-router-dom";
import {FaSearch,FaShoppingCart,FaUserCircle} from "react-icons/fa";
import "./header.css";
import Backdrop from "@material-ui/core/Backdrop";


export function Header() {
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleMenu = ()=>{
      menuRef.current.classList.toggle("icon");
      navRef.current.classList.toggle("change");
      setOpen(!open);
  }
  return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <div id='navigation'>
    <div id='menu' ref={menuRef} onClick={handleMenu}>
      <div id='bar1' className='bar'></div>
      <div id='bar2' className='bar'></div>
      <div id='bar3' className='bar'></div>
    </div>
    <ul className='nav' ref={navRef}>
      <li onClick={handleMenu}><Link to="/">Home</Link></li>
      <li onClick={handleMenu}><Link to="/products">Products</Link></li>
      <li onClick={handleMenu}><Link to="/about">About</Link></li>
      <li onClick={handleMenu}><Link to="/contact">Contact</Link></li>
      <li onClick={handleMenu}><Link to="/search">{<FaSearch/>}</Link></li>
      <li onClick={handleMenu}><Link to="/cart">{<FaShoppingCart/>}</Link></li>
      <li onClick={handleMenu}><Link to="/login">{<FaUserCircle/>}</Link></li>
    </ul>
  </div>
    </>
  )
}
