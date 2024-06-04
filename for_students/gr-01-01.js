/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 * 
 * AUTHOR: Ella Santoro
 * SOURCES:
 * models:
 * 1. https://sketchfab.com/3d-models/medieval-stall-4a5a40e78e4b481bafbb576303f992cd
 * 2. https://sketchfab.com/3d-models/medieval-stall-4a5a40e78e4b481bafbb576303f992cd
 * learning/logical help
 * 1. Young Wu's lecture & lecture videos
 * 2. Previous workbooks
 * 3. https://threejs.org/docs/#api/en/core/BufferAttribute.needsUpdate
 * 4. https://threejs.org/docs/#examples/en/loaders/GLTFLoader
 * 5. ChatGPT - if in ANY case chatGPT is used, it is documented in the code with explanations and reasoning
 */
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { MedievalHouse } from "./objects/buildings/medievalhouse.js";
import { MedievalBuilding } from "./objects/buildings/medievalbuilding.js";
import { MedievalStructure } from "./objects/buildings/medievalstructure.js";
import { Carriage } from "./objects/vehicles/carriage.js";
import { ClockTower } from "./objects/buildings/clocktower.js";
import { Castle } from "./objects/buildings/medievalcastle.js";
import { Lake } from "./objects/terrain/lake.js";
import { Fence } from "./objects/terrain/fence.js";
import { Wheat } from "./objects/naturals/wheat.js";
import { Stone } from "./objects/terrain/stone.js";
import { Particles } from "./objects/terrain/particles.js";
import { Boat } from "./objects/vehicles/boat.js";
import { Bird } from "./objects/naturals/bird.js";
import { Terrain } from "./objects/terrain/terrain.js";
import { Flower } from "./objects/naturals/flowers.js";
import { Watermill } from "./objects/buildings/watermill.js"
import { Windmill } from "./objects/buildings/windmill.js";
import { GLTFLoader } from '../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js';

//images & loaders:
let wood = new T.TextureLoader().load("./images/wood.jpg");
const loader = new GLTFLoader();

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 30 // make the ground plane big enough for a world of stuff
});

/////////////////////////////////////////////////////////////////////////
//PLEASE NOTE:
/*
In regards to "check console for errors" point on workbook.txt - my trees that were loaded from a model are not considered THREE objects 
and so it does put out an error for all of them because I traverse it and change the hex colors, which disallows it
from being a THREE object for some reason. I was unable to remove those error messages from console, but it does still run smoothly.
I forgot to include this in my canvas submission, but please keep in mind!
*/
//LOADING MODELS IN:
//Models were unable to be loaded in a separate class b/c I used functions on them that worked only here
//and if they were in other classes they were not considered three objects so I decided to have all of the model
//work here:

//MODEL 1: TREE by Harri Jones (https://sketchfab.com/3d-models/fur-tree-41fa3210e50944eaa489c148e5e2ccc7)
//MODEL 2: MEDIEVAL STALL by Cyril43 (https://sketchfab.com/3d-models/medieval-stall-4a5a40e78e4b481bafbb576303f992cd)
class Tree {
    constructor(x, y, z, color, scale) {
        let group = new T.Group();
        loader.load('./model/fur_tree/scene.gltf', function (gltf) {
            const model = gltf.scene;
            //PLEASE NOTE THE FOLLOWING 4 LINES ARE WRITTEN BY CHATGPT and edited by me.
            //I could not figure out how to change the color of the model without going into the
            //file, so chatGPT wrote this when I asked it how. I made it more generalized so it could take in
            //any hex color, bust basically it traverses the model GLTF file and finds every single thing in the file
            //that is a mesh, then it access that specific child and alters the material.color and sets the hex to the color
            //i choose to pass in. this is edited so it works with my specific GLTF model and for my specific use case with the colors.
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.color.setHex(color);
                }
            });
            model.position.set(0, 0, 0);
            group.add(model);
        });
        //create the trunk - didn't want to use the model's trunk so I make my own instead with wood texture and my
        //preferred color.
        let trunkGeometry = new T.CylinderGeometry(0.1, 0.3, 8);
        let trunkMaterial = new T.MeshStandardMaterial({
            color: "#785337",
            bumpMap: wood,
            bumpScale: 100,
        });
        let trunkMesh = new T.Mesh(trunkGeometry, trunkMaterial);
        trunkMesh.position.set(0, 4, 0);
        group.add(trunkMesh);
        let tipGeometry = new T.CylinderGeometry(0.08, 0.02, 2.2);
        let tipMaterial = new T.MeshStandardMaterial({
            color: "#224722",
        });
        let tipMesh = new T.Mesh(tipGeometry, tipMaterial);
        tipMesh.position.set(0, 8, 0);
        group.add(tipMesh);

        group.position.set(x, y, z);
        group.scale.set(scale, scale, scale);
        world.scene.add(group);
    }
}

