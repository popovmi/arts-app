import { Art } from '@/graphql';
import { Modal } from 'antd';
import { FC } from 'react';

interface ArtsPreviewModalProps {
    arts: Art[];
    openArtId: string | undefined;
    visible: boolean;
}

export const ArtPreviewModal: FC<ArtsPreviewModalProps> = ({ arts, openArtId, visible }) => {
    return <Modal visible={visible}>art-preview</Modal>;
};
