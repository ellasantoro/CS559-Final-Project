/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let wood = new T.TextureLoader().load("./images/wood.jpg");

/**
 * This class creates the fence object for my town
 */
export class Fence extends GrObject {
    //constructor takes in x,y, and z for position, and a rotation angle, theta, that we can rotate the fence object to
    constructor(x, y, z, theta) {
        let group = new T.Group();

        //UPRIGHT: POLES:
        let poleGeometry = new T.BoxGeometry(0.4, 2.1, 0.4);
        let poleMaterial = new T.MeshStandardMaterial({
            color: "#755535",
            bumpMap: wood,
            bumpScale: 100,
        });
        let poleGeometry2 = new T.BoxGeometry(0.2, 2.1, 0.2);
        let pole1 = new T.Mesh(poleGeometry, poleMaterial);
        group.add(pole1);

        let pole2 = new T.Mesh(poleGeometry, poleMaterial);
        pole2.position.set(2, 0, 0);
        group.add(pole2);

        //HORIZONTAL POLES:
        let pole3 = new T.Mesh(poleGeometry2, poleMaterial);
        pole3.position.set(1, 0.5, 0);
        pole3.rotateZ(Math.PI / 2);
        group.add(pole3);

        let pole4 = new T.Mesh(poleGeometry2, poleMaterial);
        pole4.position.set(1, -0.2, 0);
        pole4.rotateZ(Math.PI / 2);
        group.add(pole4);

        //rotate the fence by the passed in theta, and set the group position to what
        //was passed into the constructor
        group.rotateY(theta);
        group.position.set(x, y, z);

        //make sure to call super!
        super("Fence", group);
    }
}