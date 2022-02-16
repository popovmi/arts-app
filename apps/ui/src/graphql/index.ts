import { api } from '@/app/api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** Date custom scalar type */
    Date: any;
};

export type Art = {
    __typename?: 'Art';
    artClass?: Maybe<Scalars['String']>;
    bottomForm?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Date']>;
    files?: Maybe<Array<ArtFile>>;
    form?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    internal: Scalars['Boolean'];
    name: Scalars['String'];
    nominalVolume?: Maybe<Scalars['String']>;
    productType?: Maybe<Scalars['String']>;
    productionMethod?: Maybe<Scalars['String']>;
    project?: Maybe<Project>;
    projectId?: Maybe<Scalars['String']>;
    ringType?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Date']>;
};

export type ArtFile = {
    __typename?: 'ArtFile';
    art: Art;
    artId: Scalars['String'];
    originalPath: Scalars['String'];
    uploadedAt: Scalars['Date'];
    watermarkPath: Scalars['String'];
};

export type ArtFilterQuery = {
    AND?: InputMaybe<Array<ArtFilterQuery>>;
    OR?: InputMaybe<Array<ArtFilterQuery>>;
    artClass?: InputMaybe<StringFieldOption>;
    bottomForm?: InputMaybe<StringFieldOption>;
    form?: InputMaybe<StringFieldOption>;
    height?: InputMaybe<StringFieldOption>;
    id?: InputMaybe<StringFieldOption>;
    internal?: InputMaybe<BooleanFieldOption>;
    name?: InputMaybe<StringFieldOption>;
    nominalVolume?: InputMaybe<StringFieldOption>;
    productType?: InputMaybe<StringFieldOption>;
    productionMethod?: InputMaybe<StringFieldOption>;
    projectId?: InputMaybe<StringFieldOption>;
    ringType?: InputMaybe<StringFieldOption>;
};

export type ArtOrderQuery = {
    artClass?: InputMaybe<OrderDirection>;
    bottomForm?: InputMaybe<OrderDirection>;
    form?: InputMaybe<OrderDirection>;
    height?: InputMaybe<OrderDirection>;
    id?: InputMaybe<OrderDirection>;
    internal?: InputMaybe<OrderDirection>;
    name?: InputMaybe<OrderDirection>;
    nominalVolume?: InputMaybe<OrderDirection>;
    productType?: InputMaybe<OrderDirection>;
    productionMethod?: InputMaybe<OrderDirection>;
    projectId?: InputMaybe<OrderDirection>;
    ringType?: InputMaybe<OrderDirection>;
};

export type ArtResponse = {
    __typename?: 'ArtResponse';
    page: ArtTypeConnection;
    pageData?: Maybe<PageData>;
};

export type ArtTypeConnection = {
    __typename?: 'ArtTypeConnection';
    edges?: Maybe<Array<ArtTypeEdge>>;
    pageInfo?: Maybe<ArtTypePageInfo>;
};

export type ArtTypeEdge = {
    __typename?: 'ArtTypeEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<Art>;
};

export type ArtTypePageInfo = {
    __typename?: 'ArtTypePageInfo';
    endCursor?: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
};

export type BaseAttributeType = {
    __typename?: 'BaseAttributeType';
    active: Scalars['Boolean'];
    createdAt: Scalars['Date'];
    id: Scalars['Float'];
    name: Scalars['String'];
    updatedAt: Scalars['Date'];
    valueOrder: Scalars['Float'];
};

export type BooleanFieldOption = {
    is?: InputMaybe<Scalars['Boolean']>;
    not?: InputMaybe<Scalars['Boolean']>;
};

export type ConnectionArgs = {
    /** Paginate after opaque cursor */
    after?: InputMaybe<Scalars['String']>;
    /** Paginate before opaque cursor */
    before?: InputMaybe<Scalars['String']>;
    /** Paginate first */
    first?: InputMaybe<Scalars['Float']>;
    /** Paginate last */
    last?: InputMaybe<Scalars['Float']>;
};

export type CreateArtInput = {
    artClass?: InputMaybe<Scalars['String']>;
    bottomForm?: InputMaybe<Scalars['String']>;
    filePath: Scalars['String'];
    form?: InputMaybe<Scalars['String']>;
    height?: InputMaybe<Scalars['String']>;
    internal?: InputMaybe<Scalars['Boolean']>;
    name: Scalars['String'];
    nominalVolume?: InputMaybe<Scalars['String']>;
    productType?: InputMaybe<Scalars['String']>;
    productionMethod?: InputMaybe<Scalars['String']>;
    projectId?: InputMaybe<Scalars['String']>;
    ringType?: InputMaybe<Scalars['String']>;
};

export type CreateAttributeInput = {
    active: Scalars['Boolean'];
    name: Scalars['String'];
};

export type CreateCustomerInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    name: Scalars['String'];
};

export type CreateFactoryInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    name: Scalars['String'];
};

export type CreateProjectInput = {
    dropNumber?: InputMaybe<Scalars['String']>;
    hasDesignDoc?: InputMaybe<Scalars['Boolean']>;
    intercenter?: InputMaybe<Scalars['String']>;
    internal?: InputMaybe<Scalars['Boolean']>;
    name: Scalars['String'];
    sfm?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
    active: Scalars['Boolean'];
    fullName: Scalars['String'];
    password: Scalars['String'];
    role: Role;
    username: Scalars['String'];
};

export type Customer = {
    __typename?: 'Customer';
    active: Scalars['Boolean'];
    createdAt: Scalars['Date'];
    id: Scalars['String'];
    name: Scalars['String'];
    updatedAt: Scalars['Date'];
};

export type Factory = {
    __typename?: 'Factory';
    active: Scalars['Boolean'];
    createdAt: Scalars['Date'];
    id: Scalars['String'];
    name: Scalars['String'];
    updatedAt: Scalars['Date'];
};

export type LoginResponse = {
    __typename?: 'LoginResponse';
    user: User;
};

export type Mutation = {
    __typename?: 'Mutation';
    changePassword: Scalars['Boolean'];
    createArt: Art;
    createArtClass: BaseAttributeType;
    createBottomForm: BaseAttributeType;
    createCustomer: Customer;
    createDropNumber: BaseAttributeType;
    createFactory: Factory;
    createForm: BaseAttributeType;
    createHeight: BaseAttributeType;
    createIntercenter: BaseAttributeType;
    createNominalVolume: BaseAttributeType;
    createProductType: BaseAttributeType;
    createProductionMethod: BaseAttributeType;
    createProject: Project;
    createRingType: BaseAttributeType;
    createSfm: BaseAttributeType;
    createUser: User;
    login: LoginResponse;
    logout: Scalars['Boolean'];
    updateArt: Art;
    updateArtClass: BaseAttributeType;
    updateArtClassOrder: Array<BaseAttributeType>;
    updateBottomForm: BaseAttributeType;
    updateBottomFormOrder: Array<BaseAttributeType>;
    updateCustomer: Customer;
    updateDropNumber: BaseAttributeType;
    updateDropNumberOrder: Array<BaseAttributeType>;
    updateFactory: Factory;
    updateForm: BaseAttributeType;
    updateFormOrder: Array<BaseAttributeType>;
    updateHeight: BaseAttributeType;
    updateHeightOrder: Array<BaseAttributeType>;
    updateIntercenter: BaseAttributeType;
    updateIntercenterOrder: Array<BaseAttributeType>;
    updateNominalVolume: BaseAttributeType;
    updateNominalVolumeOrder: Array<BaseAttributeType>;
    updateProductType: BaseAttributeType;
    updateProductTypeOrder: Array<BaseAttributeType>;
    updateProductionMethod: BaseAttributeType;
    updateProductionMethodOrder: Array<BaseAttributeType>;
    updateProject: Project;
    updateRingType: BaseAttributeType;
    updateRingTypeOrder: Array<BaseAttributeType>;
    updateSfm: BaseAttributeType;
    updateSfmOrder: Array<BaseAttributeType>;
    updateUser: User;
};

export type MutationChangePasswordArgs = {
    newPassword: Scalars['String'];
    password: Scalars['String'];
    passwordRepeat: Scalars['String'];
    username: Scalars['String'];
};

export type MutationCreateArtArgs = {
    createArtInput: CreateArtInput;
};

export type MutationCreateArtClassArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateBottomFormArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateCustomerArgs = {
    input: CreateCustomerInput;
};

export type MutationCreateDropNumberArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateFactoryArgs = {
    input: CreateFactoryInput;
};

export type MutationCreateFormArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateHeightArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateIntercenterArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateNominalVolumeArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateProductTypeArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateProductionMethodArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateProjectArgs = {
    createProjectInput: CreateProjectInput;
};

export type MutationCreateRingTypeArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateSfmArgs = {
    input: CreateAttributeInput;
};

