import { Weapon } from "./interface"

const weapons : Weapon[] = [
    {
        name: "start weapon",
        img: "/weapon/w1.png",
        distanсe: 50,
        hit: 10,
        rollback: 400,
        bool: true
    },
    {
        name: "criper",
        img: "/weapon/mncrft.png",
        distanсe: 75,
        hit: 20,
        rollback: 700,
        bool: false
    },
    {
        name: "knife",
        img: "/weapon/knife.png",
        distanсe: 30,
        hit: 10,
        rollback: 250,
        bool: false
    },
    {
        name: "bow",
        img: "/weapon/bow.png",
        distanсe: 120,
        hit: 10,
        rollback: 500,
        bool: false
    },
    {
        name: "dasha puteshestvennica",
        img: "/weapon/dashaKnife.png",
        distanсe: 20,
        hit: 10,
        rollback: 700,
        bool: false
    },
]

function new_weapon(str: string) {
    for (let i = 0; i < weapons.length; i++) {
        if(weapons[i].name == str){
            weapons[i].bool = true
        }
    }
}
export { weapons}