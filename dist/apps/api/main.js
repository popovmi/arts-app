/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const db_module_1 = __webpack_require__("./apps/api/src/db/db.module.ts");
const init_test_data_1 = __webpack_require__("./apps/api/src/db/init-test-data.ts");
const art_module_1 = __webpack_require__("./apps/api/src/modules/art/art.module.ts");
const attribute_module_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute.module.ts");
const auth_1 = __webpack_require__("./apps/api/src/modules/auth/index.ts");
const customer_module_1 = __webpack_require__("./apps/api/src/modules/customer/customer.module.ts");
const factory_module_1 = __webpack_require__("./apps/api/src/modules/factory/factory.module.ts");
const project_module_1 = __webpack_require__("./apps/api/src/modules/project/project.module.ts");
const user_1 = __webpack_require__("./apps/api/src/modules/user/index.ts");
const shared_1 = __webpack_require__("./apps/api/src/shared/index.ts");
const logger_1 = __webpack_require__("./apps/api/src/shared/logger/index.ts");
const apollo_1 = __webpack_require__("@nestjs/apollo");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const path_1 = __webpack_require__("path");
const typeorm_2 = __webpack_require__("typeorm");
let AppModule = class AppModule {
    constructor(em, config) {
        this.em = em;
        this.config = config;
    }
    onApplicationBootstrap() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this.config.isDevelopment) {
                yield (0, init_test_data_1.initTestData)(this.em);
            }
        });
    }
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            shared_1.SharedModule,
            logger_1.LoggerModule,
            db_module_1.DbModule,
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                inject: [shared_1.ApiConfigService],
                useFactory: (config) => config.graphQLConfig,
            }),
            serve_static_1.ServeStaticModule.forRootAsync({
                inject: [shared_1.ApiConfigService],
                useFactory: (config) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    return [
                        {
                            exclude: ['/graphql'],
                            rootPath: (0, path_1.resolve)(config.fileStoragePath),
                            serveRoot: '/static',
                        },
                        {
                            exclude: ['/graphql'],
                            rootPath: './upload',
                            serveRoot: '/upload',
                        },
                        {
                            exclude: ['/graphql'],
                            rootPath: (0, path_1.join)(__dirname, '..', 'ui'),
                        },
                    ];
                }),
            }),
            user_1.UserModule,
            auth_1.AuthModule,
            project_module_1.ProjectModule,
            art_module_1.ArtModule,
            attribute_module_1.AttributeModule,
            factory_module_1.FactoryModule,
            customer_module_1.CustomerModule,
        ],
    }),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectEntityManager)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.EntityManager !== "undefined" && typeorm_2.EntityManager) === "function" ? _a : Object, typeof (_b = typeof shared_1.ApiConfigService !== "undefined" && shared_1.ApiConfigService) === "function" ? _b : Object])
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/common/connection-args.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const graphql_relay_1 = __webpack_require__("graphql-relay");
function checkPagingSanity(args) {
    const { first = 0, last = 0, after, before } = args;
    const isForwardPaging = !!first || !!after;
    const isBackwardPaging = !!last || !!before;
    if (isForwardPaging && isBackwardPaging) {
        throw new Error('Relay pagination cannot be forwards AND backwards!');
    }
    if ((isForwardPaging && before) || (isBackwardPaging && after)) {
        throw new Error('Paging must use either first/after or last/before!');
    }
    if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
        throw new Error('Paging take must be positive!');
    }
    if (last && !before) {
        throw new Error("When paging backwards, a 'before' argument is required!");
    }
    return isForwardPaging
        ? { pagingType: 'forward', after, first }
        : isBackwardPaging
            ? { pagingType: 'backward', before, last }
            : { pagingType: 'none' };
}
const getId = (cursor) => parseInt((0, graphql_relay_1.fromGlobalId)(cursor).id, 10);
const nextId = (cursor) => getId(cursor) + 1;
function getPagingParameters(args) {
    const meta = checkPagingSanity(args);
    switch (meta.pagingType) {
        case 'forward': {
            return {
                take: meta.first,
                skip: meta.after ? nextId(meta.after) : 0,
            };
        }
        case 'backward': {
            const { last, before } = meta;
            let take = last;
            let skip = getId(before) - last;
            if (skip < 0) {
                take = Math.max(last + skip, 0);
                skip = 0;
            }
            return { skip, take };
        }
        default:
            return {};
    }
}
let ConnectionArgs = class ConnectionArgs {
    pagingParams() {
        return getPagingParameters(this);
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Paginate before opaque cursor' }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof graphql_relay_1.ConnectionCursor !== "undefined" && graphql_relay_1.ConnectionCursor) === "function" ? _a : Object)
], ConnectionArgs.prototype, "before", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Paginate after opaque cursor' }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof graphql_relay_1.ConnectionCursor !== "undefined" && graphql_relay_1.ConnectionCursor) === "function" ? _b : Object)
], ConnectionArgs.prototype, "after", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true, description: 'Paginate first' }),
    (0, tslib_1.__metadata)("design:type", Number)
], ConnectionArgs.prototype, "first", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true, description: 'Paginate last' }),
    (0, tslib_1.__metadata)("design:type", Number)
], ConnectionArgs.prototype, "last", void 0);
ConnectionArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ConnectionArgs);
exports["default"] = ConnectionArgs;


/***/ }),

/***/ "./apps/api/src/common/filter-input.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateFieldOptions = exports.NumberFieldOptions = exports.BooleanFieldOption = exports.StringFieldOption = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let StringFieldOption = class StringFieldOption {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "is", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "not", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], StringFieldOption.prototype, "in", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], StringFieldOption.prototype, "notIn", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "lt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "lte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "gt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "gte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "contains", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "notContains", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "startsWith", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "notStartsWith", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "endsWith", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], StringFieldOption.prototype, "notEndsWith", void 0);
StringFieldOption = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], StringFieldOption);
exports.StringFieldOption = StringFieldOption;
let BooleanFieldOption = class BooleanFieldOption {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], BooleanFieldOption.prototype, "is", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], BooleanFieldOption.prototype, "not", void 0);
BooleanFieldOption = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], BooleanFieldOption);
exports.BooleanFieldOption = BooleanFieldOption;
let NumberFieldOptions = class NumberFieldOptions {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "is", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "not", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, graphql_1.Field)(() => [Number], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NumberFieldOptions.prototype, "in", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, graphql_1.Field)(() => [Number], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NumberFieldOptions.prototype, "notIn", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "lt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "lte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "gt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], NumberFieldOptions.prototype, "gte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, graphql_1.Field)(() => [Number], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NumberFieldOptions.prototype, "between", void 0);
NumberFieldOptions = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], NumberFieldOptions);
exports.NumberFieldOptions = NumberFieldOptions;
let DateFieldOptions = class DateFieldOptions {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DateFieldOptions.prototype, "is", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DateFieldOptions.prototype, "not", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ each: true }),
    (0, graphql_1.Field)(() => [Date], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], DateFieldOptions.prototype, "in", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ each: true }),
    (0, graphql_1.Field)(() => [Date], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], DateFieldOptions.prototype, "notIn", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DateFieldOptions.prototype, "lt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DateFieldOptions.prototype, "lte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], DateFieldOptions.prototype, "gt", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], DateFieldOptions.prototype, "gte", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ each: true }),
    (0, graphql_1.Field)(() => [Date], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], DateFieldOptions.prototype, "between", void 0);
DateFieldOptions = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], DateFieldOptions);
exports.DateFieldOptions = DateFieldOptions;


/***/ }),

/***/ "./apps/api/src/common/page-data.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageData = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let PageData = class PageData {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PageData.prototype, "count", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PageData.prototype, "take", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PageData.prototype, "skip", void 0);
PageData = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], PageData);
exports.PageData = PageData;


/***/ }),

/***/ "./apps/api/src/common/relay.types.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const Relay = __webpack_require__("graphql-relay");
const page_data_type_1 = __webpack_require__("./apps/api/src/common/page-data.type.ts");
const typeMap = {};
function relayTypes(type) {
    var _a, _b, _c, _d, _e;
    const { name } = type;
    if (typeMap[`${name}`])
        return typeMap[`${name}`];
    let Edge = class Edge {
        constructor() {
            this.name = `${name}Edge`;
        }
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => String, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Relay !== "undefined" && Relay.ConnectionCursor) === "function" ? _a : Object)
    ], Edge.prototype, "cursor", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => type, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Edge.prototype, "node", void 0);
    Edge = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(`${name}Edge`, { isAbstract: true })
    ], Edge);
    let PageInfo = class PageInfo {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => String, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Relay !== "undefined" && Relay.ConnectionCursor) === "function" ? _b : Object)
    ], PageInfo.prototype, "startCursor", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => String, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Relay !== "undefined" && Relay.ConnectionCursor) === "function" ? _c : Object)
    ], PageInfo.prototype, "endCursor", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], PageInfo.prototype, "hasPreviousPage", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], PageInfo.prototype, "hasNextPage", void 0);
    PageInfo = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(`${name}PageInfo`, { isAbstract: true })
    ], PageInfo);
    let Connection = class Connection {
        constructor() {
            this.name = `${name}Connection`;
        }
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [Edge], { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], Connection.prototype, "edges", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => PageInfo, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Relay !== "undefined" && Relay.PageInfo) === "function" ? _d : Object)
    ], Connection.prototype, "pageInfo", void 0);
    Connection = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(`${name}Connection`, { isAbstract: true })
    ], Connection);
    let Page = class Page {
        constructor() {
            this.name = `${name}Page`;
        }
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Connection),
        (0, tslib_1.__metadata)("design:type", Connection)
    ], Page.prototype, "page", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => page_data_type_1.PageData, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", typeof (_e = typeof page_data_type_1.PageData !== "undefined" && page_data_type_1.PageData) === "function" ? _e : Object)
    ], Page.prototype, "pageData", void 0);
    Page = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(`${name}Page`, { isAbstract: true })
    ], Page);
    typeMap[`${name}`] = Page;
    return typeMap[`${name}`];
}
exports["default"] = relayTypes;


/***/ }),

/***/ "./apps/api/src/db/db.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const shared_1 = __webpack_require__("./apps/api/src/shared/index.ts");
const logger_1 = __webpack_require__("./apps/api/src/shared/logger/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const winston_1 = __webpack_require__("typeorm-logger-adaptor/logger/winston");
let DbModule = class DbModule {
};
DbModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [shared_1.ApiConfigService],
                useFactory: (config) => {
                    return config.isProduction
                        ? {
                            type: 'postgres',
                            url: config.get('DATABASE_URL'),
                            logger: new winston_1.WinstonAdaptor(logger_1.logger, ['error', 'warn']),
                            autoLoadEntities: true,
                            synchronize: false,
                            dropSchema: false,
                        }
                        : {
                            type: 'postgres',
                            url: config.get('DATABASE_URL'),
                            synchronize: true,
                            dropSchema: true,
                            autoLoadEntities: true,
                            keepConnectionAlive: true,
                            logger: new winston_1.WinstonAdaptor(logger_1.logger, 'all'),
                        };
                },
            }),
        ],
    })
], DbModule);
exports.DbModule = DbModule;


/***/ }),

/***/ "./apps/api/src/db/init-test-data.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initTestData = void 0;
const tslib_1 = __webpack_require__("tslib");
const art_file_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art-file.entity.ts");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
const AttrEntities = __webpack_require__("./apps/api/src/modules/attribute/entities/index.ts");
const customer_entity_1 = __webpack_require__("./apps/api/src/modules/customer/entities/customer.entity.ts");
const factory_entity_1 = __webpack_require__("./apps/api/src/modules/factory/entities/factory.entity.ts");
const project_entity_1 = __webpack_require__("./apps/api/src/modules/project/entity/project.entity.ts");
const user_entity_1 = __webpack_require__("./apps/api/src/modules/user/entity/user.entity.ts");
const role_enum_1 = __webpack_require__("./apps/api/src/modules/user/role.enum.ts");
const bcrypt_1 = __webpack_require__("bcrypt");
const initTestData = (em) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    var _a;
    const users = [];
    const attributes = [];
    let customers = [];
    let factories = [];
    const projects = [];
    const arts = [];
    const attributesValues = ['qq', 'ww', 'ee', 'rr', 'tt', 'yy'];
    const artsFiles = [];
    users.push({
        username: `ADMIN`,
        role: role_enum_1.Role.ADMIN,
        active: true,
        fullName: `Администратор`,
        password: yield (0, bcrypt_1.hash)('USER', 10),
    });
    for (let i = 0; i < 10; i++) {
        users.push({
            username: `USER${i}`,
            role: role_enum_1.Role.USER,
            active: false,
            fullName: `Пользователь ${i}`,
            password: yield (0, bcrypt_1.hash)('USER', 10),
        });
    }
    yield em.save(user_entity_1.User, users);
    for (const AttrEntity of Object.values(AttrEntities)) {
        let i = 1;
        attributes.push(em.create(AttrEntity, { name: 'qq', valueOrder: i++ }));
        attributes.push(em.create(AttrEntity, { name: 'ww', valueOrder: i++ }));
        attributes.push(em.create(AttrEntity, { name: 'ee', valueOrder: i++ }));
        attributes.push(em.create(AttrEntity, { name: 'rr', valueOrder: i++ }));
        attributes.push(em.create(AttrEntity, { name: 'tt', valueOrder: i++ }));
        attributes.push(em.create(AttrEntity, { name: 'yy', valueOrder: i++ }));
    }
    yield em.save(attributes);
    for (let i = 0; i < 20; i++) {
        customers.push({ name: `Customer ${i}` });
    }
    customers = yield em.save(customer_entity_1.Customer, customers);
    for (let i = 0; i < 20; i++) {
        factories.push({ name: `Factory ${i}` });
    }
    factories = yield em.save(factory_entity_1.Factory, factories);
    for (let i = 0; i < 200; i++) {
        projects.push({
            name: `PROJECT-${i}`,
            internal: Math.random() < 0.5,
            hasDesignDoc: Math.random() < 0.5,
            sfm: attributesValues[Math.floor(random(1, 7)) - 1],
            intercenter: attributesValues[Math.floor(random(1, 7)) - 1],
            dropNumber: attributesValues[Math.floor(random(1, 7)) - 1],
            factoryId: factories[Math.floor(random(1, factories.length)) - 1].id,
            customerId: customers[Math.floor(random(1, customers.length)) - 1].id,
        });
    }
    yield em.save(project_entity_1.Project, projects);
    for (let i = 0; i < 600; i++) {
        arts.push({
            name: `ART-${i}`,
            internal: Math.random() < 0.5,
            projectId: (_a = projects[i >= 200 ? (i >= 400 ? i - 400 : i - 200) : i]) === null || _a === void 0 ? void 0 : _a.id,
            artClass: attributesValues[Math.floor(random(1, 6)) - 1],
            bottomForm: attributesValues[Math.floor(random(1, 6)) - 1],
            form: attributesValues[Math.floor(random(1, 6)) - 1],
            height: attributesValues[Math.floor(random(1, 6)) - 1],
            nominalVolume: attributesValues[Math.floor(random(1, 6)) - 1],
            productionMethod: attributesValues[Math.floor(random(1, 6)) - 1],
            productType: attributesValues[Math.floor(random(1, 6)) - 1],
            ringType: attributesValues[Math.floor(random(1, 6)) - 1],
        });
    }
    yield em.save(art_entity_1.Art, arts);
    arts.forEach((art) => {
        artsFiles.push({ artId: art.id, watermarkPath: 'Scan_0001.jpg', originalPath: 'Scan_0001.jpg' });
    });
    yield em.save(art_file_entity_1.ArtFile, artsFiles);
});
exports.initTestData = initTestData;
function random(min, max) {
    return min + Math.random() * (max - min);
}


