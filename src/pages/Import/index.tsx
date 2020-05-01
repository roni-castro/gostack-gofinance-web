import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import { FileProps } from '../../models/fileprops';
import { mapFileToFileProps } from '../../mappers/fileMapper';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    if (!uploadedFiles.length) {
      return;
    }
    uploadedFiles.forEach(uploadedFile => {
      data.append('file', uploadedFile.file);
    });
    try {
      await api.post('/transactions/import', data);
      history.goBack();
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const fileProps: FileProps[] = mapFileToFileProps(files);
    setUploadedFiles(fileProps);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
