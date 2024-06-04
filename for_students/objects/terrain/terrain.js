/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let mossy = new T.TextureLoader().load("./images/mossyFloor.jpeg");
let stone = new T.TextureLoader().load("./images/hillStones.jpg");

/**
 * Class that creates the terrain (like the extra platform and stones) for my town
 */
export class Terrain extends GrObject {
    constructor() {
        let group = new T.Group();

        //MATERIALS:
        let stoneMaterial = new T.MeshPhongMaterial({ color: "#bfbbb6", specular: "#ded1bd", shininess: 10, map: stone, bumpMap: stone, bumpScale: 5 });
        let grassMaterial = new T.MeshStandardMaterial({ side: T.DoubleSide, color: "#648060", roughness: 0.9, map: mossy, bumpMap: mossy, bumpScale: 10 });

        //STONE PLATFORMS:
        let platformBaseGeometry = new T.BoxGeometry(20, 8, 25);
        let bigCliffGeometry = new T.CylinderGeometry(8, 8, 8, 20, 20, false, 0, Math.PI);
        let mediumCliffGeometry = new T.CylinderGeometry(5.5, 5.5, 6.1, 20, 20, false, 0, Math.PI);
        let smallCliffGeometry = new T.CylinderGeometry(5, 5, 4, 20, 20, false, 0, Math.PI);

        let platform1 = new T.Mesh(platformBaseGeometry, stoneMaterial);
        platform1.position.set(-20, 4, -17.5);
        group.add(platform1);

        let platform2 = new T.Mesh(platformBaseGeometry, stoneMaterial);
        platform2.position.set(0, 4, -17.5);
        group.add(platform2);

        let platform3 = new T.Mesh(platformBaseGeometry, stoneMaterial);
        platform3.position.set(20, 4, -17.5);
        group.add(platform3);

        let stoneCliff1 = new T.Mesh(bigCliffGeometry, stoneMaterial);
        stoneCliff1.position.set(22, 4, -5);
        stoneCliff1.rotateY(-Math.PI / 2);
        group.add(stoneCliff1);

        let stoneCliff2 = new T.Mesh(bigCliffGeometry, stoneMaterial);
        stoneCliff2.position.set(7, 4, -8);
        stoneCliff2.rotateY(-Math.PI / 2);
        group.add(stoneCliff2);

        let stoneCliff3 = new T.Mesh(smallCliffGeometry, stoneMaterial);
        stoneCliff3.position.set(14, 2, -2);
        stoneCliff3.rotateY(-Math.PI / 2);
        group.add(stoneCliff3);

        let stoneCliff4 = new T.Mesh(mediumCliffGeometry, stoneMaterial);
        stoneCliff4.position.set(-3, 3.1, -5);
        stoneCliff4.rotateY(-Math.PI / 2);
        group.add(stoneCliff4);

        //GRASS:
        let grassGeometry = new T.BoxGeometry(20, 0.5, 25);
        let grass = new T.Mesh(grassGeometry, grassMaterial);
        grass.position.set(-20, 8.2, -17.5);
        group.add(grass);

        let grass2 = new T.Mesh(grassGeometry, grassMaterial);
        grass2.position.set(20, 8.2, -17.5);
        group.add(grass2);

        let grass3 = new T.Mesh(grassGeometry, grassMaterial);
        grass3.position.set(0, 8.2, -17.5);
        group.add(grass3)

        //CIRCULAR PLATFORMS;
        let circularPlatform = new T.CylinderGeometry(5, 5, 0.5);
        let circularPlatformMesh = new T.Mesh(circularPlatform, grassMaterial);
        circularPlatformMesh.position.set(14, 4.2, -2);
        circularPlatformMesh.rotateY(-Math.PI / 2);
        group.add(circularPlatformMesh);

        let circularPlatform2 = new T.CylinderGeometry(8, 8, 0.5, 20, 20, false, 0, Math.PI);
        let platform8Mesh = new T.Mesh(circularPlatform2, grassMaterial);
        platform8Mesh.position.set(22, 8.2, -5);
        platform8Mesh.rotateY(-Math.PI / 2);
        group.add(platform8Mesh);

        let circularPlatform3 = new T.Mesh(circularPlatform2, grassMaterial);
        circularPlatform3.position.set(7, 8.2, -8);
        circularPlatform3.rotateY(-Math.PI / 2);
        group.add(circularPlatform3);

        let circularPlatform4 = new T.CylinderGeometry(5.5, 5.5, 0.5);
        let circularPlatformMesh4 = new T.Mesh(circularPlatform4, grassMaterial);
        circularPlatformMesh4.position.set(-3, 6.5, -5);
        circularPlatformMesh4.rotateY(-Math.PI / 2);
        group.add(circularPlatformMesh4);

        //make sure to call super!
        super("Terrain", group);
    }
}