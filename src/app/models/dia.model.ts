export interface IDia {
    data: string;
}

export class Dia {
    data: string;

    public static fromResource(resource: IDia): IDia{
        const dia = new Dia();
        dia.data = resource.data;
        return dia;
    }

    public static ofEmpty(): IDia{
        const dia = new Dia();
        dia.data = '';
        return dia;
    }

}
