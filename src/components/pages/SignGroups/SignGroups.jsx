import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../../layout/AppBar/MenuAppBar';
import useAuthContext from '../../contexts/Auth';
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
  CRow,
  CSpinner
} from '@coreui/react';
import api from '../../../services/api';
import { Steps } from 'antd';
import Message from '../../layout/Message/Message';


const RepresentanteGroup = ({ representative, setRepresentative }) => {
  const { error, messageErrors } = useAuthContext()

  const handleChange = (e) => {
    setRepresentative(e.target.value);
  };

  return (
    <section className='d-flex gap-2 flex-column'>
      <CFormInput
        type='text'
        label="Email do representante"
        placeholder='exemplo@email.com'
        name='representative'
        value={representative}
        onChange={handleChange}
        feedbackInvalid={messageErrors.representative}
        invalid={error}
      />
    </section>
  );
};

const Content = ({ form, setForm }) => {

  const { error, messageErrors, } = useAuthContext()

  const handleSubmit = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <CContainer fluid>
      <CRow className='w-100' xs={{ cols: 1 }} sm={{ cols: 1 }} md={{ cols: 1 }} lg={{ cols: 2 }} xl={{ cols: 2 }} xxl={{ cols: 2 }}>
        <CCol>
          <CFormInput
            type='text'
            label="Conselho"
            name='council'
            placeholder='Digite o conselho'
            value={form.council}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.council}
            invalid={error}
          />
          <CFormInput
            type='text'
            label="Orgão"
            name='organ'
            placeholder='Digite o orgão'
            value={form.organ}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.organ}
            invalid={error}
          />
          <CFormInput
            type='text'
            label="Equipe"
            name='team'
            placeholder='Digite a equipe'
            value={form.team}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.team}
            invalid={error}
          />

          <CFormInput
            type='text'
            label="Portaria Interna"
            variant="standard"
            name='internal_concierge'
            placeholder='Digite a portaria'
            value={form.internal_concierge}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.internal_concierge}
            invalid={error}
          />

          <CFormInput
            type='text'
            label="Sigla"
            variant="standard"
            name='acronym'
            placeholder='Digite a sigla'
            value={form.acronym}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.acronym}
            invalid={error}
          />
        </CCol>

        <CCol>
          <CFormInput
            type='text'
            label="E-mail"
            name='email'
            placeholder='Digite o e-mail'
            value={form.email}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.email}
            invalid={error}
          />
          <CFormInput
            type='text'
            label="Oficio que indicou"
            name='office_indicated'
            placeholder='Digite o oficio indicado'
            value={form.office_indicated}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.office_indicated}
            invalid={error}
          />
          <CFormInput
            type='text'
            label="Entidade"
            name='entity'
            placeholder='Digite a entidade'
            value={form.entity}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.entity}
            invalid={error}
          />

          <CFormInput
            type='text'
            label="Unidade"
            variant="standard"
            name='unit'
            placeholder='Digite a unidade'
            value={form.unit}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.unit}
            invalid={error}
          />
          <CFormInput
            type='text'
            label="Oficio Solicitado"
            variant="standard"
            name='office_requested'
            placeholder='Digite o oficio solicitado'
            value={form.office_requested}
            onChange={handleSubmit}
            feedbackInvalid={messageErrors.office_requested}
            invalid={error}
          />
        </CCol>
      </CRow>
    </CContainer>
  );
};

