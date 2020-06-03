export interface QueryPayloadInput {
    order?: OrderPayloadInput
}

type OrderByDirection = 'desc' | 'asc';

export interface OrderPayloadInput {
    direction: OrderByDirection;
    fieldName: string;
}