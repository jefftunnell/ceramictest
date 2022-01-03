export class EquipmentItemInfo {
    version: number = 0;
    typeName: string = "";
    name: string = "";
	amount:number=0;
    url!: string;

    constructor(version?: number, name?: string, url?: string) {
        version = version;
        name = name;
        url = url;
    }
}


const weapons =[
	"Warhammer",    // 0
	"Quarterstaff", // 1
	"Maul",         // 2
	"Mace",         // 3
	"Club",         // 4
	"Katana",       // 5
	"Falchion",     // 6
	"Scimitar",     // 7
	"Long Sword",   // 8
	"Short Sword",  // 9
	"Ghost Wand",   // 10
	"Grave Wand",   // 11
	"Bone Wand",    // 12
	"Wand",         // 13
	"Grimoire",     // 14
	"Chronicle",    // 15
	"Tome",         // 16
	"Book",         // 17
]

const chestArmor = [
	"Divine Robe",           // 0
	"Silk Robe",             // 1
	"Linen Robe",            // 2
	"Robe",                  // 3
	"Shirt",                 // 4
	"Demon Husk",            // 5
	"Dragonskin Armor",      // 6
	"Studded Leather Armor", // 7
	"Hard Leather Armor",    // 8
	"Leather Armor",         // 9
	"Holy Chestplate",       // 10
	"Ornate Chestplate",     // 11
	"Plate Mail",            // 12
	"Chain Mail",            // 13
	"Ring Mail",             // 14
]

const headArmor = [
	"Ancient Helm",   // 0
	"Ornate Helm",    // 1
	"Great Helm",     // 2
	"Full Helm",      // 3
	"Helm",           // 4
	"Demon Crown",    // 5
	"Dragon's Crown", // 6
	"War Cap",        // 7
	"Leather Cap",    // 8
	"Cap",            // 9
	"Crown",          // 10
	"Divine Hood",    // 11
	"Silk Hood",      // 12
	"Linen Hood",     // 13
	"Hood",           // 14
]
const waistArmor = [
	"Ornate Belt",          // 0
	"War Belt",             // 1
	"Plated Belt",          // 2
	"Mesh Belt",            // 3
	"Heavy Belt",           // 4
	"Demonhide Belt",       // 5
	"Dragonskin Belt",      // 6
	"Studded Leather Belt", // 7
	"Hard Leather Belt",    // 8
	"Leather Belt",         // 9
	"Brightsilk Sash",      // 10
	"Silk Sash",            // 11
	"Wool Sash",            // 12
	"Linen Sash",           // 13
	"Sash",                 // 14
]

const footArmor = [
	"Holy Greaves",          // 0
	"Ornate Greaves",        // 1
	"Greaves",               // 2
	"Chain Boots",           // 3
	"Heavy Boots",           // 4
	"Demonhide Boots",       // 5
	"Dragonskin Boots",      // 6
	"Studded Leather Boots", // 7
	"Hard Leather Boots",    // 8
	"Leather Boots",         // 9
	"Divine Slippers",       // 10
	"Silk Slippers",         // 11
	"Wool Shoes",            // 12
	"Linen Shoes",           // 13
	"Shoes",                 // 14
]

const handArmor = [
	"Holy Gauntlets",         // 0
	"Ornate Gauntlets",       // 1
	"Gauntlets",              // 2
	"Chain Gloves",           // 3
	"Heavy Gloves",           // 4
	"Demon's Hands",          // 5
	"Dragonskin Gloves",      // 6
	"Studded Leather Gloves", // 7
	"Hard Leather Gloves",    // 8
	"Leather Gloves",         // 9
	"Divine Gloves",          // 10
	"Silk Gloves",            // 11
	"Wool Gloves",            // 12
	"Linen Gloves",           // 13
	"Gloves",                 // 14
]

const necklaces = [
	"Necklace", // 0
	"Amulet",   // 1
	"Pendant",  // 2
]

const rings = [
	"Gold Ring",     // 0
	"Silver Ring",   // 1
	"Bronze Ring",   // 2
	"Platinum Ring", // 3
	"Titanium Ring", // 4
]
export const allComponents = [[],chestArmor,footArmor,handArmor,headArmor,necklaces,rings,waistArmor,weapons];

const v3ItemNames = [
	"mechblue",     // 0
	"mechgreen",   // 1
	"mechred",   // 2
]

export const V3Components = [[],v3ItemNames,v3ItemNames,v3ItemNames,v3ItemNames,[],[],v3ItemNames,v3ItemNames];