const FormSignGroup = ({ name, setName, status, setStatus, setType_group, type_group, observations, setObservations }) => {

  const { error, messageErrors, } = useAuthContext();

  const handleObservations = (e) => {
    setObservations(e.target.value)
  }

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleChangeTypeGroup = (e) => {
    setType_group(e.target.value);
  };

  const handleChangeStatusGroup = (e) => {
    setStatus(e.target.value);
  };

  return (
    <section>
      <CFormInput
        type='text'
        label="Nome do Grupo"
        name='name'
        placeholder='Ex: Comissão'
        value={name}
        onChange={handleChange}
        className='mb-3'
        feedbackInvalid={messageErrors.name}
        invalid={error}
      />

      <h5 style={{ fontSize: '16px' }}>Status do Grupo</h5>

      <CFormCheck
        inline
        type="radio"
        name="status"
        value="EM ANDAMENTO"
        label="Em andamento"
        onChange={handleChangeStatusGroup}
        checked={status === "EM ANDAMENTO"}
      />
      <CFormCheck
        inline
        type="radio"
        name="status"
        value="FINALIZADO"
        label="Finalizado"
        onChange={handleChangeStatusGroup}
        checked={status === "FINALIZADO"}
      />

      <h5 style={{ fontSize: '16px', marginTop: '5px' }}>Tipo de grupo</h5>

      <CFormCheck
        inline
        type="radio"
        name="groupType"
        value="interno"
        label="Interno"
        onChange={handleChangeTypeGroup}
        checked={type_group === "interno"}
      />
      <CFormCheck
        inline
        type="radio"
        name="groupType"
        value="externo"
        label="Externo"
        onChange={handleChangeTypeGroup}
        checked={type_group === "externo"}
      />

      <br />

      <CFormTextarea
        label="Observações"
        placeholder='Digite aqui as observações'
        value={observations}
        rows={5}
        onChange={handleObservations}
        feedbackInvalid={messageErrors.observations}
        invalid={error}
      />
    </section>
  );
};

const SignGroups = () => {
  const [formulario, setFormulario] = useState({
    entity: "",
    organ: "",
    council: "",
    acronym: "",
    internal_concierge: "",
    team: "",
    email: "",
    unit: "",
    office_requested: "",
    office_indicated: "",
  });

  const [representative, setRepresentative] = useState("");
  const [observations, setObservations] = useState([]);
  const [name, setName] = useState("");
  const [type_group, setType_group] = useState('interno');
  const [status, setStatus] = useState('EM ANDAMENTO');
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    setMessageType,
    messageType,
    setShowMessage,
    showMessage,
    setMessage,
    message,
    setError,
    setMessageErrors
  } = useAuthContext();

  const steps = [
    {
      title: 'Grupo',
      content: <FormSignGroup
        name={name}
        setName={setName}
        type_group={type_group}
        setStatus={setStatus}
        status={status}
        setType_group={setType_group}
        observations={observations}
        setObservations={setObservations}
      />,
    },
    {
      title: 'Representante',
      content: <RepresentanteGroup representative={representative} setRepresentative={setRepresentative} />,
    },
    {
      title: 'Informações do grupo',
      content: <Content form={formulario} setForm={setFormulario} />,
    },
  ];

  const Submit = async (e) => {
    e.preventDefault();

    const updatedFormulario = {
      ...formulario,
      name,
      type_group,
      status,
      observations,
      representative
    };

    try {
      setLoading(true);
      await api.post('groups', updatedFormulario).then(() => {
        setLoading(false);
        navigate('/gerente');
        setMessage('Grupo criado com sucesso!');
        setMessageType('success');
        setShowMessage(true);
      });

    } catch (error) {
      setError(true);
      setLoading(false);
      setMessage(error.response.data.errors)
      setMessageType('error');
      setShowMessage(true);
      setMessageErrors(error.response.data.errors)
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
      <MenuAppBar backStep="/gerente" />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center p-4">
            <CCol sm={8} md={10} lg={12} xl={12} xxl={12}>
              <CCard className='w-100'>
                <CCardHeader className='p-2' style={{ backgroundColor: 'transparent' }}>
                  <Steps current={current} items={items} type="navigation" />
                </CCardHeader>
                <CCardBody className="p-4">
                  <CForm onSubmit={Submit}>
                    <div className="mb-4">{steps[current].content}</div>

                    <div className='d-flex justify-content-between'>
                      {current > 0 && (
                        <CButton color='secondary' onClick={() => prev()}>Anterior</CButton>
                      )}

                      {current < steps.length - 1 && (
                        <CButton style={{ background: '#548CA8', color: 'white' }} color="null" onClick={() => next()} >
                          Próximo
                        </CButton>
                      )}

                      {current === steps.length - 1 && (
                        <CButton color="success" type='submit'>
                          {loading ? <><CSpinner component="span" size="sm" aria-hidden="true" /> Loading...</> : <>Feito</>}
                        </CButton>
                      )}
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
        {showMessage && <Message type={messageType} msg={message} setShowMessage={setShowMessage} />}
      </div>
    </Fragment>
  );
}

export default SignGroups;
