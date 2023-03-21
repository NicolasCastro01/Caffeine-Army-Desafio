import './accordion-content-styles.css';

function AccordionContentInfoTag({ title, value = '' }) {
  return (
    <span><span id="accordion-content-info">{title}: </span>{value}</span>
  );
}

export default AccordionContentInfoTag;
