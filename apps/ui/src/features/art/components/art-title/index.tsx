import { useAppDispatch } from '@/app/store';
import { Art, useDeleteArtMutation, useUpdateArtMutation } from '@/graphql';
import { useToggle, useUser } from '@/shared/hooks';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { clearFilter } from '../../art.slice';
import styles from './art-title.module.css';

interface ArtTitleProps {
    art: Art;
}

export const ArtTitle: React.FC<ArtTitleProps> = ({ art }) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [isEdit, toggleIsEdit] = useToggle();

    const [update, { isLoading: isUpdating }] = useUpdateArtMutation({
        fixedCacheKey: 'updateArtName',
    });

    const [deleteArt, { isLoading: isDeleting }] = useDeleteArtMutation({
        fixedCacheKey: 'deleteArt',
    });

    const { isAdmin } = useUser();

    const handleUpdate = (val: string) =>
        update({
            updateArtInput: {
                id: art.id,
                name: val,
                internal: art.internal,
                artClass: art.artClass,
                bottomForm: art.bottomForm,
                form: art.form,
                height: art.height,
                nominalVolume: art.nominalVolume,
                productionMethod: art.productionMethod,
                productType: art.productType,
                ringType: art.ringType,
            },
        });

    const handleDelete = () => {
        Modal.confirm({
            title: 'Удалить ART?',
            onOk: () => {
                deleteArt({ id: art.id }).then(() => {
                    navigate('/arts');
                    dispatch(clearFilter());
                });
            },
        });
    };

    const loading = isUpdating || isDeleting;

    return (
        <Row style={{ padding: '0 8px', height: '40px' }} gutter={[8, 8]}>
            <Col flex="none">
                <Typography.Title
                    className={styles['unselectable']}
                    level={1}
                    type="secondary"
                    style={{ display: 'inline' }}
                >
                    ART{' '}
                </Typography.Title>
            </Col>
            <Col flex={1}>
                <Typography.Title
                    level={1}
                    onClick={() => !loading && toggleIsEdit()}
                    style={isEdit ? {} : { display: 'inline' }}
                    editable={{
                        icon: <EditOutlined spin={loading} />,
                        triggerType: ['icon'],
                        editing: isEdit,
                        onCancel: toggleIsEdit,
                        onEnd: toggleIsEdit,
                        onChange: (value) => {
                            if (value !== art.name) {
                                handleUpdate(value);
                            }
                            toggleIsEdit();
                        },
                    }}
                >
                    {art.name}
                </Typography.Title>
            </Col>
            {isAdmin && (
                <Col flex="none">
                    <Button style={{ marginTop: '8px' }} danger onClick={handleDelete} loading={loading}>
                        Удалить ART
                    </Button>
                </Col>
            )}
        </Row>
    );
};
