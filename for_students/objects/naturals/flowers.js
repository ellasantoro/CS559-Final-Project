/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

/**
 * This class creates a flower object for my town
 */
export class Flower extends GrObject {
    //constructor takes in x,y, and z for position, a scale factor, and color so that we can have different colored flower objects
    constructor(x, y, z, scale, color) {
        let group = new T.Group();

        //FLOWER PART:
        let budGeometry = new T.IcosahedronGeometry(0.45);
        let budMaterial = new T.MeshStandardMaterial({
            color: color,
        });
        let bud = new T.Mesh(budGeometry, budMaterial);
        bud.position.set(0, 10, 0);
        group.add(bud);

        //STEM:
        let stemGeometry = new T.CylinderGeometry(0.1, 0.1, 1.3);
        let leafGeometry = new T.CylinderGeometry(0.08, 0.08, 0.5);
        let stemMat = new T.MeshStandardMaterial({
            color: "#37542e",
        })

        let stem = new T.Mesh(stemGeometry, stemMat);
        stem.position.set(0, 9.2, 0);
        group.add(stem);

        //LEAVES:
        let leaf = new T.Mesh(leafGeometry, stemMat);
        leaf.position.set(-0.2, 9.2, 0);
        leaf.rotateZ(Math.PI / 4);
        group.add(leaf);

        let leaf2 = new T.Mesh(leafGeometry, stemMat);
        leaf2.position.set(0.1, 8.9, 0);
        leaf2.rotateZ(-Math.PI / 4);
        group.add(leaf2);

        //set the group to the positions passed into the constructor (subtracted 8.5 from y because i built the flower floating so i could
        //see it initially))
        group.position.set(x, y - 8.5, z);
        //set the scaling to the group that was passed into the constructor
        group.scale.set(scale, scale, scale);

        //make sure to call super!
        super("Flower", group);
    }
}