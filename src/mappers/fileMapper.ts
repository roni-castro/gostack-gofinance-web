import filesize from 'filesize';
import { FileProps } from '../models/fileprops';

export const mapFileToFileProps = (files: File[]): FileProps[] =>
  files.map(file => ({
    file,
    name: file.name,
    readableSize: filesize(file.size),
  }));