//MODEL 2: MEDIEVAL STALL by Cryil43 (https://sketchfab.com/3d-models/medieval-stall-4a5a40e78e4b481bafbb576303f992cd)
loader.load('./model/medieval_stall/scene.gltf', function (gltf) {
    const model2 = gltf.scene;
    model2.position.set(-15, 0, -2);
    model2.rotateY(Math.PI / 2);
    model2.scale.set(0.019, 0.019, 0.026);
    world.scene.add(model2);
});
/////////////////////////////////////////////////////////////////////////

//LIGHTING:
const ambientLight = new T.AmbientLight(0x404040, 5);
world.scene.add(ambientLight);

//BIRDS:
let bird = new Bird(0, 22, 0, 40, 12, 1);
world.add(bird);

let bird2 = new Bird(-2, 21, 0, 40, 12, 0.8);
world.add(bird2);

let bird3 = new Bird(1, 21, -1, 40, 12, 0.8);
world.add(bird3);

let bird4 = new Bird(-3, 23, 0, 40, 12, 0.8);
world.add(bird4);

let bird5 = new Bird(-4, 21, -1, 40, 12, 1.1);
world.add(bird5);

//TERRAIN:
let terrain = new Terrain();
world.add(terrain);

//BUILDINGS:
//house type 1:
let house = new MedievalHouse(-27.5, 0.5, 12, Math.PI / 2, "#803c3c", "#572929", 1);
house.highlighted = true;
world.add(house);

let house2 = new MedievalHouse(1.5, 0.5, 0, 0, "#63422b", "#63422b", 1);
world.add(house2);

let house3 = new MedievalHouse(-20, 0.5, 26, 0, "#2e5d5e", "#2e5d5e", 0.7);
world.add(house3);

//house type 2:
let building2 = new MedievalBuilding(23, 0.5, 3, Math.PI / 2, 0.8, 0.7, 1.2, "#2e5d5e");
world.add(building2);
building2.highlighted = true;

let building3 = new MedievalBuilding(27, 0.5, 3, 0, 1, 1, 1.5, "#2e5d5e");
world.add(building3);

let building4 = new MedievalBuilding(-23.7, 0.5, -1, Math.PI / 2, 1, 0.8, 1.5, "#6e5a4d");
world.add(building4);

let building5 = new MedievalBuilding(-28, 0.5, -1.2, 0, 1, 1, 1.5, "#6e5a4d");
world.add(building5);

let building6 = new MedievalBuilding(-9.5, 8.2, -26, 0, 0.8, 0.8, 0.8, "#7a2c2c");
world.add(building6);

let building7 = new MedievalBuilding(-13.2, 8.2, -26, 0, 0.8, 0.8, 0.8, "#7a2c2c");
world.add(building7);

let building8 = new MedievalBuilding(-17, 8.2, -26, 0, 0.8, 0.8, 0.8, "#7a2c2c");
world.add(building8);

let building9 = new MedievalBuilding(-5.7, 8.2, -26, 0, 0.8, 0.8, 0.8, "#7a2c2c");
world.add(building9);
//house type 3:
let structure = new MedievalStructure(6, 0, 0);
world.add(structure);
structure.highlighted = true;
//misc. buildings:
let clocktower = new ClockTower(-22, 8.2, -24, Math.PI / 6);
world.add(clocktower);
clocktower.highlighted = true;

