/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

/**
 * This class creates wheat rows for my town, including animation
 */
export class Wheat extends GrObject {
    //constructor takes in x,y, and z position
    constructor(x, y, z) {
        let mainGroup = new T.Group();
        let wheatGroup = new T.Group();
        let wheatGeometry = new T.CylinderGeometry(0.2, 0.2, 3.5);
        let wheatBudGeometry = new T.CylinderGeometry(0.15, 0.15, 1.4);
        let wheatMat = new T.MeshPhongMaterial({
            color: "#baa050",
            specular: "#f0dda3",
            shininess: 100,
        });

        //create all the wheat meshes
        let wheatMesh = new T.Mesh(wheatGeometry, wheatMat);
        wheatGroup.add(wheatMesh);

        let wheatMesh2 = new T.Mesh(wheatBudGeometry, wheatMat);
        wheatMesh2.rotateZ(Math.PI / 8);
        wheatMesh2.position.set(-0.5, 0.5, 0);
        wheatGroup.add(wheatMesh2);

        let wheatMesh3 = new T.Mesh(wheatBudGeometry, wheatMat);
        wheatMesh3.rotateZ(-Math.PI / 8);
        wheatMesh3.position.set(0.5, 0, 0);
        wheatGroup.add(wheatMesh3);

        let wheatMesh4 = new T.Mesh(wheatBudGeometry, wheatMat);
        wheatMesh4.rotateZ(-Math.PI / 8);
        wheatMesh4.rotateX(-Math.PI / 8);
        wheatMesh4.position.set(0, 0.4, -0.3);
        wheatGroup.add(wheatMesh4);

        let wheatMesh5 = new T.Mesh(wheatBudGeometry, wheatMat);
        wheatMesh5.rotateZ(-Math.PI / 8);
        wheatMesh5.rotateX(Math.PI / 8);
        wheatMesh5.position.set(0, -0.2, 0.3);

        //clone these wheat meshes (alltogether, they only create one wheat with a few buds), because we want several
        //wheats in one object so its like one "patch" of wheat. this way it somewhat minimizes the amount of wheat we have to create
        //in the main file since there will be several patches of wheat
        let wheat2 = wheatGroup.clone();
        let wheat3 = wheatGroup.clone();
        let wheat4 = wheatGroup.clone();
        let wheat5 = wheatGroup.clone();
        let wheat6 = wheatGroup.clone();
        let wheat7 = wheatGroup.clone();
        let wheat8 = wheatGroup.clone();
        let wheat9 = wheatGroup.clone();
        let wheat10 = wheatGroup.clone();
        let wheat11 = wheatGroup.clone();
        let wheat12 = wheatGroup.clone();
        // now add and position all of the wheat clones relative to each other
        mainGroup.add(wheatGroup)
        wheatGroup.position.set(0, 0, 0.8);
        mainGroup.add(wheat2);
        wheat2.position.set(1, 0, 0.2);
        mainGroup.add(wheat3);
        wheat3.position.set(2, 0, 0.3);
        mainGroup.add(wheat4);
        wheat4.position.set(3, 0, 0.7);
        mainGroup.add(wheat5);
        wheat5.position.set(0, 0, -1.2);
        mainGroup.add(wheat6);
        wheat6.position.set(1, 0, -1.3);
        mainGroup.add(wheat7);
        wheat7.position.set(2, 0, -1.2);
        mainGroup.add(wheat8);
        wheat8.position.set(3, 0, -1.3);
        mainGroup.add(wheat9);
        wheat9.position.set(0, 0, -2.2);
        mainGroup.add(wheat10);
        wheat10.position.set(1, 0, -3);
        mainGroup.add(wheat11);
        wheat11.position.set(2, 0, -2.4);
        mainGroup.add(wheat12);
        wheat12.position.set(3, 0, -2.6);

        //scale the entire group and set the position!
        mainGroup.scale.set(0.5, 0.5, 0.5);
        mainGroup.position.set(x, y, z);

        //remember to call super!
        super("Wheat", mainGroup);

        //VARIABLES USED IN ANIMATION
        this.time = 0;
        this.mainGroup = mainGroup;
    }
    //animation function, this is trivial and is not included in my main behaviors for this project.
    //makes it look like the wheat is swaying in the wind
    stepWorld(delta) {
        //elapsed time:
        this.time += delta * 0.0005;
        //calculate the angle, similar to my clocktower animation, just altered for this specific use case
        const swayAngle = 0.1 * Math.sin(this.time * 2 * Math.PI);
        //apply the rotation!
        this.mainGroup.rotation.y = swayAngle;
    }
}