/***/ }),

/***/ "./apps/api/src/modules/art/art.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const project_module_1 = __webpack_require__("./apps/api/src/modules/project/project.module.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const art_resolver_1 = __webpack_require__("./apps/api/src/modules/art/art.resolver.ts");
const art_file_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art-file.entity.ts");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
const file_upload_controller_1 = __webpack_require__("./apps/api/src/modules/art/file-upload.controller.ts");
const loaders_1 = __webpack_require__("./apps/api/src/modules/art/loaders/index.ts");
const services_1 = __webpack_require__("./apps/api/src/modules/art/services/index.ts");
let ArtModule = class ArtModule {
};
ArtModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => project_module_1.ProjectModule), typeorm_1.TypeOrmModule.forFeature([art_entity_1.Art, art_file_entity_1.ArtFile])],
        providers: [art_resolver_1.ArtResolver, services_1.ArtService, services_1.ArtFileService, loaders_1.ArtLoader],
        controllers: [file_upload_controller_1.FileUploadController],
        exports: [services_1.ArtService],
    })
], ArtModule);
exports.ArtModule = ArtModule;


/***/ }),

/***/ "./apps/api/src/modules/art/art.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const auth_guard_1 = __webpack_require__("./apps/api/src/modules/auth/auth.guard.ts");
const dto_1 = __webpack_require__("./apps/api/src/modules/project/dto/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_2 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
const loaders_1 = __webpack_require__("./apps/api/src/modules/art/loaders/index.ts");
const services_1 = __webpack_require__("./apps/api/src/modules/art/services/index.ts");
let ArtResolver = class ArtResolver {
    constructor(artService, artLoader) {
        this.artService = artService;
        this.artLoader = artLoader;
    }
    art(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.artService.getArt(id);
        });
    }
    arts(args) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.artService.getArts(args);
        });
    }
    getProject(art) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { projectId } = art;
            return projectId ? yield this.artLoader.batchProjects.load(projectId) : null;
        });
    }
    getFiles(art) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id } = art;
            return yield this.artLoader.batchArtsFiles.load(id);
        });
    }
    createArt(createArtInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.artService.createArt(createArtInput);
        });
    }
    updateArt(updateArtInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.artService.updateArt(updateArtInput);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_2.ArtType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "art", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_2.ArtResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_2.FindArtArgs !== "undefined" && dto_2.FindArtArgs) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "arts", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.ResolveField)('project', () => dto_1.ProjectType, { nullable: true }),
    (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof dto_2.ArtType !== "undefined" && dto_2.ArtType) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "getProject", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.ResolveField)('files', () => [dto_2.ArtFileType], { nullable: true }),
    (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof dto_2.ArtType !== "undefined" && dto_2.ArtType) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "getFiles", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_2.ArtType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('createArtInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof dto_2.CreateArtInput !== "undefined" && dto_2.CreateArtInput) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "createArt", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_2.ArtType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('updateArtInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof dto_2.UpdateArtInput !== "undefined" && dto_2.UpdateArtInput) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtResolver.prototype, "updateArt", null);
ArtResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => dto_2.ArtType),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof services_1.ArtService !== "undefined" && services_1.ArtService) === "function" ? _f : Object, typeof (_g = typeof loaders_1.ArtLoader !== "undefined" && loaders_1.ArtLoader) === "function" ? _g : Object])
], ArtResolver);
exports.ArtResolver = ArtResolver;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/art-file.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtFileType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const _1 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
let ArtFileType = class ArtFileType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFileType.prototype, "artId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => _1.ArtType),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof _1.ArtType !== "undefined" && _1.ArtType) === "function" ? _a : Object)
], ArtFileType.prototype, "art", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFileType.prototype, "originalPath", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFileType.prototype, "watermarkPath", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ArtFileType.prototype, "uploadedAt", void 0);
ArtFileType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ArtFile')
], ArtFileType);
exports.ArtFileType = ArtFileType;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/art.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/project/dto/index.ts");
const art_file_type_1 = __webpack_require__("./apps/api/src/modules/art/dto/art-file.type.ts");
let ArtType = class ArtType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], ArtType.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [art_file_type_1.ArtFileType], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ArtType.prototype, "files", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ArtType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ArtType.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtType.prototype, "ringType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => dto_1.ProjectType, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof dto_1.ProjectType !== "undefined" && dto_1.ProjectType) === "function" ? _c : Object)
], ArtType.prototype, "project", void 0);
ArtType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Art')
], ArtType);
exports.ArtType = ArtType;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/arts.response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const relay_types_1 = __webpack_require__("./apps/api/src/common/relay.types.ts");
const _1 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
let ArtResponse = class ArtResponse extends (0, relay_types_1.default)(_1.ArtType) {
};
ArtResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], ArtResponse);
exports.ArtResponse = ArtResponse;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/create-art.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateArtInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let CreateArtInput = class CreateArtInput {
    format() {
        return Object.assign(Object.assign({}, this), { name: this.name.toUpperCase() });
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateArtInput.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "ringType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateArtInput.prototype, "filePath", void 0);
CreateArtInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateArtInput);
exports.CreateArtInput = CreateArtInput;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/find-arts.args.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ArtFilterQuery_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindArtArgs = exports.ArtOrderQuery = exports.ArtFilterQuery = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const connection_args_type_1 = __webpack_require__("./apps/api/src/common/connection-args.type.ts");
const filter_input_type_1 = __webpack_require__("./apps/api/src/common/filter-input.type.ts");
const types_1 = __webpack_require__("./apps/api/src/shared/types/index.ts");
const order_1 = __webpack_require__("./apps/api/src/shared/types/order.ts");
const dto_1 = __webpack_require__("./apps/api/src/modules/project/dto/index.ts");
let ArtFilterQuery = ArtFilterQuery_1 = class ArtFilterQuery {
};
_a = types_1.LogicalOperator.AND, _b = types_1.LogicalOperator.OR;
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [ArtFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ArtFilterQuery.prototype, _a, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [ArtFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ArtFilterQuery.prototype, _b, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _c : Object)
], ArtFilterQuery.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _d : Object)
], ArtFilterQuery.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.BooleanFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof filter_input_type_1.BooleanFieldOption !== "undefined" && filter_input_type_1.BooleanFieldOption) === "function" ? _e : Object)
], ArtFilterQuery.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _f : Object)
], ArtFilterQuery.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _g : Object)
], ArtFilterQuery.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_h = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _h : Object)
], ArtFilterQuery.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_j = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _j : Object)
], ArtFilterQuery.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_k = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _k : Object)
], ArtFilterQuery.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_l = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _l : Object)
], ArtFilterQuery.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_m = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _m : Object)
], ArtFilterQuery.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_o = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _o : Object)
], ArtFilterQuery.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_p = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _p : Object)
], ArtFilterQuery.prototype, "ringType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => dto_1.ProjectFilterQuery, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_q = typeof dto_1.ProjectFilterQuery !== "undefined" && dto_1.ProjectFilterQuery) === "function" ? _q : Object)
], ArtFilterQuery.prototype, "project", void 0);
ArtFilterQuery = ArtFilterQuery_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ArtFilterQuery);
exports.ArtFilterQuery = ArtFilterQuery;
let ArtOrderQuery = class ArtOrderQuery {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_r = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _r : Object)
], ArtOrderQuery.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_s = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _s : Object)
], ArtOrderQuery.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_t = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _t : Object)
], ArtOrderQuery.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_u = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _u : Object)
], ArtOrderQuery.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_v = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _v : Object)
], ArtOrderQuery.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_w = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _w : Object)
], ArtOrderQuery.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_x = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _x : Object)
], ArtOrderQuery.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_y = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _y : Object)
], ArtOrderQuery.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_z = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _z : Object)
], ArtOrderQuery.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_0 = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _0 : Object)
], ArtOrderQuery.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_1 = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _1 : Object)
], ArtOrderQuery.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_2 = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _2 : Object)
], ArtOrderQuery.prototype, "ringType", void 0);
ArtOrderQuery = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ArtOrderQuery);
exports.ArtOrderQuery = ArtOrderQuery;
let FindArtArgs = class FindArtArgs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => ArtFilterQuery, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", ArtFilterQuery)
], FindArtArgs.prototype, "filter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => connection_args_type_1.default, { nullable: true, defaultValue: {} }),
    (0, class_transformer_1.Type)(() => connection_args_type_1.default),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", typeof (_3 = typeof connection_args_type_1.default !== "undefined" && connection_args_type_1.default) === "function" ? _3 : Object)
], FindArtArgs.prototype, "pagination", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => ArtOrderQuery, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", ArtOrderQuery)
], FindArtArgs.prototype, "order", void 0);
FindArtArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], FindArtArgs);
exports.FindArtArgs = FindArtArgs;


/***/ }),

/***/ "./apps/api/src/modules/art/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/art-file.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/art.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/arts.response.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/create-art.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/find-arts.args.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/dto/update-art.input.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/art/dto/update-art.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateArtInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let UpdateArtInput = class UpdateArtInput {
    constructor() {
        this.projectId = null;
        this.bottomForm = null;
        this.artClass = null;
        this.form = null;
        this.nominalVolume = null;
        this.height = null;
        this.productType = null;
        this.productionMethod = null;
        this.ringType = null;
    }
    format() {
        return Object.assign(Object.assign({}, this), (this.name ? { name: this.name.toUpperCase() } : {}));
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateArtInput.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "filePath", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateArtInput.prototype, "ringType", void 0);
UpdateArtInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateArtInput);
exports.UpdateArtInput = UpdateArtInput;


/***/ }),

/***/ "./apps/api/src/modules/art/entity/art-file.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtFile = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
let ArtFile = class ArtFile {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)(),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFile.prototype, "artId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => art_entity_1.Art, (art) => art.files, { cascade: true, primary: true }),
    (0, typeorm_1.JoinColumn)({ name: 'artId' }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof art_entity_1.Art !== "undefined" && art_entity_1.Art) === "function" ? _a : Object)
], ArtFile.prototype, "art", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFile.prototype, "originalPath", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, tslib_1.__metadata)("design:type", String)
], ArtFile.prototype, "watermarkPath", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ArtFile.prototype, "uploadedAt", void 0);
ArtFile = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], ArtFile);
exports.ArtFile = ArtFile;


/***/ }),

/***/ "./apps/api/src/modules/art/entity/art.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Art = void 0;
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/index.ts");
const project_entity_1 = __webpack_require__("./apps/api/src/modules/project/entity/project.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
const art_file_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art-file.entity.ts");
let Art = class Art {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Art.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => art_file_entity_1.ArtFile, (file) => file.art),
    (0, tslib_1.__metadata)("design:type", Array)
], Art.prototype, "files", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "projectId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "bottomForm", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "artClass", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "form", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "nominalVolume", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "height", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "productType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "productionMethod", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Art.prototype, "ringType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.arts, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId', referencedColumnName: 'id' }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _a : Object)
], Art.prototype, "project", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.BottomForm, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'bottomForm', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof entities_1.BottomForm !== "undefined" && entities_1.BottomForm) === "function" ? _b : Object)
], Art.prototype, "bottomFormEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.ArtClass, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'artClass', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof entities_1.ArtClass !== "undefined" && entities_1.ArtClass) === "function" ? _c : Object)
], Art.prototype, "artClassEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.Form, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'form', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof entities_1.Form !== "undefined" && entities_1.Form) === "function" ? _d : Object)
], Art.prototype, "formEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.NominalVolume, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'nominalVolume', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof entities_1.NominalVolume !== "undefined" && entities_1.NominalVolume) === "function" ? _e : Object)
], Art.prototype, "nominalVolumeEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.Height, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'height', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof entities_1.Height !== "undefined" && entities_1.Height) === "function" ? _f : Object)
], Art.prototype, "heightEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.ProductType, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productType', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof entities_1.ProductType !== "undefined" && entities_1.ProductType) === "function" ? _g : Object)
], Art.prototype, "productTypeEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.ProductionMethod, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productionMethod', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_h = typeof entities_1.ProductionMethod !== "undefined" && entities_1.ProductionMethod) === "function" ? _h : Object)
], Art.prototype, "productionMethodEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.RingType, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ringType', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_j = typeof entities_1.RingType !== "undefined" && entities_1.RingType) === "function" ? _j : Object)
], Art.prototype, "ringTypeEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], Art.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], Art.prototype, "updatedAt", void 0);
Art = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Art);
exports.Art = Art;