//castle:
let castle = new Castle(11, 8, -29);
world.add(castle);
castle.highlighted = true;

//VEHICLES:
//carriage:
let carriage = new Carriage(17, 2.1, 4, 0.6, -Math.PI / 1.4);
carriage.highlighted = true;
world.add(carriage);

let carriage2 = new Carriage(-26, 11.2, -20, 0.8, Math.PI / 1.3);
world.add(carriage2);

//boat:
let boat = new Boat(20, 8.6, -10);
world.add(boat);

//TERRAIN & RELATED STRUCTURES:
let lake = new Lake(15, 8.5, -10);
world.add(lake);

let watermill = new Watermill(30, 10, -15, 1, "#63422b");
world.add(watermill);
watermill.highlighted = true;

let smallWatermill = new Watermill(28, 9.8, -13.5, 0.6, "#805a40");
world.add(smallWatermill);

let windmill = new Windmill(26, 9, -20, -0.5, 1.5);
world.add(windmill);
windmill.highlighted = true;

let smallWindmill = new Windmill(19, 9, -19.8, -0.1, 1);
world.add(smallWindmill);

//SMALLER OBJECTS for decoration: Sorry about how many there are - I couldn't figure out how to hide from lookAt list, but it isnt included in highlight list.
//fences:
world.add(new Fence(-1.8, 9.4, -5, -Math.PI / 6));
world.add(new Fence(0, 9.4, -4.5, -Math.PI / 3));
world.add(new Fence(1.1, 9.4, -2.7, -Math.PI / 4));
world.add(new Fence(2.6, 9.4, -1.4, -Math.PI / 7));
world.add(new Fence(2.6, 9.4, -1.4, -Math.PI / 12));
world.add(new Fence(4.4, 9.4, -0.5, -Math.PI / 15));
world.add(new Fence(6.2, 9.4, -0.5, -Math.PI / 20));
world.add(new Fence(8, 9.4, -0.5, Math.PI / 15));
world.add(new Fence(10, 9.4, -1.4, Math.PI / 7));
world.add(new Fence(12, 9.4, -2.1, Math.PI / 4));
world.add(new Fence(13.9, 9.4, -3, -Math.PI / 3));
world.add(new Fence(15, 9.4, -0.8, -Math.PI / 4));
world.add(new Fence(16.8, 9.4, 1.4, -Math.PI / 6));
world.add(new Fence(18.8, 9.4, 2.5, -Math.PI / 14));
world.add(new Fence(20.8, 9.4, 2.5, -Math.PI / 20));
world.add(new Fence(22.8, 9.4, 2.5, -Math.PI / 20));

for (let i = 0; i < 30; i++) {
    let x = -30 + (i * 2);
    world.add(new Fence(x, 1, 30, 0));
}

for (let i = 0; i < 14; i++) {
    let x = -30 + (i * 2);
    world.add(new Fence(x, 9.5, -5.3, 0));
}

//NATURALS:
//wheat:
world.add(new Wheat(11, 9, -17));
world.add(new Wheat(12, 9, -17));
world.add(new Wheat(10.9, 9, -15));
world.add(new Wheat(-1, 8, -2));
world.add(new Wheat(-3, 8, -3));
world.add(new Wheat(-4, 8, -3));
world.add(new Wheat(-5, 8, -1));
world.add(new Wheat(-6, 8, -2));
world.add(new Wheat(-7, 8, -3));
world.add(new Wheat(-28, 0.5, 24));
world.add(new Wheat(19, 0.5, 4));
world.add(new Wheat(17.5, 0.5, 5));
world.add(new Wheat(16, 0, 6));
world.add(new Wheat(14, 0.5, 4));
world.add(new Wheat(0, 0.5, 28));
world.add(new Wheat(-2, 0.5, 28));
world.add(new Wheat(2, 0.5, 28));
world.add(new Wheat(2, 0.5, 26.5));
world.add(new Wheat(4, 0.5, 28));
world.add(new Wheat(5, 0.5, 26.5));
world.add(new Wheat(2, 0.5, 29));
world.add(new Wheat(4, 0.5, 29));
world.add(new Wheat(8, 0.5, 28));
world.add(new Wheat(7, 0.5, 26));
world.add(new Wheat(9, 0.5, 26));
world.add(new Wheat(12, 0.5, 26));
world.add(new Wheat(14, 0.5, 28));
world.add(new Wheat(-15, 0.5, 27));
world.add(new Wheat(-13, 0.5, 28));
world.add(new Wheat(-24, 0.5, 27));
world.add(new Wheat(-25, 0.5, 28));
world.add(new Wheat(-30, 9, -18));
world.add(new Wheat(-28, 9, -19));
world.add(new Wheat(-3.5, 0.5, 2));
world.add(new Wheat(-20, 0.5, -3));
world.add(new Wheat(-11, 0.5, -1));
world.add(new Wheat(-20, 0.5, 5));
world.add(new Wheat(25, 0.5, 28));
world.add(new Wheat(27, 0.5, 29));
world.add(new Wheat(27.5, 0.5, 26));
world.add(new Wheat(-5, 8.5, -23));