export type MutationCreateUserArgs = {
    createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationUpdateArtArgs = {
    updateArtInput: UpdateArtInput;
};

export type MutationUpdateArtClassArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateArtClassOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateBottomFormArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateBottomFormOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateCustomerArgs = {
    input: UpdateCustomerInput;
};

export type MutationUpdateDropNumberArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateDropNumberOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateFactoryArgs = {
    input: UpdateFactoryInput;
};

export type MutationUpdateFormArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateFormOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateHeightArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateHeightOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateIntercenterArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateIntercenterOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateNominalVolumeArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateNominalVolumeOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateProductTypeArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateProductTypeOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateProductionMethodArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateProductionMethodOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateProjectArgs = {
    updateProjectInput: UpdateProjectInput;
};

export type MutationUpdateRingTypeArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateRingTypeOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateSfmArgs = {
    input: UpdateAttributeInput;
};

export type MutationUpdateSfmOrderArgs = {
    input: UpdateAttributeValueOrderInput;
};

export type MutationUpdateUserArgs = {
    updateUserInput: UpdateUserInput;
};

export enum OrderDirection {
    /** Ascending */
    Asc = 'ASC',
    /** Descending */
    Desc = 'DESC',
}

export type PageData = {
    __typename?: 'PageData';
    count: Scalars['Float'];
    skip: Scalars['Float'];
    take: Scalars['Float'];
};

export type Project = {
    __typename?: 'Project';
    arts?: Maybe<Array<Art>>;
    createdAt: Scalars['Date'];
    customerId?: Maybe<Scalars['String']>;
    dropNumber?: Maybe<Scalars['String']>;
    factoryId?: Maybe<Scalars['String']>;
    hasDesignDoc?: Maybe<Scalars['Boolean']>;
    id: Scalars['String'];
    intercenter?: Maybe<Scalars['String']>;
    internal: Scalars['Boolean'];
    name: Scalars['String'];
    sfm?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Date'];
};

export type ProjectFilterQuery = {
    AND?: InputMaybe<Array<ProjectFilterQuery>>;
    OR?: InputMaybe<Array<ProjectFilterQuery>>;
    dropNumber?: InputMaybe<StringFieldOption>;
    hasDesignDoc?: InputMaybe<BooleanFieldOption>;
    id?: InputMaybe<StringFieldOption>;
    intercenter?: InputMaybe<StringFieldOption>;
    internal?: InputMaybe<BooleanFieldOption>;
    name?: InputMaybe<StringFieldOption>;
    sfm?: InputMaybe<StringFieldOption>;
};

export type ProjectOrderQuery = {
    dropNumber?: InputMaybe<OrderDirection>;
    hasDesignDoc?: InputMaybe<OrderDirection>;
    id?: InputMaybe<OrderDirection>;
    intercenter?: InputMaybe<OrderDirection>;
    internal?: InputMaybe<OrderDirection>;
    name?: InputMaybe<OrderDirection>;
    sfm?: InputMaybe<OrderDirection>;
};

export type ProjectResponse = {
    __typename?: 'ProjectResponse';
    page: ProjectTypeConnection;
    pageData?: Maybe<PageData>;
};

export type ProjectTypeConnection = {
    __typename?: 'ProjectTypeConnection';
    edges?: Maybe<Array<ProjectTypeEdge>>;
    pageInfo?: Maybe<ProjectTypePageInfo>;
};

export type ProjectTypeEdge = {
    __typename?: 'ProjectTypeEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<Project>;
};

export type ProjectTypePageInfo = {
    __typename?: 'ProjectTypePageInfo';
    endCursor?: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    art: Art;
    arts: ArtResponse;
    customer: Customer;
    customers: Array<Customer>;
    factories: Array<Factory>;
    factory: Factory;
    getArtClass: Array<BaseAttributeType>;
    getBottomForm: Array<BaseAttributeType>;
    getDropNumber: Array<BaseAttributeType>;
    getForm: Array<BaseAttributeType>;
    getHeight: Array<BaseAttributeType>;
    getIntercenter: Array<BaseAttributeType>;
    getNominalVolume: Array<BaseAttributeType>;
    getProductType: Array<BaseAttributeType>;
    getProductionMethod: Array<BaseAttributeType>;
    getRingType: Array<BaseAttributeType>;
    getSfm: Array<BaseAttributeType>;
    project: Project;
    projects: ProjectResponse;
    user: User;
    users: UserResponse;
    whoAmI: User;
};

export type QueryArtArgs = {
    id: Scalars['String'];
};

export type QueryArtsArgs = {
    filter?: InputMaybe<ArtFilterQuery>;
    order?: InputMaybe<ArtOrderQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
};

export type QueryCustomerArgs = {
    id: Scalars['String'];
};

export type QueryFactoryArgs = {
    id: Scalars['String'];
};

export type QueryProjectArgs = {
    id: Scalars['String'];
};

export type QueryProjectsArgs = {
    filter?: InputMaybe<ProjectFilterQuery>;
    order?: InputMaybe<ProjectOrderQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
};

export type QueryUserArgs = {
    id: Scalars['String'];
};

export type QueryUsersArgs = {
    filter?: InputMaybe<UserFilterQuery>;
    order?: InputMaybe<UserOrderQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
};

export enum Role {
    /** Administrator Role */
    Admin = 'ADMIN',
    /** Simple user role */
    User = 'USER',
}

export type StringFieldOption = {
    contains?: InputMaybe<Scalars['String']>;
    endsWith?: InputMaybe<Scalars['String']>;
    gt?: InputMaybe<Scalars['String']>;
    gte?: InputMaybe<Scalars['String']>;
    in?: InputMaybe<Array<Scalars['String']>>;
    is?: InputMaybe<Scalars['String']>;
    lt?: InputMaybe<Scalars['String']>;
    lte?: InputMaybe<Scalars['String']>;
    not?: InputMaybe<Scalars['String']>;
    notContains?: InputMaybe<Scalars['String']>;
    notEndsWith?: InputMaybe<Scalars['String']>;
    notIn?: InputMaybe<Array<Scalars['String']>>;
    notStartsWith?: InputMaybe<Scalars['String']>;
    startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateArtInput = {
    artClass?: InputMaybe<Scalars['String']>;
    bottomForm?: InputMaybe<Scalars['String']>;
    filePath?: InputMaybe<Scalars['String']>;
    form?: InputMaybe<Scalars['String']>;
    height?: InputMaybe<Scalars['String']>;
    id: Scalars['String'];
    internal?: InputMaybe<Scalars['Boolean']>;
    name?: InputMaybe<Scalars['String']>;
    nominalVolume?: InputMaybe<Scalars['String']>;
    productType?: InputMaybe<Scalars['String']>;
    productionMethod?: InputMaybe<Scalars['String']>;
    projectId?: InputMaybe<Scalars['String']>;
    ringType?: InputMaybe<Scalars['String']>;
};

export type UpdateAttributeInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    id: Scalars['Float'];
    name?: InputMaybe<Scalars['String']>;
};

export type UpdateAttributeValueOrderInput = {
    newOrder: Scalars['Float'];
    oldOrder: Scalars['Float'];
};

export type UpdateCustomerInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    id: Scalars['String'];
    name: Scalars['String'];
};

export type UpdateFactoryInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    id: Scalars['String'];
    name: Scalars['String'];
};

export type UpdateProjectInput = {
    dropNumber?: InputMaybe<Scalars['String']>;
    hasDesignDoc?: InputMaybe<Scalars['Boolean']>;
    id: Scalars['String'];
    intercenter?: InputMaybe<Scalars['String']>;
    internal?: InputMaybe<Scalars['Boolean']>;
    name?: InputMaybe<Scalars['String']>;
    sfm?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
    active?: InputMaybe<Scalars['Boolean']>;
    fullName?: InputMaybe<Scalars['String']>;
    id: Scalars['String'];
    password?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<Role>;
};

export type User = {
    __typename?: 'User';
    active: Scalars['Boolean'];
    createdAt: Scalars['Date'];
    fullName: Scalars['String'];
    id: Scalars['String'];
    role: Scalars['String'];
    updatedAt: Scalars['Date'];
    username: Scalars['String'];
};

export type UserFilterQuery = {
    AND?: InputMaybe<Array<UserFilterQuery>>;
    OR?: InputMaybe<Array<UserFilterQuery>>;
    active?: InputMaybe<BooleanFieldOption>;
    fullName?: InputMaybe<StringFieldOption>;
    id?: InputMaybe<StringFieldOption>;
    role?: InputMaybe<StringFieldOption>;
    username?: InputMaybe<StringFieldOption>;
};

export type UserOrderQuery = {
    active?: InputMaybe<OrderDirection>;
    fullName?: InputMaybe<OrderDirection>;
    id?: InputMaybe<OrderDirection>;
    role?: InputMaybe<OrderDirection>;
    username?: InputMaybe<OrderDirection>;
};

export type UserResponse = {
    __typename?: 'UserResponse';
    page: UserTypeConnection;
    pageData?: Maybe<PageData>;
};

export type UserTypeConnection = {
    __typename?: 'UserTypeConnection';
    edges?: Maybe<Array<UserTypeEdge>>;
    pageInfo?: Maybe<UserTypePageInfo>;
};

export type UserTypeEdge = {
    __typename?: 'UserTypeEdge';
    cursor?: Maybe<Scalars['String']>;
    node?: Maybe<User>;
};

export type UserTypePageInfo = {
    __typename?: 'UserTypePageInfo';
    endCursor?: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
};

export type ChangePasswordMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
    passwordRepeat: Scalars['String'];
    newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean };

export type CreateArtMutationVariables = Exact<{
    createArtInput: CreateArtInput;
}>;

export type CreateArtMutation = {
    __typename?: 'Mutation';
    createArt: {
        __typename?: 'Art';
        id: string;
        name: string;
        internal: boolean;
        projectId?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        bottomForm?: string | null;
        artClass?: string | null;
        form?: string | null;
        nominalVolume?: string | null;
        height?: string | null;
        productType?: string | null;
        productionMethod?: string | null;
        ringType?: string | null;
        files?: Array<{
            __typename?: 'ArtFile';
            artId: string;
            originalPath: string;
            watermarkPath: string;
            uploadedAt: any;
            art: {
                __typename?: 'Art';
                id: string;
                name: string;
                internal: boolean;
                projectId?: string | null;
                createdAt?: any | null;
                updatedAt?: any | null;
                bottomForm?: string | null;
                artClass?: string | null;
                form?: string | null;
                nominalVolume?: string | null;
                height?: string | null;
                productType?: string | null;
                productionMethod?: string | null;
                ringType?: string | null;
                files?: Array<{
                    __typename?: 'ArtFile';
                    artId: string;
                    originalPath: string;
                    watermarkPath: string;
                    uploadedAt: any;
                }> | null;
                project?: {
                    __typename?: 'Project';
                    id: string;
                    name: string;
                    internal: boolean;
                    hasDesignDoc?: boolean | null;
                    sfm?: string | null;
                    dropNumber?: string | null;
                    intercenter?: string | null;
                    factoryId?: string | null;
                    customerId?: string | null;
                    createdAt: any;
                    updatedAt: any;
                    arts?: Array<{
                        __typename?: 'Art';
                        id: string;
                        name: string;
                        internal: boolean;
                        projectId?: string | null;
                        createdAt?: any | null;
                        updatedAt?: any | null;
                        bottomForm?: string | null;
                        artClass?: string | null;
                        form?: string | null;
                        nominalVolume?: string | null;
                        height?: string | null;
                        productType?: string | null;
                        productionMethod?: string | null;
                        ringType?: string | null;
                        files?: Array<{
                            __typename?: 'ArtFile';
                            artId: string;
                            originalPath: string;
                            watermarkPath: string;
                            uploadedAt: any;
                        }> | null;
                        project?: {
                            __typename?: 'Project';
                            id: string;
                            name: string;
                            internal: boolean;
                            hasDesignDoc?: boolean | null;
                            sfm?: string | null;
                            dropNumber?: string | null;
                            intercenter?: string | null;
                            factoryId?: string | null;
                            customerId?: string | null;
                            createdAt: any;
                            updatedAt: any;
                        } | null;
                    }> | null;
                } | null;
            };
        }> | null;
        project?: {
            __typename?: 'Project';
            id: string;
            name: string;
            internal: boolean;
            hasDesignDoc?: boolean | null;
            sfm?: string | null;
            dropNumber?: string | null;
            intercenter?: string | null;
            factoryId?: string | null;
            customerId?: string | null;
            createdAt: any;
            updatedAt: any;
        } | null;
    };
};

