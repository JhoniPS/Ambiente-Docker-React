import styles from './Card.module.css'

import LinkButton from '../layout/linkbutton/LinkButton'

const Card = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <img src={icon} alt='image_do_card'/>
      <h6>{title}</h6>
      <p>{description}</p>
      <div>
        <LinkButton text="GERENCIAR" customClass="color_button"/>
      </div>
    </div>
  );
};

export default Card;