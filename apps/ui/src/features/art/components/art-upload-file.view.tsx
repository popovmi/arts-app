import React, { FC } from 'react';

interface ArtUploadFileViewProps {
  filePath: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
  extension: string;
}

export const ArtUploadFileView: FC<ArtUploadFileViewProps> = ({
  filePath,
  width,
  height,
  extension,
}) => {
  return (
    <>
      {extension === 'jpg' ? (
        <div
          style={{
            maxWidth: width || '100%',
            overflow: 'auto',
            maxHeight: height || '700px',
          }}
        >
          <img src={filePath} style={{ maxWidth: '100%' }} alt={'Новый ART'} />
        </div>
      ) : (
        extension === 'pdf' && (
          <embed
            type="application/pdf"
            src={`${filePath}?#toolbar=0&navpanes=0&scrollbar=0`}
            style={{ width: width || '100%', height: height || '600px' }}
          />
        )
      )}
      <></>
    </>
  );
};
