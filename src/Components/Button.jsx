import React from 'react';

const Button = ({ className, type, children, onClick }) => {
  return (
    <button type={type} className={className} onSubmit={onClick}>
      {children}
    </button>
  );
};

export default Button;
