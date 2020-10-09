import React, { useState, useEffect } from 'react';
import fs from 'fs';

import { Button, Grid } from '@material-ui/core';
import { FormFile } from './FormFile/FormFile';

import styles from './Home.css';

export default function Home(): JSX.Element {
  const [fileTitle, setFileTitle] = useState('');
  const [fileContent, setFileContent] = useState<Buffer>(
    Buffer.from('', 'utf8')
  );
  const [fileTitles, setFileTitles] = useState<string[]>([]);

  const onWriteClick = () => {
    fs.writeFileSync(`./app/files/${fileTitle}.txt`, fileContent);
    fs.readdir('./app/files', (...props) => {
      const files = props[1];
      setFileTitles(files);
    });
  };

  const onReadClick = (fileTitleWithExt: string) => {
    setFileTitle(fileTitleWithExt.split('.txt')[0]);
    setFileContent(fs.readFileSync(`./app/files/${fileTitleWithExt}`));
  };

  useEffect(() => {
    fs.readdir('./app/files', (...props) => {
      const files = props[1];
      setFileTitles(files);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Grid container>
        <FormFile
          fileTitle={fileTitle}
          fileContent={fileContent}
          setFileTitle={setFileTitle}
          setFileContent={setFileContent}
        />
        <Button onClick={onWriteClick}>Записать</Button>

        {fileTitles.map((elem, index) => {
          return (
            <Grid item xs={12} key={`${elem}${index + 1}`}>
              <Button onClick={() => onReadClick(elem)}>{elem}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
