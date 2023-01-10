import React from 'react';
import './CSS/footer.css';



function Footer() {
    return (
      <footer className="row-footer">
        <div className='copyright'>
          <p> © 2022 - Developed by Matias Schmidt</p>
        </div>
        <div className='arriba'>
          <a className="smoothscroll" id='back-to-top' href="#top"> ^ </a>
        </div>
      </footer>
    );
}


export default Footer;