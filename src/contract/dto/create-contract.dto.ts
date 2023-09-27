import { ApiProperty } from "@nestjs/swagger";

export class CreateContractDto {

    @ApiProperty()
    readonly number: string;

    @ApiProperty({example: "01.01.2023"})
    readonly date: string;

    @ApiProperty()
    readonly company: string;

    @ApiProperty()
    readonly signer: string;

    @ApiProperty()
    readonly bin: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly iik: string;

    @ApiProperty()
    readonly bank: string;

    @ApiProperty()
    readonly bik: string;

    @ApiProperty({example: "01.01.2023"})
    readonly begin: string;

    @ApiProperty({example: "31.12.2023"})
    readonly end: string;

    @ApiProperty({example: 350_000})
    readonly sum: number;

    @ApiProperty()
    readonly project: string;
}
