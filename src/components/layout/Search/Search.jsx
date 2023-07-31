import { Fragment } from "react";
import img from "../../../img/procurar.svg"
import style from "./Search.module.css"

const Search = () => {
  return (
    <Fragment>
      <div className={style.inputContainer} >
        <input
          type="text"
          name="search"
          placeholder="Pesquisa"
        />
        <img src={img} alt="Search" />
      </div>

      <div className="dataResult">

      </div>
    </Fragment>
  );
};

export default Search;