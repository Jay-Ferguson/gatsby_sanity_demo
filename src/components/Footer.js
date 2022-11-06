import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer>
        <p className='center'>&copy; Slicks slices {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
