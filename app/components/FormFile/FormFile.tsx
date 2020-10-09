import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from '../Home.css';

interface IFormFile {
  fileTitle: string;
  fileContent: Buffer | undefined;
  setFileTitle: Dispatch<SetStateAction<string>>;
  setFileContent: Dispatch<SetStateAction<Buffer>>;
}

export const FormFile: FC<IFormFile> = ({
  fileTitle,
  fileContent,
  setFileTitle,
  setFileContent,
}: IFormFile) => {
  const onFileTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFileTitle(value);
  };

  const onFileContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFileContent(Buffer.from(value, 'utf8'));
  };

  return (
    <div>
      <Input
        value={fileTitle}
        onChange={onFileTitleChange}
        endAdornment={<InputAdornment position="end">.txt</InputAdornment>}
      />

      <div className={styles.fieldWrapper}>
        <textarea
          value={String(fileContent)}
          onChange={onFileContentChange}
          cols={50}
          rows={20}
        />
      </div>
    </div>
  );
};
