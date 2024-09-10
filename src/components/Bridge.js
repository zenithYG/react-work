import React from 'react';
import '../App.css';


const Bridge = () => {
  const buttonsSection1 = Array.from({ length: 10 }, (_, i) => `Button ${i + 1}`);
  const buttonsSection2 = Array.from({ length: 5 }, (_, i) => `Button ${i + 1}`);

  return (
    <div>
      <div>브릿지 테스트 페이지 입니다.</div>
    <section className="section">
      <h2>Section 1</h2>
      <div className="grid-container">
        {buttonsSection1.map((buttonText, index) => (
          <button key={index} className="grid-item">
            {buttonText}
          </button>
        ))}
      </div>
    </section>

    <section className="section">
      <h2>Section 2</h2>
      <div className="grid-container">
        {buttonsSection2.map((buttonText, index) => (
          <button key={index} className="grid-item">
            {buttonText}
          </button>
        ))}
      </div>
    </section>
  </div>
  );
};

export default Bridge;
