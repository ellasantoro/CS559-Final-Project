/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

/**
 * This class creates the bird object for my town (including animation)
 */
export class Bird extends GrObject {
    //constructor that takes in x,y,z for position, radius and height for the path that the birds travel in
    constructor(x, y, z, radius, height, scale) {
        let group = new T.Group();
        //MATERIALS:
        const birdBodyMaterial = new T.MeshStandardMaterial({
            color: "black",
            side: T.DoubleSide,
        });

        //WINGS:
        //weird values because i designed it in the three.js online demo
        let wingGeometry = new T.TorusGeometry(0.851, 0.09, 18, 120, 1.35686);
        let leftWing = new T.Mesh(wingGeometry, birdBodyMaterial);
        leftWing.rotateZ(Math.PI / 4);
        group.add(leftWing);

        let rightWing = new T.Mesh(wingGeometry, birdBodyMaterial);
        rightWing.rotateZ(1);

        rightWing.position.set(1.19, 0, 0);
        group.add(rightWing);

        group.scale.set(scale, scale, scale);
        super("Bird", group);

        //VARIABLES FOR ANIMATION:
        this.group = group;
        this.time = 0;
        this.leftWing = leftWing;
        this.rightWing = rightWing;
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.height = height;
    }

    //animation for the bird - includes positional updates for flight path, rotation for the entire bird to face where it is flying,
    //and rotation for the wings so that they look like they are flapping.
    stepWorld(delta) {

        //ellapsed time, used and explained in other files (namely the clocktower file)
        this.time += delta;

        const loopPeriod = 20;

        //calculating the bird's x,y, and z position based on circular motion with oscillation
        //use the radius and height that was given in the constructor, use 2*PI as in a full circle to travel, and multiply 
        //based on how far we've traveled
        const x = this.radius * Math.cos((2 * Math.PI * this.time / 500) / loopPeriod);
        const z = this.radius * Math.sin((2 * Math.PI * this.time / 500) / loopPeriod);
        const y = this.height * Math.sin((2 * Math.PI * this.time / 500) / loopPeriod); // Vertical oscillation

        //use the above calculations to make the bird actually travel (adds it to the base height that its at)
        this.group.position.set(x + this.x, y + this.y, z + this.z);

        //calculate the direction so that the bird can face forward we will use the same calculations as above (but without y)
        //as in past projects, we will use atan2 to rotate the bird so that it faces the correct direction and looks like its facing where its flying.
        const angle = Math.atan2(-Math.sin((2 * Math.PI * this.time / 500) / loopPeriod), Math.cos((2 * Math.PI * this.time / 500) / loopPeriod));
        //make sure to actually apply the rotation:
        this.group.rotation.y = angle;

        const wingFlapSpeed = 0.02;
        //the maximum rotation for the wings:
        const wingFlapAmplitude = Math.PI / 100;

        //similar to my watchtower bell rotation, we will calculate how the wings oscillate using sin functions
        //make sure the right is the negated version otherwise they would rotate the same way which looks wrong
        const leftWingFlap = wingFlapAmplitude * Math.sin(this.time * wingFlapSpeed);
        const rightWingFlap = -wingFlapAmplitude * Math.sin(this.time * wingFlapSpeed);

        //apply the rotations:
        this.leftWing.rotation.z += leftWingFlap;
        this.rightWing.rotation.z += rightWingFlap;
    }
}