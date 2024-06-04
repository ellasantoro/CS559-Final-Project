/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let carriageTexture = new T.TextureLoader().load("./images/carriage.png");
let woodTexture = new T.TextureLoader().load("./images/wood.jpg");
let wheelTexture = new T.TextureLoader().load("./images/wheel.png");

/**
 * This class creates the carriage vehicle object for my town.
 */
export class Carriage extends GrObject {
    //constructor takes in x,y, and z positions, as well as a scale value and a rotation value to position the vehicle
    constructor(x, y, z, scale, angle) {
        let group = new T.Group();
        //ROOF:
        let roofGeometry = new T.CylinderGeometry(2, 2, 5, 6, 25, true, 0, 3.65681);
        let roofMaterial = new T.MeshPhongMaterial({
            color: "#e6c3a5",
            side: T.DoubleSide,
            map: carriageTexture,
            bumpMap: carriageTexture,
            bumpScale: -50,
            specular: "white",
            shininess: 1,
        });

        let carriageRoof = new T.Mesh(roofGeometry, roofMaterial);
        carriageRoof.rotateZ(Math.PI / 2);
        carriageRoof.rotateY(-0.25);
        group.add(carriageRoof);

        //BASE:
        let baseGeometry = new T.BoxGeometry(5, 0.5, 3.9);
        let baseMaterial = new T.MeshStandardMaterial({
            color: "#7a5a43",
            bumpMap: woodTexture,
            bumpScale: 100,
        });

        let carriageBase = new T.Mesh(baseGeometry, baseMaterial);
        carriageBase.position.set(0, -2.5, 0);
        group.add(carriageBase);

        //POLES:
        let poleGeometry = new T.CylinderGeometry(0.2, 0.2, 2.2);
        let carriagePole1 = new T.Mesh(poleGeometry, baseMaterial);
        carriagePole1.position.set(-2, -1.3, 1.7);
        group.add(carriagePole1);

        let carriagePole2 = new T.Mesh(poleGeometry, baseMaterial);
        carriagePole2.position.set(2, -1.3, 1.7);
        group.add(carriagePole2);

        let carriagePole3 = new T.Mesh(poleGeometry, baseMaterial);
        carriagePole3.position.set(2, -1.3, -1.7);
        group.add(carriagePole3);

        let carriagePole4 = new T.Mesh(poleGeometry, baseMaterial);
        carriagePole4.position.set(-2, -1.3, -1.7);
        group.add(carriagePole4);

        //WHEELS:
        let wheelGeometry = new T.CylinderGeometry(0.9, 0.9, 0.25);
        let wheelMaterial = new T.MeshPhongMaterial({
            bumpMap: wheelTexture,
            map: wheelTexture,
            color: "#c2a488",
            bumpScale: 300,
            specular: "#736150",
            shininess: 1.2,
        });

        let wheel1 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel1.position.set(-1.9, -3, 2);
        wheel1.rotateX(Math.PI / 2);
        group.add(wheel1);

        let wheel2 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel2.position.set(1.9, -3, 2);
        wheel2.rotateX(Math.PI / 2);
        group.add(wheel2);


        let wheel3 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel3.position.set(1.9, -3, -2);
        wheel3.rotateX(Math.PI / 2);
        group.add(wheel3);

        let wheel4 = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel4.position.set(-1.9, -3, -2);
        wheel4.rotateX(Math.PI / 2);
        group.add(wheel4);

        //BACK:
        let backGeometry = new T.BoxGeometry(3, 1.5, 4);
        let carriageBack = new T.Mesh(backGeometry, baseMaterial);
        carriageBack.position.set(-1, -2, 0);
        group.add(carriageBack);

        //use the user inputs to scale/rotate/position the whole object (ie group)
        group.scale.set(scale, scale, scale);
        group.position.set(x, y, z);
        group.rotateY(angle);

        //make sure to call super!
        super("Carriage", group);
    }
}