/***/ }),

/***/ "./apps/api/src/modules/art/file-upload.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploadController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const multer = __webpack_require__("multer");
const uuid_1 = __webpack_require__("uuid");
let FileUploadController = class FileUploadController {
    upload(file) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return { filePath: `upload/${file.filename}`, fileName: file.originalname };
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('art'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('artFile', {
        fileFilter: (req, { mimetype }, cb) => {
            !['application/pdf', 'image/jpeg'].includes(mimetype)
                ? cb(new common_1.BadRequestException('Invalid mimetype'), false)
                : cb(null, true);
        },
        storage: multer.diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                const fileName = (0, uuid_1.v4)() + '.' + file.originalname.split('.').pop();
                cb(null, fileName);
            },
        }),
    })),
    (0, tslib_1.__param)(0, (0, common_1.UploadedFile)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FileUploadController.prototype, "upload", null);
FileUploadController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('upload')
], FileUploadController);
exports.FileUploadController = FileUploadController;


/***/ }),

/***/ "./apps/api/src/modules/art/loaders/art.loader.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtLoader = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const DataLoader = __webpack_require__("dataloader");
const project_service_1 = __webpack_require__("./apps/api/src/modules/project/project.service.ts");
const art_service_1 = __webpack_require__("./apps/api/src/modules/art/services/art.service.ts");
let ArtLoader = class ArtLoader {
    constructor(projectService, artService) {
        this.projectService = projectService;
        this.artService = artService;
        this.batchProjects = new DataLoader((projectIds) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const users = yield this.projectService.getByIds(projectIds);
            const usersMap = new Map(users.map((user) => [user.id, user]));
            return projectIds.map((authorId) => usersMap.get(authorId));
        }));
        this.batchArtsFiles = new DataLoader((artIds) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const arts = yield this.artService.loadArtsFiles(artIds);
            const artsMap = new Map(arts.map((art) => [art.id, art.files]));
            return artIds.map((artId) => artsMap.get(artId));
        }));
    }
};
ArtLoader = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _a : Object, typeof (_b = typeof art_service_1.ArtService !== "undefined" && art_service_1.ArtService) === "function" ? _b : Object])
], ArtLoader);
exports.ArtLoader = ArtLoader;


/***/ }),

/***/ "./apps/api/src/modules/art/loaders/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/loaders/art.loader.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/art/services/art-file.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtFileService = void 0;
const tslib_1 = __webpack_require__("tslib");
const shared_1 = __webpack_require__("./apps/api/src/shared/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const fs_1 = __webpack_require__("fs");
const promises_1 = __webpack_require__("fs/promises");
const Jimp = __webpack_require__("jimp");
const node_poppler_1 = __webpack_require__("node-poppler");
const path_1 = __webpack_require__("path");
const typeorm_2 = __webpack_require__("typeorm");
const typeorm_transactional_cls_hooked_1 = __webpack_require__("typeorm-transactional-cls-hooked");
const art_file_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art-file.entity.ts");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
let ArtFileService = class ArtFileService {
    constructor(artFileRepository, config) {
        this.artFileRepository = artFileRepository;
        this.config = config;
        this._poppler = process.platform === 'linux' ? new node_poppler_1.Poppler('./.apt/usr/bin') : new node_poppler_1.Poppler();
    }
    checkDir(path) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const dir = (0, path_1.dirname)(path);
            if (!(0, fs_1.existsSync)(dir))
                yield (0, promises_1.mkdir)(dir, { recursive: true });
        });
    }
    fromPdfToJpeg(src, dest) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = {
                firstPageToConvert: 1,
                lastPageToConvert: 1,
                jpegFile: true,
                singleFile: true,
            };
            const res = yield this._poppler.pdfToCairo(src, dest, options);
            if (res instanceof Error)
                throw res;
        });
    }
    createWaterMarkFromJpeg(src, dest) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const LOGO = './watermark/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png';
            const image = yield Jimp.read(src);
            const logo = yield Jimp.read(LOGO);
            logo.resize(image.bitmap.width * 0.9, image.bitmap.height * 0.9);
            const X = (image.bitmap.width - logo.bitmap.width) / 2;
            const Y = (image.bitmap.height - logo.bitmap.height) / 2;
            const composed = image.composite(logo, X, Y, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 0.4,
                opacityDest: 1,
            });
            yield composed.writeAsync(dest);
        });
    }
    saveWatemark(filePath, art) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const fileName = (0, path_1.resolve)(filePath).split('/').pop();
            const fileExtension = fileName.split('.')[1];
            let watermarkPath = (0, path_1.resolve)(this.config.fileStoragePath, 'watermark', art.name);
            yield this.checkDir(watermarkPath);
            switch (fileExtension) {
                case 'pdf':
                    yield this.fromPdfToJpeg(filePath, watermarkPath);
                    watermarkPath = watermarkPath + '.jpg';
                    yield this.createWaterMarkFromJpeg(watermarkPath, watermarkPath);
                    break;
                case 'jpg':
                    watermarkPath = watermarkPath + '.jpg';
                    yield this.createWaterMarkFromJpeg(filePath, watermarkPath);
                    break;
                default:
                    throw new Error('Некорректный формат файла');
            }
            return (0, path_1.join)('watermark', art.name + '.jpg');
        });
    }
    saveOriginal(filePath, art) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const fileName = (0, path_1.resolve)(filePath).split('/').pop();
            const fileExtension = fileName.split('.')[1];
            const originalFilePath = (0, path_1.join)(this.config.fileStoragePath, 'original', `${art.name}.${fileExtension}`);
            yield this.checkDir(originalFilePath);
            yield (0, promises_1.copyFile)(filePath, originalFilePath);
            return (0, path_1.join)('original', `${art.name}.${fileExtension}`);
        });
    }
    saveArtFile(filePath, art) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let originalPath;
            let watermarkPath;
            try {
                originalPath = yield this.saveOriginal(filePath, art);
                watermarkPath = yield this.saveWatemark(filePath, art);
                yield this.artFileRepository.upsert({ artId: art.id, originalPath, watermarkPath }, ['artId']);
                if ((0, fs_1.existsSync)(filePath))
                    yield (0, promises_1.rm)(filePath);
            }
            catch (e) {
                if ((0, fs_1.existsSync)(originalPath))
                    yield (0, promises_1.rm)(originalPath);
                if ((0, fs_1.existsSync)(watermarkPath))
                    yield (0, promises_1.rm)(watermarkPath);
                throw e;
            }
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, typeof (_a = typeof art_entity_1.Art !== "undefined" && art_entity_1.Art) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ArtFileService.prototype, "saveArtFile", null);
ArtFileService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(art_file_entity_1.ArtFile)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof shared_1.ApiConfigService !== "undefined" && shared_1.ApiConfigService) === "function" ? _c : Object])
], ArtFileService);
exports.ArtFileService = ArtFileService;


/***/ }),

/***/ "./apps/api/src/modules/art/services/art.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtService = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_builder_1 = __webpack_require__("./apps/api/src/shared/utils/query-builder/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const graphql_relay_1 = __webpack_require__("graphql-relay");
const typeorm_2 = __webpack_require__("typeorm");
const typeorm_transactional_cls_hooked_1 = __webpack_require__("typeorm-transactional-cls-hooked");
const dto_1 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
const art_file_service_1 = __webpack_require__("./apps/api/src/modules/art/services/art-file.service.ts");
let ArtService = class ArtService {
    constructor(artRepository, artFileService) {
        this.artRepository = artRepository;
        this.artFileService = artFileService;
    }
    getByIds(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.artRepository.find({
                where: { id: (0, typeorm_2.In)(ids) },
            });
        });
    }
    getArt(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.artRepository.findOne({ id });
        });
    }
    getArts({ filter, order, pagination }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { take = 50, skip = 0 } = pagination.pagingParams();
            const query = (0, query_builder_1.filterQuery)(this.artRepository.createQueryBuilder('arts'), 'arts', filter, this.artRepository.manager.connection
                .getMetadata(art_entity_1.Art)
                .relations.map(({ propertyName }) => propertyName))
                .skip(skip)
                .take(take);
            const count = yield query.getCount();
            // orderQuery(query, { ...order });
            query.orderBy('arts.name', 'ASC');
            const arts = yield query.getMany();
            const page = (0, graphql_relay_1.connectionFromArraySlice)(arts, pagination, {
                arrayLength: count,
                sliceStart: skip || 0,
            });
            return { page, pageData: { count, take, skip } };
        });
    }
    createArt(createArtInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { filePath } = createArtInput, input = (0, tslib_1.__rest)(createArtInput, ["filePath"]);
            const art = yield this.artRepository.save(Object.assign({}, input));
            if (filePath)
                yield this.artFileService.saveArtFile(filePath, art);
            return art;
        });
    }
    updateArt(updateArtInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { id, filePath } = updateArtInput, updateInput = (0, tslib_1.__rest)(updateArtInput, ["id", "filePath"]);
            const art = yield this.artRepository.findOneOrFail({ id });
            if (filePath)
                yield this.artFileService.saveArtFile(filePath, art);
            Object.assign(art, Object.assign({}, updateInput));
            return yield this.artRepository.save(art);
        });
    }
    loadArtsFiles(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const arts = yield this.artRepository.find({
                where: { id: (0, typeorm_2.In)(ids) },
                select: ['id'],
                relations: ['files'],
            });
            return arts;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.CreateArtInput !== "undefined" && dto_1.CreateArtInput) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ArtService.prototype, "createArt", null);
(0, tslib_1.__decorate)([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof dto_1.UpdateArtInput !== "undefined" && dto_1.UpdateArtInput) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ArtService.prototype, "updateArt", null);
ArtService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(art_entity_1.Art)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof art_file_service_1.ArtFileService !== "undefined" && art_file_service_1.ArtFileService) === "function" ? _f : Object])
], ArtService);
exports.ArtService = ArtService;


/***/ }),

/***/ "./apps/api/src/modules/art/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/services/art.service.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/art/services/art-file.service.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/attribute/attribute-type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var AttributeType;
(function (AttributeType) {
    AttributeType["artClass"] = "artClass";
    AttributeType["bottomForm"] = "bottomForm";
    AttributeType["form"] = "form";
    AttributeType["height"] = "height";
    AttributeType["nominalVolume"] = "nominalVolume";
    AttributeType["productionMethod"] = "productionMethod";
    AttributeType["productType"] = "productType";
    AttributeType["ringType"] = "ringType";
    AttributeType["dropNumber"] = "dropNumber";
    AttributeType["intercenter"] = "intercenter";
    AttributeType["sfm"] = "sfm";
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
(0, graphql_1.registerEnumType)(AttributeType, { name: 'AttributeType' });


/***/ }),

/***/ "./apps/api/src/modules/attribute/attribute.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const attribute_resolver_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute.resolver.ts");
const attribute_service_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute.service.ts");
const Entities = __webpack_require__("./apps/api/src/modules/attribute/entities/index.ts");
const EntitiesArray = Object.values(Entities);
let AttributeModule = class AttributeModule {
};
AttributeModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature(EntitiesArray)],
        providers: [attribute_service_1.AttributeService, attribute_resolver_1.AttributeResolver],
    })
], AttributeModule);
exports.AttributeModule = AttributeModule;


/***/ }),

/***/ "./apps/api/src/modules/attribute/attribute.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const auth_guard_1 = __webpack_require__("./apps/api/src/modules/auth/auth.guard.ts");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const attribute_service_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute.service.ts");
const dto_1 = __webpack_require__("./apps/api/src/modules/attribute/dto/index.ts");
let AttributeResolver = class AttributeResolver {
    constructor(service) {
        this.service = service;
    }
    createAttribute(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.service.create(input);
        });
    }
    attribute(type, id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.service.getAttribute(type, id);
        });
    }
    attributes(type) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.service.getAttributes(type);
        });
    }
    updateAttributesOrder(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.service.updateValuesOrder(input);
        });
    }
    updateAttribute(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.service.updateValue(input);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.BaseAttributeType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.CreateAttributeInput !== "undefined" && dto_1.CreateAttributeInput) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeResolver.prototype, "createAttribute", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.BaseAttributeType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('type', { type: () => attribute_type_1.AttributeType })),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof attribute_type_1.AttributeType !== "undefined" && attribute_type_1.AttributeType) === "function" ? _b : Object, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeResolver.prototype, "attribute", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [dto_1.BaseAttributeType]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('type', { type: () => attribute_type_1.AttributeType })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof attribute_type_1.AttributeType !== "undefined" && attribute_type_1.AttributeType) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeResolver.prototype, "attributes", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => [dto_1.BaseAttributeType]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof dto_1.UpdateAttributeValueOrderInput !== "undefined" && dto_1.UpdateAttributeValueOrderInput) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeResolver.prototype, "updateAttributesOrder", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.BaseAttributeType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof dto_1.UpdateAttributeInput !== "undefined" && dto_1.UpdateAttributeInput) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeResolver.prototype, "updateAttribute", null);
AttributeResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof attribute_service_1.AttributeService !== "undefined" && attribute_service_1.AttributeService) === "function" ? _f : Object])
], AttributeResolver);
exports.AttributeResolver = AttributeResolver;


/***/ }),