//flowers:
world.add(new Flower(-1, 7, -1.5, 1, "#963230"));
world.add(new Flower(-1.8, 7, -2, 0.92, "#963230"));
world.add(new Flower(-6, 7, -1, 0.92, "#963230"));
world.add(new Flower(-3.5, 7, -0.5, 0.92, "#963230"));
world.add(new Flower(7, 0.5, 29.5, 0.92, "#e077bf"));
world.add(new Flower(6, 0.5, 28, 0.92, "#963230"));
world.add(new Flower(-5, 0.5, 2, 0.92, "#963230"));
world.add(new Flower(-4, 0.5, 3, 0.92, "#963230"));
world.add(new Flower(-2, 0.5, 28, 0.92, "#963230"));
world.add(new Flower(-3, 0.5, 29, 0.92, "#963230"));
world.add(new Flower(-5, 0.5, 28, 0.92, "#e077bf"));
world.add(new Flower(-25, 0.5, 8, 0.92, "#963230"));
world.add(new Flower(-20, 0.5, 5.5, 0.92, "#e077bf"));
world.add(new Flower(0, 8.8, -20, 0.92, "#963230"));
world.add(new Flower(-6, 8.8, -24, 0.92, "#963230"));
world.add(new Flower(-20, 8.8, -20, 0.92, "#963230"));
world.add(new Flower(-22, 8.8, -20.5, 0.92, "#e077bf"));


//trees: (apologies for how many there are - i like decor)
world.scene.add(new Tree(-10, 0, 9, 0x3a785e, 0.5));
world.scene.add(new Tree(-12, 0, 9.5, 0x3d8a3d, 0.5));
world.scene.add(new Tree(13, 8.7, -16, 0x3d5e3d, 1));
world.scene.add(new Tree(16, 8.7, -20, 0x6d996d, 1));
world.scene.add(new Tree(22, 8.7, -28, 0x3d5e3d, 1));
world.scene.add(new Tree(23, 8.7, -26, 0x6d996d, 1.3));
world.scene.add(new Tree(14, 8.7, -24, 0x3d5e3d, 1));
world.scene.add(new Tree(18, 8.7, -24, 0x6d996d, 2));
world.scene.add(new Tree(-16, 8.7, -20, 0x3a785e, 1.5));
world.scene.add(new Tree(-8, 0, -1, 0x3d5e3d, 1));
world.scene.add(new Tree(-7, 0, 1, 0x6d996d, 0.6));
world.scene.add(new Tree(-26, 0, 20, 0x6d996d, 1));
world.scene.add(new Tree(-28, 0, 23, 0x95cc95, 1.5));
world.scene.add(new Tree(-25, 0, 25, 0x95f595, 0.8));
world.scene.add(new Tree(-16, 0, 25, 0x3d5e3d, 0.7));
world.scene.add(new Tree(-15, 0, 27, 0x6d996d, 0.5));
world.scene.add(new Tree(14, 0, 5, 0x3d5e3d, 1));
world.scene.add(new Tree(12, 0, 4, 0x6d996d, 0.85));
world.scene.add(new Tree(10, 0, 3, 0x3d5e3d, 1));
world.scene.add(new Tree(11, 0, 5, 0x95cc95, 0.6));
world.scene.add(new Tree(13, 0, 6, 0x387a38, 0.6));
world.scene.add(new Tree(28, 0, 17, 0x95cc95, 0.6));
world.scene.add(new Tree(27, 0, 20, 0x387a38, 0.6));
world.scene.add(new Tree(29, 0, 27, 0x3d5e3d, 1.2));
world.scene.add(new Tree(27, 0, 25, 0x6d996d, 1));
world.scene.add(new Tree(12, 0, 27, 0x6d996d, 0.85));
world.scene.add(new Tree(10, 0, 26, 0x3d5e3d, 1));
world.scene.add(new Tree(11, 0, 28, 0x95cc95, 0.6));
world.scene.add(new Tree(13, 0, 27, 0x387a38, 0.6));
world.scene.add(new Tree(9, 0, 28, 0x387a385, 0.6));
world.scene.add(new Tree(-9, 0, 27, 0x3a785e, 0.8));
world.scene.add(new Tree(-10, 0, 28, 0x387a385, 0.6));
world.scene.add(new Tree(-28, 8.7, -20, 0x3a785e, 1));
world.scene.add(new Tree(-27, 8.7, -24, 0x387a385, 1.5));
world.scene.add(new Tree(3, 8.6, -18, 0x387a385, 0.5));
world.scene.add(new Tree(8, 8.6, -18, 0x387a385, 0.5));

