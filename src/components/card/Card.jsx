import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom';

import LinkButton from '../layout/linkbutton/LinkButton'

const Card = ({ icon, title, description, to, customClass }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className={`${styles.card} ${styles[customClass]}`} onClick={handleClick}>
      <img src={icon} alt='image_do_card' />
      <h6>{title}</h6>
      <p>{description}</p>
      <div>
        <LinkButton text="GERENCIAR" customClass="color_button" to={to} />
      </div>
    </div>
  );
};

export default Card;