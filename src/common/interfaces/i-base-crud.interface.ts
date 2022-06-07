export interface IBaseCrud {
    findAll(): Promise<Array<Object>>;
    findOne(options: object): Promise<Object | null>;
    create(entity: Object): Promise<Object>;
    update(id: number, newValue: Object): Promise<Object | null>;
    delete(id: number): Promise<void | null>;
}