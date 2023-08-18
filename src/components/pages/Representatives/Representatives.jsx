import { Fragment, useState } from "react";
import HeaderBar from "../../layout/header/HeaderBar";
import SubmitButton from "../../layout/submitbuttun/SubmitButton"

import { ImArrowLeft2 } from "react-icons/im";
import { IoIosFunnel } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import style from "./Representatives.module.css"

import Table from "../../TableRepresentative/TableRepresentative";
import Modal from "../../Modals/modal_filter_representative/Modal";
import { IconContext } from "react-icons";
import LinkButton from "../../layout/linkbutton/LinkButton";

const Representative = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage="/manager" />
      <div className={style.representatives}>
        <h2>Representantes</h2>
        <section className={style.section_search}>
          <SubmitButton
            text="Filtro"
            customClass="button_filter"
            onClick={() => setOpenModal(true)}
            icon={
              <IconContext.Provider value={{ size: 20 }}>
                <IoIosFunnel />
              </IconContext.Provider>
            }
          />
          <LinkButton
            text="Add Representante"
            customClass="add"
            to="/SignRepresentantes"
            icon={
              <IconContext.Provider value={{ size: 25 }}>
                <IoMdAdd />
              </IconContext.Provider>
            }
          />
        </section>

        <Modal
          openModal={openModal}
          setOpenModal={() => setOpenModal(!openModal)}
        />

        <h4>FILTROS RÁPIDOS</h4>
        <section className={style.button_filters}>
          <SubmitButton text="Mais Recentes" customClass="button_filtes_bar" />
          <SubmitButton text="Mais Antigos" customClass="button_filtes_bar" />
          <SubmitButton text="Crescente" customClass="button_filtes_bar" />
          <SubmitButton text="Descrecente" customClass="button_filtes_bar" />
        </section>

        <Table />

      </div>
    </Fragment>
  );
};

export default Representative;