import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select } from 'antd';
import { TextField } from '@mui/material';
import { ImArrowLeft2 } from "react-icons/im";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Divider } from "antd";

import api from '../../../services/api'

import HeaderBar from '../../layout/header/HeaderBar';
import SubmitButton from '../../layout/submitbuttun/SubmitButton';
import LinkButton from '../../layout/linkbutton/LinkButton'
import styles from './SignMember.module.css';

const SignMember = () => {
  const { id } = useParams();
  const [user_id, setUser_id] = useState(0)
  const [option, setOption] = useState([]);
  const [member, setMember] = useState({
    role: '',
    phone: '',
    entry_data: null,
    departure_date: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('users');

        const representantesFiltrados = response.data.data.filter(
          (user) => user.type_user === 'representante'
        );

        setOption(
          representantesFiltrados.map((rep) => ({
            id: rep.id,
            name: rep.name,
            email: rep.email,
            type_user: rep.type_user,
          }))
        );
      } catch (error) {
        console.error('Erro ao buscar os representantes:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleChange = (selectedValue) => {
    setUser_id(selectedValue);
  };

  const handleSubmit = (e) => {
    setMember(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    setMember(prev => ({
      ...prev,
      user_id: user_id.toString(),
    }));

    const updatedFormulario = {
      ...member,
      user_id: user_id.toString(),
    };

    try {
      await api.post(`group/${id}/members`, { updatedFormulario });
      navigate(`/detalhes-de-grupos-representante/${id}/`, {
        state: {
          message: 'Adicionado com sucesso!',
          messageType: 'success',
          showMessage: true,
        }
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error.response.data);
    }
  };

  return (
    <Fragment>
      <HeaderBar text="PAINEL DE CONTROLE" backPageIcon={<ImArrowLeft2 size={25} />} backPage={`/detalhes-de-grupos-representante/${id}/`} />
      <div className={styles.sign_member}>
        <section className={styles.section_member}>
          <p className={styles.header}><span>1</span>Membros</p>
          <Divider style={{ margin: 0 }} />

          <p className={styles.label}>Membro</p>
          <Select
            allowClear
            style={{ width: '100%', height: '4em' }}
            placeholder="Selecione o representante"
            onChange={handleChange}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={option.map((rep) => ({ value: rep.id, label: rep.name }))}
          />

          <TextField
            type='text'
            label="Telefone"
            variant="standard"
            name='phone'
            placeholder='(xx) xxxxx-xxxx'
            focused
            margin='normal'
            value={member.phone}
            onChange={handleSubmit}
            sx={{
              width: '100%',
            }}
          />

          <TextField
            type='text'
            label="Cargo"
            variant="standard"
            name='role'
            placeholder='Professor'
            focused
            margin='normal'
            value={member.role}
            onChange={handleSubmit}
            sx={{
              width: '100%',
            }}
          />

          <div className={styles.input_data}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{
                  textField: {
                    variant: "standard",
                    focused: true,
                    fullWidth: true,
                    label: 'Data de entrada',
                    format: 'DD-MM-YYYY',
                    clearable: true,
                  }
                }}
                name="entry_date"
                value={member.entry_date}
                onChange={(date) => handleSubmit({ target: { name: 'entry_date', value: date } })}
              />
              <DatePicker
                slotProps={{
                  textField: {
                    variant: "standard",
                    focused: true,
                    fullWidth: true,
                    label: 'Data de saída',
                    format: 'DD-MM-YYYY',
                    clearable: true,
                  }
                }}
                required
                name="departure_date"
                value={member.departure_date}
                onChange={(date) => handleSubmit({ target: { name: 'departure_date', value: date } })}
              />
            </LocalizationProvider>
          </div>

          <div className={styles.button_steps}>
            <LinkButton text="Voltar" customClass="button_back" to={"/detalhes-de-grupos-representante/id/"} />
            <SubmitButton customClass="add" text="Adicionar" onClick={Submit} />
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default SignMember;