/***/ "./apps/api/src/modules/attribute/attribute.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const typeorm_transactional_cls_hooked_1 = __webpack_require__("typeorm-transactional-cls-hooked");
const dto_1 = __webpack_require__("./apps/api/src/modules/attribute/dto/index.ts");
const Entities = __webpack_require__("./apps/api/src/modules/attribute/entities/index.ts");
const EntitiesArray = Object.values(Entities);
let AttributeService = class AttributeService {
    constructor(em) {
        this.em = em;
        this.getType = (type) => EntitiesArray.find((entityClass) => entityClass.attributeType === type);
    }
    create({ name, active, type }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const Attribute = this.getType(type);
            const valueOrder = ((yield this.em
                .createQueryBuilder(Attribute, 'attribute')
                .select('MAX("valueOrder")', 'max')
                .getRawOne()).max || 0) + 1;
            const result = this.em.create(Attribute, {
                name,
                active,
                valueOrder,
            });
            yield this.em.save(result);
            return result;
        });
    }
    getAttribute(type, id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.em.findOne(this.getType(type), {
                order: { valueOrder: 'ASC' },
                where: { id },
            });
            return result;
        });
    }
    getAttributes(type) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.em.find(this.getType(type), { order: { valueOrder: 'ASC' } });
            return result;
        });
    }
    updateValuesOrder(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const Attribute = this.getType(input.type);
            const isBackward = input.direction === 'backward';
            const { newOrder, oldOrder } = input;
            const [updateFrom, updateTo] = isBackward ? [newOrder, oldOrder - 1] : [oldOrder + 1, newOrder];
            yield this.em.update(Attribute, { valueOrder: oldOrder }, { valueOrder: -1 });
            for (const currentOrder of Array.from({ length: updateTo - updateFrom + 1 }, (_, i) => isBackward ? updateTo - i : i + updateFrom)) {
                yield this.em.update(Attribute, { valueOrder: currentOrder }, { valueOrder: isBackward ? currentOrder + 1 : currentOrder - 1 });
            }
            yield this.em.update(Attribute, { valueOrder: -1 }, { valueOrder: newOrder });
            return yield this.getAttributes(input.type);
        });
    }
    updateValue({ type, active, name, id }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const Attribute = this.getType(type);
            const attributeValue = yield this.em.findOneOrFail(Attribute, { id });
            Object.assign(attributeValue, Object.assign(Object.assign({}, (typeof name === 'string' ? { name } : {})), (typeof active === 'boolean' ? { active } : {})));
            return yield this.em.save(Attribute, attributeValue);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.UpdateAttributeValueOrderInput !== "undefined" && dto_1.UpdateAttributeValueOrderInput) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AttributeService.prototype, "updateValuesOrder", null);
AttributeService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectEntityManager)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof typeorm_2.EntityManager !== "undefined" && typeorm_2.EntityManager) === "function" ? _b : Object])
], AttributeService);
exports.AttributeService = AttributeService;


/***/ }),

/***/ "./apps/api/src/modules/attribute/dto/base-attribute.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseAttributeType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let BaseAttributeType = class BaseAttributeType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Number),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseAttributeType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], BaseAttributeType.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], BaseAttributeType.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Number),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseAttributeType.prototype, "valueOrder", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseAttributeType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseAttributeType.prototype, "updatedAt", void 0);
BaseAttributeType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)({ isAbstract: true })
], BaseAttributeType);
exports.BaseAttributeType = BaseAttributeType;


/***/ }),

/***/ "./apps/api/src/modules/attribute/dto/create-attribute.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttributeInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
let CreateAttributeInput = class CreateAttributeInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => attribute_type_1.AttributeType),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof attribute_type_1.AttributeType !== "undefined" && attribute_type_1.AttributeType) === "function" ? _a : Object)
], CreateAttributeInput.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAttributeInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateAttributeInput.prototype, "active", void 0);
CreateAttributeInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateAttributeInput);
exports.CreateAttributeInput = CreateAttributeInput;


/***/ }),

/***/ "./apps/api/src/modules/attribute/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/dto/base-attribute.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/dto/create-attribute.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/dto/update-attribute.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/dto/update-order.input.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/attribute/dto/update-attribute.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
let UpdateAttributeInput = class UpdateAttributeInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => attribute_type_1.AttributeType),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof attribute_type_1.AttributeType !== "undefined" && attribute_type_1.AttributeType) === "function" ? _a : Object)
], UpdateAttributeInput.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateAttributeInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateAttributeInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateAttributeInput.prototype, "active", void 0);
UpdateAttributeInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateAttributeInput);
exports.UpdateAttributeInput = UpdateAttributeInput;


/***/ }),

/***/ "./apps/api/src/modules/attribute/dto/update-order.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UpdateAttributeValueOrderInput_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttributeValueOrderInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const match_decorator_1 = __webpack_require__("./apps/api/src/shared/decorators/match.decorator.ts");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
let UpdateAttributeValueOrderInput = UpdateAttributeValueOrderInput_1 = class UpdateAttributeValueOrderInput {
    get direction() {
        return this.oldOrder > this.newOrder ? 'backward' : 'forward';
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => attribute_type_1.AttributeType),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof attribute_type_1.AttributeType !== "undefined" && attribute_type_1.AttributeType) === "function" ? _a : Object)
], UpdateAttributeValueOrderInput.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Number),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateAttributeValueOrderInput.prototype, "oldOrder", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Number),
    (0, match_decorator_1.NotMatch)(UpdateAttributeValueOrderInput_1, (req) => req.oldOrder),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateAttributeValueOrderInput.prototype, "newOrder", void 0);
UpdateAttributeValueOrderInput = UpdateAttributeValueOrderInput_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateAttributeValueOrderInput);
exports.UpdateAttributeValueOrderInput = UpdateAttributeValueOrderInput;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/art-class.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtClass = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let ArtClass = class ArtClass extends base_attribute_entity_1.BaseAttribute {
};
ArtClass.attributeType = attribute_type_1.AttributeType.artClass;
ArtClass = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], ArtClass);
exports.ArtClass = ArtClass;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/base-attribute.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseAttribute = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
class BaseAttribute {
}
BaseAttribute.attributeType = undefined;
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseAttribute.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], BaseAttribute.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], BaseAttribute.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'integer', unique: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], BaseAttribute.prototype, "valueOrder", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseAttribute.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseAttribute.prototype, "updatedAt", void 0);
exports.BaseAttribute = BaseAttribute;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/bottom-form.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BottomForm = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let BottomForm = class BottomForm extends base_attribute_entity_1.BaseAttribute {
};
BottomForm.attributeType = attribute_type_1.AttributeType.bottomForm;
BottomForm = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], BottomForm);
exports.BottomForm = BottomForm;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/dropnumber.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DropNumber = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let DropNumber = class DropNumber extends base_attribute_entity_1.BaseAttribute {
};
DropNumber.attributeType = attribute_type_1.AttributeType.dropNumber;
DropNumber = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], DropNumber);
exports.DropNumber = DropNumber;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/form.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let Form = class Form extends base_attribute_entity_1.BaseAttribute {
};
Form.attributeType = attribute_type_1.AttributeType.form;
Form = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Form);
exports.Form = Form;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/height.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Height = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let Height = class Height extends base_attribute_entity_1.BaseAttribute {
};
Height.attributeType = attribute_type_1.AttributeType.height;
Height = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Height);
exports.Height = Height;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/art-class.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/bottom-form.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/dropnumber.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/form.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/height.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/intercenter.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/nominal-volume.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/product-type.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/production-method.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/ring-type.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/attribute/entities/sfm.entity.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/intercenter.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Intercenter = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let Intercenter = class Intercenter extends base_attribute_entity_1.BaseAttribute {
};
Intercenter.attributeType = attribute_type_1.AttributeType.intercenter;
Intercenter = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Intercenter);
exports.Intercenter = Intercenter;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/nominal-volume.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominalVolume = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let NominalVolume = class NominalVolume extends base_attribute_entity_1.BaseAttribute {
};
NominalVolume.attributeType = attribute_type_1.AttributeType.nominalVolume;
NominalVolume = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], NominalVolume);
exports.NominalVolume = NominalVolume;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/product-type.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductType = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let ProductType = class ProductType extends base_attribute_entity_1.BaseAttribute {
};
ProductType.attributeType = attribute_type_1.AttributeType.productType;
ProductType = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], ProductType);
exports.ProductType = ProductType;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/production-method.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductionMethod = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let ProductionMethod = class ProductionMethod extends base_attribute_entity_1.BaseAttribute {
};
ProductionMethod.attributeType = attribute_type_1.AttributeType.productionMethod;
ProductionMethod = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], ProductionMethod);
exports.ProductionMethod = ProductionMethod;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/ring-type.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RingType = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let RingType = class RingType extends base_attribute_entity_1.BaseAttribute {
};
RingType.attributeType = attribute_type_1.AttributeType.ringType;
RingType = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], RingType);
exports.RingType = RingType;


/***/ }),

/***/ "./apps/api/src/modules/attribute/entities/sfm.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sfm = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const attribute_type_1 = __webpack_require__("./apps/api/src/modules/attribute/attribute-type.ts");
const base_attribute_entity_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/base-attribute.entity.ts");
let Sfm = class Sfm extends base_attribute_entity_1.BaseAttribute {
};
Sfm.attributeType = attribute_type_1.AttributeType.sfm;
Sfm = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Sfm);
exports.Sfm = Sfm;


/***/ }),

/***/ "./apps/api/src/modules/auth/auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        if (!ctx.session.isLoggedIn)
            throw new common_1.UnauthorizedException();
        return true;
    }
};
AuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AuthGuard);
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "./apps/api/src/modules/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const user_1 = __webpack_require__("./apps/api/src/modules/user/index.ts");
const auth_resolver_1 = __webpack_require__("./apps/api/src/modules/auth/auth.resolver.ts");
const session_entity_1 = __webpack_require__("./apps/api/src/modules/auth/entity/session.entity.ts");
const service_1 = __webpack_require__("./apps/api/src/modules/auth/service/index.ts");
let AuthModule = class AuthModule {
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => user_1.UserModule), typeorm_1.TypeOrmModule.forFeature([session_entity_1.Session])],
        providers: [service_1.PasswordService, service_1.AuthService, auth_resolver_1.AuthResolver],
        exports: [service_1.PasswordService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/modules/auth/auth.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthResolver_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const dto_1 = __webpack_require__("./apps/api/src/modules/user/dto/index.ts");
const user_service_1 = __webpack_require__("./apps/api/src/modules/user/user.service.ts");
const context_1 = __webpack_require__("./apps/api/src/shared/types/context.ts");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const auth_guard_1 = __webpack_require__("./apps/api/src/modules/auth/auth.guard.ts");
const dto_2 = __webpack_require__("./apps/api/src/modules/auth/dto/index.ts");
const change_password_args_1 = __webpack_require__("./apps/api/src/modules/auth/dto/change-password.args.ts");
const service_1 = __webpack_require__("./apps/api/src/modules/auth/service/index.ts");
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    login(loginInput, { session }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            session.loginAttempts = (session.loginAttempts || 0) + 1;
            const user = yield this.authService.validateCredentials(loginInput);
            session.userId = user.id;
            session.isLoggedIn = true;
            session.loginAttempts = 0;
            return { user };
        });
    }
    whoAmI({ currentUserId }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.userService.getUser(currentUserId);
        });
    }
    logout({ session }) {
        session.destroy((err) => {
            if (err)
                common_1.Logger.error(err);
        });
        return true;
    }
    changePassword(changePasswordInput, { session }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.authService.changePassword(changePasswordInput);
            session.destroy((err) => {
                if (err)
                    this.logger.error('Error destroying session', err);
            });
            return true;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_2.LoginResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_2.LoginArgs !== "undefined" && dto_2.LoginArgs) === "function" ? _a : Object, typeof (_b = typeof context_1.AppContext !== "undefined" && context_1.AppContext) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthResolver.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.UserType),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof context_1.AppContext !== "undefined" && context_1.AppContext) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "whoAmI", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof context_1.AppContext !== "undefined" && context_1.AppContext) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", Boolean)
], AuthResolver.prototype, "logout", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof change_password_args_1.ChangePasswordArgs !== "undefined" && change_password_args_1.ChangePasswordArgs) === "function" ? _f : Object, typeof (_g = typeof context_1.AppContext !== "undefined" && context_1.AppContext) === "function" ? _g : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthResolver.prototype, "changePassword", null);
AuthResolver = AuthResolver_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_j = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _j : Object, typeof (_k = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _k : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./apps/api/src/modules/auth/dto/change-password.args.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ChangePasswordArgs_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordArgs = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
const match_decorator_1 = __webpack_require__("./apps/api/src/shared/decorators/match.decorator.ts");
let ChangePasswordArgs = ChangePasswordArgs_1 = class ChangePasswordArgs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], ChangePasswordArgs.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], ChangePasswordArgs.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, match_decorator_1.Match)(ChangePasswordArgs_1, (dto) => dto.newPassword, { message: 'Пароли должны совпадать!' }),
    (0, tslib_1.__metadata)("design:type", String)
], ChangePasswordArgs.prototype, "passwordRepeat", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], ChangePasswordArgs.prototype, "newPassword", void 0);
ChangePasswordArgs = ChangePasswordArgs_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], ChangePasswordArgs);
exports.ChangePasswordArgs = ChangePasswordArgs;


/***/ }),

/***/ "./apps/api/src/modules/auth/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/dto/login.args.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/dto/login.response.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/dto/change-password.args.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/auth/dto/login.args.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginArgs = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let LoginArgs = class LoginArgs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginArgs.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginArgs.prototype, "password", void 0);
LoginArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], LoginArgs);
exports.LoginArgs = LoginArgs;


/***/ }),

/***/ "./apps/api/src/modules/auth/dto/login.response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/user/dto/index.ts");
let LoginResponse = class LoginResponse {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => dto_1.UserType),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof dto_1.UserType !== "undefined" && dto_1.UserType) === "function" ? _a : Object)
], LoginResponse.prototype, "user", void 0);
LoginResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;


/***/ }),

/***/ "./apps/api/src/modules/auth/entity/session.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Session = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const session_data_interface_1 = __webpack_require__("./apps/api/src/modules/auth/interfaces/session-data.interface.ts");
let Session = class Session {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Session.prototype, "sid", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof session_data_interface_1.AppSessionData !== "undefined" && session_data_interface_1.AppSessionData) === "function" ? _a : Object)
], Session.prototype, "sess", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Session.prototype, "expire", void 0);
Session = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Session);
exports.Session = Session;


/***/ }),

