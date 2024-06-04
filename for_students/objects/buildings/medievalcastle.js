/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let stoneTexture = new T.TextureLoader().load("./images/castleStones.jpeg");
let woodTexture = new T.TextureLoader().load("./images/wood.jpg");

/**
 * This class creates the castle object for my town
 */
export class Castle extends GrObject {
    //constructor takes in x,y, and z for positioning.
    constructor(x, y, z) {
        let group = new T.Group();
        //MATERIALS (used throughout the file, all defined here):
        let pillarMaterial = new T.MeshPhongMaterial({
            color: "#a8a8a8",
            specular: "white",
            shininess: 1,
            map: stoneTexture,
            bumpMap: stoneTexture,
            bumpScale: 13,
        });

        let roofMaterial = new T.MeshPhongMaterial({
            color: "#7d2323",
            specular: "#b85a5a",
            shininess: 1,
            bumpScale: 13,
        });

        let doorMaterial = new T.MeshPhongMaterial({
            color: "#665649",
            bumpMap: woodTexture,
            bumpScale: 30,
            side: T.DoubleSide,
        });
        //CASTLE GEOMETRIES:
        //PILLARS
        let castlePillarGeometry = new T.CylinderGeometry(1.5, 1.5, 10);
        let pillar1 = new T.Mesh(castlePillarGeometry, pillarMaterial);
        pillar1.position.set(0, 1, 0);
        group.add(pillar1);

        let pillar2 = new T.Mesh(castlePillarGeometry, pillarMaterial);
        pillar2.position.set(-8, 1, 0);
        group.add(pillar2);

        let pillar3 = new T.Mesh(castlePillarGeometry, pillarMaterial);
        pillar3.position.set(-8, 1, -13);
        group.add(pillar3);

        let pillar4 = new T.Mesh(castlePillarGeometry, pillarMaterial);
        pillar4.position.set(0, 1, -13);
        group.add(pillar4)

        //WALLS:
        let frontWallGeometry = new T.BoxGeometry(8, 5, 1);
        let SideWallGeometry = new T.BoxGeometry(6, 5, 1);

        let wall1 = new T.Mesh(frontWallGeometry, pillarMaterial);
        wall1.position.set(-4, -1.3, 0);
        group.add(wall1);

        let wall2 = new T.Mesh(frontWallGeometry, pillarMaterial);
        wall2.position.set(-4, -1.3, -13);
        group.add(wall2);

        let wall3 = new T.Mesh(SideWallGeometry, pillarMaterial);
        wall3.rotateY(Math.PI / 2);
        wall3.position.set(-8, -1.3, -9);
        group.add(wall3);

        let wall4 = new T.Mesh(SideWallGeometry, pillarMaterial);
        wall4.rotateY(Math.PI / 2);
        wall4.position.set(-8, -1.3, -3);
        group.add(wall4);

        let wall5 = new T.Mesh(SideWallGeometry, pillarMaterial);
        wall5.rotateY(Math.PI / 2);
        wall5.position.set(0, -1.3, -9);
        group.add(wall5);

        let wall6 = new T.Mesh(SideWallGeometry, pillarMaterial);
        wall6.rotateY(Math.PI / 2);
        wall6.position.set(0, -1.3, -3);
        group.add(wall6);

        //TOP OF WALL DESIGNS: (the little ridges on the tops of the walls)
        let castleRidgeGeometry = new T.BoxGeometry(1.5, 1, 1);
        let ridge1 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge1.rotateY(Math.PI / 2);
        ridge1.position.set(-8, 1.5, -2);
        group.add(ridge1);

        let ridge2 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge2.rotateY(Math.PI / 2);
        ridge2.position.set(-8, 1.5, -11);
        group.add(ridge2);

        let ridge3 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge3.rotateY(Math.PI / 2);
        ridge3.position.set(-8, 1.5, -5);
        group.add(ridge3);

        let ridge4 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge4.rotateY(Math.PI / 2);
        ridge4.position.set(-8, 1.5, -8);
        group.add(ridge4);

        let ridge5 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge5.rotateY(Math.PI / 2);
        ridge5.position.set(0, 1.5, -2);
        group.add(ridge5);

        let ridge6 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge6.rotateY(Math.PI / 2);
        ridge6.position.set(0, 1.5, -11);
        group.add(ridge6);

        let ridge7 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge7.rotateY(Math.PI / 2);
        ridge7.position.set(0, 1.5, -5);
        group.add(ridge7);

        let ridge8 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge8.rotateY(Math.PI / 2);
        ridge8.position.set(0, 1.5, -8);
        group.add(ridge8);

        let ridge9 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge9.position.set(-5.5, 1.5, 0);
        group.add(ridge9);

        let ridge10 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge10.position.set(-2.5, 1.5, 0);
        group.add(ridge10);

        let ridge11 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge11.position.set(-5.5, 1.5, -13);
        group.add(ridge11);

        let ridge12 = new T.Mesh(castleRidgeGeometry, pillarMaterial);
        ridge12.position.set(-2.5, 1.5, -13);
        group.add(ridge12);

        //CASTLE DOOR:
        let archGeometry = new T.TorusGeometry(1, 0.25, 20, 20, Math.PI);
        let archMesh = new T.Mesh(archGeometry, doorMaterial);
        archMesh.rotateY(Math.PI / 2);
        archMesh.position.set(-8.7, -1, -6);
        group.add(archMesh);

        let doorGeometry = new T.BoxGeometry(0.5, 2.7, 2.5);
        let doorMesh = new T.Mesh(doorGeometry, doorMaterial);
        doorMesh.position.set(-8.7, -2.2, -6);
        group.add(doorMesh);

        let doorTopGeometry = new T.CircleGeometry(1.25, 32, 0, Math.PI);
        let doorTopMesh = new T.Mesh(doorTopGeometry, doorMaterial);
        doorTopMesh.position.set(-9, -1, -6);
        doorTopMesh.rotateY(Math.PI / 2);
        group.add(doorTopMesh);

        //ROOF:
        let roofGeometry = new T.ConeGeometry(1.8, 5);
        let roof = new T.Mesh(roofGeometry, roofMaterial);
        roof.position.set(-8, 7.8, 0);
        group.add(roof);

        let roof2 = new T.Mesh(roofGeometry, roofMaterial);
        roof2.position.set(-8, 7.8, -13);
        group.add(roof2);

        let roof3 = new T.Mesh(roofGeometry, roofMaterial);
        roof3.position.set(0, 7.8, -13);
        group.add(roof3);

        let roof4 = new T.Mesh(roofGeometry, roofMaterial);
        roof4.position.set(0, 7.8, 0);
        group.add(roof4);

        //use the constructor inputted values to set the position of the castle
        group.position.set(x, y + 3.9, z);
        group.rotateY(Math.PI / 2);

        //make sure to call super!
        super("Castle", group);
    }
}