
import { Header } from "antd/es/layout/layout";
import style from './Header.module.css'
import { NavLink } from "react-router-dom";

const HeaderBar = ({text, backPageIcon, backPage}) => {

  return (
    <Header className={style.header}>
      <NavLink 
        className={style.backPage}
        to={backPage || '/'}
      >
        {backPageIcon}
      </NavLink>
      <h4>{text}</h4>
    </Header>
  );
};

export default HeaderBar;