export type CreateArtClassMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateArtClassMutation = {
    __typename?: 'Mutation';
    createArtClass: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateBottomFormMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateBottomFormMutation = {
    __typename?: 'Mutation';
    createBottomForm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateCustomerMutationVariables = Exact<{
    input: CreateCustomerInput;
}>;

export type CreateCustomerMutation = {
    __typename?: 'Mutation';
    createCustomer: {
        __typename?: 'Customer';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateDropNumberMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateDropNumberMutation = {
    __typename?: 'Mutation';
    createDropNumber: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateFactoryMutationVariables = Exact<{
    input: CreateFactoryInput;
}>;

export type CreateFactoryMutation = {
    __typename?: 'Mutation';
    createFactory: {
        __typename?: 'Factory';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateFormMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateFormMutation = {
    __typename?: 'Mutation';
    createForm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateHeightMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateHeightMutation = {
    __typename?: 'Mutation';
    createHeight: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateIntercenterMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateIntercenterMutation = {
    __typename?: 'Mutation';
    createIntercenter: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateNominalVolumeMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateNominalVolumeMutation = {
    __typename?: 'Mutation';
    createNominalVolume: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateProductTypeMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateProductTypeMutation = {
    __typename?: 'Mutation';
    createProductType: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateProductionMethodMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateProductionMethodMutation = {
    __typename?: 'Mutation';
    createProductionMethod: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateProjectMutationVariables = Exact<{
    createProjectInput: CreateProjectInput;
}>;

export type CreateProjectMutation = {
    __typename?: 'Mutation';
    createProject: {
        __typename?: 'Project';
        id: string;
        name: string;
        internal: boolean;
        hasDesignDoc?: boolean | null;
        sfm?: string | null;
        dropNumber?: string | null;
        intercenter?: string | null;
        factoryId?: string | null;
        customerId?: string | null;
        createdAt: any;
        updatedAt: any;
        arts?: Array<{
            __typename?: 'Art';
            id: string;
            name: string;
            internal: boolean;
            projectId?: string | null;
            createdAt?: any | null;
            updatedAt?: any | null;
            bottomForm?: string | null;
            artClass?: string | null;
            form?: string | null;
            nominalVolume?: string | null;
            height?: string | null;
            productType?: string | null;
            productionMethod?: string | null;
            ringType?: string | null;
            files?: Array<{
                __typename?: 'ArtFile';
                artId: string;
                originalPath: string;
                watermarkPath: string;
                uploadedAt: any;
                art: {
                    __typename?: 'Art';
                    id: string;
                    name: string;
                    internal: boolean;
                    projectId?: string | null;
                    createdAt?: any | null;
                    updatedAt?: any | null;
                    bottomForm?: string | null;
                    artClass?: string | null;
                    form?: string | null;
                    nominalVolume?: string | null;
                    height?: string | null;
                    productType?: string | null;
                    productionMethod?: string | null;
                    ringType?: string | null;
                    files?: Array<{
                        __typename?: 'ArtFile';
                        artId: string;
                        originalPath: string;
                        watermarkPath: string;
                        uploadedAt: any;
                    }> | null;
                    project?: {
                        __typename?: 'Project';
                        id: string;
                        name: string;
                        internal: boolean;
                        hasDesignDoc?: boolean | null;
                        sfm?: string | null;
                        dropNumber?: string | null;
                        intercenter?: string | null;
                        factoryId?: string | null;
                        customerId?: string | null;
                        createdAt: any;
                        updatedAt: any;
                        arts?: Array<{
                            __typename?: 'Art';
                            id: string;
                            name: string;
                            internal: boolean;
                            projectId?: string | null;
                            createdAt?: any | null;
                            updatedAt?: any | null;
                            bottomForm?: string | null;
                            artClass?: string | null;
                            form?: string | null;
                            nominalVolume?: string | null;
                            height?: string | null;
                            productType?: string | null;
                            productionMethod?: string | null;
                            ringType?: string | null;
                            project?: {
                                __typename?: 'Project';
                                id: string;
                                name: string;
                                internal: boolean;
                                hasDesignDoc?: boolean | null;
                                sfm?: string | null;
                                dropNumber?: string | null;
                                intercenter?: string | null;
                                factoryId?: string | null;
                                customerId?: string | null;
                                createdAt: any;
                                updatedAt: any;
                            } | null;
                        }> | null;
                    } | null;
                };
            }> | null;
        }> | null;
    };
};

export type CreateRingTypeMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateRingTypeMutation = {
    __typename?: 'Mutation';
    createRingType: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateSfmMutationVariables = Exact<{
    input: CreateAttributeInput;
}>;

export type CreateSfmMutation = {
    __typename?: 'Mutation';
    createSfm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type CreateUserMutationVariables = Exact<{
    createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
    __typename?: 'Mutation';
    createUser: {
        __typename?: 'User';
        id: string;
        username: string;
        fullName: string;
        role: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type LoginMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'LoginResponse';
        user: {
            __typename?: 'User';
            id: string;
            username: string;
            fullName: string;
            role: string;
            active: boolean;
            createdAt: any;
            updatedAt: any;
        };
    };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type UpdateArtMutationVariables = Exact<{
    updateArtInput: UpdateArtInput;
}>;

export type UpdateArtMutation = {
    __typename?: 'Mutation';
    updateArt: {
        __typename?: 'Art';
        id: string;
        name: string;
        internal: boolean;
        projectId?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        bottomForm?: string | null;
        artClass?: string | null;
        form?: string | null;
        nominalVolume?: string | null;
        height?: string | null;
        productType?: string | null;
        productionMethod?: string | null;
        ringType?: string | null;
        files?: Array<{
            __typename?: 'ArtFile';
            artId: string;
            originalPath: string;
            watermarkPath: string;
            uploadedAt: any;
            art: {
                __typename?: 'Art';
                id: string;
                name: string;
                internal: boolean;
                projectId?: string | null;
                createdAt?: any | null;
                updatedAt?: any | null;
                bottomForm?: string | null;
                artClass?: string | null;
                form?: string | null;
                nominalVolume?: string | null;
                height?: string | null;
                productType?: string | null;
                productionMethod?: string | null;
                ringType?: string | null;
                files?: Array<{
                    __typename?: 'ArtFile';
                    artId: string;
                    originalPath: string;
                    watermarkPath: string;
                    uploadedAt: any;
                }> | null;
                project?: {
                    __typename?: 'Project';
                    id: string;
                    name: string;
                    internal: boolean;
                    hasDesignDoc?: boolean | null;
                    sfm?: string | null;
                    dropNumber?: string | null;
                    intercenter?: string | null;
                    factoryId?: string | null;
                    customerId?: string | null;
                    createdAt: any;
                    updatedAt: any;
                    arts?: Array<{
                        __typename?: 'Art';
                        id: string;
                        name: string;
                        internal: boolean;
                        projectId?: string | null;
                        createdAt?: any | null;
                        updatedAt?: any | null;
                        bottomForm?: string | null;
                        artClass?: string | null;
                        form?: string | null;
                        nominalVolume?: string | null;
                        height?: string | null;
                        productType?: string | null;
                        productionMethod?: string | null;
                        ringType?: string | null;
                        files?: Array<{
                            __typename?: 'ArtFile';
                            artId: string;
                            originalPath: string;
                            watermarkPath: string;
                            uploadedAt: any;
                        }> | null;
                        project?: {
                            __typename?: 'Project';
                            id: string;
                            name: string;
                            internal: boolean;
                            hasDesignDoc?: boolean | null;
                            sfm?: string | null;
                            dropNumber?: string | null;
                            intercenter?: string | null;
                            factoryId?: string | null;
                            customerId?: string | null;
                            createdAt: any;
                            updatedAt: any;
                        } | null;
                    }> | null;
                } | null;
            };
        }> | null;
        project?: {
            __typename?: 'Project';
            id: string;
            name: string;
            internal: boolean;
            hasDesignDoc?: boolean | null;
            sfm?: string | null;
            dropNumber?: string | null;
            intercenter?: string | null;
            factoryId?: string | null;
            customerId?: string | null;
            createdAt: any;
            updatedAt: any;
        } | null;
    };
};

export type UpdateArtClassMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateArtClassMutation = {
    __typename?: 'Mutation';
    updateArtClass: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateArtClassOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateArtClassOrderMutation = {
    __typename?: 'Mutation';
    updateArtClassOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateBottomFormMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateBottomFormMutation = {
    __typename?: 'Mutation';
    updateBottomForm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateBottomFormOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateBottomFormOrderMutation = {
    __typename?: 'Mutation';
    updateBottomFormOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateCustomerMutationVariables = Exact<{
    input: UpdateCustomerInput;
}>;

export type UpdateCustomerMutation = {
    __typename?: 'Mutation';
    updateCustomer: {
        __typename?: 'Customer';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateDropNumberMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateDropNumberMutation = {
    __typename?: 'Mutation';
    updateDropNumber: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateDropNumberOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateDropNumberOrderMutation = {
    __typename?: 'Mutation';
    updateDropNumberOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateFactoryMutationVariables = Exact<{
    input: UpdateFactoryInput;
}>;

export type UpdateFactoryMutation = {
    __typename?: 'Mutation';
    updateFactory: {
        __typename?: 'Factory';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateFormMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateFormMutation = {
    __typename?: 'Mutation';
    updateForm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateFormOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateFormOrderMutation = {
    __typename?: 'Mutation';
    updateFormOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateHeightMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateHeightMutation = {
    __typename?: 'Mutation';
    updateHeight: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateHeightOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateHeightOrderMutation = {
    __typename?: 'Mutation';
    updateHeightOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateIntercenterMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateIntercenterMutation = {
    __typename?: 'Mutation';
    updateIntercenter: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateIntercenterOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateIntercenterOrderMutation = {
    __typename?: 'Mutation';
    updateIntercenterOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateNominalVolumeMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateNominalVolumeMutation = {
    __typename?: 'Mutation';
    updateNominalVolume: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateNominalVolumeOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateNominalVolumeOrderMutation = {
    __typename?: 'Mutation';
    updateNominalVolumeOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateProductTypeMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateProductTypeMutation = {
    __typename?: 'Mutation';
    updateProductType: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateProductTypeOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateProductTypeOrderMutation = {
    __typename?: 'Mutation';
    updateProductTypeOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateProductionMethodMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateProductionMethodMutation = {
    __typename?: 'Mutation';
    updateProductionMethod: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateProductionMethodOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateProductionMethodOrderMutation = {
    __typename?: 'Mutation';
    updateProductionMethodOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateProjectMutationVariables = Exact<{
    updateProjectInput: UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
    __typename?: 'Mutation';
    updateProject: {
        __typename?: 'Project';
        id: string;
        name: string;
        internal: boolean;
        hasDesignDoc?: boolean | null;
        sfm?: string | null;
        dropNumber?: string | null;
        intercenter?: string | null;
        factoryId?: string | null;
        customerId?: string | null;
        createdAt: any;
        updatedAt: any;
        arts?: Array<{
            __typename?: 'Art';
            id: string;
            name: string;
            internal: boolean;
            projectId?: string | null;
            createdAt?: any | null;
            updatedAt?: any | null;
            bottomForm?: string | null;
            artClass?: string | null;
            form?: string | null;
            nominalVolume?: string | null;
            height?: string | null;
            productType?: string | null;
            productionMethod?: string | null;
            ringType?: string | null;
            files?: Array<{
                __typename?: 'ArtFile';
                artId: string;
                originalPath: string;
                watermarkPath: string;
                uploadedAt: any;
                art: {
                    __typename?: 'Art';
                    id: string;
                    name: string;
                    internal: boolean;
                    projectId?: string | null;
                    createdAt?: any | null;
                    updatedAt?: any | null;
                    bottomForm?: string | null;
                    artClass?: string | null;
                    form?: string | null;
                    nominalVolume?: string | null;
                    height?: string | null;
                    productType?: string | null;
                    productionMethod?: string | null;
                    ringType?: string | null;
                    files?: Array<{
                        __typename?: 'ArtFile';
                        artId: string;
                        originalPath: string;
                        watermarkPath: string;
                        uploadedAt: any;
                    }> | null;
                    project?: {
                        __typename?: 'Project';
                        id: string;
                        name: string;
                        internal: boolean;
                        hasDesignDoc?: boolean | null;
                        sfm?: string | null;
                        dropNumber?: string | null;
                        intercenter?: string | null;
                        factoryId?: string | null;
                        customerId?: string | null;
                        createdAt: any;
                        updatedAt: any;
                        arts?: Array<{
                            __typename?: 'Art';
                            id: string;
                            name: string;
                            internal: boolean;
                            projectId?: string | null;
                            createdAt?: any | null;
                            updatedAt?: any | null;
                            bottomForm?: string | null;
                            artClass?: string | null;
                            form?: string | null;
                            nominalVolume?: string | null;
                            height?: string | null;
                            productType?: string | null;
                            productionMethod?: string | null;
                            ringType?: string | null;
                            project?: {
                                __typename?: 'Project';
                                id: string;
                                name: string;
                                internal: boolean;
                                hasDesignDoc?: boolean | null;
                                sfm?: string | null;
                                dropNumber?: string | null;
                                intercenter?: string | null;
                                factoryId?: string | null;
                                customerId?: string | null;
                                createdAt: any;
                                updatedAt: any;
                            } | null;
                        }> | null;
                    } | null;
                };
            }> | null;
        }> | null;
    };
};

export type UpdateRingTypeMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateRingTypeMutation = {
    __typename?: 'Mutation';
    updateRingType: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateRingTypeOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateRingTypeOrderMutation = {
    __typename?: 'Mutation';
    updateRingTypeOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateSfmMutationVariables = Exact<{
    input: UpdateAttributeInput;
}>;

export type UpdateSfmMutation = {
    __typename?: 'Mutation';
    updateSfm: {
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    };
};

export type UpdateSfmOrderMutationVariables = Exact<{
    input: UpdateAttributeValueOrderInput;
}>;

export type UpdateSfmOrderMutation = {
    __typename?: 'Mutation';
    updateSfmOrder: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type UpdateUserMutationVariables = Exact<{
    updateUserInput: UpdateUserInput;
}>;

export type UpdateUserMutation = {
    __typename?: 'Mutation';
    updateUser: {
        __typename?: 'User';
        id: string;
        username: string;
        fullName: string;
        role: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type ArtQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type ArtQuery = {
    __typename?: 'Query';
    art: {
        __typename?: 'Art';
        id: string;
        name: string;
        internal: boolean;
        projectId?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        bottomForm?: string | null;
        artClass?: string | null;
        form?: string | null;
        nominalVolume?: string | null;
        height?: string | null;
        productType?: string | null;
        productionMethod?: string | null;
        ringType?: string | null;
        files?: Array<{
            __typename?: 'ArtFile';
            artId: string;
            originalPath: string;
            watermarkPath: string;
            uploadedAt: any;
            art: {
                __typename?: 'Art';
                id: string;
                name: string;
                internal: boolean;
                projectId?: string | null;
                createdAt?: any | null;
                updatedAt?: any | null;
                bottomForm?: string | null;
                artClass?: string | null;
                form?: string | null;
                nominalVolume?: string | null;
                height?: string | null;
                productType?: string | null;
                productionMethod?: string | null;
                ringType?: string | null;
                project?: {
                    __typename?: 'Project';
                    id: string;
                    name: string;
                    internal: boolean;
                    hasDesignDoc?: boolean | null;
                    sfm?: string | null;
                    dropNumber?: string | null;
                    intercenter?: string | null;
                    factoryId?: string | null;
                    customerId?: string | null;
                    createdAt: any;
                    updatedAt: any;
                    arts?: Array<{
                        __typename?: 'Art';
                        id: string;
                        name: string;
                        internal: boolean;
                        projectId?: string | null;
                        createdAt?: any | null;
                        updatedAt?: any | null;
                        bottomForm?: string | null;
                        artClass?: string | null;
                        form?: string | null;
                        nominalVolume?: string | null;
                        height?: string | null;
                        productType?: string | null;
                        productionMethod?: string | null;
                        ringType?: string | null;
                        files?: Array<{
                            __typename?: 'ArtFile';
                            artId: string;
                            originalPath: string;
                            watermarkPath: string;
                            uploadedAt: any;
                        }> | null;
                        project?: {
                            __typename?: 'Project';
                            id: string;
                            name: string;
                            internal: boolean;
                            hasDesignDoc?: boolean | null;
                            sfm?: string | null;
                            dropNumber?: string | null;
                            intercenter?: string | null;
                            factoryId?: string | null;
                            customerId?: string | null;
                            createdAt: any;
                            updatedAt: any;
                        } | null;
                    }> | null;
                } | null;
            };
        }> | null;
    };
};

export type ArtsQueryVariables = Exact<{
    filter?: InputMaybe<ArtFilterQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
    order?: InputMaybe<ArtOrderQuery>;
}>;

export type ArtsQuery = {
    __typename?: 'Query';
    arts: {
        __typename?: 'ArtResponse';
        page: {
            __typename?: 'ArtTypeConnection';
            edges?: Array<{
                __typename?: 'ArtTypeEdge';
                cursor?: string | null;
                node?: {
                    __typename?: 'Art';
                    id: string;
                    name: string;
                    internal: boolean;
                    projectId?: string | null;
                    createdAt?: any | null;
                    updatedAt?: any | null;
                    bottomForm?: string | null;
                    artClass?: string | null;
                    form?: string | null;
                    nominalVolume?: string | null;
                    height?: string | null;
                    productType?: string | null;
                    productionMethod?: string | null;
                    ringType?: string | null;
                    files?: Array<{
                        __typename?: 'ArtFile';
                        artId: string;
                        originalPath: string;
                        watermarkPath: string;
                        uploadedAt: any;
                        art: {
                            __typename?: 'Art';
                            id: string;
                            name: string;
                            internal: boolean;
                            projectId?: string | null;
                            createdAt?: any | null;
                            updatedAt?: any | null;
                            bottomForm?: string | null;
                            artClass?: string | null;
                            form?: string | null;
                            nominalVolume?: string | null;
                            height?: string | null;
                            productType?: string | null;
                            productionMethod?: string | null;
                            ringType?: string | null;
                            files?: Array<{
                                __typename?: 'ArtFile';
                                artId: string;
                                originalPath: string;
                                watermarkPath: string;
                                uploadedAt: any;
                            }> | null;
                            project?: {
                                __typename?: 'Project';
                                id: string;
                                name: string;
                                internal: boolean;
                                hasDesignDoc?: boolean | null;
                                sfm?: string | null;
                                dropNumber?: string | null;
                                intercenter?: string | null;
                                factoryId?: string | null;
                                customerId?: string | null;
                                createdAt: any;
                                updatedAt: any;
                                arts?: Array<{
                                    __typename?: 'Art';
                                    id: string;
                                    name: string;
                                    internal: boolean;
                                    projectId?: string | null;
                                    createdAt?: any | null;
                                    updatedAt?: any | null;
                                    bottomForm?: string | null;
                                    artClass?: string | null;
                                    form?: string | null;
                                    nominalVolume?: string | null;
                                    height?: string | null;
                                    productType?: string | null;
                                    productionMethod?: string | null;
                                    ringType?: string | null;
                                    files?: Array<{
                                        __typename?: 'ArtFile';
                                        artId: string;
                                        originalPath: string;
                                        watermarkPath: string;
                                        uploadedAt: any;
                                    }> | null;
                                    project?: {
                                        __typename?: 'Project';
                                        id: string;
                                        name: string;
                                        internal: boolean;
                                        hasDesignDoc?: boolean | null;
                                        sfm?: string | null;
                                        dropNumber?: string | null;
                                        intercenter?: string | null;
                                        factoryId?: string | null;
                                        customerId?: string | null;
                                        createdAt: any;
                                        updatedAt: any;
                                    } | null;
                                }> | null;
                            } | null;
                        };
                    }> | null;
                    project?: {
                        __typename?: 'Project';
                        id: string;
                        name: string;
                        internal: boolean;
                        hasDesignDoc?: boolean | null;
                        sfm?: string | null;
                        dropNumber?: string | null;
                        intercenter?: string | null;
                        factoryId?: string | null;
                        customerId?: string | null;
                        createdAt: any;
                        updatedAt: any;
                    } | null;
                } | null;
            }> | null;
            pageInfo?: {
                __typename?: 'ArtTypePageInfo';
                startCursor?: string | null;
                endCursor?: string | null;
                hasPreviousPage: boolean;
                hasNextPage: boolean;
            } | null;
        };
        pageData?: { __typename?: 'PageData'; count: number; take: number; skip: number } | null;
    };
};

export type CustomerQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type CustomerQuery = {
    __typename?: 'Query';
    customer: {
        __typename?: 'Customer';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type CustomersQueryVariables = Exact<{ [key: string]: never }>;

export type CustomersQuery = {
    __typename?: 'Query';
    customers: Array<{
        __typename?: 'Customer';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type FactoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FactoriesQuery = {
    __typename?: 'Query';
    factories: Array<{
        __typename?: 'Factory';
        id: string;
        name: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type FactoryQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type FactoryQuery = {
    __typename?: 'Query';
    factory: { __typename?: 'Factory'; id: string; name: string; active: boolean; createdAt: any; updatedAt: any };
};

export type GetArtClassQueryVariables = Exact<{ [key: string]: never }>;

export type GetArtClassQuery = {
    __typename?: 'Query';
    getArtClass: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetBottomFormQueryVariables = Exact<{ [key: string]: never }>;

export type GetBottomFormQuery = {
    __typename?: 'Query';
    getBottomForm: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetDropNumberQueryVariables = Exact<{ [key: string]: never }>;

export type GetDropNumberQuery = {
    __typename?: 'Query';
    getDropNumber: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetFormQueryVariables = Exact<{ [key: string]: never }>;

export type GetFormQuery = {
    __typename?: 'Query';
    getForm: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetHeightQueryVariables = Exact<{ [key: string]: never }>;

export type GetHeightQuery = {
    __typename?: 'Query';
    getHeight: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetIntercenterQueryVariables = Exact<{ [key: string]: never }>;

export type GetIntercenterQuery = {
    __typename?: 'Query';
    getIntercenter: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetNominalVolumeQueryVariables = Exact<{ [key: string]: never }>;

export type GetNominalVolumeQuery = {
    __typename?: 'Query';
    getNominalVolume: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetProductTypeQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductTypeQuery = {
    __typename?: 'Query';
    getProductType: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetProductionMethodQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductionMethodQuery = {
    __typename?: 'Query';
    getProductionMethod: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetRingTypeQueryVariables = Exact<{ [key: string]: never }>;

export type GetRingTypeQuery = {
    __typename?: 'Query';
    getRingType: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type GetSfmQueryVariables = Exact<{ [key: string]: never }>;

export type GetSfmQuery = {
    __typename?: 'Query';
    getSfm: Array<{
        __typename?: 'BaseAttributeType';
        id: number;
        name: string;
        active: boolean;
        valueOrder: number;
        createdAt: any;
        updatedAt: any;
    }>;
};

export type ProjectQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type ProjectQuery = {
    __typename?: 'Query';
    project: {
        __typename?: 'Project';
        id: string;
        name: string;
        internal: boolean;
        hasDesignDoc?: boolean | null;
        sfm?: string | null;
        dropNumber?: string | null;
        intercenter?: string | null;
        factoryId?: string | null;
        customerId?: string | null;
        createdAt: any;
        updatedAt: any;
        arts?: Array<{
            __typename?: 'Art';
            id: string;
            name: string;
            internal: boolean;
            projectId?: string | null;
            createdAt?: any | null;
            updatedAt?: any | null;
            bottomForm?: string | null;
            artClass?: string | null;
            form?: string | null;
            nominalVolume?: string | null;
            height?: string | null;
            productType?: string | null;
            productionMethod?: string | null;
            ringType?: string | null;
            files?: Array<{
                __typename?: 'ArtFile';
                artId: string;
                originalPath: string;
                watermarkPath: string;
                uploadedAt: any;
                art: {
                    __typename?: 'Art';
                    id: string;
                    name: string;
                    internal: boolean;
                    projectId?: string | null;
                    createdAt?: any | null;
                    updatedAt?: any | null;
                    bottomForm?: string | null;
                    artClass?: string | null;
                    form?: string | null;
                    nominalVolume?: string | null;
                    height?: string | null;
                    productType?: string | null;
                    productionMethod?: string | null;
                    ringType?: string | null;
                    files?: Array<{
                        __typename?: 'ArtFile';
                        artId: string;
                        originalPath: string;
                        watermarkPath: string;
                        uploadedAt: any;
                    }> | null;
                    project?: {
                        __typename?: 'Project';
                        id: string;
                        name: string;
                        internal: boolean;
                        hasDesignDoc?: boolean | null;
                        sfm?: string | null;
                        dropNumber?: string | null;
                        intercenter?: string | null;
                        factoryId?: string | null;
                        customerId?: string | null;
                        createdAt: any;
                        updatedAt: any;
                    } | null;
                };
            }> | null;
            project?: {
                __typename?: 'Project';
                id: string;
                name: string;
                internal: boolean;
                hasDesignDoc?: boolean | null;
                sfm?: string | null;
                dropNumber?: string | null;
                intercenter?: string | null;
                factoryId?: string | null;
                customerId?: string | null;
                createdAt: any;
                updatedAt: any;
            } | null;
        }> | null;
    };
};

export type ProjectsQueryVariables = Exact<{
    filter?: InputMaybe<ProjectFilterQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
    order?: InputMaybe<ProjectOrderQuery>;
}>;

export type ProjectsQuery = {
    __typename?: 'Query';
    projects: {
        __typename?: 'ProjectResponse';
        page: {
            __typename?: 'ProjectTypeConnection';
            edges?: Array<{
                __typename?: 'ProjectTypeEdge';
                cursor?: string | null;
                node?: {
                    __typename?: 'Project';
                    id: string;
                    name: string;
                    internal: boolean;
                    hasDesignDoc?: boolean | null;
                    sfm?: string | null;
                    dropNumber?: string | null;
                    intercenter?: string | null;
                    factoryId?: string | null;
                    customerId?: string | null;
                    createdAt: any;
                    updatedAt: any;
                    arts?: Array<{
                        __typename?: 'Art';
                        id: string;
                        name: string;
                        internal: boolean;
                        projectId?: string | null;
                        createdAt?: any | null;
                        updatedAt?: any | null;
                        bottomForm?: string | null;
                        artClass?: string | null;
                        form?: string | null;
                        nominalVolume?: string | null;
                        height?: string | null;
                        productType?: string | null;
                        productionMethod?: string | null;
                        ringType?: string | null;
                        files?: Array<{
                            __typename?: 'ArtFile';
                            artId: string;
                            originalPath: string;
                            watermarkPath: string;
                            uploadedAt: any;
                            art: {
                                __typename?: 'Art';
                                id: string;
                                name: string;
                                internal: boolean;
                                projectId?: string | null;
                                createdAt?: any | null;
                                updatedAt?: any | null;
                                bottomForm?: string | null;
                                artClass?: string | null;
                                form?: string | null;
                                nominalVolume?: string | null;
                                height?: string | null;
                                productType?: string | null;
                                productionMethod?: string | null;
                                ringType?: string | null;
                                files?: Array<{
                                    __typename?: 'ArtFile';
                                    artId: string;
                                    originalPath: string;
                                    watermarkPath: string;
                                    uploadedAt: any;
                                }> | null;
                                project?: {
                                    __typename?: 'Project';
                                    id: string;
                                    name: string;
                                    internal: boolean;
                                    hasDesignDoc?: boolean | null;
                                    sfm?: string | null;
                                    dropNumber?: string | null;
                                    intercenter?: string | null;
                                    factoryId?: string | null;
                                    customerId?: string | null;
                                    createdAt: any;
                                    updatedAt: any;
                                    arts?: Array<{
                                        __typename?: 'Art';
                                        id: string;
                                        name: string;
                                        internal: boolean;
                                        projectId?: string | null;
                                        createdAt?: any | null;
                                        updatedAt?: any | null;
                                        bottomForm?: string | null;
                                        artClass?: string | null;
                                        form?: string | null;
                                        nominalVolume?: string | null;
                                        height?: string | null;
                                        productType?: string | null;
                                        productionMethod?: string | null;
                                        ringType?: string | null;
                                        project?: {
                                            __typename?: 'Project';
                                            id: string;
                                            name: string;
                                            internal: boolean;
                                            hasDesignDoc?: boolean | null;
                                            sfm?: string | null;
                                            dropNumber?: string | null;
                                            intercenter?: string | null;
                                            factoryId?: string | null;
                                            customerId?: string | null;
                                            createdAt: any;
                                            updatedAt: any;
                                        } | null;
                                    }> | null;
                                } | null;
                            };
                        }> | null;
                    }> | null;
                } | null;
            }> | null;
            pageInfo?: {
                __typename?: 'ProjectTypePageInfo';
                startCursor?: string | null;
                endCursor?: string | null;
                hasPreviousPage: boolean;
                hasNextPage: boolean;
            } | null;
        };
        pageData?: { __typename?: 'PageData'; count: number; take: number; skip: number } | null;
    };
};

export type UserQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type UserQuery = {
    __typename?: 'Query';
    user: {
        __typename?: 'User';
        id: string;
        username: string;
        fullName: string;
        role: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export type UsersQueryVariables = Exact<{
    filter?: InputMaybe<UserFilterQuery>;
    pagination?: InputMaybe<ConnectionArgs>;
    order?: InputMaybe<UserOrderQuery>;
}>;

export type UsersQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserResponse';
        page: {
            __typename?: 'UserTypeConnection';
            edges?: Array<{
                __typename?: 'UserTypeEdge';
                cursor?: string | null;
                node?: {
                    __typename?: 'User';
                    id: string;
                    username: string;
                    fullName: string;
                    role: string;
                    active: boolean;
                    createdAt: any;
                    updatedAt: any;
                } | null;
            }> | null;
            pageInfo?: {
                __typename?: 'UserTypePageInfo';
                startCursor?: string | null;
                endCursor?: string | null;
                hasPreviousPage: boolean;
                hasNextPage: boolean;
            } | null;
        };
        pageData?: { __typename?: 'PageData'; count: number; take: number; skip: number } | null;
    };
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = {
    __typename?: 'Query';
    whoAmI: {
        __typename?: 'User';
        id: string;
        username: string;
        fullName: string;
        role: string;
        active: boolean;
        createdAt: any;
        updatedAt: any;
    };
};

export const ChangePasswordDocument = `
    mutation changePassword($username: String!, $password: String!, $passwordRepeat: String!, $newPassword: String!) {
  changePassword(
    username: $username
    password: $password
    passwordRepeat: $passwordRepeat
    newPassword: $newPassword
  )
}
    `;
export const CreateArtDocument = `
    mutation createArt($createArtInput: CreateArtInput!) {
  createArt(createArtInput: $createArtInput) {
    id
    name
    internal
    files {
      artId
      art {
        id
        name
        internal
        files {
          artId
          originalPath
          watermarkPath
          uploadedAt
        }
        projectId
        createdAt
        updatedAt
        bottomForm
        artClass
        form
        nominalVolume
        height
        productType
        productionMethod
        ringType
        project {
          id
          name
          internal
          hasDesignDoc
          sfm
          dropNumber
          intercenter
          arts {
            id
            name
            internal
            files {
              artId
              originalPath
              watermarkPath
              uploadedAt
            }
            projectId
            createdAt
            updatedAt
            bottomForm
            artClass
            form
            nominalVolume
            height
            productType
            productionMethod
            ringType
            project {
              id
              name
              internal
              hasDesignDoc
              sfm
              dropNumber
              intercenter
              factoryId
              customerId
              createdAt
              updatedAt
            }
          }
          factoryId
          customerId
          createdAt
          updatedAt
        }
      }
      originalPath
      watermarkPath
      uploadedAt
    }
    projectId
    createdAt
    updatedAt
    bottomForm
    artClass
    form
    nominalVolume
    height
    productType
    productionMethod
    ringType
    project {
      id
      name
      internal
      hasDesignDoc
      sfm
      dropNumber
      intercenter
      factoryId
      customerId
      createdAt
      updatedAt
    }
  }
}
    `;
export const CreateArtClassDocument = `
    mutation createArtClass($input: CreateAttributeInput!) {
  createArtClass(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateBottomFormDocument = `
    mutation createBottomForm($input: CreateAttributeInput!) {
  createBottomForm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateCustomerDocument = `
    mutation createCustomer($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const CreateDropNumberDocument = `
    mutation createDropNumber($input: CreateAttributeInput!) {
  createDropNumber(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateFactoryDocument = `
    mutation createFactory($input: CreateFactoryInput!) {
  createFactory(input: $input) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const CreateFormDocument = `
    mutation createForm($input: CreateAttributeInput!) {
  createForm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateHeightDocument = `
    mutation createHeight($input: CreateAttributeInput!) {
  createHeight(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateIntercenterDocument = `
    mutation createIntercenter($input: CreateAttributeInput!) {
  createIntercenter(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateNominalVolumeDocument = `
    mutation createNominalVolume($input: CreateAttributeInput!) {
  createNominalVolume(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateProductTypeDocument = `
    mutation createProductType($input: CreateAttributeInput!) {
  createProductType(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateProductionMethodDocument = `
    mutation createProductionMethod($input: CreateAttributeInput!) {
  createProductionMethod(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateProjectDocument = `
    mutation createProject($createProjectInput: CreateProjectInput!) {
  createProject(createProjectInput: $createProjectInput) {
    id
    name
    internal
    hasDesignDoc
    sfm
    dropNumber
    intercenter
    arts {
      id
      name
      internal
      files {
        artId
        art {
          id
          name
          internal
          files {
            artId
            originalPath
            watermarkPath
            uploadedAt
          }
          projectId
          createdAt
          updatedAt
          bottomForm
          artClass
          form
          nominalVolume
          height
          productType
          productionMethod
          ringType
          project {
            id
            name
            internal
            hasDesignDoc
            sfm
            dropNumber
            intercenter
            arts {
              id
              name
              internal
              projectId
              createdAt
              updatedAt
              bottomForm
              artClass
              form
              nominalVolume
              height
              productType
              productionMethod
              ringType
              project {
                id
                name
                internal
                hasDesignDoc
                sfm
                dropNumber
                intercenter
                factoryId
                customerId
                createdAt
                updatedAt
              }
            }
            factoryId
            customerId
            createdAt
            updatedAt
          }
        }
        originalPath
        watermarkPath
        uploadedAt
      }
      projectId
      createdAt
      updatedAt
      bottomForm
      artClass
      form
      nominalVolume
      height
      productType
      productionMethod
      ringType
    }
    factoryId
    customerId
    createdAt
    updatedAt
  }
}
    `;
export const CreateRingTypeDocument = `
    mutation createRingType($input: CreateAttributeInput!) {
  createRingType(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateSfmDocument = `
    mutation createSfm($input: CreateAttributeInput!) {
  createSfm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const CreateUserDocument = `
    mutation createUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    username
    fullName
    role
    active
    createdAt
    updatedAt
  }
}
    `;
export const LoginDocument = `
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      fullName
      role
      active
      createdAt
      updatedAt
    }
  }
}
    `;
export const LogoutDocument = `
    mutation logout {
  logout
}
    `;
export const UpdateArtDocument = `
    mutation updateArt($updateArtInput: UpdateArtInput!) {
  updateArt(updateArtInput: $updateArtInput) {
    id
    name
    internal
    files {
      artId
      art {
        id
        name
        internal
        files {
          artId
          originalPath
          watermarkPath
          uploadedAt
        }
        projectId
        createdAt
        updatedAt
        bottomForm
        artClass
        form
        nominalVolume
        height
        productType
        productionMethod
        ringType
        project {
          id
          name
          internal
          hasDesignDoc
          sfm
          dropNumber
          intercenter
          arts {
            id
            name
            internal
            files {
              artId
              originalPath
              watermarkPath
              uploadedAt
            }
            projectId
            createdAt
            updatedAt
            bottomForm
            artClass
            form
            nominalVolume
            height
            productType
            productionMethod
            ringType
            project {
              id
              name
              internal
              hasDesignDoc
              sfm
              dropNumber
              intercenter
              factoryId
              customerId
              createdAt
              updatedAt
            }
          }
          factoryId
          customerId
          createdAt
          updatedAt
        }
      }
      originalPath
      watermarkPath
      uploadedAt
    }
    projectId
    createdAt
    updatedAt
    bottomForm
    artClass
    form
    nominalVolume
    height
    productType
    productionMethod
    ringType
    project {
      id
      name
      internal
      hasDesignDoc
      sfm
      dropNumber
      intercenter
      factoryId
      customerId
      createdAt
      updatedAt
    }
  }
}
    `;
export const UpdateArtClassDocument = `
    mutation updateArtClass($input: UpdateAttributeInput!) {
  updateArtClass(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateArtClassOrderDocument = `
    mutation updateArtClassOrder($input: UpdateAttributeValueOrderInput!) {
  updateArtClassOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateBottomFormDocument = `
    mutation updateBottomForm($input: UpdateAttributeInput!) {
  updateBottomForm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateBottomFormOrderDocument = `
    mutation updateBottomFormOrder($input: UpdateAttributeValueOrderInput!) {
  updateBottomFormOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateCustomerDocument = `
    mutation updateCustomer($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const UpdateDropNumberDocument = `
    mutation updateDropNumber($input: UpdateAttributeInput!) {
  updateDropNumber(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateDropNumberOrderDocument = `
    mutation updateDropNumberOrder($input: UpdateAttributeValueOrderInput!) {
  updateDropNumberOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateFactoryDocument = `
    mutation updateFactory($input: UpdateFactoryInput!) {
  updateFactory(input: $input) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const UpdateFormDocument = `
    mutation updateForm($input: UpdateAttributeInput!) {
  updateForm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateFormOrderDocument = `
    mutation updateFormOrder($input: UpdateAttributeValueOrderInput!) {
  updateFormOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateHeightDocument = `
    mutation updateHeight($input: UpdateAttributeInput!) {
  updateHeight(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateHeightOrderDocument = `
    mutation updateHeightOrder($input: UpdateAttributeValueOrderInput!) {
  updateHeightOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateIntercenterDocument = `
    mutation updateIntercenter($input: UpdateAttributeInput!) {
  updateIntercenter(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateIntercenterOrderDocument = `
    mutation updateIntercenterOrder($input: UpdateAttributeValueOrderInput!) {
  updateIntercenterOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateNominalVolumeDocument = `
    mutation updateNominalVolume($input: UpdateAttributeInput!) {
  updateNominalVolume(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateNominalVolumeOrderDocument = `
    mutation updateNominalVolumeOrder($input: UpdateAttributeValueOrderInput!) {
  updateNominalVolumeOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProductTypeDocument = `
    mutation updateProductType($input: UpdateAttributeInput!) {
  updateProductType(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProductTypeOrderDocument = `
    mutation updateProductTypeOrder($input: UpdateAttributeValueOrderInput!) {
  updateProductTypeOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProductionMethodDocument = `
    mutation updateProductionMethod($input: UpdateAttributeInput!) {
  updateProductionMethod(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProductionMethodOrderDocument = `
    mutation updateProductionMethodOrder($input: UpdateAttributeValueOrderInput!) {
  updateProductionMethodOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProjectDocument = `
    mutation updateProject($updateProjectInput: UpdateProjectInput!) {
  updateProject(updateProjectInput: $updateProjectInput) {
    id
    name
    internal
    hasDesignDoc
    sfm
    dropNumber
    intercenter
    arts {
      id
      name
      internal
      files {
        artId
        art {
          id
          name
          internal
          files {
            artId
            originalPath
            watermarkPath
            uploadedAt
          }
          projectId
          createdAt
          updatedAt
          bottomForm
          artClass
          form
          nominalVolume
          height
          productType
          productionMethod
          ringType
          project {
            id
            name
            internal
            hasDesignDoc
            sfm
            dropNumber
            intercenter
            arts {
              id
              name
              internal
              projectId
              createdAt
              updatedAt
              bottomForm
              artClass
              form
              nominalVolume
              height
              productType
              productionMethod
              ringType
              project {
                id
                name
                internal
                hasDesignDoc
                sfm
                dropNumber
                intercenter
                factoryId
                customerId
                createdAt
                updatedAt
              }
            }
            factoryId
            customerId
            createdAt
            updatedAt
          }
        }
        originalPath
        watermarkPath
        uploadedAt
      }
      projectId
      createdAt
      updatedAt
      bottomForm
      artClass
      form
      nominalVolume
      height
      productType
      productionMethod
      ringType
    }
    factoryId
    customerId
    createdAt
    updatedAt
  }
}
    `;
export const UpdateRingTypeDocument = `
    mutation updateRingType($input: UpdateAttributeInput!) {
  updateRingType(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateRingTypeOrderDocument = `
    mutation updateRingTypeOrder($input: UpdateAttributeValueOrderInput!) {
  updateRingTypeOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateSfmDocument = `
    mutation updateSfm($input: UpdateAttributeInput!) {
  updateSfm(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateSfmOrderDocument = `
    mutation updateSfmOrder($input: UpdateAttributeValueOrderInput!) {
  updateSfmOrder(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateUserDocument = `
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    username
    fullName
    role
    active
    createdAt
    updatedAt
  }
}
    `;
export const ArtDocument = `
    query art($id: String!) {
  art(id: $id) {
    id
    name
    internal
    files {
      artId
      art {
        id
        name
        internal
        projectId
        createdAt
        updatedAt
        bottomForm
        artClass
        form
        nominalVolume
        height
        productType
        productionMethod
        ringType
        project {
          id
          name
          internal
          hasDesignDoc
          sfm
          dropNumber
          intercenter
          arts {
            id
            name
            internal
            files {
              artId
              originalPath
              watermarkPath
              uploadedAt
            }
            projectId
            createdAt
            updatedAt
            bottomForm
            artClass
            form
            nominalVolume
            height
            productType
            productionMethod
            ringType
            project {
              id
              name
              internal
              hasDesignDoc
              sfm
              dropNumber
              intercenter
              factoryId
              customerId
              createdAt
              updatedAt
            }
          }
          factoryId
          customerId
          createdAt
          updatedAt
        }
      }
      originalPath
      watermarkPath
      uploadedAt
    }
    projectId
    createdAt
    updatedAt
    bottomForm
    artClass
    form
    nominalVolume
    height
    productType
    productionMethod
    ringType
  }
}
    `;
export const ArtsDocument = `
    query arts($filter: ArtFilterQuery, $pagination: ConnectionArgs, $order: ArtOrderQuery) {
  arts(filter: $filter, pagination: $pagination, order: $order) {
    page {
      edges {
        cursor
        node {
          id
          name
          internal
          files {
            artId
            art {
              id
              name
              internal
              files {
                artId
                originalPath
                watermarkPath
                uploadedAt
              }
              projectId
              createdAt
              updatedAt
              bottomForm
              artClass
              form
              nominalVolume
              height
              productType
              productionMethod
              ringType
              project {
                id
                name
                internal
                hasDesignDoc
                sfm
                dropNumber
                intercenter
                arts {
                  id
                  name
                  internal
                  files {
                    artId
                    originalPath
                    watermarkPath
                    uploadedAt
                  }
                  projectId
                  createdAt
                  updatedAt
                  bottomForm
                  artClass
                  form
                  nominalVolume
                  height
                  productType
                  productionMethod
                  ringType
                  project {
                    id
                    name
                    internal
                    hasDesignDoc
                    sfm
                    dropNumber
                    intercenter
                    factoryId
                    customerId
                    createdAt
                    updatedAt
                  }
                }
                factoryId
                customerId
                createdAt
                updatedAt
              }
            }
            originalPath
            watermarkPath
            uploadedAt
          }
          projectId
          createdAt
          updatedAt
          bottomForm
          artClass
          form
          nominalVolume
          height
          productType
          productionMethod
          ringType
          project {
            id
            name
            internal
            hasDesignDoc
            sfm
            dropNumber
            intercenter
            factoryId
            customerId
            createdAt
            updatedAt
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
    pageData {
      count
      take
      skip
    }
  }
}
    `;
export const CustomerDocument = `
    query customer($id: String!) {
  customer(id: $id) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const CustomersDocument = `
    query customers {
  customers {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const FactoriesDocument = `
    query factories {
  factories {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const FactoryDocument = `
    query factory($id: String!) {
  factory(id: $id) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const GetArtClassDocument = `
    query getArtClass {
  getArtClass {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetBottomFormDocument = `
    query getBottomForm {
  getBottomForm {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetDropNumberDocument = `
    query getDropNumber {
  getDropNumber {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetFormDocument = `
    query getForm {
  getForm {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetHeightDocument = `
    query getHeight {
  getHeight {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetIntercenterDocument = `
    query getIntercenter {
  getIntercenter {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetNominalVolumeDocument = `
    query getNominalVolume {
  getNominalVolume {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetProductTypeDocument = `
    query getProductType {
  getProductType {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetProductionMethodDocument = `
    query getProductionMethod {
  getProductionMethod {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetRingTypeDocument = `
    query getRingType {
  getRingType {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const GetSfmDocument = `
    query getSfm {
  getSfm {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const ProjectDocument = `
    query project($id: String!) {
  project(id: $id) {
    id
    name
    internal
    hasDesignDoc
    sfm
    dropNumber
    intercenter
    arts {
      id
      name
      internal
      files {
        artId
        art {
          id
          name
          internal
          files {
            artId
            originalPath
            watermarkPath
            uploadedAt
          }
          projectId
          createdAt
          updatedAt
          bottomForm
          artClass
          form
          nominalVolume
          height
          productType
          productionMethod
          ringType
          project {
            id
            name
            internal
            hasDesignDoc
            sfm
            dropNumber
            intercenter
            factoryId
            customerId
            createdAt
            updatedAt
          }
        }
        originalPath
        watermarkPath
        uploadedAt
      }
      projectId
      createdAt
      updatedAt
      bottomForm
      artClass
      form
      nominalVolume
      height
      productType
      productionMethod
      ringType
      project {
        id
        name
        internal
        hasDesignDoc
        sfm
        dropNumber
        intercenter
        factoryId
        customerId
        createdAt
        updatedAt
      }
    }
    factoryId
    customerId
    createdAt
    updatedAt
  }
}
    `;
export const ProjectsDocument = `
    query projects($filter: ProjectFilterQuery, $pagination: ConnectionArgs, $order: ProjectOrderQuery) {
  projects(filter: $filter, pagination: $pagination, order: $order) {
    page {
      edges {
        cursor
        node {
          id
          name
          internal
          hasDesignDoc
          sfm
          dropNumber
          intercenter
          arts {
            id
            name
            internal
            files {
              artId
              art {
                id
                name
                internal
                files {
                  artId
                  originalPath
                  watermarkPath
                  uploadedAt
                }
                projectId
                createdAt
                updatedAt
                bottomForm
                artClass
                form
                nominalVolume
                height
                productType
                productionMethod
                ringType
                project {
                  id
                  name
                  internal
                  hasDesignDoc
                  sfm
                  dropNumber
                  intercenter
                  arts {
                    id
                    name
                    internal
                    projectId
                    createdAt
                    updatedAt
                    bottomForm
                    artClass
                    form
                    nominalVolume
                    height
                    productType
                    productionMethod
                    ringType
                    project {
                      id
                      name
                      internal
                      hasDesignDoc
                      sfm
                      dropNumber
                      intercenter
                      factoryId
                      customerId
                      createdAt
                      updatedAt
                    }
                  }
                  factoryId
                  customerId
                  createdAt
                  updatedAt
                }
              }
              originalPath
              watermarkPath
              uploadedAt
            }
            projectId
            createdAt
            updatedAt
            bottomForm
            artClass
            form
            nominalVolume
            height
            productType
            productionMethod
            ringType
          }
          factoryId
          customerId
          createdAt
          updatedAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
    pageData {
      count
      take
      skip
    }
  }
}
    `;
export const UserDocument = `
    query user($id: String!) {
  user(id: $id) {
    id
    username
    fullName
    role
    active
    createdAt
    updatedAt
  }
}
    `;
export const UsersDocument = `
    query users($filter: UserFilterQuery, $pagination: ConnectionArgs, $order: UserOrderQuery) {
  users(filter: $filter, pagination: $pagination, order: $order) {
    page {
      edges {
        cursor
        node {
          id
          username
          fullName
          role
          active
          createdAt
          updatedAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
    pageData {
      count
      take
      skip
    }
  }
}
    `;
export const WhoAmIDocument = `
    query whoAmI {
  whoAmI {
    id
    username
    fullName
    role
    active
    createdAt
    updatedAt
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation<ChangePasswordMutation, ChangePasswordMutationVariables>({
            query: (variables) => ({ document: ChangePasswordDocument, variables }),
        }),
        createArt: build.mutation<CreateArtMutation, CreateArtMutationVariables>({
            query: (variables) => ({ document: CreateArtDocument, variables }),
        }),
        createArtClass: build.mutation<CreateArtClassMutation, CreateArtClassMutationVariables>({
            query: (variables) => ({ document: CreateArtClassDocument, variables }),
        }),
        createBottomForm: build.mutation<CreateBottomFormMutation, CreateBottomFormMutationVariables>({
            query: (variables) => ({ document: CreateBottomFormDocument, variables }),
        }),
        createCustomer: build.mutation<CreateCustomerMutation, CreateCustomerMutationVariables>({
            query: (variables) => ({ document: CreateCustomerDocument, variables }),
        }),
        createDropNumber: build.mutation<CreateDropNumberMutation, CreateDropNumberMutationVariables>({
            query: (variables) => ({ document: CreateDropNumberDocument, variables }),
        }),
        createFactory: build.mutation<CreateFactoryMutation, CreateFactoryMutationVariables>({
            query: (variables) => ({ document: CreateFactoryDocument, variables }),
        }),
        createForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
            query: (variables) => ({ document: CreateFormDocument, variables }),
        }),
        createHeight: build.mutation<CreateHeightMutation, CreateHeightMutationVariables>({
            query: (variables) => ({ document: CreateHeightDocument, variables }),
        }),
        createIntercenter: build.mutation<CreateIntercenterMutation, CreateIntercenterMutationVariables>({
            query: (variables) => ({ document: CreateIntercenterDocument, variables }),
        }),
        createNominalVolume: build.mutation<CreateNominalVolumeMutation, CreateNominalVolumeMutationVariables>({
            query: (variables) => ({ document: CreateNominalVolumeDocument, variables }),
        }),
        createProductType: build.mutation<CreateProductTypeMutation, CreateProductTypeMutationVariables>({
            query: (variables) => ({ document: CreateProductTypeDocument, variables }),
        }),
        createProductionMethod: build.mutation<
            CreateProductionMethodMutation,
            CreateProductionMethodMutationVariables
        >({
            query: (variables) => ({ document: CreateProductionMethodDocument, variables }),
        }),
        createProject: build.mutation<CreateProjectMutation, CreateProjectMutationVariables>({
            query: (variables) => ({ document: CreateProjectDocument, variables }),
        }),
        createRingType: build.mutation<CreateRingTypeMutation, CreateRingTypeMutationVariables>({
            query: (variables) => ({ document: CreateRingTypeDocument, variables }),
        }),
        createSfm: build.mutation<CreateSfmMutation, CreateSfmMutationVariables>({
            query: (variables) => ({ document: CreateSfmDocument, variables }),
        }),
        createUser: build.mutation<CreateUserMutation, CreateUserMutationVariables>({
            query: (variables) => ({ document: CreateUserDocument, variables }),
        }),
        login: build.mutation<LoginMutation, LoginMutationVariables>({
            query: (variables) => ({ document: LoginDocument, variables }),
        }),
        logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
            query: (variables) => ({ document: LogoutDocument, variables }),
        }),
        updateArt: build.mutation<UpdateArtMutation, UpdateArtMutationVariables>({
            query: (variables) => ({ document: UpdateArtDocument, variables }),
        }),
        updateArtClass: build.mutation<UpdateArtClassMutation, UpdateArtClassMutationVariables>({
            query: (variables) => ({ document: UpdateArtClassDocument, variables }),
        }),
        updateArtClassOrder: build.mutation<UpdateArtClassOrderMutation, UpdateArtClassOrderMutationVariables>({
            query: (variables) => ({ document: UpdateArtClassOrderDocument, variables }),
        }),
        updateBottomForm: build.mutation<UpdateBottomFormMutation, UpdateBottomFormMutationVariables>({
            query: (variables) => ({ document: UpdateBottomFormDocument, variables }),
        }),
        updateBottomFormOrder: build.mutation<
            UpdateBottomFormOrderMutation,
            UpdateBottomFormOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateBottomFormOrderDocument, variables }),
        }),
        updateCustomer: build.mutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
            query: (variables) => ({ document: UpdateCustomerDocument, variables }),
        }),
        updateDropNumber: build.mutation<UpdateDropNumberMutation, UpdateDropNumberMutationVariables>({
            query: (variables) => ({ document: UpdateDropNumberDocument, variables }),
        }),
        updateDropNumberOrder: build.mutation<
            UpdateDropNumberOrderMutation,
            UpdateDropNumberOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateDropNumberOrderDocument, variables }),
        }),
        updateFactory: build.mutation<UpdateFactoryMutation, UpdateFactoryMutationVariables>({
            query: (variables) => ({ document: UpdateFactoryDocument, variables }),
        }),
        updateForm: build.mutation<UpdateFormMutation, UpdateFormMutationVariables>({
            query: (variables) => ({ document: UpdateFormDocument, variables }),
        }),
        updateFormOrder: build.mutation<UpdateFormOrderMutation, UpdateFormOrderMutationVariables>({
            query: (variables) => ({ document: UpdateFormOrderDocument, variables }),
        }),
        updateHeight: build.mutation<UpdateHeightMutation, UpdateHeightMutationVariables>({
            query: (variables) => ({ document: UpdateHeightDocument, variables }),
        }),
        updateHeightOrder: build.mutation<UpdateHeightOrderMutation, UpdateHeightOrderMutationVariables>({
            query: (variables) => ({ document: UpdateHeightOrderDocument, variables }),
        }),
        updateIntercenter: build.mutation<UpdateIntercenterMutation, UpdateIntercenterMutationVariables>({
            query: (variables) => ({ document: UpdateIntercenterDocument, variables }),
        }),
        updateIntercenterOrder: build.mutation<
            UpdateIntercenterOrderMutation,
            UpdateIntercenterOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateIntercenterOrderDocument, variables }),
        }),
        updateNominalVolume: build.mutation<UpdateNominalVolumeMutation, UpdateNominalVolumeMutationVariables>({
            query: (variables) => ({ document: UpdateNominalVolumeDocument, variables }),
        }),
        updateNominalVolumeOrder: build.mutation<
            UpdateNominalVolumeOrderMutation,
            UpdateNominalVolumeOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateNominalVolumeOrderDocument, variables }),
        }),
        updateProductType: build.mutation<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>({
            query: (variables) => ({ document: UpdateProductTypeDocument, variables }),
        }),
        updateProductTypeOrder: build.mutation<
            UpdateProductTypeOrderMutation,
            UpdateProductTypeOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateProductTypeOrderDocument, variables }),
        }),
        updateProductionMethod: build.mutation<
            UpdateProductionMethodMutation,
            UpdateProductionMethodMutationVariables
        >({
            query: (variables) => ({ document: UpdateProductionMethodDocument, variables }),
        }),
        updateProductionMethodOrder: build.mutation<
            UpdateProductionMethodOrderMutation,
            UpdateProductionMethodOrderMutationVariables
        >({
            query: (variables) => ({ document: UpdateProductionMethodOrderDocument, variables }),
        }),
        updateProject: build.mutation<UpdateProjectMutation, UpdateProjectMutationVariables>({
            query: (variables) => ({ document: UpdateProjectDocument, variables }),
        }),
        updateRingType: build.mutation<UpdateRingTypeMutation, UpdateRingTypeMutationVariables>({
            query: (variables) => ({ document: UpdateRingTypeDocument, variables }),
        }),
        updateRingTypeOrder: build.mutation<UpdateRingTypeOrderMutation, UpdateRingTypeOrderMutationVariables>({
            query: (variables) => ({ document: UpdateRingTypeOrderDocument, variables }),
        }),
        updateSfm: build.mutation<UpdateSfmMutation, UpdateSfmMutationVariables>({
            query: (variables) => ({ document: UpdateSfmDocument, variables }),
        }),
        updateSfmOrder: build.mutation<UpdateSfmOrderMutation, UpdateSfmOrderMutationVariables>({
            query: (variables) => ({ document: UpdateSfmOrderDocument, variables }),
        }),
        updateUser: build.mutation<UpdateUserMutation, UpdateUserMutationVariables>({
            query: (variables) => ({ document: UpdateUserDocument, variables }),
        }),
        art: build.query<ArtQuery, ArtQueryVariables>({
            query: (variables) => ({ document: ArtDocument, variables }),
        }),
        arts: build.query<ArtsQuery, ArtsQueryVariables | void>({
            query: (variables) => ({ document: ArtsDocument, variables }),
        }),
        customer: build.query<CustomerQuery, CustomerQueryVariables>({
            query: (variables) => ({ document: CustomerDocument, variables }),
        }),
        customers: build.query<CustomersQuery, CustomersQueryVariables | void>({
            query: (variables) => ({ document: CustomersDocument, variables }),
        }),
        factories: build.query<FactoriesQuery, FactoriesQueryVariables | void>({
            query: (variables) => ({ document: FactoriesDocument, variables }),
        }),
        factory: build.query<FactoryQuery, FactoryQueryVariables>({
            query: (variables) => ({ document: FactoryDocument, variables }),
        }),
        getArtClass: build.query<GetArtClassQuery, GetArtClassQueryVariables | void>({
            query: (variables) => ({ document: GetArtClassDocument, variables }),
        }),
        getBottomForm: build.query<GetBottomFormQuery, GetBottomFormQueryVariables | void>({
            query: (variables) => ({ document: GetBottomFormDocument, variables }),
        }),
        getDropNumber: build.query<GetDropNumberQuery, GetDropNumberQueryVariables | void>({
            query: (variables) => ({ document: GetDropNumberDocument, variables }),
        }),
        getForm: build.query<GetFormQuery, GetFormQueryVariables | void>({
            query: (variables) => ({ document: GetFormDocument, variables }),
        }),
        getHeight: build.query<GetHeightQuery, GetHeightQueryVariables | void>({
            query: (variables) => ({ document: GetHeightDocument, variables }),
        }),
        getIntercenter: build.query<GetIntercenterQuery, GetIntercenterQueryVariables | void>({
            query: (variables) => ({ document: GetIntercenterDocument, variables }),
        }),
        getNominalVolume: build.query<GetNominalVolumeQuery, GetNominalVolumeQueryVariables | void>({
            query: (variables) => ({ document: GetNominalVolumeDocument, variables }),
        }),
        getProductType: build.query<GetProductTypeQuery, GetProductTypeQueryVariables | void>({
            query: (variables) => ({ document: GetProductTypeDocument, variables }),
        }),
        getProductionMethod: build.query<GetProductionMethodQuery, GetProductionMethodQueryVariables | void>({
            query: (variables) => ({ document: GetProductionMethodDocument, variables }),
        }),
        getRingType: build.query<GetRingTypeQuery, GetRingTypeQueryVariables | void>({
            query: (variables) => ({ document: GetRingTypeDocument, variables }),
        }),
        getSfm: build.query<GetSfmQuery, GetSfmQueryVariables | void>({
            query: (variables) => ({ document: GetSfmDocument, variables }),
        }),
        project: build.query<ProjectQuery, ProjectQueryVariables>({
            query: (variables) => ({ document: ProjectDocument, variables }),
        }),
        projects: build.query<ProjectsQuery, ProjectsQueryVariables | void>({
            query: (variables) => ({ document: ProjectsDocument, variables }),
        }),
        user: build.query<UserQuery, UserQueryVariables>({
            query: (variables) => ({ document: UserDocument, variables }),
        }),
        users: build.query<UsersQuery, UsersQueryVariables | void>({
            query: (variables) => ({ document: UsersDocument, variables }),
        }),
        whoAmI: build.query<WhoAmIQuery, WhoAmIQueryVariables | void>({
            query: (variables) => ({ document: WhoAmIDocument, variables }),
        }),
    }),
});

export { injectedRtkApi as api };
export const {
    useChangePasswordMutation,
    useCreateArtMutation,
    useCreateArtClassMutation,
    useCreateBottomFormMutation,
    useCreateCustomerMutation,
    useCreateDropNumberMutation,
    useCreateFactoryMutation,
    useCreateFormMutation,
    useCreateHeightMutation,
    useCreateIntercenterMutation,
    useCreateNominalVolumeMutation,
    useCreateProductTypeMutation,
    useCreateProductionMethodMutation,
    useCreateProjectMutation,
    useCreateRingTypeMutation,
    useCreateSfmMutation,
    useCreateUserMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateArtMutation,
    useUpdateArtClassMutation,
    useUpdateArtClassOrderMutation,
    useUpdateBottomFormMutation,
    useUpdateBottomFormOrderMutation,
    useUpdateCustomerMutation,
    useUpdateDropNumberMutation,
    useUpdateDropNumberOrderMutation,
    useUpdateFactoryMutation,
    useUpdateFormMutation,
    useUpdateFormOrderMutation,
    useUpdateHeightMutation,
    useUpdateHeightOrderMutation,
    useUpdateIntercenterMutation,
    useUpdateIntercenterOrderMutation,
    useUpdateNominalVolumeMutation,
    useUpdateNominalVolumeOrderMutation,
    useUpdateProductTypeMutation,
    useUpdateProductTypeOrderMutation,
    useUpdateProductionMethodMutation,
    useUpdateProductionMethodOrderMutation,
    useUpdateProjectMutation,
    useUpdateRingTypeMutation,
    useUpdateRingTypeOrderMutation,
    useUpdateSfmMutation,
    useUpdateSfmOrderMutation,
    useUpdateUserMutation,
    useArtQuery,
    useLazyArtQuery,
    useArtsQuery,
    useLazyArtsQuery,
    useCustomerQuery,
    useLazyCustomerQuery,
    useCustomersQuery,
    useLazyCustomersQuery,
    useFactoriesQuery,
    useLazyFactoriesQuery,
    useFactoryQuery,
    useLazyFactoryQuery,
    useGetArtClassQuery,
    useLazyGetArtClassQuery,
    useGetBottomFormQuery,
    useLazyGetBottomFormQuery,
    useGetDropNumberQuery,
    useLazyGetDropNumberQuery,
    useGetFormQuery,
    useLazyGetFormQuery,
    useGetHeightQuery,
    useLazyGetHeightQuery,
    useGetIntercenterQuery,
    useLazyGetIntercenterQuery,
    useGetNominalVolumeQuery,
    useLazyGetNominalVolumeQuery,
    useGetProductTypeQuery,
    useLazyGetProductTypeQuery,
    useGetProductionMethodQuery,
    useLazyGetProductionMethodQuery,
    useGetRingTypeQuery,
    useLazyGetRingTypeQuery,
    useGetSfmQuery,
    useLazyGetSfmQuery,
    useProjectQuery,
    useLazyProjectQuery,
    useProjectsQuery,
    useLazyProjectsQuery,
    useUserQuery,
    useLazyUserQuery,
    useUsersQuery,
    useLazyUsersQuery,
    useWhoAmIQuery,
    useLazyWhoAmIQuery,
} = injectedRtkApi;
