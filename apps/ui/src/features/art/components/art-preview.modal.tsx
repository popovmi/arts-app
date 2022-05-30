import { Art } from '@/graphql';
import { CenteredSpin } from '@/shared/components';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Image, Modal, Row, Space, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArtDescriptions } from './art.descriptions';

interface ArtsPreviewModalProps {
    arts: Art[];
    openArtId: string | undefined;
    visible: boolean;
    onCancel: () => void;
    fetchArts?: () => void;
    hasMore?: boolean;
    loading?: boolean;
}

interface ArrowProps {
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    disabled?: boolean | undefined;
}

const NextArrow: FC<ArrowProps> = (props) => {
    const { className, style, onClick, disabled } = props;
    return (
        <Button
            className={className}
            style={{
                ...style,
                color: 'black',
                fontSize: '15px',
                lineHeight: '1.5715',
            }}
            icon={<RightCircleOutlined />}
            onClick={onClick}
            disabled={disabled}
        ></Button>
    );
};

const PrevArrow: FC<ArrowProps> = (props) => {
    const { className, style, onClick, disabled } = props;
    return (
        <Button
            className={className}
            disabled={disabled}
            style={{
                ...style,
                color: 'black',
                fontSize: '15px',
                lineHeight: '1.5715',
            }}
            icon={<LeftCircleOutlined />}
            onClick={onClick}
        ></Button>
    );
};

export const ArtPreviewModal: FC<ArtsPreviewModalProps> = ({
    arts,
    openArtId,
    visible,
    onCancel,
    fetchArts = undefined,
    hasMore = false,
    loading = false,
}: ArtsPreviewModalProps) => {
    const ref = useRef<CarouselRef | null>(null);
    const [currentIndex, setCurrentIndex] = useState(arts.findIndex((_art) => _art.id === openArtId));

    useEffect(() => {
        if (visible) {
            const index = arts.findIndex((_art) => _art.id === openArtId);
            setCurrentIndex(index);
            ref.current?.goTo(index);
        }
    }, [openArtId]);

    const next = () => {
        if (currentIndex < arts.length - 1) {
            setCurrentIndex(currentIndex + 1);
            ref?.current?.goTo(currentIndex + 1);
        }
        if (currentIndex === arts.length - 1 && hasMore && fetchArts) {
            fetchArts();
            setCurrentIndex(currentIndex + 1);
            ref?.current?.goTo(currentIndex + 1);
        }
    };

    const previous = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            ref?.current?.goTo(currentIndex - 1);
        }
    };

    const previousArt = arts[currentIndex - 1];
    const nextArt = arts[currentIndex + 1];

    return (
        <Modal
            visible={visible}
            destroyOnClose={true}
            width={'90%'}
            style={{ top: 20 }}
            footer={false}
            onCancel={onCancel}
            wrapProps={{
                onKeyUp: (evt: React.KeyboardEvent) => {
                    if (evt.keyCode === 37) previous();
                    if (evt.keyCode === 39) next();
                },
            }}
        >
            {loading ? (
                <CenteredSpin spinning={true} />
            ) : (
                <Row style={{ height: '100%', padding: 8 }} justify={'space-between'}>
                    <Col
                        xs={3}
                        lg={2}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Space direction="vertical">
                            <PrevArrow disabled={currentIndex === 0} onClick={previous} />
                            <Typography.Text>{previousArt?.name}</Typography.Text>
                        </Space>
                    </Col>
                    <Col xs={18} lg={20}>
                        <Carousel
                            infinite={false}
                            dots={false}
                            initialSlide={currentIndex}
                            afterChange={setCurrentIndex}
                            arrows={false}
                            ref={(node) => (ref.current = node)}
                        >
                            {arts.map((art, idx) => (
                                <div key={'' + art.id + idx}>
                                    <Row gutter={[8, 8]}>
                                        <Col xs={24}>
                                            <Link to={`/arts/${art.id}`}>{art.name}</Link>
                                        </Col>
                                        <Col xs={24} md={12} lg={8} xl={6}>
                                            <ArtDescriptions editable={false} art={art} />
                                        </Col>
                                        <Col
                                            xs={24}
                                            md={12}
                                            lg={16}
                                            xl={18}
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                                <Image
                                                    src={`/static/${art.files![0].watermarkPath}`}
                                                    style={{ maxWidth: '1000px' }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Carousel>
                    </Col>
                    <Col
                        xs={3}
                        lg={2}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Space direction="vertical">
                            <NextArrow
                                disabled={currentIndex === arts.length - 1 && !hasMore}
                                onClick={next}
                            />
                            <Typography.Text>{nextArt?.name}</Typography.Text>
                        </Space>
                    </Col>
                </Row>
            )}
        </Modal>
    );
};
