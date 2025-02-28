export interface Races {
    id: number;
    name: string;
    codeName: string;
    description: string;
    image: string;
}

export interface Classes {
    id: number;
    name: string;
    codeName: string;
    example: string;
    description: string;
    image: string;
    background: Background[];
}

export interface Background {
    name: string;
    codeName: string;
    description: string;
    image: string;
}

export interface Worldview {
    id: number;
    title: string;
    description: string;
}