/***/ "./apps/api/src/modules/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/auth.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/interfaces/session-data.interface.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/auth/interfaces/session-data.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/api/src/modules/auth/service/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_entity_1 = __webpack_require__("./apps/api/src/modules/user/entity/user.entity.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const password_service_1 = __webpack_require__("./apps/api/src/modules/auth/service/password.service.ts");
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    validateCredentials({ username, password }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.debug(`Login request: ${username}`);
            const user = yield this.userRepository.findOne({ username: (0, typeorm_2.ILike)(username), active: true });
            if (!user || !(yield this.passwordService.compare(password, user.password)))
                throw new common_1.UnauthorizedException('Неверные данные для входа');
            return user;
        });
    }
    changePassword({ username, password, newPassword }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.validateCredentials({ username, password });
            yield this.userRepository.update({ id: user.id }, { password: yield this.passwordService.hash(newPassword) });
        });
    }
};
AuthService = AuthService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof password_service_1.PasswordService !== "undefined" && password_service_1.PasswordService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/modules/auth/service/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/service/auth.service.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/auth/service/password.service.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/auth/service/password.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const bcrypt_1 = __webpack_require__("bcrypt");
let PasswordService = class PasswordService {
    hash(password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.hash)(password, 10);
        });
    }
    compare(password, hashed) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.compare)(password, hashed);
        });
    }
};
PasswordService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], PasswordService);
exports.PasswordService = PasswordService;


/***/ }),

/***/ "./apps/api/src/modules/customer/customer.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const customer_entity_1 = __webpack_require__("./apps/api/src/modules/customer/entities/customer.entity.ts");
const customer_resolver_1 = __webpack_require__("./apps/api/src/modules/customer/customer.resolver.ts");
const customer_service_1 = __webpack_require__("./apps/api/src/modules/customer/customer.service.ts");
let CustomerModule = class CustomerModule {
};
CustomerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer])],
        providers: [customer_service_1.CustomerService, customer_resolver_1.CustomerResolver],
        exports: [customer_service_1.CustomerService],
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;


/***/ }),

/***/ "./apps/api/src/modules/customer/customer.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/customer/dto/index.ts");
const customer_service_1 = __webpack_require__("./apps/api/src/modules/customer/customer.service.ts");
let CustomerResolver = class CustomerResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    createCustomer(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.customerService.create(input);
        });
    }
    customers() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.customerService.findAll();
        });
    }
    customer(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.customerService.findOne(id);
        });
    }
    updateCustomer(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.customerService.update(input);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.CustomerType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.CreateCustomerInput !== "undefined" && dto_1.CreateCustomerInput) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerResolver.prototype, "createCustomer", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [dto_1.CustomerType]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerResolver.prototype, "customers", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.CustomerType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerResolver.prototype, "customer", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.CustomerType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof dto_1.UpdateCustomerInput !== "undefined" && dto_1.UpdateCustomerInput) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerResolver.prototype, "updateCustomer", null);
CustomerResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => dto_1.CustomerType),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" ? _c : Object])
], CustomerResolver);
exports.CustomerResolver = CustomerResolver;


/***/ }),

/***/ "./apps/api/src/modules/customer/customer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const customer_entity_1 = __webpack_require__("./apps/api/src/modules/customer/entities/customer.entity.ts");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    getByIds(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.customerRepository.find({ id: (0, typeorm_2.In)(ids) });
        });
    }
    create(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.save(input);
            return customer;
        });
    }
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customers = yield this.customerRepository.find({ order: { createdAt: 'ASC', name: 'ASC' } });
            return customers;
        });
    }
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customers = yield this.customerRepository.findOne({ id });
            return customers;
        });
    }
    update(_a) {
        var { id } = _a, input = (0, tslib_1.__rest)(_a, ["id"]);
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.findOneOrFail({ id });
            Object.assign(customer, input);
            yield this.customerRepository.save(customer);
            return customer;
        });
    }
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.customerRepository.findOneOrFail({ id }, { select: ['id'] });
            yield this.customerRepository.delete({ id });
        });
    }
    isActive(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.customerRepository.findOneOrFail({
                where: { id, active: true },
                select: ['id'],
            });
        });
    }
};
CustomerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CustomerService);
exports.CustomerService = CustomerService;


/***/ }),

/***/ "./apps/api/src/modules/customer/dto/create-customer.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCustomerInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateCustomerInput = class CreateCustomerInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CreateCustomerInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateCustomerInput.prototype, "active", void 0);
CreateCustomerInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateCustomerInput);
exports.CreateCustomerInput = CreateCustomerInput;


/***/ }),

/***/ "./apps/api/src/modules/customer/dto/customer.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CustomerType = class CustomerType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerType.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CustomerType.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CustomerType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CustomerType.prototype, "updatedAt", void 0);
CustomerType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Customer')
], CustomerType);
exports.CustomerType = CustomerType;


/***/ }),

/***/ "./apps/api/src/modules/customer/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/customer/dto/create-customer.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/customer/dto/customer.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/customer/dto/update-customer.input.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/customer/dto/update-customer.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCustomerInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateCustomerInput = class UpdateCustomerInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateCustomerInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateCustomerInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateCustomerInput.prototype, "active", void 0);
UpdateCustomerInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateCustomerInput);
exports.UpdateCustomerInput = UpdateCustomerInput;


/***/ }),

/***/ "./apps/api/src/modules/customer/entities/customer.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let Customer = class Customer {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Customer.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Customer.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Customer.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Customer.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Customer.prototype, "updatedAt", void 0);
Customer = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;


/***/ }),

/***/ "./apps/api/src/modules/factory/dto/create-factory.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFactoryInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateFactoryInput = class CreateFactoryInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CreateFactoryInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateFactoryInput.prototype, "active", void 0);
CreateFactoryInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateFactoryInput);
exports.CreateFactoryInput = CreateFactoryInput;


/***/ }),

/***/ "./apps/api/src/modules/factory/dto/factory.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FactoryType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let FactoryType = class FactoryType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], FactoryType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], FactoryType.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], FactoryType.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FactoryType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FactoryType.prototype, "updatedAt", void 0);
FactoryType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Factory')
], FactoryType);
exports.FactoryType = FactoryType;


/***/ }),

/***/ "./apps/api/src/modules/factory/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/factory/dto/create-factory.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/factory/dto/factory.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/factory/dto/update-factory.input.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/factory/dto/update-factory.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateFactoryInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateFactoryInput = class UpdateFactoryInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateFactoryInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateFactoryInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true, defaultValue: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateFactoryInput.prototype, "active", void 0);
UpdateFactoryInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateFactoryInput);
exports.UpdateFactoryInput = UpdateFactoryInput;


/***/ }),

/***/ "./apps/api/src/modules/factory/entities/factory.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Factory = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let Factory = class Factory {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Factory.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Factory.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Factory.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Factory.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Factory.prototype, "updatedAt", void 0);
Factory = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Factory);
exports.Factory = Factory;


/***/ }),

/***/ "./apps/api/src/modules/factory/factory.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FactoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const factory_entity_1 = __webpack_require__("./apps/api/src/modules/factory/entities/factory.entity.ts");
const factory_resolver_1 = __webpack_require__("./apps/api/src/modules/factory/factory.resolver.ts");
const factory_service_1 = __webpack_require__("./apps/api/src/modules/factory/factory.service.ts");
let FactoryModule = class FactoryModule {
};
FactoryModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([factory_entity_1.Factory])],
        providers: [factory_service_1.FactoryService, factory_resolver_1.FactoryResolver],
        exports: [factory_service_1.FactoryService],
    })
], FactoryModule);
exports.FactoryModule = FactoryModule;


/***/ }),

/***/ "./apps/api/src/modules/factory/factory.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FactoryResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/factory/dto/index.ts");
const factory_service_1 = __webpack_require__("./apps/api/src/modules/factory/factory.service.ts");
let FactoryResolver = class FactoryResolver {
    constructor(factoryService) {
        this.factoryService = factoryService;
    }
    createFactory(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.factoryService.create(input);
        });
    }
    factories() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.factoryService.findAll();
        });
    }
    factory(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.factoryService.findOne(id);
        });
    }
    updateFactory(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.factoryService.update(input);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.FactoryType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.CreateFactoryInput !== "undefined" && dto_1.CreateFactoryInput) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FactoryResolver.prototype, "createFactory", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [dto_1.FactoryType]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FactoryResolver.prototype, "factories", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.FactoryType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FactoryResolver.prototype, "factory", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.FactoryType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof dto_1.UpdateFactoryInput !== "undefined" && dto_1.UpdateFactoryInput) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FactoryResolver.prototype, "updateFactory", null);
FactoryResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => dto_1.FactoryType),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof factory_service_1.FactoryService !== "undefined" && factory_service_1.FactoryService) === "function" ? _c : Object])
], FactoryResolver);
exports.FactoryResolver = FactoryResolver;


/***/ }),

/***/ "./apps/api/src/modules/factory/factory.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FactoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const factory_entity_1 = __webpack_require__("./apps/api/src/modules/factory/entities/factory.entity.ts");
let FactoryService = class FactoryService {
    constructor(factoryRepo) {
        this.factoryRepo = factoryRepo;
    }
    getByIds(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.factoryRepo.find({ id: (0, typeorm_2.In)(ids) });
        });
    }
    create(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const factory = yield this.factoryRepo.save(input);
            return factory;
        });
    }
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const factories = yield this.factoryRepo.find({ order: { createdAt: 'ASC', name: 'ASC' } });
            return factories;
        });
    }
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const factories = yield this.factoryRepo.findOne({ id });
            return factories;
        });
    }
    update(_a) {
        var { id } = _a, input = (0, tslib_1.__rest)(_a, ["id"]);
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const factory = yield this.factoryRepo.findOneOrFail({ id });
            Object.assign(factory, input);
            yield this.factoryRepo.save(factory);
            return factory;
        });
    }
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.factoryRepo.findOneOrFail({ id }, { select: ['id'] });
            yield this.factoryRepo.delete({ id });
        });
    }
    isActive(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.factoryRepo.findOneOrFail({
                where: { id, active: true },
                select: ['id'],
            });
        });
    }
};
FactoryService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(factory_entity_1.Factory)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FactoryService);
exports.FactoryService = FactoryService;


/***/ }),

/***/ "./apps/api/src/modules/project/dto/create-project.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProjectInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let CreateProjectInput = class CreateProjectInput {
    format() {
        return Object.assign(Object.assign({}, this), { name: this.name.toUpperCase() });
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateProjectInput.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateProjectInput.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "sfm", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateProjectInput.prototype, "factoryId", void 0);
CreateProjectInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateProjectInput);
exports.CreateProjectInput = CreateProjectInput;


/***/ }),

/***/ "./apps/api/src/modules/project/dto/find-projects.args.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProjectFilterQuery_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindProjectArgs = exports.ProjectOrderQuery = exports.ProjectFilterQuery = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_transformer_1 = __webpack_require__("class-transformer");
const connection_args_type_1 = __webpack_require__("./apps/api/src/common/connection-args.type.ts");
const filter_input_type_1 = __webpack_require__("./apps/api/src/common/filter-input.type.ts");
const types_1 = __webpack_require__("./apps/api/src/shared/types/index.ts");
let ProjectFilterQuery = ProjectFilterQuery_1 = class ProjectFilterQuery {
};
_a = types_1.LogicalOperator.AND, _b = types_1.LogicalOperator.OR;
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [ProjectFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ProjectFilterQuery.prototype, _a, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [ProjectFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ProjectFilterQuery.prototype, _b, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _c : Object)
], ProjectFilterQuery.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _d : Object)
], ProjectFilterQuery.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.BooleanFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof filter_input_type_1.BooleanFieldOption !== "undefined" && filter_input_type_1.BooleanFieldOption) === "function" ? _e : Object)
], ProjectFilterQuery.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.BooleanFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof filter_input_type_1.BooleanFieldOption !== "undefined" && filter_input_type_1.BooleanFieldOption) === "function" ? _f : Object)
], ProjectFilterQuery.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _g : Object)
], ProjectFilterQuery.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_h = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _h : Object)
], ProjectFilterQuery.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_j = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _j : Object)
], ProjectFilterQuery.prototype, "sfm", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_k = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _k : Object)
], ProjectFilterQuery.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_l = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _l : Object)
], ProjectFilterQuery.prototype, "factoryId", void 0);
ProjectFilterQuery = ProjectFilterQuery_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ProjectFilterQuery);
exports.ProjectFilterQuery = ProjectFilterQuery;
let ProjectOrderQuery = class ProjectOrderQuery {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_m = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _m : Object)
], ProjectOrderQuery.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_o = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _o : Object)
], ProjectOrderQuery.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_p = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _p : Object)
], ProjectOrderQuery.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_q = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _q : Object)
], ProjectOrderQuery.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_r = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _r : Object)
], ProjectOrderQuery.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_s = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _s : Object)
], ProjectOrderQuery.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => types_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_t = typeof types_1.OrderDirection !== "undefined" && types_1.OrderDirection) === "function" ? _t : Object)
], ProjectOrderQuery.prototype, "sfm", void 0);
ProjectOrderQuery = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ProjectOrderQuery);
exports.ProjectOrderQuery = ProjectOrderQuery;
let FindProjectArgs = class FindProjectArgs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => ProjectFilterQuery, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", ProjectFilterQuery)
], FindProjectArgs.prototype, "filter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => connection_args_type_1.default, { nullable: true, defaultValue: {} }),
    (0, class_transformer_1.Type)(() => connection_args_type_1.default),
    (0, tslib_1.__metadata)("design:type", typeof (_u = typeof connection_args_type_1.default !== "undefined" && connection_args_type_1.default) === "function" ? _u : Object)
], FindProjectArgs.prototype, "pagination", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => ProjectOrderQuery, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", ProjectOrderQuery)
], FindProjectArgs.prototype, "order", void 0);
FindProjectArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], FindProjectArgs);
exports.FindProjectArgs = FindProjectArgs;


