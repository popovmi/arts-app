import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { FC, useState } from 'react';

interface ArtFileUploadProps {
    onSuccess: (file: { filePath: string; fileName: string }) => void;
}

export const ArtFileUpload: FC<ArtFileUploadProps> = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);

    return (
        <Upload
            maxCount={1}
            accept={'.pdf,.jpg'}
            multiple={false}
            showUploadList={false}
            name="artFile"
            customRequest={async ({ file }) => {
                document.body.style.cursor = "wait";

                const formData = new FormData();

                formData.set('artFile', file);
                const data = fetch(`/upload/art`, {
                    body: formData,
                    method: 'POST',
                }).then((response) => {
                    return response.json().then((data) => {
                        onSuccess({ ...data });
						document.body.style.cursor = "default";
                        return data;
                    });
                });

                return data;
            }}
        >
            <Button icon={<UploadOutlined />} />
        </Upload>
    );
};
