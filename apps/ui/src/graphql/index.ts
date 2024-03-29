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
  comments?: Maybe<Array<ArtComment>>;
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

export type ArtComment = {
  __typename?: 'ArtComment';
  art: Art;
  artId: Scalars['String'];
  author: User;
  authorId: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
};

export type ArtCommentInput = {
  artId: Scalars['String'];
  text: Scalars['String'];
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
  project?: InputMaybe<ProjectFilterQuery>;
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

export enum AttributeType {
  ArtClass = 'artClass',
  BottomForm = 'bottomForm',
  DropNumber = 'dropNumber',
  Form = 'form',
  Height = 'height',
  Intercenter = 'intercenter',
  NominalVolume = 'nominalVolume',
  ProductType = 'productType',
  ProductionMethod = 'productionMethod',
  RingType = 'ringType',
  Sfm = 'sfm'
}

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
  type: AttributeType;
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
  arts?: InputMaybe<Array<CreateArtInput>>;
  customerId?: InputMaybe<Scalars['String']>;
  dropNumber?: InputMaybe<Scalars['String']>;
  factoryId?: InputMaybe<Scalars['String']>;
  hasDesignDoc?: InputMaybe<Scalars['Boolean']>;
  intercenter?: InputMaybe<Scalars['String']>;
  internal?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  sfm?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  fullName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Role>;
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

export type CustomerFilterQuery = {
  AND?: InputMaybe<Array<CustomerFilterQuery>>;
  OR?: InputMaybe<Array<CustomerFilterQuery>>;
  name?: InputMaybe<StringFieldOption>;
};

export type DeleteAttributeInput = {
  id: Scalars['Float'];
  type: AttributeType;
};

export type Factory = {
  __typename?: 'Factory';
  active: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type FactoryFilterQuery = {
  AND?: InputMaybe<Array<FactoryFilterQuery>>;
  OR?: InputMaybe<Array<FactoryFilterQuery>>;
  name?: InputMaybe<StringFieldOption>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addArtComment: ArtComment;
  addProjectComment: ProjectComment;
  changePassword: Scalars['Boolean'];
  createArt: Art;
  createAttribute: BaseAttributeType;
  createCustomer: Customer;
  createFactory: Factory;
  createManyArts: Array<Art>;
  createProject: Project;
  createUser: User;
  deleteArt: Array<Scalars['Boolean']>;
  deleteArtComment: Scalars['Boolean'];
  deleteAttribute: Scalars['Boolean'];
  deleteProject: Array<Scalars['Boolean']>;
  deleteProjectComment: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  updateArt: Art;
  updateArtComment: ArtComment;
  updateAttribute: BaseAttributeType;
  updateAttributesOrder: Array<BaseAttributeType>;
  updateCustomer: Customer;
  updateFactory: Factory;
  updateProject: Project;
  updateProjectComment: ProjectComment;
  updateUser: User;
};


export type MutationAddArtCommentArgs = {
  artCommentInput: ArtCommentInput;
};


export type MutationAddProjectCommentArgs = {
  projectCommentInput: ProjectCommentInput;
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


export type MutationCreateAttributeArgs = {
  input: CreateAttributeInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateFactoryArgs = {
  input: CreateFactoryInput;
};


export type MutationCreateManyArtsArgs = {
  artsInput: Array<CreateArtInput>;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteArtArgs = {
  id: Scalars['String'];
};


export type MutationDeleteArtCommentArgs = {
  artId: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteAttributeArgs = {
  input: DeleteAttributeInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProjectCommentArgs = {
  id: Scalars['Float'];
  projectId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateArtArgs = {
  updateArtInput: UpdateArtInput;
};


export type MutationUpdateArtCommentArgs = {
  id: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationUpdateAttributeArgs = {
  input: UpdateAttributeInput;
};


export type MutationUpdateAttributesOrderArgs = {
  input: UpdateAttributeValueOrderInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateFactoryArgs = {
  input: UpdateFactoryInput;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateProjectCommentArgs = {
  id: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum OrderDirection {
  /** Ascending */
  Asc = 'ASC',
  /** Descending */
  Desc = 'DESC'
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
  comments?: Maybe<Array<ProjectComment>>;
  createdAt: Scalars['Date'];
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['String']>;
  dropNumber?: Maybe<Scalars['String']>;
  factory?: Maybe<Factory>;
  factoryId?: Maybe<Scalars['String']>;
  hasDesignDoc?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  intercenter?: Maybe<Scalars['String']>;
  internal: Scalars['Boolean'];
  name: Scalars['String'];
  sfm?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type ProjectComment = {
  __typename?: 'ProjectComment';
  author: User;
  authorId: Scalars['String'];
  id: Scalars['Float'];
  project: Project;
  projectId: Scalars['String'];
  text: Scalars['String'];
};

export type ProjectCommentInput = {
  projectId: Scalars['String'];
  text: Scalars['String'];
};

export type ProjectFilterQuery = {
  AND?: InputMaybe<Array<ProjectFilterQuery>>;
  OR?: InputMaybe<Array<ProjectFilterQuery>>;
  customerId?: InputMaybe<StringFieldOption>;
  dropNumber?: InputMaybe<StringFieldOption>;
  factoryId?: InputMaybe<StringFieldOption>;
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
  attribute: BaseAttributeType;
  attributes: Array<BaseAttributeType>;
  customer: Customer;
  customers: Array<Customer>;
  factories: Array<Factory>;
  factory: Factory;
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


export type QueryAttributeArgs = {
  id: Scalars['Int'];
  type: AttributeType;
};


export type QueryAttributesArgs = {
  type: AttributeType;
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};


export type QueryCustomersArgs = {
  filter?: InputMaybe<CustomerFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
};


export type QueryFactoriesArgs = {
  filter?: InputMaybe<FactoryFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
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
  User = 'USER'
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
  type: AttributeType;
};

export type UpdateAttributeValueOrderInput = {
  newOrder: Scalars['Float'];
  oldOrder: Scalars['Float'];
  type: AttributeType;
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
  customerId?: InputMaybe<Scalars['String']>;
  dropNumber?: InputMaybe<Scalars['String']>;
  factoryId?: InputMaybe<Scalars['String']>;
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
  role: Role;
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

export type AddArtCommentMutationVariables = Exact<{
  artCommentInput: ArtCommentInput;
}>;


export type AddArtCommentMutation = { __typename?: 'Mutation', addArtComment: { __typename?: 'ArtComment', id: number, text: string, artId: string, author: { __typename?: 'User', id: string, fullName: string } } };

export type AddProjectCommentMutationVariables = Exact<{
  projectCommentInput: ProjectCommentInput;
}>;


export type AddProjectCommentMutation = { __typename?: 'Mutation', addProjectComment: { __typename?: 'ProjectComment', id: number, text: string, projectId: string, author: { __typename?: 'User', id: string, fullName: string } } };

export type ChangePasswordMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  passwordRepeat: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type CreateArtMutationVariables = Exact<{
  createArtInput: CreateArtInput;
}>;


export type CreateArtMutation = { __typename?: 'Mutation', createArt: { __typename?: 'Art', id: string, name: string, internal: boolean, projectId?: string | null, createdAt?: any | null, updatedAt?: any | null, bottomForm?: string | null, artClass?: string | null, form?: string | null, nominalVolume?: string | null, height?: string | null, productType?: string | null, productionMethod?: string | null, ringType?: string | null, files?: Array<{ __typename?: 'ArtFile', artId: string, originalPath: string, watermarkPath: string, uploadedAt: any }> | null, project?: { __typename?: 'Project', id: string, name: string } | null } };

export type CreateAttributeMutationVariables = Exact<{
  input: CreateAttributeInput;
}>;


export type CreateAttributeMutation = { __typename?: 'Mutation', createAttribute: { __typename?: 'BaseAttributeType', id: number, name: string, active: boolean, valueOrder: number, createdAt: any, updatedAt: any } };

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'Customer', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type CreateFactoryMutationVariables = Exact<{
  input: CreateFactoryInput;
}>;


export type CreateFactoryMutation = { __typename?: 'Mutation', createFactory: { __typename?: 'Factory', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type CreateManyArtsMutationVariables = Exact<{
  artsInput: Array<CreateArtInput> | CreateArtInput;
}>;


export type CreateManyArtsMutation = { __typename?: 'Mutation', createManyArts: Array<{ __typename?: 'Art', id: string, name: string }> };

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, createdAt: any, updatedAt: any, factory?: { __typename?: 'Factory', id: string, name: string } | null, customer?: { __typename?: 'Customer', id: string, name: string } | null } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } };

export type DeleteArtMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteArtMutation = { __typename?: 'Mutation', deleteArt: Array<boolean> };

export type DeleteArtCommentMutationVariables = Exact<{
  id: Scalars['Float'];
  artId: Scalars['String'];
}>;


export type DeleteArtCommentMutation = { __typename?: 'Mutation', deleteArtComment: boolean };

export type DeleteAttributeMutationVariables = Exact<{
  input: DeleteAttributeInput;
}>;


export type DeleteAttributeMutation = { __typename?: 'Mutation', deleteAttribute: boolean };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: Array<boolean> };

export type DeleteProjectCommentMutationVariables = Exact<{
  id: Scalars['Float'];
  projectId: Scalars['String'];
}>;


export type DeleteProjectCommentMutation = { __typename?: 'Mutation', deleteProjectComment: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', user: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateArtMutationVariables = Exact<{
  updateArtInput: UpdateArtInput;
}>;


export type UpdateArtMutation = { __typename?: 'Mutation', updateArt: { __typename?: 'Art', id: string, name: string, internal: boolean, projectId?: string | null, createdAt?: any | null, updatedAt?: any | null, bottomForm?: string | null, artClass?: string | null, form?: string | null, nominalVolume?: string | null, height?: string | null, productType?: string | null, productionMethod?: string | null, ringType?: string | null, files?: Array<{ __typename?: 'ArtFile', artId: string, originalPath: string, watermarkPath: string, uploadedAt: any }> | null, project?: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, factoryId?: string | null, customerId?: string | null, createdAt: any, updatedAt: any } | null } };

export type UpdateArtCommentMutationVariables = Exact<{
  id: Scalars['Float'];
  text: Scalars['String'];
}>;


export type UpdateArtCommentMutation = { __typename?: 'Mutation', updateArtComment: { __typename?: 'ArtComment', id: number, text: string, artId: string, author: { __typename?: 'User', id: string, fullName: string } } };

export type UpdateAttributeMutationVariables = Exact<{
  input: UpdateAttributeInput;
}>;


export type UpdateAttributeMutation = { __typename?: 'Mutation', updateAttribute: { __typename?: 'BaseAttributeType', id: number, name: string, active: boolean, valueOrder: number, createdAt: any, updatedAt: any } };

export type UpdateAttributesOrderMutationVariables = Exact<{
  input: UpdateAttributeValueOrderInput;
}>;


export type UpdateAttributesOrderMutation = { __typename?: 'Mutation', updateAttributesOrder: Array<{ __typename?: 'BaseAttributeType', id: number, name: string, active: boolean, valueOrder: number, createdAt: any, updatedAt: any }> };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'Customer', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type UpdateFactoryMutationVariables = Exact<{
  input: UpdateFactoryInput;
}>;


export type UpdateFactoryMutation = { __typename?: 'Mutation', updateFactory: { __typename?: 'Factory', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type UpdateProjectMutationVariables = Exact<{
  updateProjectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, createdAt: any, updatedAt: any, factory?: { __typename?: 'Factory', id: string, name: string } | null, customer?: { __typename?: 'Customer', id: string, name: string } | null } };

export type UpdateProjectCommentMutationVariables = Exact<{
  id: Scalars['Float'];
  text: Scalars['String'];
}>;


export type UpdateProjectCommentMutation = { __typename?: 'Mutation', updateProjectComment: { __typename?: 'ProjectComment', id: number, text: string, projectId: string, author: { __typename?: 'User', id: string, fullName: string } } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } };

export type ArtQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ArtQuery = { __typename?: 'Query', art: { __typename?: 'Art', id: string, name: string, internal: boolean, projectId?: string | null, createdAt?: any | null, updatedAt?: any | null, bottomForm?: string | null, artClass?: string | null, form?: string | null, nominalVolume?: string | null, height?: string | null, productType?: string | null, productionMethod?: string | null, ringType?: string | null, files?: Array<{ __typename?: 'ArtFile', artId: string, originalPath: string, watermarkPath: string, uploadedAt: any }> | null, project?: { __typename?: 'Project', id: string, name: string } | null, comments?: Array<{ __typename?: 'ArtComment', id: number, text: string, artId: string, author: { __typename?: 'User', id: string, fullName: string } }> | null } };

export type ArtsQueryVariables = Exact<{
  filter?: InputMaybe<ArtFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
  order?: InputMaybe<ArtOrderQuery>;
}>;


export type ArtsQuery = { __typename?: 'Query', arts: { __typename?: 'ArtResponse', page: { __typename?: 'ArtTypeConnection', edges?: Array<{ __typename?: 'ArtTypeEdge', cursor?: string | null, node?: { __typename?: 'Art', id: string, name: string, internal: boolean, projectId?: string | null, createdAt?: any | null, updatedAt?: any | null, bottomForm?: string | null, artClass?: string | null, form?: string | null, nominalVolume?: string | null, height?: string | null, productType?: string | null, productionMethod?: string | null, ringType?: string | null, files?: Array<{ __typename?: 'ArtFile', artId: string, originalPath: string, watermarkPath: string, uploadedAt: any }> | null, project?: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, factory?: { __typename?: 'Factory', id: string, name: string } | null, customer?: { __typename?: 'Customer', id: string, name: string } | null } | null } | null }> | null, pageInfo?: { __typename?: 'ArtTypePageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean } | null }, pageData?: { __typename?: 'PageData', count: number, take: number, skip: number } | null } };

export type AttributeQueryVariables = Exact<{
  type: AttributeType;
  id: Scalars['Int'];
}>;


export type AttributeQuery = { __typename?: 'Query', attribute: { __typename?: 'BaseAttributeType', id: number, name: string, active: boolean, valueOrder: number, createdAt: any, updatedAt: any } };

export type AttributesQueryVariables = Exact<{
  type: AttributeType;
}>;


export type AttributesQuery = { __typename?: 'Query', attributes: Array<{ __typename?: 'BaseAttributeType', id: number, name: string, active: boolean, valueOrder: number, createdAt: any, updatedAt: any }> };

export type CustomerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CustomerQuery = { __typename?: 'Query', customer: { __typename?: 'Customer', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type CustomersQueryVariables = Exact<{
  filter?: InputMaybe<CustomerFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
}>;


export type CustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: string, name: string, active: boolean, createdAt: any, updatedAt: any }> };

export type FactoriesQueryVariables = Exact<{
  filter?: InputMaybe<FactoryFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
}>;


export type FactoriesQuery = { __typename?: 'Query', factories: Array<{ __typename?: 'Factory', id: string, name: string, active: boolean, createdAt: any, updatedAt: any }> };

export type FactoryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FactoryQuery = { __typename?: 'Query', factory: { __typename?: 'Factory', id: string, name: string, active: boolean, createdAt: any, updatedAt: any } };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, createdAt: any, updatedAt: any, arts?: Array<{ __typename?: 'Art', id: string, name: string, internal: boolean, createdAt?: any | null, updatedAt?: any | null, bottomForm?: string | null, artClass?: string | null, form?: string | null, nominalVolume?: string | null, height?: string | null, productType?: string | null, productionMethod?: string | null, ringType?: string | null, files?: Array<{ __typename?: 'ArtFile', artId: string, originalPath: string, watermarkPath: string, uploadedAt: any }> | null }> | null, comments?: Array<{ __typename?: 'ProjectComment', id: number, text: string, projectId: string, author: { __typename?: 'User', id: string, fullName: string } }> | null, factory?: { __typename?: 'Factory', id: string, name: string } | null, customer?: { __typename?: 'Customer', id: string, name: string } | null } };

export type ProjectsQueryVariables = Exact<{
  filter?: InputMaybe<ProjectFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
  order?: InputMaybe<ProjectOrderQuery>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectResponse', page: { __typename?: 'ProjectTypeConnection', edges?: Array<{ __typename?: 'ProjectTypeEdge', cursor?: string | null, node?: { __typename?: 'Project', id: string, name: string, internal: boolean, hasDesignDoc?: boolean | null, sfm?: string | null, dropNumber?: string | null, intercenter?: string | null, createdAt: any, updatedAt: any, factory?: { __typename?: 'Factory', id: string, name: string } | null, customer?: { __typename?: 'Customer', id: string, name: string } | null } | null }> | null, pageInfo?: { __typename?: 'ProjectTypePageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean } | null }, pageData?: { __typename?: 'PageData', count: number, take: number, skip: number } | null } };

export type ProjectsLovQueryVariables = Exact<{
  filter?: InputMaybe<ProjectFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
}>;


export type ProjectsLovQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectResponse', page: { __typename?: 'ProjectTypeConnection', edges?: Array<{ __typename?: 'ProjectTypeEdge', node?: { __typename?: 'Project', id: string, name: string } | null }> | null } } };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } };

export type UsersQueryVariables = Exact<{
  filter?: InputMaybe<UserFilterQuery>;
  pagination?: InputMaybe<ConnectionArgs>;
  order?: InputMaybe<UserOrderQuery>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserResponse', page: { __typename?: 'UserTypeConnection', edges?: Array<{ __typename?: 'UserTypeEdge', cursor?: string | null, node?: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } | null }> | null, pageInfo?: { __typename?: 'UserTypePageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage: boolean, hasNextPage: boolean } | null }, pageData?: { __typename?: 'PageData', count: number, take: number, skip: number } | null } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'User', id: string, username: string, fullName: string, role: Role, active: boolean, createdAt: any, updatedAt: any } };


export const AddArtCommentDocument = `
    mutation addArtComment($artCommentInput: ArtCommentInput!) {
  addArtComment(artCommentInput: $artCommentInput) {
    id
    text
    artId
    author {
      id
      fullName
    }
  }
}
    `;
export const AddProjectCommentDocument = `
    mutation addProjectComment($projectCommentInput: ProjectCommentInput!) {
  addProjectComment(projectCommentInput: $projectCommentInput) {
    id
    text
    projectId
    author {
      id
      fullName
    }
  }
}
    `;
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
    }
  }
}
    `;
export const CreateAttributeDocument = `
    mutation createAttribute($input: CreateAttributeInput!) {
  createAttribute(input: $input) {
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
export const CreateManyArtsDocument = `
    mutation createManyArts($artsInput: [CreateArtInput!]!) {
  createManyArts(artsInput: $artsInput) {
    id
    name
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
    factory {
      id
      name
    }
    customer {
      id
      name
    }
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
export const DeleteArtDocument = `
    mutation deleteArt($id: String!) {
  deleteArt(id: $id)
}
    `;
export const DeleteArtCommentDocument = `
    mutation deleteArtComment($id: Float!, $artId: String!) {
  deleteArtComment(id: $id, artId: $artId)
}
    `;
export const DeleteAttributeDocument = `
    mutation deleteAttribute($input: DeleteAttributeInput!) {
  deleteAttribute(input: $input)
}
    `;
export const DeleteProjectDocument = `
    mutation deleteProject($id: String!) {
  deleteProject(id: $id)
}
    `;
export const DeleteProjectCommentDocument = `
    mutation deleteProjectComment($id: Float!, $projectId: String!) {
  deleteProjectComment(id: $id, projectId: $projectId)
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
export const UpdateArtCommentDocument = `
    mutation updateArtComment($id: Float!, $text: String!) {
  updateArtComment(id: $id, text: $text) {
    id
    text
    artId
    author {
      id
      fullName
    }
  }
}
    `;
export const UpdateAttributeDocument = `
    mutation updateAttribute($input: UpdateAttributeInput!) {
  updateAttribute(input: $input) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const UpdateAttributesOrderDocument = `
    mutation updateAttributesOrder($input: UpdateAttributeValueOrderInput!) {
  updateAttributesOrder(input: $input) {
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
    factory {
      id
      name
    }
    customer {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdateProjectCommentDocument = `
    mutation updateProjectComment($id: Float!, $text: String!) {
  updateProjectComment(id: $id, text: $text) {
    id
    text
    projectId
    author {
      id
      fullName
    }
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
      originalPath
      watermarkPath
      uploadedAt
    }
    project {
      id
      name
    }
    comments {
      id
      text
      artId
      author {
        id
        fullName
      }
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
            factory {
              id
              name
            }
            customer {
              id
              name
            }
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
export const AttributeDocument = `
    query attribute($type: AttributeType!, $id: Int!) {
  attribute(type: $type, id: $id) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
  }
}
    `;
export const AttributesDocument = `
    query attributes($type: AttributeType!) {
  attributes(type: $type) {
    id
    name
    active
    valueOrder
    createdAt
    updatedAt
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
    query customers($filter: CustomerFilterQuery, $pagination: ConnectionArgs) {
  customers(filter: $filter, pagination: $pagination) {
    id
    name
    active
    createdAt
    updatedAt
  }
}
    `;
export const FactoriesDocument = `
    query factories($filter: FactoryFilterQuery, $pagination: ConnectionArgs) {
  factories(filter: $filter, pagination: $pagination) {
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
        originalPath
        watermarkPath
        uploadedAt
      }
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
    comments {
      id
      text
      projectId
      author {
        id
        fullName
      }
    }
    factory {
      id
      name
    }
    customer {
      id
      name
    }
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
          factory {
            id
            name
          }
          customer {
            id
            name
          }
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
export const ProjectsLovDocument = `
    query projectsLov($filter: ProjectFilterQuery, $pagination: ConnectionArgs) {
  projects(filter: $filter, pagination: $pagination) {
    page {
      edges {
        node {
          id
          name
        }
      }
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
    addArtComment: build.mutation<AddArtCommentMutation, AddArtCommentMutationVariables>({
      query: (variables) => ({ document: AddArtCommentDocument, variables })
    }),
    addProjectComment: build.mutation<AddProjectCommentMutation, AddProjectCommentMutationVariables>({
      query: (variables) => ({ document: AddProjectCommentDocument, variables })
    }),
    changePassword: build.mutation<ChangePasswordMutation, ChangePasswordMutationVariables>({
      query: (variables) => ({ document: ChangePasswordDocument, variables })
    }),
    createArt: build.mutation<CreateArtMutation, CreateArtMutationVariables>({
      query: (variables) => ({ document: CreateArtDocument, variables })
    }),
    createAttribute: build.mutation<CreateAttributeMutation, CreateAttributeMutationVariables>({
      query: (variables) => ({ document: CreateAttributeDocument, variables })
    }),
    createCustomer: build.mutation<CreateCustomerMutation, CreateCustomerMutationVariables>({
      query: (variables) => ({ document: CreateCustomerDocument, variables })
    }),
    createFactory: build.mutation<CreateFactoryMutation, CreateFactoryMutationVariables>({
      query: (variables) => ({ document: CreateFactoryDocument, variables })
    }),
    createManyArts: build.mutation<CreateManyArtsMutation, CreateManyArtsMutationVariables>({
      query: (variables) => ({ document: CreateManyArtsDocument, variables })
    }),
    createProject: build.mutation<CreateProjectMutation, CreateProjectMutationVariables>({
      query: (variables) => ({ document: CreateProjectDocument, variables })
    }),
    createUser: build.mutation<CreateUserMutation, CreateUserMutationVariables>({
      query: (variables) => ({ document: CreateUserDocument, variables })
    }),
    deleteArt: build.mutation<DeleteArtMutation, DeleteArtMutationVariables>({
      query: (variables) => ({ document: DeleteArtDocument, variables })
    }),
    deleteArtComment: build.mutation<DeleteArtCommentMutation, DeleteArtCommentMutationVariables>({
      query: (variables) => ({ document: DeleteArtCommentDocument, variables })
    }),
    deleteAttribute: build.mutation<DeleteAttributeMutation, DeleteAttributeMutationVariables>({
      query: (variables) => ({ document: DeleteAttributeDocument, variables })
    }),
    deleteProject: build.mutation<DeleteProjectMutation, DeleteProjectMutationVariables>({
      query: (variables) => ({ document: DeleteProjectDocument, variables })
    }),
    deleteProjectComment: build.mutation<DeleteProjectCommentMutation, DeleteProjectCommentMutationVariables>({
      query: (variables) => ({ document: DeleteProjectCommentDocument, variables })
    }),
    login: build.mutation<LoginMutation, LoginMutationVariables>({
      query: (variables) => ({ document: LoginDocument, variables })
    }),
    logout: build.mutation<LogoutMutation, LogoutMutationVariables | void>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
    updateArt: build.mutation<UpdateArtMutation, UpdateArtMutationVariables>({
      query: (variables) => ({ document: UpdateArtDocument, variables })
    }),
    updateArtComment: build.mutation<UpdateArtCommentMutation, UpdateArtCommentMutationVariables>({
      query: (variables) => ({ document: UpdateArtCommentDocument, variables })
    }),
    updateAttribute: build.mutation<UpdateAttributeMutation, UpdateAttributeMutationVariables>({
      query: (variables) => ({ document: UpdateAttributeDocument, variables })
    }),
    updateAttributesOrder: build.mutation<UpdateAttributesOrderMutation, UpdateAttributesOrderMutationVariables>({
      query: (variables) => ({ document: UpdateAttributesOrderDocument, variables })
    }),
    updateCustomer: build.mutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
      query: (variables) => ({ document: UpdateCustomerDocument, variables })
    }),
    updateFactory: build.mutation<UpdateFactoryMutation, UpdateFactoryMutationVariables>({
      query: (variables) => ({ document: UpdateFactoryDocument, variables })
    }),
    updateProject: build.mutation<UpdateProjectMutation, UpdateProjectMutationVariables>({
      query: (variables) => ({ document: UpdateProjectDocument, variables })
    }),
    updateProjectComment: build.mutation<UpdateProjectCommentMutation, UpdateProjectCommentMutationVariables>({
      query: (variables) => ({ document: UpdateProjectCommentDocument, variables })
    }),
    updateUser: build.mutation<UpdateUserMutation, UpdateUserMutationVariables>({
      query: (variables) => ({ document: UpdateUserDocument, variables })
    }),
    art: build.query<ArtQuery, ArtQueryVariables>({
      query: (variables) => ({ document: ArtDocument, variables })
    }),
    arts: build.query<ArtsQuery, ArtsQueryVariables | void>({
      query: (variables) => ({ document: ArtsDocument, variables })
    }),
    attribute: build.query<AttributeQuery, AttributeQueryVariables>({
      query: (variables) => ({ document: AttributeDocument, variables })
    }),
    attributes: build.query<AttributesQuery, AttributesQueryVariables>({
      query: (variables) => ({ document: AttributesDocument, variables })
    }),
    customer: build.query<CustomerQuery, CustomerQueryVariables>({
      query: (variables) => ({ document: CustomerDocument, variables })
    }),
    customers: build.query<CustomersQuery, CustomersQueryVariables | void>({
      query: (variables) => ({ document: CustomersDocument, variables })
    }),
    factories: build.query<FactoriesQuery, FactoriesQueryVariables | void>({
      query: (variables) => ({ document: FactoriesDocument, variables })
    }),
    factory: build.query<FactoryQuery, FactoryQueryVariables>({
      query: (variables) => ({ document: FactoryDocument, variables })
    }),
    project: build.query<ProjectQuery, ProjectQueryVariables>({
      query: (variables) => ({ document: ProjectDocument, variables })
    }),
    projects: build.query<ProjectsQuery, ProjectsQueryVariables | void>({
      query: (variables) => ({ document: ProjectsDocument, variables })
    }),
    projectsLov: build.query<ProjectsLovQuery, ProjectsLovQueryVariables | void>({
      query: (variables) => ({ document: ProjectsLovDocument, variables })
    }),
    user: build.query<UserQuery, UserQueryVariables>({
      query: (variables) => ({ document: UserDocument, variables })
    }),
    users: build.query<UsersQuery, UsersQueryVariables | void>({
      query: (variables) => ({ document: UsersDocument, variables })
    }),
    whoAmI: build.query<WhoAmIQuery, WhoAmIQueryVariables | void>({
      query: (variables) => ({ document: WhoAmIDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddArtCommentMutation, useAddProjectCommentMutation, useChangePasswordMutation, useCreateArtMutation, useCreateAttributeMutation, useCreateCustomerMutation, useCreateFactoryMutation, useCreateManyArtsMutation, useCreateProjectMutation, useCreateUserMutation, useDeleteArtMutation, useDeleteArtCommentMutation, useDeleteAttributeMutation, useDeleteProjectMutation, useDeleteProjectCommentMutation, useLoginMutation, useLogoutMutation, useUpdateArtMutation, useUpdateArtCommentMutation, useUpdateAttributeMutation, useUpdateAttributesOrderMutation, useUpdateCustomerMutation, useUpdateFactoryMutation, useUpdateProjectMutation, useUpdateProjectCommentMutation, useUpdateUserMutation, useArtQuery, useLazyArtQuery, useArtsQuery, useLazyArtsQuery, useAttributeQuery, useLazyAttributeQuery, useAttributesQuery, useLazyAttributesQuery, useCustomerQuery, useLazyCustomerQuery, useCustomersQuery, useLazyCustomersQuery, useFactoriesQuery, useLazyFactoriesQuery, useFactoryQuery, useLazyFactoryQuery, useProjectQuery, useLazyProjectQuery, useProjectsQuery, useLazyProjectsQuery, useProjectsLovQuery, useLazyProjectsLovQuery, useUserQuery, useLazyUserQuery, useUsersQuery, useLazyUsersQuery, useWhoAmIQuery, useLazyWhoAmIQuery } = injectedRtkApi;