/***/ }),

/***/ "./apps/api/src/modules/project/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/dto/create-project.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/dto/project.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/dto/find-projects.args.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/dto/projects.response.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/dto/update-project.input.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/project/dto/project.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
const dto_2 = __webpack_require__("./apps/api/src/modules/factory/dto/index.ts");
const dto_3 = __webpack_require__("./apps/api/src/modules/customer/dto/index.ts");
let ProjectType = class ProjectType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], ProjectType.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], ProjectType.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "sfm", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [dto_1.ArtType], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ProjectType.prototype, "arts", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => dto_2.FactoryType, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof dto_2.FactoryType !== "undefined" && dto_2.FactoryType) === "function" ? _a : Object)
], ProjectType.prototype, "factory", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => dto_3.CustomerType, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof dto_3.CustomerType !== "undefined" && dto_3.CustomerType) === "function" ? _b : Object)
], ProjectType.prototype, "customer", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "factoryId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ProjectType.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProjectType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProjectType.prototype, "updatedAt", void 0);
ProjectType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Project')
], ProjectType);
exports.ProjectType = ProjectType;


/***/ }),

/***/ "./apps/api/src/modules/project/dto/projects.response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const relay_types_1 = __webpack_require__("./apps/api/src/common/relay.types.ts");
const _1 = __webpack_require__("./apps/api/src/modules/project/dto/index.ts");
let ProjectResponse = class ProjectResponse extends (0, relay_types_1.default)(_1.ProjectType) {
};
ProjectResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], ProjectResponse);
exports.ProjectResponse = ProjectResponse;


/***/ }),

/***/ "./apps/api/src/modules/project/dto/update-project.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProjectInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
let UpdateProjectInput = class UpdateProjectInput {
    constructor() {
        this.dropNumber = null;
        this.intercenter = null;
        this.sfm = null;
        this.customerId = null;
        this.factoryId = null;
    }
    format() {
        return Object.assign(Object.assign({}, this), (this.name ? { name: this.name.toUpperCase() } : {}));
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateProjectInput.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateProjectInput.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "sfm", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateProjectInput.prototype, "factoryId", void 0);
UpdateProjectInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateProjectInput);
exports.UpdateProjectInput = UpdateProjectInput;


/***/ }),

/***/ "./apps/api/src/modules/project/entity/project.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = void 0;
const tslib_1 = __webpack_require__("tslib");
const art_entity_1 = __webpack_require__("./apps/api/src/modules/art/entity/art.entity.ts");
const entities_1 = __webpack_require__("./apps/api/src/modules/attribute/entities/index.ts");
const customer_entity_1 = __webpack_require__("./apps/api/src/modules/customer/entities/customer.entity.ts");
const factory_entity_1 = __webpack_require__("./apps/api/src/modules/factory/entities/factory.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let Project = class Project {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Project.prototype, "internal", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Project.prototype, "hasDesignDoc", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "sfm", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "dropNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "intercenter", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => art_entity_1.Art, (art) => art.project),
    (0, tslib_1.__metadata)("design:type", Array)
], Project.prototype, "arts", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "factoryId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Project.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Project.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Project.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.Sfm, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sfm', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof entities_1.Sfm !== "undefined" && entities_1.Sfm) === "function" ? _c : Object)
], Project.prototype, "sfmEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.DropNumber, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'dropNumber', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof entities_1.DropNumber !== "undefined" && entities_1.DropNumber) === "function" ? _d : Object)
], Project.prototype, "dropNumberEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => entities_1.Intercenter, (lookup) => lookup.name, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'intercenter', referencedColumnName: 'name' }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof entities_1.Intercenter !== "undefined" && entities_1.Intercenter) === "function" ? _e : Object)
], Project.prototype, "intercenterEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => factory_entity_1.Factory, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'factoryId', referencedColumnName: 'id' }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof factory_entity_1.Factory !== "undefined" && factory_entity_1.Factory) === "function" ? _f : Object)
], Project.prototype, "factory", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, {
        createForeignKeyConstraints: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'customerId', referencedColumnName: 'id' }),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _g : Object)
], Project.prototype, "customer", void 0);
Project = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Project);
exports.Project = Project;


/***/ }),

/***/ "./apps/api/src/modules/project/loaders/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/project/loaders/project.loader.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/project/loaders/project.loader.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectLoader = void 0;
const tslib_1 = __webpack_require__("tslib");
const services_1 = __webpack_require__("./apps/api/src/modules/art/services/index.ts");
const customer_service_1 = __webpack_require__("./apps/api/src/modules/customer/customer.service.ts");
const factory_service_1 = __webpack_require__("./apps/api/src/modules/factory/factory.service.ts");
const project_service_1 = __webpack_require__("./apps/api/src/modules/project/project.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const DataLoader = __webpack_require__("dataloader");
let ProjectLoader = class ProjectLoader {
    constructor(projectService, artService, customerService, factoryService) {
        this.projectService = projectService;
        this.artService = artService;
        this.customerService = customerService;
        this.factoryService = factoryService;
        this.batchArts = new DataLoader((projectIds) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const projects = yield this.projectService.loadProjectsArts(projectIds);
            const projectsMap = new Map(projects.map((projects) => [projects.id, projects.arts]));
            return projectIds.map((projectId) => projectsMap.get(projectId));
        }));
        this.batchFactories = new DataLoader((factoriesIds) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const factories = yield this.factoryService.getByIds(factoriesIds);
            const factoriesMap = new Map(factories.map((factory) => [factory.id, factory]));
            return factoriesIds.map((factoryId) => factoriesMap.get(factoryId));
        }));
        this.batchCustomers = new DataLoader((customersIds) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customers = yield this.customerService.getByIds(customersIds);
            const customersMap = new Map(customers.map((customer) => [customer.id, customer]));
            return customersIds.map((customerId) => customersMap.get(customerId));
        }));
    }
};
ProjectLoader = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _a : Object, typeof (_b = typeof services_1.ArtService !== "undefined" && services_1.ArtService) === "function" ? _b : Object, typeof (_c = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" ? _c : Object, typeof (_d = typeof factory_service_1.FactoryService !== "undefined" && factory_service_1.FactoryService) === "function" ? _d : Object])
], ProjectLoader);
exports.ProjectLoader = ProjectLoader;


/***/ }),

/***/ "./apps/api/src/modules/project/project.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const art_module_1 = __webpack_require__("./apps/api/src/modules/art/art.module.ts");
const project_entity_1 = __webpack_require__("./apps/api/src/modules/project/entity/project.entity.ts");
const loaders_1 = __webpack_require__("./apps/api/src/modules/project/loaders/index.ts");
const project_resolver_1 = __webpack_require__("./apps/api/src/modules/project/project.resolver.ts");
const project_service_1 = __webpack_require__("./apps/api/src/modules/project/project.service.ts");
const factory_module_1 = __webpack_require__("./apps/api/src/modules/factory/factory.module.ts");
const customer_module_1 = __webpack_require__("./apps/api/src/modules/customer/customer.module.ts");
let ProjectModule = class ProjectModule {
};
ProjectModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => art_module_1.ArtModule),
            (0, common_1.forwardRef)(() => factory_module_1.FactoryModule),
            (0, common_1.forwardRef)(() => customer_module_1.CustomerModule),
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
        ],
        providers: [project_resolver_1.ProjectResolver, project_service_1.ProjectService, loaders_1.ProjectLoader],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;


/***/ }),

/***/ "./apps/api/src/modules/project/project.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const dto_1 = __webpack_require__("./apps/api/src/modules/art/dto/index.ts");
const auth_guard_1 = __webpack_require__("./apps/api/src/modules/auth/auth.guard.ts");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_2 = __webpack_require__("./apps/api/src/modules/customer/dto/index.ts");
const dto_3 = __webpack_require__("./apps/api/src/modules/factory/dto/index.ts");
const dto_4 = __webpack_require__("./apps/api/src/modules/project/dto/index.ts");
const loaders_1 = __webpack_require__("./apps/api/src/modules/project/loaders/index.ts");
const project_service_1 = __webpack_require__("./apps/api/src/modules/project/project.service.ts");
let ProjectResolver = class ProjectResolver {
    constructor(projectService, projectLoader) {
        this.projectService = projectService;
        this.projectLoader = projectLoader;
    }
    project(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.projectService.getProject(id);
        });
    }
    projects(args) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.projectService.getProjects(args);
        });
    }
    getProjectArts(project) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.projectLoader.batchArts.load(project.id);
        });
    }
    getProjectsCustomers({ customerId }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return customerId ? yield this.projectLoader.batchCustomers.load(customerId) : null;
        });
    }
    getProjectsFactories({ factoryId }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return factoryId ? yield this.projectLoader.batchFactories.load(factoryId) : null;
        });
    }
    createProject(createProjectInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.projectService.createProject(createProjectInput);
        });
    }
    updateProject(updateProjectInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.projectService.updateProject(updateProjectInput);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_4.ProjectType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_4.ProjectResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_4.FindProjectArgs !== "undefined" && dto_4.FindProjectArgs) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.ResolveField)('arts', () => [dto_1.ArtType], { nullable: true }),
    (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof dto_4.ProjectType !== "undefined" && dto_4.ProjectType) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectArts", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.ResolveField)('customer', () => dto_2.CustomerType, { nullable: true }),
    (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof dto_4.ProjectType !== "undefined" && dto_4.ProjectType) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectsCustomers", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.ResolveField)('factory', () => dto_3.FactoryType, { nullable: true }),
    (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof dto_4.ProjectType !== "undefined" && dto_4.ProjectType) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectsFactories", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_4.ProjectType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('createProjectInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof dto_4.CreateProjectInput !== "undefined" && dto_4.CreateProjectInput) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_4.ProjectType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('updateProjectInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof dto_4.UpdateProjectInput !== "undefined" && dto_4.UpdateProjectInput) === "function" ? _f : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
ProjectResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => dto_4.ProjectType),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _g : Object, typeof (_h = typeof loaders_1.ProjectLoader !== "undefined" && loaders_1.ProjectLoader) === "function" ? _h : Object])
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;


/***/ }),

/***/ "./apps/api/src/modules/project/project.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectService = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_builder_1 = __webpack_require__("./apps/api/src/shared/utils/query-builder/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const graphql_relay_1 = __webpack_require__("graphql-relay");
const typeorm_2 = __webpack_require__("typeorm");
const project_entity_1 = __webpack_require__("./apps/api/src/modules/project/entity/project.entity.ts");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    getByIds(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.projectRepository.find({
                where: { id: (0, typeorm_2.In)(ids) },
            });
        });
    }
    loadProjectsArts(projectIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.projectRepository.find({
                where: { id: (0, typeorm_2.In)(projectIds) },
                select: ['id'],
                relations: ['arts'],
            });
        });
    }
    getProject(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.projectRepository.findOne({ id });
        });
    }
    getProjects({ filter, order, pagination }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { take = 50, skip = 0 } = pagination.pagingParams();
            const query = (0, query_builder_1.filterQuery)(this.projectRepository.createQueryBuilder('projects'), 'projects', filter, [])
                .skip(skip)
                .take(take);
            const count = yield query.getCount();
            // orderQuery(query, { ...order });
            query.orderBy('projects.name', 'ASC');
            const projects = yield query.getMany();
            const page = (0, graphql_relay_1.connectionFromArraySlice)(projects, pagination, {
                arrayLength: count,
                sliceStart: skip || 0,
            });
            return { page, pageData: { count, take, skip } };
        });
    }
    createProject(createProjectInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const project = this.projectRepository.create(Object.assign({}, createProjectInput));
            return yield this.projectRepository.save(project);
        });
    }
    updateProject(updateProjectInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const _a = updateProjectInput.format(), { id } = _a, updateInput = (0, tslib_1.__rest)(_a, ["id"]);
            const project = yield this.projectRepository.findOneOrFail({ id });
            Object.assign(project, Object.assign({}, updateInput));
            return yield this.projectRepository.save(project);
        });
    }
};
ProjectService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProjectService);
exports.ProjectService = ProjectService;


/***/ }),

/***/ "./apps/api/src/modules/user/dto/create-user.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
const role_enum_1 = __webpack_require__("./apps/api/src/modules/user/role.enum.ts");
let CreateUserInput = class CreateUserInput {
    constructor() {
        this.role = role_enum_1.Role.USER;
        this.active = true;
    }
    format() {
        return Object.assign(Object.assign({}, this), { username: this.username.toUpperCase(), fullName: this.fullName
                .split(' ')
                .map((part) => part[0].toUpperCase() + part.slice(1))
                .join(' ') });
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserInput.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({}),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserInput.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => role_enum_1.Role, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof role_enum_1.Role !== "undefined" && role_enum_1.Role) === "function" ? _a : Object)
], CreateUserInput.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Object)
], CreateUserInput.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;


/***/ }),

