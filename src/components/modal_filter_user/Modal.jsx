import React, { Fragment } from 'react'
import { DatePicker, Input } from 'antd';
import Select from '../layout/Select/Select'

import style from './Modal.module.css'
import SubmitButton from '../layout/submitbuttun/SubmitButton';

import { HiXMark } from "react-icons/hi2";
import { IconContext } from 'react-icons';

const handlSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.value);
}


const DataPickerStyle = {
  width: '100%',
  height: '70px',
  marginRight: 20,
};


const Data = () => (
  <Fragment>
    <p>Data de Criação</p>
    <section className={style.data_filter}>
      <DatePicker
        size='large'
        placeholder='Selecione um data'
        style={DataPickerStyle}
      />
      <DatePicker
        placeholder='Selecione um data'
        size='large'
        style={DataPickerStyle}
      />
    </section>
  </Fragment>
);


const User = () => (
  <Fragment>
    <p>Usuário</p>
    <section className={style.data_filter}>
      <Input
        placeholder='Digite o nome do Usuário'
        size='large'
        type='text'
        style={{
          height: '70px',
        }}
      />
    </section>
  </Fragment>
);


const Email = () => (
  <section className={style.email_typeUser}>
    <div>
      <p>Email</p>
      <Input
        placeholder='Digite o email'
        size='large'
        type='e-mail'
        style={{
          width: '100%',
          height: '70px',
        }}
      />
    </div>

    <div>
      <p>Tipo de Usuário</p>
      <Select />
    </div>
  </section>
);


const Buttons = () => (
  <section className={style.buttons}>
    <SubmitButton
      text="Limpar filtro"
      customClass="button_filter"
      value="Limpar_filtro"
      onClick={handlSubmit}
    />
    <SubmitButton
      text="APLICAR FILTRO"
      customClass="aplicar_filter"
      value="Aplicar_Filtro"
      onClick={handlSubmit}
    />
  </section>
)


const Form = ({ closeModal }) => (
  <form onSubmit={handlSubmit}>
    <div className={style.container_modal}>
      <nav>
        <h1>Filtrar</h1>
        <IconContext.Provider value={{ size: 30 }}>
          <HiXMark onClick={closeModal} />
        </IconContext.Provider>
      </nav>
      <div>
        <Data />
        <User />

        <Email />
        <Buttons />
      </div>
    </div>
  </form>
);


const Modal = ({ openModal, setOpenModal }) => {
  return (
    (openModal) ? <Form closeModal={setOpenModal} /> : null
  )
};

export default Modal