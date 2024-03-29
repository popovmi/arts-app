import React, { FC } from 'react';
import { PDF } from '../pdf';

interface ArtUploadFileViewProps {
    filePath: string;
    width?: string | number | undefined;
    height?: string | number | undefined;
}

export const ArtUploadFileView: FC<ArtUploadFileViewProps> = ({ filePath, width, height }) => {
    const extension = filePath.split('.')[1];
    return extension === 'jpg' ? (
        <div
            style={{
                maxWidth: width || '100%',
                overflow: 'auto',
                maxHeight: height || '900px',
            }}
        >
            <img src={filePath} style={{ maxWidth: '100%' }} alt={'Новый ART'} />
        </div>
    ) : extension === 'pdf' ? (
        <PDF file={'/' + filePath} />
    ) : (
        <div></div>
    );
};
