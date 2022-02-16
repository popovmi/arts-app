import { useAttributesQuery, AttributeType } from '@/graphql';
import { FC } from 'react';

export const AttributeTable: FC = () => {
    // const { data: artClasses } = useGetArtClassQuery();
    // const { data: bottomForms } = useGetBottomFormQuery();
    // const { data: forms } = useGetFormQuery();
    // const { data: heights } = useGetHeightQuery();
    // const { data: volumes } = useGetNominalVolumeQuery();
    // const { data: methods } = useGetProductionMethodQuery();
    // const { data: productTypes } = useGetProductTypeQuery();
    // const { data: ringTypes } = useGetRingTypeQuery();

    // const { data: dropNumbers } = useGetDropNumberQuery();
    // const { data: sfms } = useGetSfmQuery();
    // const { data: intercenters } = useGetIntercenterQuery();

    const { data: attributes } = useAttributesQuery({ type: AttributeType.ArtClass });
    return <></>;
};
