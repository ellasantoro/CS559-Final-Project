/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let baseTexture = new T.TextureLoader().load("./images/stoneBase.jpg");
let woodTexture = new T.TextureLoader().load("./images/wood.jpg");
let roofTexture = new T.TextureLoader().load("./images/roof.jpeg");
let wingTexture = new T.TextureLoader().load("./images/windmillWing.png");

/**
 * Class to create the windmill object for my world (including animation)
 */
export class Windmill extends GrObject {
    //constructor takes in x,y,z for position as well as an angle for rotation (theta), and a scale factor
    constructor(x, y, z, theta, scale) {
        let group = new T.Group();
        //MATERIALS (used throughout the file, all defined here):
        let baseMaterial = new T.MeshStandardMaterial({
            color: "#d9bfad",
            map: baseTexture,
            bumpMap: baseTexture,
            bumpScale: 12,
        });

        let wallMaterial = new T.MeshStandardMaterial({
            color: "#a69280",
        });

        let poleMaterial = new T.MeshStandardMaterial({
            color: "#63422b",
            bumpMap: woodTexture,
            bumpScale: 30,
        });

        let roofMaterial = new T.MeshStandardMaterial({
            color: "#49706f",
            roughness: 0.75,
            map: roofTexture
        });

        let wingMaterial = new T.MeshStandardMaterial({
            map: wingTexture,
        });

        let propellerMaterial = new T.MeshStandardMaterial({
            color: "#8a6954",
            map: woodTexture,
            bumpMap: woodTexture,
            bumpScale: 100,
        });

        //BASE: (cobblestone platform under the walls))
        let baseGeometry = new T.BoxGeometry(2.2, 2.5, 2.2);
        let baseMesh = new T.Mesh(baseGeometry, baseMaterial);
        group.add(baseMesh);

        //WALLS:
        let wallGeometry = new T.BoxGeometry(2.5, 6, 2.5);
        let wallMesh = new T.Mesh(wallGeometry, wallMaterial);
        wallMesh.position.set(0, 4, 0);
        group.add(wallMesh);

        //POLES (wood logs outlining the structure)
        let poleGeometry = new T.CylinderGeometry(0.2, 0.2, 2.2);
        let horizontalPoleGeometry = new T.CylinderGeometry(0.2, 0.2, 8.35);
        let slantedPoleGeometry = new T.CylinderGeometry(0.1, 0.1, 6.3);

        let pole = new T.Mesh(horizontalPoleGeometry, poleMaterial);
        pole.position.set(-1.2, 2.8, 1.25);
        group.add(pole);

        let pole2 = new T.Mesh(horizontalPoleGeometry, poleMaterial);
        pole2.position.set(1.2, 2.8, 1.25);
        group.add(pole2);

        let pole3 = new T.Mesh(horizontalPoleGeometry, poleMaterial);
        pole3.position.set(1.2, 2.8, -1.25);
        group.add(pole3);

        let pole4 = new T.Mesh(horizontalPoleGeometry, poleMaterial);
        pole4.position.set(-1.2, 2.8, -1.25);
        group.add(pole4);

        //horizonal poles:
        let horizontalPole1 = new T.Mesh(poleGeometry, poleMaterial);
        horizontalPole1.rotateZ(Math.PI / 2);
        horizontalPole1.position.set(0, 0.8, 1.3);
        group.add(horizontalPole1);

        let horizontalPole2 = new T.Mesh(poleGeometry, poleMaterial);
        horizontalPole2.rotateZ(Math.PI / 2);
        horizontalPole2.position.set(0, 0.8, -1.3);
        group.add(horizontalPole2);

        let horizontalPole3 = new T.Mesh(poleGeometry, poleMaterial);
        horizontalPole3.rotateZ(Math.PI / 2);
        horizontalPole3.rotateX(Math.PI / 2);
        horizontalPole3.position.set(1.3, 0.8, 0);
        group.add(horizontalPole3);

        let horizontalPole4 = new T.Mesh(poleGeometry, poleMaterial);
        horizontalPole4.rotateZ(Math.PI / 2);
        horizontalPole4.rotateX(Math.PI / 2);
        horizontalPole4.position.set(-1.3, 0.8, 0);
        group.add(horizontalPole4);

        //diagonal poles:
        let diagonalPole1 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole1.position.set(0, 4, 1.3);
        diagonalPole1.rotateZ(-0.36);
        group.add(diagonalPole1);

        let diagonalPole2 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole2.position.set(0, 4, 1.3);
        diagonalPole2.rotateZ(0.36);
        group.add(diagonalPole2);

        let diagonalPole3 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole3.position.set(0, 4, -1.3);
        diagonalPole3.rotateZ(-0.36);
        group.add(diagonalPole3);

        let diagonalPole4 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole4.position.set(0, 4, -1.3);
        diagonalPole4.rotateZ(0.36);
        group.add(diagonalPole4);

        let diagonalPole5 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole5.position.set(1.3, 4, 0);
        diagonalPole5.rotateY(Math.PI / 2);
        diagonalPole5.rotateZ(0.36);
        group.add(diagonalPole5);

        let diagonalPole6 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole6.position.set(1.3, 4, 0);
        diagonalPole6.rotateY(Math.PI / 2);
        diagonalPole6.rotateZ(-0.36);
        group.add(diagonalPole6);

        let diagonalPole7 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole7.position.set(-1.3, 4, 0);
        diagonalPole7.rotateY(Math.PI / 2);
        diagonalPole7.rotateZ(0.36);
        group.add(diagonalPole7);

        let diagonalPole8 = new T.Mesh(slantedPoleGeometry, poleMaterial);
        diagonalPole8.position.set(-1.3, 4, 0);
        diagonalPole8.rotateY(Math.PI / 2);
        diagonalPole8.rotateZ(-0.36);
        group.add(diagonalPole8);

        //ROOF:
        //vertices for the roof
        const vertices = new Float32Array([
            //ALL TRIANGLES ARE MADE IN CCW DIRECTION:
            //front
            0, 1.8, 0, //top
            -0.6, 1.0, 0.6, //left
            0.6, 1.0, 0.6, //right

            //right
            0, 1.8, 0, //top
            0.6, 1.0, 0.6, //left
            0.6, 1.0, -0.6, //right

            //back
            0, 1.8, 0, //top
            0.6, 1.0, -0.6, //left
            -0.6, 1.0, -0.6, //right

            //left
            0, 1.8, 0, //top
            -0.6, 1.0, -0.6, //left
            -0.6, 1.0, 0.6, //right

            //bottom (square - made of two triangles)
            0.6, 1.0, -0.6, //top right
            0.6, 1.0, 0.6, //bottom right
            -0.6, 1.0, 0.6, //bottom left

            -0.6, 1.0, 0.6, //bottom left
            -0.6, 1.0, -0.6, //top left
            0.6, 1.0, -0.6 //top right
        ]);

        //texture mapping for the roof:
        const uv = new Float32Array([
            //front
            0.25, 0,
            0, 0.8,
            0.5, 0.8,

            0.25, 0,
            0, 0.8,
            0.5, 0.8,

            0.25, 0,
            0, 0.8,
            0.5, 0.8,

            0.25, 0,
            0, 0.8,
            0.5, 0.8,

            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
        ]);

        //use bufferGeometry to connect the uvs and positions to the geometry
        let roofGeometry = new T.BufferGeometry();
        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv, 2));
        roofGeometry.computeVertexNormals();

        //create the roof mesh
        let roof = new T.Mesh(roofGeometry, roofMaterial);
        roof.scale.set(3, 3, 3);
        roof.position.set(0, 4, 0);
        group.add(roof);

        //create the group that will be rotated (we will create a hierarchy for articulated animation)
        const pivotGroup = new T.Group();

        //the main propellers (wooden sticks)
        const propellerGeometry = new T.BoxGeometry(0.25, 4, 0.2);
        const propeller1 = new T.Mesh(propellerGeometry, propellerMaterial);
        propeller1.position.set(0, 0, 0); //the main positions should be at the center 0,0,0
        pivotGroup.add(propeller1);

        const propeller2 = new T.Mesh(propellerGeometry, propellerMaterial);
        propeller2.position.set(0, 0, 0); //the main positions should be at the center 0,0,0
        propeller2.rotateZ(Math.PI / 2); //rotate so its perpendicular to the first one (it should lool like a cross when not moving)
        pivotGroup.add(propeller2);

        //now we will create the smaller wings that will rotate relative to the main propellers
        const wingGeometry = new T.BoxGeometry(0.4, 1.35, 0.05);
        const wing1 = new T.Mesh(wingGeometry, wingMaterial);
        wing1.position.set(0.3, 1.3, 0.1); //position relative to the first propeller
        wing1.rotateZ(Math.PI);
        propeller1.add(wing1); //attach to the first propeller (note that this is not to the pivotgroup!!)

        const wing2 = new T.Mesh(wingGeometry, wingMaterial);
        wing2.position.set(0.3, 1.3, 0.1);  //position relative to the second propeller
        wing2.rotateZ(Math.PI);
        propeller2.add(wing2); //attach to the second propeller (note that this is not to the pivotgroup!!)

        //now repeat for the final wings, they just need to be at the negated y and x values for proper positioning:
        const wing3 = new T.Mesh(wingGeometry, wingMaterial);
        wing3.position.set(-0.3, -1.3, 0.1);
        wing3.rotateZ(Math.PI);
        propeller1.add(wing3);

        const wing4 = new T.Mesh(wingGeometry, wingMaterial);
        wing4.position.set(-0.3, -1.3, 0.1);
        wing4.rotateZ(Math.PI);
        propeller2.add(wing4);

        //now we have created the hierarchy properly and the smaller wings will rotate relative to the main propellors,
        //so now we can just set the position and scale of the entire group based on what we prefer
        pivotGroup.position.set(0.2, 7, 1.8);
        pivotGroup.scale.set(1.5, 1.5, 1.5);

        //add the pivot group to the main group so it actually gets added to the world!
        group.add(pivotGroup);

        //now set the position,rotation, and scale based on what was passed into the constructor.
        group.position.set(x, y, z);
        group.rotation.y = theta;
        group.scale.set(scale, scale, scale);

        //make sure to call super!
        super("Windmill", group);

        //variable that will be used for the animation, we want to rotate the pivot group
        this.pivotGroup = pivotGroup;
    }

    //animating the propeller so that it rotates using the hierarchy we defined above (this is trivial and is not one of my
    //main behaviors for the project)
    stepWorld(delta) {
        //rotate propellers by the z axis (scale down delta so it doesnt move too fast)
        this.pivotGroup.rotation.z -= delta / 1000;
    }
}