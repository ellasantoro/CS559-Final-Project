/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

/**
 * this class creates the boat object for my town, including animation.
 * 
 */
export class Boat extends GrObject {
    constructor(x, y, z) {
        let group = new T.Group();
        //vertices for the bottom part of the boat since its an odd shape
        const vertices = new Float32Array([
            //ALL VERTICES IN CCW DIRECTION
            -1, 0, 1.2, //top left
            -1, 0, 0, //bottom left
            1, 0, 0, //bottom right

            1, 0, 0, //bottom right
            1, 0, 1.2, //top right
            -1, 0, 1.2, //top left

            //front:
            1, 0, 1.2, //left
            1, 0, 0, //right
            1.5, 0, 0.6, //top

            //back:
            -1, 0, 1.2,
            -1.5, 0, 0.9,
            -1, 0, 0.6,

            -1, 0, 0.6,
            -1.5, 0, 0.9,
            -1.5, 0, 0.3,

            -1.5, 0, 0.3,
            -1, 0, 0,
            -1, 0, 0.6,

        ]);

        //create the rest of the parts of the boat:
        let boatGeometry = new T.BufferGeometry();
        boatGeometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        boatGeometry.computeVertexNormals();
        //MATERIALS:
        let boatMat = new T.MeshStandardMaterial({ color: "#735334", side: T.DoubleSide });
        let boatMat2 = new T.MeshStandardMaterial({ color: "#4a3623", side: T.DoubleSide });

        let boatMesh = new T.Mesh(boatGeometry, boatMat);
        boatMesh.scale.set(3, 3, 3);
        group.add(boatMesh);

        //SIDE WALLS:
        let longWallGeometry = new T.BoxGeometry(2, 0.5, 0.15);
        let longWallMesh = new T.Mesh(longWallGeometry, boatMat);
        longWallMesh.position.set(0, 0.7, 0.35);
        longWallMesh.scale.set(3, 3, 3);
        group.add(longWallMesh);

        let longWallMesh2 = new T.Mesh(longWallGeometry, boatMat);
        longWallMesh2.position.set(0, 0.7, 3.28);
        longWallMesh2.scale.set(3, 3, 3);
        group.add(longWallMesh2);

        let shortWallGeometry = new T.BoxGeometry(0.8, 0.5, 0.15);
        let shortWallMesh = new T.Mesh(shortWallGeometry, boatMat);
        shortWallMesh.position.set(3.7, 0.7, 1);
        shortWallMesh.rotateY(-Math.PI / 4);
        shortWallMesh.scale.set(3, 3, 3);
        group.add(shortWallMesh);

        let shortWallMesh2 = new T.Mesh(shortWallGeometry, boatMat);
        shortWallMesh2.position.set(3.7, 0.7, 2.6);
        shortWallMesh2.rotateY(Math.PI / 4);
        shortWallMesh2.scale.set(3, 3, 3);
        group.add(shortWallMesh2);

        //BACK WALLS
        let backWallGeometry = new T.BoxGeometry(0.55, 0.5, 0.15);
        let backWallMesh = new T.Mesh(backWallGeometry, boatMat);
        backWallMesh.position.set(-3.7, 0.7, 0.7);
        backWallMesh.rotateY(Math.PI / 6);
        backWallMesh.scale.set(3, 3, 3);
        group.add(backWallMesh);

        let backWallMesh2 = new T.Mesh(backWallGeometry, boatMat);
        backWallMesh2.position.set(-3.6, 0.7, 2.9);
        backWallMesh2.rotateY(-Math.PI / 6);
        backWallMesh2.scale.set(3, 3, 3);
        group.add(backWallMesh2);

        let backWallMesh3 = new T.Mesh(backWallGeometry, boatMat);
        backWallMesh3.position.set(-4.2, 0.7, 1.9);
        backWallMesh3.rotateY(Math.PI / 2);
        backWallMesh3.scale.set(3, 3, 3);
        group.add(backWallMesh3);

        ///INNER BOAT (little cylinders inside)
        let innerBoatGeometry = new T.CylinderGeometry(0.1, 0.1, 0.9);
        let innerBoatMesh = new T.Mesh(innerBoatGeometry, boatMat2);
        innerBoatMesh.position.set(-1.5, 0.7, 1.9);
        innerBoatMesh.rotateX(Math.PI / 2);
        innerBoatMesh.scale.set(3, 3, 3);
        group.add(innerBoatMesh);

        let innerBoatMesh2 = new T.Mesh(innerBoatGeometry, boatMat2);
        innerBoatMesh2.position.set(1.5, 0.7, 1.9);
        innerBoatMesh2.rotateX(Math.PI / 2);
        innerBoatMesh2.scale.set(3, 3, 3);
        group.add(innerBoatMesh2);

        //PADDLES (on the side)
        let paddleHandleGeometry = new T.CylinderGeometry(0.05, 0.05, 0.9);
        let paddleHandleMesh = new T.Mesh(paddleHandleGeometry, boatMat2);
        paddleHandleMesh.position.set(0.5, 1.4, 3.8);
        paddleHandleMesh.rotateZ(-Math.PI / 3);
        paddleHandleMesh.scale.set(3, 3, 3);
        group.add(paddleHandleMesh);

        let paddleHandleMesh2 = new T.Mesh(paddleHandleGeometry, boatMat2);
        paddleHandleMesh2.position.set(0.5, 1.4, 0);
        paddleHandleMesh2.rotateZ(-Math.PI / 3);
        paddleHandleMesh2.scale.set(3, 3, 3);
        group.add(paddleHandleMesh2);

        //OARS (end of the paddles)
        let paddleOarGeometry = new T.BoxGeometry(0.25, 0.2, 0.02);
        let paddleOarMesh = new T.Mesh(paddleOarGeometry, boatMat2);
        paddleOarMesh.position.set(-0.8, 0.7, 4);
        paddleOarMesh.rotateZ(Math.PI / 7);
        paddleOarMesh.scale.set(3, 3, 3);
        group.add(paddleOarMesh);

        let paddleOarMesh2 = new T.Mesh(paddleOarGeometry, boatMat2);
        paddleOarMesh2.position.set(-0.8, 0.7, 0);
        paddleOarMesh2.rotateZ(Math.PI / 7);
        paddleOarMesh2.scale.set(3, 3, 3);
        group.add(paddleOarMesh2);

        //set the group scale and position, and call super
        group.scale.set(0.5, 0.5, 0.6);
        group.position.set(x, y, z);
        super("Boat", group);

        //VARIABLES USED IN ANIMATION
        this.xdirection = 1;
        this.speed = 0.006;
        this.isTurning = false;
        this.pauseStartTime = null;
        this.x = x;

        //make sure the boat is rideable
        this.ridePoint = new T.Object3D();
        this.ridePoint.rotateY(Math.PI / 2);
        this.ridePoint.translateY(2.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }

    //animation for the boat
    stepWorld(delta) {
        const xMaxDistance = this.x + 7;
        const xMinDistance = this.x - 5;
        const rotationSpeed = 0.03;

        //TWO CASES FOR THE BOAT: if its turning and if its not
        //if its not turning, we need to calculate the next target rotation, and we need to progress the boat forward
        //along the water:
        if (!this.isTurning) {
            //calculate how much we should move by, taking into acount speed & direction 
            const xMovement = this.xdirection * this.speed * delta;
            this.objects[0].position.x += xMovement;

            //this if statement defines the max distance we can travel (cant go past a certain x value)
            if (this.objects[0].position.x >= xMaxDistance || this.objects[0].position.x <= xMinDistance) {
                //if we have reached the edge of the lake, we need to change direction and we need to start our turning process,
                //so we set isTurning to true. We also need to calculate what we want our target rotation to be since it depends on which edge
                //we are at. if the position of x is graeter than the max distance, then we're at the left edge and we want to rotate to the angle Math.PI,
                //otherwise we want to rotate to the angle Math.PI * 2
                this.xdirection *= -1;
                this.isTurning = true;
                this.targetRotation = this.objects[0].position.x >= xMaxDistance ? Math.PI : Math.PI * 2;
            }

        }

        //if the object is turning, then we will use the previously calculated target rotation and we will increase the y rotation
        //until we get to the desired angle. 
        if (this.isTurning) {
            if (this.objects[0].rotation.y < this.targetRotation) {
                this.objects[0].rotation.y += rotationSpeed;
            } else if (this.objects[0].rotation.y > this.targetRotation) {
                this.objects[0].rotation.y -= rotationSpeed;
            }

            //if we have reached the correct target rotation (using tolerance so it doesnt have to be so exact),
            //then we can just ensure that the rotation is set to the target rotation (in case it gets a little off, even just a bit off can add up over time),
            //and then we need to make sure to switch isTurning to false.
            if (Math.abs(this.objects[0].rotation.y - this.targetRotation) < rotationSpeed) {
                this.objects[0].rotation.y = this.targetRotation;
                this.isTurning = false;
            }
        }
    }
}   