/***/ "./apps/api/src/modules/user/dto/find-users.args.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserFilterQuery_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindUsersArgs = exports.UserOrderQuery = exports.UserFilterQuery = void 0;
const tslib_1 = __webpack_require__("tslib");
const connection_args_type_1 = __webpack_require__("./apps/api/src/common/connection-args.type.ts");
const filter_input_type_1 = __webpack_require__("./apps/api/src/common/filter-input.type.ts");
const types_1 = __webpack_require__("./apps/api/src/shared/types/index.ts");
const order_1 = __webpack_require__("./apps/api/src/shared/types/order.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_transformer_1 = __webpack_require__("class-transformer");
let UserFilterQuery = UserFilterQuery_1 = class UserFilterQuery {
};
_a = types_1.LogicalOperator.AND, _b = types_1.LogicalOperator.OR;
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [UserFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserFilterQuery.prototype, _a, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => [UserFilterQuery_1], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserFilterQuery.prototype, _b, void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _c : Object)
], UserFilterQuery.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _d : Object)
], UserFilterQuery.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _e : Object)
], UserFilterQuery.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.StringFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof filter_input_type_1.StringFieldOption !== "undefined" && filter_input_type_1.StringFieldOption) === "function" ? _f : Object)
], UserFilterQuery.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => filter_input_type_1.BooleanFieldOption, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof filter_input_type_1.BooleanFieldOption !== "undefined" && filter_input_type_1.BooleanFieldOption) === "function" ? _g : Object)
], UserFilterQuery.prototype, "active", void 0);
UserFilterQuery = UserFilterQuery_1 = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UserFilterQuery);
exports.UserFilterQuery = UserFilterQuery;
let UserOrderQuery = class UserOrderQuery {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_h = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _h : Object)
], UserOrderQuery.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_j = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _j : Object)
], UserOrderQuery.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_k = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _k : Object)
], UserOrderQuery.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_l = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _l : Object)
], UserOrderQuery.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => order_1.OrderDirection, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_m = typeof order_1.OrderDirection !== "undefined" && order_1.OrderDirection) === "function" ? _m : Object)
], UserOrderQuery.prototype, "id", void 0);
UserOrderQuery = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UserOrderQuery);
exports.UserOrderQuery = UserOrderQuery;
let FindUsersArgs = class FindUsersArgs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => UserFilterQuery, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", UserFilterQuery)
], FindUsersArgs.prototype, "filter", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => connection_args_type_1.default, { nullable: true, defaultValue: {} }),
    (0, class_transformer_1.Type)(() => connection_args_type_1.default),
    (0, tslib_1.__metadata)("design:type", typeof (_o = typeof connection_args_type_1.default !== "undefined" && connection_args_type_1.default) === "function" ? _o : Object)
], FindUsersArgs.prototype, "pagination", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => UserOrderQuery, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", UserOrderQuery)
], FindUsersArgs.prototype, "order", void 0);
FindUsersArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], FindUsersArgs);
exports.FindUsersArgs = FindUsersArgs;


/***/ }),

/***/ "./apps/api/src/modules/user/dto/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/dto/create-user.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/dto/find-users.args.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/dto/update-user.input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/dto/user.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/dto/users.response.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/user/dto/update-user.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const class_validator_1 = __webpack_require__("class-validator");
const role_enum_1 = __webpack_require__("./apps/api/src/modules/user/role.enum.ts");
let UpdateUserInput = class UpdateUserInput {
    format() {
        return Object.assign(Object.assign({}, this), (this.fullName
            ? {
                fullName: this.fullName
                    .split(' ')
                    .map((part) => part[0].toUpperCase() + part.slice(1))
                    .join(' '),
            }
            : {}));
    }
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserInput.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserInput.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEnum)(role_enum_1.Role),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => role_enum_1.Role, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof role_enum_1.Role !== "undefined" && role_enum_1.Role) === "function" ? _a : Object)
], UpdateUserInput.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUserInput.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
UpdateUserInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;


/***/ }),

/***/ "./apps/api/src/modules/user/dto/user.type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const role_enum_1 = __webpack_require__("./apps/api/src/modules/user/role.enum.ts");
let UserType = class UserType {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UserType.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UserType.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UserType.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => role_enum_1.Role),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof role_enum_1.Role !== "undefined" && role_enum_1.Role) === "function" ? _a : Object)
], UserType.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Boolean),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserType.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserType.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => Date),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserType.prototype, "updatedAt", void 0);
UserType = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('User')
], UserType);
exports.UserType = UserType;


/***/ }),

/***/ "./apps/api/src/modules/user/dto/users.response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const relay_types_1 = __webpack_require__("./apps/api/src/common/relay.types.ts");
const _1 = __webpack_require__("./apps/api/src/modules/user/dto/index.ts");
let UserResponse = class UserResponse extends (0, relay_types_1.default)(_1.UserType) {
};
UserResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;


/***/ }),

/***/ "./apps/api/src/modules/user/entity/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const role_enum_1 = __webpack_require__("./apps/api/src/modules/user/role.enum.ts");
let User = class User {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "fullName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof role_enum_1.Role !== "undefined" && role_enum_1.Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true, type: 'boolean' }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], User.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
User = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;


/***/ }),

/***/ "./apps/api/src/modules/user/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/modules/user/user.module.ts"), exports);


/***/ }),

/***/ "./apps/api/src/modules/user/role.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role = exports.Role || (exports.Role = {}));
(0, graphql_1.registerEnumType)(Role, {
    name: 'Role',
    valuesMap: {
        ADMIN: { description: 'Administrator Role' },
        USER: { description: 'Simple user role' },
    },
});


/***/ }),

/***/ "./apps/api/src/modules/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const auth_1 = __webpack_require__("./apps/api/src/modules/auth/index.ts");
const user_entity_1 = __webpack_require__("./apps/api/src/modules/user/entity/user.entity.ts");
const user_resolver_1 = __webpack_require__("./apps/api/src/modules/user/user.resolver.ts");
const user_service_1 = __webpack_require__("./apps/api/src/modules/user/user.service.ts");
let UserModule = class UserModule {
};
UserModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_1.AuthModule), typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        providers: [user_resolver_1.UserResolver, user_service_1.UserService],
        exports: [user_service_1.UserService, typeorm_1.TypeOrmModule],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./apps/api/src/modules/user/user.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const dto_1 = __webpack_require__("./apps/api/src/modules/user/dto/index.ts");
const user_service_1 = __webpack_require__("./apps/api/src/modules/user/user.service.ts");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    user(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.userService.getUser(id);
        });
    }
    users(args) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.getUsers(args);
        });
    }
    createUser(createUserInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.userService.createUser(createUserInput);
        });
    }
    updateUser(updateUserInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.userService.updateUser(updateUserInput);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.UserType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "user", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => dto_1.UserResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof dto_1.FindUsersArgs !== "undefined" && dto_1.FindUsersArgs) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "users", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.UserType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('createUserInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof dto_1.CreateUserInput !== "undefined" && dto_1.CreateUserInput) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => dto_1.UserType),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('updateUserInput')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof dto_1.UpdateUserInput !== "undefined" && dto_1.UpdateUserInput) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => dto_1.UserType),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object])
], UserResolver);
exports.UserResolver = UserResolver;


/***/ }),

/***/ "./apps/api/src/modules/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const graphql_relay_1 = __webpack_require__("graphql-relay");
const service_1 = __webpack_require__("./apps/api/src/modules/auth/service/index.ts");
const query_builder_1 = __webpack_require__("./apps/api/src/shared/utils/query-builder/index.ts");
const typeorm_2 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./apps/api/src/modules/user/entity/user.entity.ts");
let UserService = class UserService {
    constructor(userRepository, passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    getUser(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userRepository.findOneOrFail({ id });
        });
    }
    getUsers({ filter, pagination, order }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const query = (0, query_builder_1.filterQuery)(this.userRepository.createQueryBuilder('users'), 'users', filter);
            const { take = 50, skip = 0 } = pagination.pagingParams();
            query.skip(skip);
            query.take(take);
            query.orderBy('users.username', 'ASC');
            // orderQuery(query, { ...order });
            const [users, count] = yield query.getManyAndCount();
            const page = (0, graphql_relay_1.connectionFromArraySlice)(users, pagination, {
                arrayLength: count,
                sliceStart: skip || 0,
            });
            return { page, pageData: { count, take, skip } };
        });
    }
    createUser(createUserInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { active, fullName, password, role, username } = createUserInput.format();
            const user = this.userRepository.create({
                username,
                active,
                fullName,
                role,
                password: yield this.passwordService.hash(password),
            });
            return yield this.userRepository.save(user);
        });
    }
    updateUser(updateUserInput) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const _a = updateUserInput.format(), { id, password } = _a, updateInput = (0, tslib_1.__rest)(_a, ["id", "password"]);
            const user = yield this.userRepository.findOneOrFail({ id });
            Object.assign(user, Object.assign(Object.assign({}, updateInput), (password ? { password: yield this.passwordService.hash(password) } : {})));
            return yield this.userRepository.save(user);
        });
    }
};
UserService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof service_1.PasswordService !== "undefined" && service_1.PasswordService) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/api/src/shared/decorators/match.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotMatchConstraint = exports.NotMatch = exports.MatchConstraint = exports.Match = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const Match = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
};
exports.Match = Match;
let MatchConstraint = class MatchConstraint {
    validate(value, args) {
        const [fn] = args.constraints;
        return fn(args.object) === value;
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `${constraintProperty} and ${args.property} does not match`;
    }
};
MatchConstraint = (0, tslib_1.__decorate)([
    (0, class_validator_1.ValidatorConstraint)({ name: 'Match' })
], MatchConstraint);
exports.MatchConstraint = MatchConstraint;
const NotMatch = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: NotMatchConstraint,
        });
    };
};
exports.NotMatch = NotMatch;
let NotMatchConstraint = class NotMatchConstraint {
    validate(value, args) {
        const [fn] = args.constraints;
        return fn(args.object) !== value;
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `${constraintProperty} and ${args.property} shoud not match`;
    }
};
NotMatchConstraint = (0, tslib_1.__decorate)([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NotMatch' })
], NotMatchConstraint);
exports.NotMatchConstraint = NotMatchConstraint;


/***/ }),

/***/ "./apps/api/src/shared/filters/constraint-errors.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstraintErrors = void 0;
exports.ConstraintErrors = {
    UQ_78a916df40e02a9deb1c4b75edb: 'Пользователь с таким логином уже существует!',
    UQ_dedfea394088ed136ddadeee89c: 'Проект с таким названием уже существует!',
    FK_a0407fa48bcabe7abe1bbf67f5a: 'Завод не найден!',
    FK_b76640329fa79f0b0e9d031c35b: 'Завод не найден!',
    FK_a31d1c8bf3a42d68e8ef6d0fa1f: 'Неизвестное значение для СФМ!',
    FK_cb4a5f99ab1f14d8915c6408755: 'Неизвестное значение для кол-ва капель!',
    FK_da28e57152690879fc4ed33a0dc: 'Неизвестное значение для межцентрового!',
    UQ_b79244653524aa4498d1991b2f7: 'ART с таким названием уже существует!',
    FK_080ea27feb10895781f4f7b9a42: 'Неизвестное значение для вида продукта!',
    FK_13a46770aec2f6b468c545df28d: 'Неизвестное значение для высоты!',
    FK_4fcd0b5c2fac549fa1a77d8071f: 'Неизвестное значение для класса ART-а!',
    FK_8b11945309959c67c52c107b8b5: 'Неизвестное значение для метода производства!',
    FK_90aaa74c0e36383a74cd91381c8: 'Неизвестное значение для номинального объёма!',
    FK_a1991f9684ec12aac103e90a6f9: 'Неизвестное значение для формы ART-а!',
    FK_acc98fcdb14f9aa2068497dfe2c: 'Неизвестное значение для типа венчика!',
    FK_b9015a2bba4142487c8df44187b: 'Неизвестное значение для формы дна!',
    FK_b1f943542bccfc6de53342fa2e1: 'Проект не найден!',
    UQ_aa5d056bdebd2f62b83fcd9f018: 'Завод с таким названием уже существует!',
    UQ_ac1455877a69957f7466d5dc78e: 'Заказчик с таким названием уже существует!',
};


/***/ }),

/***/ "./apps/api/src/shared/filters/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/filters/query-failed.filter.ts"), exports);


/***/ }),

/***/ "./apps/api/src/shared/filters/query-failed.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var QueryFailedFilter_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryFailedFilter = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const typeorm_1 = __webpack_require__("typeorm");
const constraint_errors_1 = __webpack_require__("./apps/api/src/shared/filters/constraint-errors.ts");
let QueryFailedFilter = QueryFailedFilter_1 = class QueryFailedFilter {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(QueryFailedFilter_1.name);
    }
    catch(exception, host) {
        const gqlHost = graphql_1.GqlArgumentsHost.create(host);
        this.logger.error(exception.message, exception.stack);
        const errorMessage = constraint_errors_1.ConstraintErrors[exception.constraint];
        const status = exception.constraint &&
            (exception.constraint.startsWith('UQ') || exception.constraint.startsWith('FK'))
            ? common_1.HttpStatus.CONFLICT
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        return new common_1.HttpException(errorMessage || exception.message, status);
    }
};
QueryFailedFilter = QueryFailedFilter_1 = (0, tslib_1.__decorate)([
    (0, common_1.Catch)(typeorm_1.QueryFailedError),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], QueryFailedFilter);
exports.QueryFailedFilter = QueryFailedFilter;


/***/ }),

/***/ "./apps/api/src/shared/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/shared.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/services/api-config.service.ts"), exports);


/***/ }),

/***/ "./apps/api/src/shared/logger/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/logger/logger.constants.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/logger/logger.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/logger/logger.service.ts"), exports);


/***/ }),

/***/ "./apps/api/src/shared/logger/logger.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ASYNC_STORAGE = void 0;
exports.ASYNC_STORAGE = Symbol('async_storage');


/***/ }),

/***/ "./apps/api/src/shared/logger/logger.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const async_hooks_1 = __webpack_require__("async_hooks");
const logger_constants_1 = __webpack_require__("./apps/api/src/shared/logger/logger.constants.ts");
const logger_service_1 = __webpack_require__("./apps/api/src/shared/logger/logger.service.ts");
const asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
let LoggerModule = class LoggerModule {
};
LoggerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [
            logger_service_1.LoggerService,
            {
                provide: logger_constants_1.ASYNC_STORAGE,
                useValue: asyncLocalStorage,
            },
        ],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;


/***/ }),

