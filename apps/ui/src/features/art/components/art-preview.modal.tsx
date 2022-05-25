import { useAppDispatch } from '@/app/store';
import { Art } from '@/graphql';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Image, Modal, Row } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPreview } from '../art.slice';
import { ArtDescriptions } from './art.descriptions';

interface ArtsPreviewModalProps {
    arts: Art[];
    openArtId: string | undefined;
    visible: boolean;
    fetchArts: () => Promise<void>;
    hasMore: boolean;
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
    fetchArts,
    hasMore,
}) => {
    const dispatch = useAppDispatch();
    const ref = useRef<CarouselRef | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const index = arts.findIndex((_art) => _art.id === openArtId);
        setCurrentIndex(index);
        ref.current?.goTo(index);
    }, [openArtId]);

    const next = () => {
        if (currentIndex === arts.length - 1 && hasMore) {
            fetchArts().then(() => ref?.current?.next());
        } else ref?.current?.next();
    };

    const previous = () => {
        ref?.current?.prev();
    };

    return (
        <Modal
            visible={visible}
            destroyOnClose={true}
            width={'80%'}
            footer={false}
            onCancel={() => dispatch(setPreview({ artId: undefined, visible: false }))}
        >
            <Row
                style={{ height: '100%', padding: 32 }}
                onKeyUp={(evt) => {
                    console.log(evt);
                }}
            >
                <Col
                    xs={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PrevArrow disabled={currentIndex === 0} onClick={previous} />
                </Col>
                <Col xs={22}>
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
                                    <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
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
                                                style={{ maxWidth: '800px' }}
                                                preview={false}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Carousel>
                </Col>
                <Col xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NextArrow disabled={currentIndex === arts.length - 1 && !hasMore} onClick={next} />
                </Col>
            </Row>
        </Modal>
    );
};
