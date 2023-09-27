export class CreateBillDto {
    readonly number: number;
    readonly customer: string;
    readonly price: number[];
}
