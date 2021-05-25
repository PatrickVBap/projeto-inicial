export interface IDadosDia {
    id: number;
    data: any;
    dataNumber: number;
    dadosDoDia: number[];
    mediaDoDia: number;
}

export class DadosDia implements IDadosDia {
    id: number;
    data: any;
    dataNumber: number;
    dadosDoDia: number[];
    mediaDoDia: number;

    public static fromResource(resource: IDadosDia): IDadosDia{
        const dadosDoDia = new DadosDia();
        dadosDoDia.id = resource.id;
        dadosDoDia.data = resource.data;
        dadosDoDia.dataNumber = resource.dataNumber;
        dadosDoDia.dadosDoDia = resource.dadosDoDia;
        dadosDoDia.mediaDoDia = resource.mediaDoDia;
        return dadosDoDia;
    }

    public static ofEmpty(): IDadosDia{
        const dadosDoDia = new DadosDia();
        dadosDoDia.id = 0;
        dadosDoDia.data = new Date();
        dadosDoDia.dataNumber = 0;
        dadosDoDia.dadosDoDia = [];
        dadosDoDia.mediaDoDia = 0;
        return dadosDoDia;
    }
}