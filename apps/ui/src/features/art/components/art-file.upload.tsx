import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { FC } from 'react';

interface ArtFileUploadProps {
  onSuccess: (file: { filePath: string; fileName: string }) => void;
}

export const ArtFileUpload: FC<ArtFileUploadProps> = ({ onSuccess }) => {
  return (
    <Upload
      maxCount={1}
      accept={'.pdf,.jpg'}
      multiple={false}
      showUploadList={false}
      name="artFile"
      customRequest={async ({ file }) => {
        const formData = new FormData();

        formData.set('artFile', file);
        const response = await fetch(`/upload/art`, {
          body: formData,
          method: 'POST',
        });
        const data = await response.json();

        onSuccess({ ...data });

        return data;
      }}
    >
      <Button icon={<UploadOutlined />} />
    </Upload>
  );
};
