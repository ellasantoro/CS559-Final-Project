/*jshint esversion: 6 */
// @ts-check

import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";
let rock = new T.TextureLoader().load("./images/rock.jpg");

/**
 * This class creates the stone object for my town
 */
export class Stone extends GrObject {
    //constructor takes in x,y, and z for positioning of the stone.
    constructor(x, y, z) {
        let group = new T.Group();
        let stoneGeometry = new T.CylinderGeometry(1, 1, 0.25);
        let stoneMaterial = new T.MeshPhongMaterial({
            color: "#807f7e",
            bumpMap: rock,
            bumpScale: 300,

        });
        let stone = new T.Mesh(stoneGeometry, stoneMaterial);
        group.add(stone);
        group.position.set(x, y, z);
        super("Stone", group);
    }
}