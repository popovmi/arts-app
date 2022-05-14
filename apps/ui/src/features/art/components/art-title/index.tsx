import { Art, useUpdateArtMutation } from '@/graphql';
import { useToggle } from '@/shared/hooks';
import { EditOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import styles from './art-title.module.css';

interface ArtTitleProps {
    art: Art;
}

export const ArtTitle: React.FC<ArtTitleProps> = ({ art }) => {
    const [isEdit, toggleIsEdit] = useToggle();

    const [update, { isLoading: isUpdating }] = useUpdateArtMutation({
        fixedCacheKey: 'updateArtName',
    });

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

    return (
        <Row style={{ padding: 8 }} gutter={[8, 8]}>
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
                    onClick={() => !isUpdating && toggleIsEdit()}
                    style={isEdit ? {} : { display: 'inline' }}
                    editable={{
                        icon: <EditOutlined spin={isUpdating} />,
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
        </Row>
    );
};