//STONES (apologies for how many there are)
world.add(new Stone(-28, 0, 3));
world.add(new Stone(-26.5, 0, 5));
world.add(new Stone(-24.5, 0, 6.3));
world.add(new Stone(-22.3, 0, 6.7));
world.add(new Stone(-20.1, 0, 7));
world.add(new Stone(-20.1, 0, 9));
world.add(new Stone(-21.1, 0, 10.8));
world.add(new Stone(-22.9, 0, 11.6));
world.add(new Stone(-24.9, 0, 11.6));
world.add(new Stone(-18.1, 0, 6.7));
world.add(new Stone(-16.1, 0, 7));
world.add(new Stone(-14.1, 0, 6.7));
world.add(new Stone(-12.1, 0, 7));
world.add(new Stone(-10.1, 0, 6.7));
world.add(new Stone(-8.1, 0, 7.1));
world.add(new Stone(-6.1, 0, 7.3));
world.add(new Stone(-4.1, 0, 7.8));
world.add(new Stone(-2.1, 0, 8.3));
world.add(new Stone(-0.1, 0, 9));
world.add(new Stone(1.8, 0, 9.7));
world.add(new Stone(3.7, 0, 10.5));
world.add(new Stone(5.5, 0, 11.5));
world.add(new Stone(7.2, 0, 12.5));
world.add(new Stone(9.2, 0, 12.7));
world.add(new Stone(11.2, 0, 12.8));
world.add(new Stone(13.2, 0, 13));
world.add(new Stone(15.2, 0, 13.3));
world.add(new Stone(17.2, 0, 13.3));
world.add(new Stone(19.2, 0, 13.2));
world.add(new Stone(21.2, 0, 12.9));
world.add(new Stone(23.2, 0, 12.6));
world.add(new Stone(25.2, 0, 12.2));
world.add(new Stone(27, 0, 11));
world.add(new Stone(27.5, 0, 9));
world.add(new Stone(27.5, 0, 7));
world.add(new Stone(1.3, 0, 7.5));
world.add(new Stone(1.5, 0, 5.2));
world.add(new Stone(1.2, 0, 3));

//PARTICLES:
//@ts-ignore
world.add(new Particles());

//ENVIRONMENT MAP:
let environmentmap = [
    './images/skybox/px.png',
    './images/skybox/nx.png',
    './images/skybox/py.png',
    './images/skybox/ny.png',
    './images/skybox/pz.png',
    './images/skybox/nz.png'
]
let textureLoader = new T.CubeTextureLoader();
let skybox = textureLoader.load(environmentmap);
world.scene.background = skybox;

// @ts-ignore 
world.ui = new WorldUI(world);
world.go();

function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}