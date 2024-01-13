
import styles from './SignGroups.module.css';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../../layout/AppBar/MenuAppBar'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CRow
} from '@coreui/react';

import api from '../../../services/api';
import { Steps } from 'antd';

const RepresentanteGroup = ({ representative, setRepresentative }) => {

  const handleChange = (e) => {
    setRepresentative(e.target.value);
  };

  return (
    <section className={styles.representantes}>
      <CFormInput
        type='text'
        label="Representante"
        placeholder='exemplo@email.com'
        name='representative'
        value={representative}
        onChange={handleChange}
      />
    </section>
  );
};

const Observations = ({ observations, setObservations, name, setName, type_group, setType_group }) => {

  const handleObservations = (e) => {
    setObservations(e.target.value)
  }

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleRadioChange = (e) => {
    setType_group(e.target.value);
  };

  return (
    <section>
      <CFormInput
        type='text'
        label="Nome do Grupo"
        variant="standard"
        name='name'
        placeholder='Ex: Comissão'
        value={name}
        onChange={handleChange}
        className='mb-3'
      />

      <h5 style={{ fontSize: '16px' }}>Tipo de grupo</h5>

      <CRow>
        <CFormCheck
          inline
          type="radio"
          name="groupType"
          value="interno"
          label="Interno"
          onChange={handleRadioChange}
          defaultChecked
        />
        <CFormCheck
          inline
          type="radio"
          name="groupType"
          value="externo"
          label="Externo"
          onChange={handleRadioChange} />
      </CRow>

      <CFormTextarea
        label="Observações"
        placeholder='Digite aqui as observações'
        value={observations}
        rows={5}
        onChange={handleObservations}
      />
    </section>
  );
};

const FormSignGroup = ({ form, setForm }) => {

  const handleSubmit = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <CContainer>
      <CRow className='d-flex gap-2'>
        <CCol className='p-0'>
          <CFormInput
            type='text'
            label="Conselho"
            name='council'
            placeholder='Digite o conselho'
            value={form.council}
            onChange={handleSubmit}
          />
          <CFormInput
            type='text'
            label="Orgão"
            name='organ'
            placeholder='Digite o orgão'
            value={form.organ}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Equipe"
            name='team'
            placeholder='Digite a equipe'
            value={form.team}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="E-mail"
            name='email'
            placeholder='Digite o e-mail'
            value={form.email}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Oficio que indicou"
            name='office_indicated'
            placeholder='Digite o oficio indicado'
            value={form.office_indicated}
            onChange={handleSubmit}
          />
        </CCol>

        <CCol className='p-0'>
          <CFormInput
            type='text'
            label="Entidade"
            name='entity'
            placeholder='Digite a entidade'
            value={form.entity}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Sigla"
            variant="standard"
            name='acronym'
            placeholder='Digite a sigla'
            value={form.acronym}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Unidade"
            variant="standard"
            name='unit'
            placeholder='Digite a unidade'
            value={form.unit}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Portaria Interna"
            variant="standard"
            name='internal_concierge'
            placeholder='Digite a portaria'
            value={form.internal_concierge}
            onChange={handleSubmit}
          />

          <CFormInput
            type='text'
            label="Oficio Solicitado"
            variant="standard"
            name='office_requested'
            placeholder='Digite o oficio solicitado'
            value={form.office_requested}
            onChange={handleSubmit}
          />
        </CCol>
      </CRow>
    </CContainer>
  );
};

const SignGroups = () => {
  const [formulario, setFormulario] = useState({
    entity: '',
    organ: '',
    council: '',
    acronym: '',
    internal_concierge: '',
    team: '',
    email: '',
    unit: '',
    office_requested: '',
    office_indicated: '',
  });

  const [representative, setRepresentative] = useState("");
  const [observations, setObservations] = useState([]);
  const [name, setName] = useState("");
  const [type_group, setType_group] = useState('interno');
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  const steps = [
    {
      title: 'Grupo',
      content: <FormSignGroup form={formulario} setForm={setFormulario} />,
    },
    {
      title: 'Representante',
      content: <RepresentanteGroup representative={representative} setRepresentative={setRepresentative} />,
    },
    {
      title: 'Observações',
      content: <Observations
        observations={observations}
        setObservations={setObservations}
        name={name}
        setName={setName}
        type_group={type_group}
        setType_group={setType_group}
      />,
    },
  ];

  const Submit = async (e) => {
    e.preventDefault();

    const updatedFormulario = {
      ...formulario,
      name,
      type_group,
      observations,
      representative
    };

    try {
      await api.post('group', updatedFormulario).then(() => {
        navigate('/gerente', {
          state: {
            message: 'Grupo criado com sucesso!',
            messagetype: 'success',
            showMessage: true,
          }
        });
      });

    } catch (error) {
      console.error('Erro ao enviar formulário:', error.response.data);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Fragment>
      <MenuAppBar />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={8} xl={10}>
              <CCard className="mx-4">
                <CCardHeader className='p-2' style={{ backgroundColor: 'transparent' }}>
                  <Steps current={current} items={items} type="navigation" />
                </CCardHeader>
                <CCardBody className="p-4">
                  <CForm className={styles.form} onSubmit={Submit}>
                    <div className="mb-4">{steps[current].content}</div>

                    <div className='d-flex justify-content-between'>
                      {current > 0 && (
                        <CButton color='secondary' onClick={() => prev()}>Anterior</CButton>
                      )}

                      {current < steps.length - 1 && (
                        <CButton color="primary" onClick={() => next()} >
                          Próximo
                        </CButton>
                      )}

                      {current === steps.length - 1 && (
                        <CButton color='primary' type='submit'>
                          Feito
                        </CButton>
                      )}
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </Fragment>
  )
}

export default SignGroups;