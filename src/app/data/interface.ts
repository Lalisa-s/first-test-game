interface Weapon {
    name: string;
    img: string;
    bool: boolean;
    distanсe: number;
    hit: number;
    rollback: number;
}

interface Potion {
    name: string;
    img: string;
    health: number;
    damage: number;
    speed: number;
    rollback: number
}

interface Progress {
    floor: number;
    room: number;
}

interface World {
    name: string;
    progress: Progress;
    bool: boolean;
    inventory: string[];
    money: number;
    hp: number;
    enemy: number;
    dealer: boolean;
    boss: boolean;
}

interface User {
    name: string;
    pasword: string;
    worlds: World[];
    weapons: Weapon[];
}

interface StatUsers {
    name: string;
    progress: Progress
}

interface Mes {
    mess: string,
    author: string
}

interface Rect {
    x: number,
    y: number,
    side: number,
    speed: number
}

interface Enemy {
    x: number,
    y: number,
    speed: number,
    hunting: boolean,
    hp: number,
    radius: number,
    color: string,
    target: {
        x: number,
        y: number,
        radius: number
    }
}

export type { Weapon, Potion, World, User, Mes, StatUsers, Rect, Enemy }