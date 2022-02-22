import { artAttributesTypes } from '@/features/art/art-attribute.types';
import { projectAttributesTypes } from '@/features/project/project-attribute.types';
import { AttributeView, UpdateAttributeModal } from '../components';
import { Row, Col } from 'antd';

const artsAttributes = {
  title: 'Теги артов',
  types: artAttributesTypes,
};

const projectAttributes = {
  title: 'Теги проектов',
  types: projectAttributesTypes,
};

const attributesData = [artsAttributes, projectAttributes];

export const AttributePage = () => {
  return (
    <Row gutter={[8, 16]}>
      {attributesData.map((attributesInfo) => (
        <Col xs={24} lg={12} key={attributesInfo.title}>
          <AttributeView attributeInfo={attributesInfo} />
        </Col>
      ))}
      <UpdateAttributeModal />
    </Row>
  );
};