/***/ "./apps/api/src/shared/logger/logger.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = exports.logger = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const async_hooks_1 = __webpack_require__("async_hooks");
const __1 = __webpack_require__("./apps/api/src/shared/index.ts");
const logger_constants_1 = __webpack_require__("./apps/api/src/shared/logger/logger.constants.ts");
const winstonLogger = __webpack_require__("winston");
const nest_winston_1 = __webpack_require__("nest-winston");
__webpack_require__("winston-daily-rotate-file");
const format = winstonLogger.format.combine(winstonLogger.format.timestamp({ format: () => new Date().toLocaleString() }), winstonLogger.format.ms());
const consoleTransport = new winstonLogger.transports.Console({
    format: winstonLogger.format.combine(format, nest_winston_1.utilities.format.nestLike('ARTsApplication', { prettyPrint: true })),
});
const fileTransport = new winstonLogger.transports.DailyRotateFile({
    filename: './logs/arts-application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    format: winstonLogger.format.combine(format, winstonLogger.format.json()),
});
exports.logger = winstonLogger.createLogger({
    transports: [consoleTransport, fileTransport],
});
let LoggerService = class LoggerService {
    constructor(asyncStorage, config) {
        this.asyncStorage = asyncStorage;
        this.config = config;
        exports.logger.level = this.config.isProduction ? 'info' : 'debug';
        const metaExtractor = winstonLogger.format((info) => {
            const store = this.asyncStorage.getStore();
            if (store) {
                const traceId = store === null || store === void 0 ? void 0 : store.get('traceId');
                const userId = store === null || store === void 0 ? void 0 : store.get('userId');
                info.traceId = traceId;
                info.userId = userId;
            }
            return info;
        });
        [consoleTransport, fileTransport].forEach((transport) => {
            transport.format = winstonLogger.format.combine(metaExtractor(), transport.format);
        });
    }
    getMessage(message, context) {
        return context ? `[ ${context} ] ${message}` : message;
    }
    winstonError(message, trace, context) {
        const logMessage = this.getMessage(message, context);
        exports.logger.error(logMessage);
        if (trace) {
            exports.logger.error(trace);
        }
    }
    winstonLog(message, context) {
        const logMessage = this.getMessage(message, context);
        exports.logger.info(logMessage);
    }
    winstonWarn(message, context) {
        const logMessage = this.getMessage(message, context);
        exports.logger.warn(logMessage);
    }
    winstonDebug(message, context) {
        const logMessage = this.getMessage(message, context);
        exports.logger.debug(logMessage);
    }
    error(message, trace, context) {
        this.winstonError(message, trace, context);
    }
    log(message, context) {
        this.winstonLog(message, context);
    }
    warn(message, context) {
        this.winstonWarn(message, context);
    }
    debug(message, context) {
        this.winstonDebug(message, context);
    }
};
LoggerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(logger_constants_1.ASYNC_STORAGE)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof async_hooks_1.AsyncLocalStorage !== "undefined" && async_hooks_1.AsyncLocalStorage) === "function" ? _a : Object, typeof (_b = typeof __1.ApiConfigService !== "undefined" && __1.ApiConfigService) === "function" ? _b : Object])
], LoggerService);
exports.LoggerService = LoggerService;


/***/ }),

/***/ "./apps/api/src/shared/scalar/date.scalar.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateScalar = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const graphql_2 = __webpack_require__("graphql");
let DateScalar = class DateScalar {
    constructor() {
        this.description = 'Date custom scalar type';
    }
    parseValue(value) {
        return new Date(value); // value from the client
    }
    serialize(value) {
        return value.getTime(); // value sent to the client
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
};
DateScalar = (0, tslib_1.__decorate)([
    (0, graphql_1.Scalar)('Date', () => Date)
], DateScalar);
exports.DateScalar = DateScalar;


/***/ }),

/***/ "./apps/api/src/shared/services/api-config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const path_1 = __webpack_require__("path");
let ApiConfigService = class ApiConfigService {
    constructor(config) {
        this.config = config;
    }
    get fileStoragePath() {
        return this.getString('FILE_STORAGE_PATH');
    }
    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
    get isTest() {
        return this.nodeEnv === 'test';
    }
    get nodeEnv() {
        return this.config.get('NODE_ENV') || 'development';
    }
    getNumber(key) {
        const value = this.get(key);
        try {
            return Number(value);
        }
        catch (_a) {
            throw new Error(key + ' environment variable is not a number');
        }
    }
    getBoolean(key) {
        const value = this.get(key);
        try {
            return Boolean(JSON.parse(value));
        }
        catch (_a) {
            throw new Error(key + ' env var is not a boolean');
        }
    }
    getString(key) {
        const value = this.get(key);
        return value.replace(/\\n/g, '\n');
    }
    get graphQLConfig() {
        return {
            debug: !this.isProduction,
            playground: this.isProduction
                ? false
                : {
                    settings: {
                        'request.credentials': 'same-origin',
                    },
                },
            autoSchemaFile: (0, path_1.join)(process.cwd(), 'apps/api/src/schema.gql'),
            context: ({ req, res }) => ({
                httpContext: { req, res },
                session: req.session,
                currentUserId: req.session.userId,
            }),
            formatError: (error) => {
                var _a;
                const { message, statusCode } = ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.response) || {
                    message: null,
                    statusCode: null,
                };
                const graphQLFormattedError = Object.assign({ message: message || error.message }, (statusCode && { status: statusCode }));
                return graphQLFormattedError;
            },
        };
    }
    get(key) {
        const value = this.config.get(key);
        if (value === undefined || value === null) {
            // probably we should call process.exit() too to avoid locking the service
            throw new Error(key + ' environment variable does not set');
        }
        return value;
    }
};
ApiConfigService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ApiConfigService);
exports.ApiConfigService = ApiConfigService;


/***/ }),

/***/ "./apps/api/src/shared/shared.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const date_scalar_1 = __webpack_require__("./apps/api/src/shared/scalar/date.scalar.ts");
const api_config_service_1 = __webpack_require__("./apps/api/src/shared/services/api-config.service.ts");
let SharedModule = class SharedModule {
};
SharedModule = (0, tslib_1.__decorate)([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [date_scalar_1.DateScalar, api_config_service_1.ApiConfigService],
        exports: [date_scalar_1.DateScalar, api_config_service_1.ApiConfigService],
    })
], SharedModule);
exports.SharedModule = SharedModule;


/***/ }),

/***/ "./apps/api/src/shared/types/context.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/api/src/shared/types/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/types/operator.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/types/order.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./apps/api/src/shared/types/context.ts"), exports);


/***/ }),

/***/ "./apps/api/src/shared/types/operator.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogicalOperator = void 0;
var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "AND";
    LogicalOperator["OR"] = "OR";
})(LogicalOperator = exports.LogicalOperator || (exports.LogicalOperator = {}));


/***/ }),

/***/ "./apps/api/src/shared/types/order.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDirection = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["ASC"] = "ASC";
    OrderDirection["DESC"] = "DESC";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
(0, graphql_1.registerEnumType)(OrderDirection, {
    name: 'OrderDirection',
    valuesMap: { ASC: { description: 'Ascending' }, DESC: { description: 'Descending' } },
});


/***/ }),

/***/ "./apps/api/src/shared/utils/query-builder/filter-builder.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterQuery = void 0;
const types_1 = __webpack_require__("./apps/api/src/shared/types/index.ts");
const typeorm_1 = __webpack_require__("typeorm");
const filterQuery = (query, alias, where, relations = []) => {
    if (!where) {
        return query;
    }
    else {
        Object.keys(where).forEach((key) => {
            if (relations.includes(key)) {
                const wherePart = where[key];
                delete where[key];
                query = (0, exports.filterQuery)(query.leftJoin(`${query.alias}.${key}`, key), key, wherePart);
            }
        });
        return traverseTree(query, alias, where);
    }
};
exports.filterQuery = filterQuery;
const traverseTree = (query, alias, where, upperOperator = types_1.LogicalOperator.AND) => {
    Object.keys(where).forEach((key) => {
        if (key === types_1.LogicalOperator.OR) {
            query = query.orWhere(buildNewBrackets(where, alias, types_1.LogicalOperator.OR));
        }
        else if (key === types_1.LogicalOperator.AND) {
            query = query.andWhere(buildNewBrackets(where, alias, types_1.LogicalOperator.AND));
        }
        else {
            query = handleArgs(query, alias, { [key]: where[key] }, upperOperator === types_1.LogicalOperator.AND ? 'andWhere' : 'orWhere');
        }
    });
    return query;
};
const buildNewBrackets = (where, alias, operator) => {
    return new typeorm_1.Brackets((qb) => where[operator].map((queryArray) => {
        traverseTree(qb, alias, queryArray, operator);
    }));
};
const handleArgs = (query, alias, where, andOr) => {
    const whereArgs = Object.entries(where);
    whereArgs.forEach((whereArg) => {
        const [fieldName, filters] = whereArg;
        const ops = Object.entries(filters);
        let i = 1;
        ops.forEach((parameters) => {
            const [operation, value] = parameters;
            const paramName = `${alias}${fieldName}${operation}Param${i++}`;
            switch (operation) {
                case 'is': {
                    query[andOr](`${alias}."${fieldName}" = :${paramName} `, { [paramName]: value });
                    break;
                }
                case 'not': {
                    query[andOr](`${alias}."${fieldName}" != :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'in': {
                    query[andOr](`${alias}."${fieldName}" IN (:...${paramName})`, { [paramName]: value });
                    break;
                }
                case 'notIn': {
                    query[andOr](`${alias}."${fieldName}" NOT IN (:...${paramName})`, {
                        [paramName]: value,
                    });
                    break;
                }
                case 'lt': {
                    query[andOr](`${alias}."${fieldName}" < :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'lte': {
                    query[andOr](`${alias}."${fieldName}" <= :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'gt': {
                    query[andOr](`${alias}."${fieldName}" > :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'gte': {
                    query[andOr](`${alias}."${fieldName}" >= :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'contains': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}%`,
                    });
                    break;
                }
                case 'notContains': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :${paramName}`, {
                        [paramName]: `%${value}%`,
                    });
                    break;
                }
                case 'startsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `${value}%`,
                    });
                    break;
                }
                case 'notStartsWith': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :${paramName}`, {
                        [paramName]: `${value}%`,
                    });
                    break;
                }
                case 'endsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}`,
                    });
                    break;
                }
                case 'notEndsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}`,
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        });
    });
    return query;
};


/***/ }),

/***/ "./apps/api/src/shared/utils/query-builder/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.orderQuery = exports.filterQuery = void 0;
var filter_builder_1 = __webpack_require__("./apps/api/src/shared/utils/query-builder/filter-builder.ts");
Object.defineProperty(exports, "filterQuery", ({ enumerable: true, get: function () { return filter_builder_1.filterQuery; } }));
var order_builder_1 = __webpack_require__("./apps/api/src/shared/utils/query-builder/order-builder.ts");
Object.defineProperty(exports, "orderQuery", ({ enumerable: true, get: function () { return order_builder_1.orderQuery; } }));


/***/ }),

/***/ "./apps/api/src/shared/utils/query-builder/order-builder.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.orderQuery = void 0;
const orderQuery = (query, order) => {
    Object.entries(order).forEach(([orderField, direction]) => {
        query.addOrderBy(`"${orderField}"`, direction);
    });
};
exports.orderQuery = orderQuery;


/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "connect-pg-simple":
/***/ ((module) => {

module.exports = require("connect-pg-simple");

/***/ }),

/***/ "dataloader":
/***/ ((module) => {

module.exports = require("dataloader");

/***/ }),

/***/ "express-session":
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "graphql":
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-relay":
/***/ ((module) => {

module.exports = require("graphql-relay");

/***/ }),

/***/ "jimp":
/***/ ((module) => {

module.exports = require("jimp");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "nest-winston":
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),

/***/ "node-poppler":
/***/ ((module) => {

module.exports = require("node-poppler");

/***/ }),

/***/ "pg":
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm-logger-adaptor/logger/winston":
/***/ ((module) => {

module.exports = require("typeorm-logger-adaptor/logger/winston");

/***/ }),

/***/ "typeorm-transactional-cls-hooked":
/***/ ((module) => {

module.exports = require("typeorm-transactional-cls-hooked");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "winston":
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "winston-daily-rotate-file":
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),

/***/ "async_hooks":
/***/ ((module) => {

module.exports = require("async_hooks");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const shared_1 = __webpack_require__("./apps/api/src/shared/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const pgSession = __webpack_require__("connect-pg-simple");
const session = __webpack_require__("express-session");
const pg_1 = __webpack_require__("pg");
const typeorm_transactional_cls_hooked_1 = __webpack_require__("typeorm-transactional-cls-hooked");
const uuid_1 = __webpack_require__("uuid");
const filters_1 = __webpack_require__("./apps/api/src/shared/filters/index.ts");
const logger_1 = __webpack_require__("./apps/api/src/shared/logger/index.ts");
const PGSession = pgSession(session);
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        (0, typeorm_transactional_cls_hooked_1.initializeTransactionalContext)();
        (0, typeorm_transactional_cls_hooked_1.patchTypeORMRepositoryWithBaseRepository)();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            bufferLogs: true,
        });
        const apiConfig = app.get(shared_1.ApiConfigService);
        const port = process.env.PORT || 3333;
        const reflector = app.get(core_1.Reflector);
        const pool = new pg_1.Pool({
            connectionString: apiConfig.get('DATABASE_URL'),
            min: 2,
            max: 5,
        });
        const logger = app.get(logger_1.LoggerService);
        app.use(session({
            name: 'aa_sid',
            secret: 'super_session_secret',
            genid: () => (0, uuid_1.v4)(),
            saveUninitialized: false,
            resave: false,
            cookie: { maxAge: 86400000, domain: 'localhost', path: '/' },
            store: new PGSession({
                pool,
                pruneSessionInterval: 60,
                tableName: 'session',
            }),
        }));
        app.use((req, res, next) => {
            var _a;
            const asyncStorage = app.get(logger_1.ASYNC_STORAGE);
            const traceId = req.headers['x-request-id'] || (0, uuid_1.v4)();
            const store = new Map().set('traceId', traceId).set('userId', (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId);
            asyncStorage.run(store, () => {
                next();
            });
        });
        app.useLogger(logger);
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
        app.useGlobalFilters(/* new HttpExceptionFilter(reflector), */ new filters_1.QueryFailedFilter(reflector));
        app.disable('x-powered-by');
        yield app.listen(port);
        logger.log(`Application is running on: http://localhost:${port}`, 'MAIN');
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map