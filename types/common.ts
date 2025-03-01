export interface ItemsList {
    id: number;
    name: string;
    codeName: string;
    description: string;
    example?: string;
    image?: string;
    background?: Background;
    characteristics?: Characteristic;
}

export interface Background {
    name: string;
    codeName: string;
    description: string;
    image: string;
}

export interface Characteristic {
    title: string;
    masteryBonus: number;
    common: CommonStats;
    savingThrows: SavingThrows;
    personalSkills: Skill[];
    armorClass: ArmorClass;
    speed: string;
    hitPoints: number;
    initiative: number;
    weapon: Weapon;
}

export interface CommonStats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface SavingThrows {
    strength?: boolean;
    dexterity?: boolean;
    constitution?: boolean;
    intelligence?: boolean;
    wisdom?: boolean;
    charisma?: boolean;
}

export interface Skill {
    name: string;
    codeName: string;
    modifier: string;
}

export interface ArmorClass {
    name: string;
    value: number;
}

export interface Weapon {
    name: string;
    attack: string;
    damage: string;
}