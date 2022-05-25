import { useMediaQuery } from '@/shared/hooks';
import { Row, Spin } from 'antd';
import React, { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import s from './PDF.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDF: FC<{ file: string }> = (props) => {
    const [numPages, setNumPages] = useState(1);
    const [screenWidth] = useMediaQuery();

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <Document
            file={props.file}
            className={`${s['doc']}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Spin />}
        >
            <Row justify="center" gutter={[8, 16]} style={{ padding: 16 }}>
                {[...Array(numPages).keys()].map((page) => (
                    <Page
                        className={`ant-col ant-col-24`}
                        pageNumber={page + 1}
                        renderMode={'svg'}
                        loading={<Spin />}
                        renderInteractiveForms={false}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        width={
                            screenWidth > 1900
                                ? screenWidth * 0.65
                                : screenWidth > 772
                                ? screenWidth * 0.6
                                : screenWidth * 0.9
                        }
                    />
                ))}
            </Row>
        </Document>
    );
};
