import './accordion-styles.css';
import ExpandArrowIcon from '../../../../common/icons/expand-arrow';
import React, { useState } from 'react';

function AccordionTag({ title, children }) {
  const [showAccordion, setShowAccordion] = useState(false);

  function handleShowAccordion() {
    setShowAccordion(!showAccordion);
  }

  return (
    <div id="accordion-container">
      <div id={`accordion-head${showAccordion ? ` ${showAccordion}` : ''}`} onClick={handleShowAccordion}>
        <p id="accordion-title">{title}</p>
        <ExpandArrowIcon show={showAccordion} />
      </div>

      <div id={`accordion-content${showAccordion ? ` ${showAccordion}` : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default AccordionTag;
