import React, { useRef, useEffect, useState } from 'react';
import './Widget.css';


const Widget = () => {
  const bankAccountsRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [cursorStyle, setCursorStyle] = useState('grab');
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(false);

  useEffect(() => {
    const bankAccounts = bankAccountsRef.current;
    
    const handleMouseDown = (e) => {
      setIsDown(true);
      setStartX(e.pageX - bankAccounts.offsetLeft);
      setStartY(e.pageY - bankAccounts.offsetTop);
      setScrollLeft(bankAccounts.scrollLeft);
      setScrollTop(bankAccounts.scrollTop);
      setCursorStyle('grabbing');
    };

    const handleMouseLeave = () => {
      setIsDown(false);
      setCursorStyle('grab');
    };

    const handleMouseUp = () => {
      setIsDown(false);
      setCursorStyle('grab');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - bankAccounts.offsetLeft;
      const y = e.pageY - bankAccounts.offsetTop;
      const walkX = (x - startX) * 1;
      const walkY = (y - startY) * 1;
      bankAccounts.scrollLeft = scrollLeft - walkX;
      bankAccounts.scrollTop = scrollTop - walkY;
    };

    const handleScroll = () => {
      const position = bankAccounts.scrollLeft;
      setLeftButtonDisabled(position === 0);
      setRightButtonDisabled(
        Math.round(position) === 
        bankAccounts.scrollWidth - 
        bankAccounts.clientWidth
      );
    };

    bankAccounts.addEventListener('mousedown', handleMouseDown);
    bankAccounts.addEventListener('mouseleave', handleMouseLeave);
    bankAccounts.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    bankAccounts.addEventListener('scroll', handleScroll);

    return () => {
      bankAccounts.removeEventListener('mousedown', handleMouseDown);
      bankAccounts.removeEventListener('mouseleave', handleMouseLeave);
      bankAccounts.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      bankAccounts.removeEventListener('scroll', handleScroll);
    };
  }, [isDown, startX, startY, scrollLeft, scrollTop]);

  const handleScrollLeft = () => {
    bankAccountsRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  };

  const handleScrollRight = () => {
    bankAccountsRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container">
      <div className="action-buttons">
        {/* ... (other action buttons remain unchanged) ... */}
        <button 
          type="button" 
          disabled={leftButtonDisabled} 
          id="action-button--previous" 
          className="action-button--horizontal-scroll"
          onClick={handleScrollLeft}
        >
          <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24">
            <path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z" />
          </svg>
        </button>
        <button 
          type="button" 
          disabled={rightButtonDisabled}
          id="action-button--next" 
          className="action-button--horizontal-scroll"
          onClick={handleScrollRight}
        >
          <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24">
            <path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z" />
          </svg>
        </button>
      </div>
      <div 
        id="bank-accounts" 
        ref={bankAccountsRef} 
        style={{ cursor: cursorStyle }}
      >
      <a href="#uk" className="bank-account">   
        <img
          className="flag"
          aria-hidden="true"
          src="/assets/uk.png" 
          alt="UK"
        />                                                                              
        <div>
          <h2 role="presentation">
             12150.25
          </h2>
          <div className="currency">
              British Pound
          </div>
        </div>          
      </a>
        <a href="#usa" className="bank-account">                    
          <img
            className="flag"
            aria-hidden="true"
            src="/assets/usa.png" 
            style={{objectPosition: '-11px center'}}
            alt="US"
          />
          <div>
              <h2 role="presentation">
                  15150.25
           </h2>
              <div className="currency">
                  US Dollar
              </div>
          </div>  
        </a>
        <a href="#eu" className="bank-account">                    
                <img
                    className="flag"
                    aria-hidden="true"
                    src="/assets/eu.png" 
                    alt="EU"
                />
                <div>
                    <h2 role="presentation">
                        7250.15
                    </h2>
                    <div className="currency">
                        Euro
                    </div>  
                </div>
            </a>
            <a href="#cz" className="bank-account">           
                <img
                    className="flag"
                    aria-hidden="true"
                    src="/assets/cz.png" 
                    alt="Czech Republic"
                />
                <div>
                    <h2 role="presentation">
                        150055.25
                    </h2>
                    <div className="currency">
                        Czech Koruna
                    </div>
                </div>         
            </a>
            <a href="#chf" className="bank-account">           
                <img
                    className="flag"
                    aria-hidden="true"
                    src="/assets/chf.png" 
                    alt="Czech Republic"
                />
                <div>
                    <h2 role="presentation">
                        2456.88
                    </h2>
                    <div className="currency">
                        Swiss Franc
                    </div>
                </div>         
            </a>
      </div>
    </div>
  );
};

export default Widget;