import { AttributeType } from '@/graphql';

export const AttributesLabels = {
  [AttributeType.Sfm]: 'СФМ',
  [AttributeType.Intercenter]: 'Межцентровое',
  [AttributeType.DropNumber]: 'Кол-во капель',
  [AttributeType.ArtClass]: 'Класс',
  [AttributeType.Form]: 'Форма',
  [AttributeType.BottomForm]: 'Форма дна',
  [AttributeType.Height]: 'Высота',
  [AttributeType.NominalVolume]: 'Номинальный объем',
  [AttributeType.ProductType]: 'Вид продукта',
  [AttributeType.ProductionMethod]: 'Метод производства',
  [AttributeType.RingType]: 'Тип венчика',
};
