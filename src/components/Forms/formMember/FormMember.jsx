import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { TextField } from '@mui/material';
import { Select } from 'antd';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './formMember.module.css'

const FormMember = ({ member, setMember, setUser_id }) => {
    const [option, setOption] = useState([]);

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

    const handleChange = (selectedValue) => {
        setUser_id(selectedValue);
    };

    const handleSubmit = (e) => {
        setMember(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className={styles.form}>
            <p className={styles.member}>Membro</p>
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
            <div className={styles.container_input1}>
                <TextField
                    type='text'
                    label="Telefone"
                    variant="standard"
                    name='phone'
                    placeholder='(xx) xxxxx-xxxx'
                    value={member.phone}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
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
                    value={member.role}
                    onChange={handleSubmit}
                    focused
                    margin='normal'
                    sx={{
                        width: '100%',
                    }}
                />
            </div>

            <div className={styles.container_input2}>
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
        </div> 
    );
};

export default FormMember;