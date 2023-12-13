import React from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import styles from './Upload.module.css'

const UploadFile = ({ data, setData }) => {
  const { Dragger } = Upload;
  const { id } = useParams();

  const props = {
    name: 'file',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post(`group/${id}/documents`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        onSuccess(response.data, file);
        setData([...data, response.data]);
      } catch (error) {
        onError(error);
      }
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className={styles.upload}>Clique e procure o arquivo que deseja adiconar</p>
    </Dragger>
  );
};

export default UploadFile;