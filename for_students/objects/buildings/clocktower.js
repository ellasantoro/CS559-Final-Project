/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let brickTexture = new T.TextureLoader().load("./images/towerWall.png");
let woodTexture = new T.TextureLoader().load("./images/wood.jpg");
let roofOutlookTexture = new T.TextureLoader().load("./images/roofOutlook2.png");
let roofTexture = new T.TextureLoader().load("./images/roof.jpeg");
let clockFaceTexture = new T.TextureLoader().load("./images/clockface.jpeg");

/**
 * This class makes the clocktower object (and its functionalities) in my town
 */
export class ClockTower extends GrObject {
    //constructor takes in x,y, and z for positioning the object, as well as an angle to rotate the object 
    constructor(x, y, z, angle) {
        //GROUPS:
        //main group and bell group - bell group is used specifically for animation as we want the bell to move
        //separately from the other parts of the clocktower
        let group = new T.Group();
        let bellGroup = new T.Group();

        //MATERIALS USED THROUGHOUT:
        let towerMaterial = new T.MeshStandardMaterial({
            color: "#edded5",
            map: brickTexture
        });

        let clockFaceMaterial = new T.MeshBasicMaterial({
            color: "#b5aca1",
            map: clockFaceTexture,

        });

        let woodMaterial = new T.MeshStandardMaterial({
            color: "#63422b",
            bumpMap: woodTexture,
            bumpScale: 100,
        });

        let clockHandMaterial = new T.MeshBasicMaterial({
            color: "black",
        });

        //GEOMETRIES & MESHES:
        //create the main base/tower for the clocktower:
        let towerGeometry = new T.BoxGeometry(5, 15, 5);
        let tower = new T.Mesh(towerGeometry, towerMaterial);
        tower.position.set(0, 8, 0);
        group.add(tower);

        //create the clock face for the clocktower
        let clockFaceGeometry = new T.CircleGeometry(2.5, 32);
        let clockFace = new T.Mesh(clockFaceGeometry, clockFaceMaterial);
        clockFace.position.set(0, 12, 2.55);
        group.add(clockFace);

        let clockFrameGeometry = new T.TorusGeometry(2.5, 0.25);
        let clockFrame = new T.Mesh(clockFrameGeometry, woodMaterial);
        clockFrame.position.set(0, 12, 2.55);
        group.add(clockFrame);

        //clock hands
        let hourHandGeometry = new T.PlaneGeometry(0.1, 2.5);
        let hourHand = new T.Mesh(hourHandGeometry, clockHandMaterial);
        hourHand.position.set(0, 12, 2.65);
        hourHand.rotation.z = -Math.PI / 2;
        group.add(hourHand);

        let minuteHandGeometry = new T.PlaneGeometry(0.1, 3.5);
        let minuteHand = new T.Mesh(minuteHandGeometry, clockHandMaterial);
        minuteHand.position.set(0, 12, 2.65);
        minuteHand.rotation.z = -Math.PI / 2;
        group.add(minuteHand);


        //the poles that frame the building:
        let verticlePoleGeometry = new T.CylinderGeometry(0.5, 0.5, 15);
        let horizontalPoleGeometry = new T.CylinderGeometry(0.4, 0.4, 6);
        let diagonalPoleGeometry = new T.CylinderGeometry(0.3, 0.3, 7);

        //apologies in advance for the multitude of poles in this objects:
        let pole1 = new T.Mesh(verticlePoleGeometry, woodMaterial);
        pole1.position.set(-2.8, 8, 2);
        group.add(pole1);

        let pole2 = new T.Mesh(verticlePoleGeometry, woodMaterial);
        pole2.position.set(2.8, 8, 2);
        group.add(pole2);

        let pole3 = new T.Mesh(verticlePoleGeometry, woodMaterial);
        pole3.position.set(-2.8, 8, -2);
        group.add(pole3);

        let pole4 = new T.Mesh(verticlePoleGeometry, woodMaterial);
        pole4.position.set(2.8, 8, -2);
        group.add(pole4);

        let pole5 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole5.position.set(0, 15.3, 2.3);
        pole5.rotateZ(Math.PI / 2);
        group.add(pole5);

        let pole6 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole6.position.set(0, 15.3, -2.3);
        pole6.rotateZ(Math.PI / 2);
        group.add(pole6);

        let pole7 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole7.position.set(-2.4, 15.3, 0);
        pole7.rotateZ(Math.PI / 2);
        pole7.rotateX(Math.PI / 2);
        group.add(pole7);

        let pole8 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole8.position.set(2.4, 15.3, 0);
        pole8.rotateZ(Math.PI / 2);
        pole8.rotateX(Math.PI / 2);
        group.add(pole8);

        let pole9 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole9.position.set(0, 5.3, 2.3);
        pole9.rotateZ(Math.PI / 2);
        group.add(pole9);

        let pole10 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole10.position.set(0, 5.3, -2.3);
        pole10.rotateZ(Math.PI / 2);
        group.add(pole10);

        let pole11 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole11.position.set(-2.4, 5.3, 0);
        pole11.rotateZ(Math.PI / 2);
        pole11.rotateX(Math.PI / 2);
        group.add(pole11);

        let pole12 = new T.Mesh(horizontalPoleGeometry, woodMaterial);
        pole12.position.set(2.4, 5.3, 0);
        pole12.rotateZ(Math.PI / 2);
        pole12.rotateX(Math.PI / 2);
        group.add(pole12);

        let pole13 = new T.Mesh(diagonalPoleGeometry, woodMaterial);
        pole13.position.set(0, 2.5, 2.29);
        pole13.rotateZ(Math.PI / 3.7);
        group.add(pole13);

        let pole14 = new T.Mesh(diagonalPoleGeometry, woodMaterial);
        pole14.position.set(0, 2.5, 2.29);
        pole14.rotateZ(-Math.PI / 3.7);
        group.add(pole14);

        let pole15 = new T.Mesh(diagonalPoleGeometry, woodMaterial);
        pole15.position.set(0, 2.5, -2.29);
        pole15.rotateZ(Math.PI / 3.7);
        group.add(pole15);

        let pole16 = new T.Mesh(diagonalPoleGeometry, woodMaterial);
        pole16.position.set(0, 2.5, -2.29);
        pole16.rotateZ(-Math.PI / 3.7);
        group.add(pole16);

        //ROOF GEOMETRIES: (using vertices & bufferGeometry):
        //vertices for roof part #1
        const vertices1 = new Float32Array([
            //ALL TRIANGLES ARE BUILT IN CCW DIRECTION
            //right rectangle
            0, 1.8, 0.6, //top left
            0.57, 0.935, 0.57, //bottom left
            0.57, 0.935, -1, //bottom right

            0.57, 0.935, -1, //bottom right
            0, 1.8, -1, //top right
            0, 1.8, 0.6, //top left

            //left rectangle
            -0.57, 0.935, -1, //bottom left
            -0.57, 0.935, 0.57, //bottom right
            0, 1.8, 0.6, //top right

            0, 1.8, 0.6, //top right
            0, 1.8, -1, //top left
            -0.57, 0.935, -1, //bottom left
        ]);

        //texture mapping for roof part #1
        const uv1 = new Float32Array([
            //right rectangle:
            0, 1,
            0, 0,
            1, 0,

            1, 0,
            1, 1,
            0, 1,

            //left rectangle
            0, 0,
            1, 0,
            1, 1,

            1, 1,
            0, 1,
            0, 0,
        ]);

        //vertices for roof part #2
        const vertices2 = new Float32Array([
            //front
            0, 1.8, 0.6, //top
            -0.6, 1, 0.6, //left
            0.6, 1, 0.6, //right
            //back
            0, 1.8, -1, //top
            0.6, 1, -1, //left
            -0.6, 1, -1, //right
        ]);

        //texture mapping for roof part #2
        const uv2 = new Float32Array([
            //front
            0.5, 0.95,
            0.92, 0.05,
            0.075, 0.05,

            //back
            0.5, 0.95,
            0.075, 0.05,
            0.92, 0.05,
        ]);


        //create roof part #1 using bufferGeometry - connect vertices & uv to the bufferGeometry using bufferAttribute.
        let roofGeometry = new T.BufferGeometry();
        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices1, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv1, 2));
        roofGeometry.computeVertexNormals();

        //the outlooks use different vertices & mapping since I wanted it to be a different texture from the roof; I wanted it to look like a wall / window
        let outlookGeometry = new T.BufferGeometry();
        outlookGeometry.setAttribute("position", new T.BufferAttribute(vertices2, 3));
        outlookGeometry.setAttribute("uv", new T.BufferAttribute(uv2, 2));
        outlookGeometry.computeVertexNormals();

        //create roof part #1 using bufferGeometry - connect vertices & uv to the bufferGeometry using bufferAttribute.
        let roofGeometry2 = new T.BufferGeometry();
        roofGeometry2.setAttribute("position", new T.BufferAttribute(vertices1, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv1, 2));
        roofGeometry.computeVertexNormals();

        //the outlooks use different vertices & mapping since I wanted it to be a different texture from the roof; I wanted it to look like a wall / window
        let outlookGeometry2 = new T.BufferGeometry();
        outlookGeometry2.setAttribute("position", new T.BufferAttribute(vertices2, 3));
        outlookGeometry2.setAttribute("uv", new T.BufferAttribute(uv2, 2));
        outlookGeometry2.computeVertexNormals();

        //create the materials & textures for the roof
        let roofMaterial = new T.MeshStandardMaterial({
            color: "#63422b",
            map: roofTexture,
            bumpMap: roofTexture,
            bumpScale: 4,
        });

        let roofOutlookMaterial = new T.MeshStandardMaterial({
            color: "#d9bfad",
            map: roofOutlookTexture,
            bumpMap: roofOutlookTexture,
            bumpScale: 3,
        });

        //now that we've done all of the parts, lets put it all together and make the meshes!
        let roof = new T.Mesh(roofGeometry, roofMaterial);
        roof.scale.set(4.2, 6.2, 4.2);
        roof.position.set(0, 9.5, 0.8);
        group.add(roof);

        let roofOutlook = new T.Mesh(outlookGeometry, roofOutlookMaterial);
        roofOutlook.scale.set(4.2, 6.2, 4.2);
        roofOutlook.position.set(0, 9.5, 0.75);
        group.add(roofOutlook);

        let roof2 = new T.Mesh(roofGeometry, roofMaterial);
        roof2.scale.set(4.2, 6.2, 4.2);
        roof2.rotateY(Math.PI / 2);
        roof2.position.set(0.9, 9.5, -0.1);
        group.add(roof2);

        let outlook2 = new T.Mesh(outlookGeometry, roofOutlookMaterial);
        outlook2.scale.set(4.2, 6.2, 4.2);
        outlook2.rotateY(Math.PI / 2);
        outlook2.position.set(0.9, 9.5, -0.1);
        group.add(outlook2);

        //MAKKING THE BELL:
        //Materials used throughout:
        let bellMaterial = new T.MeshPhongMaterial({
            color: "#bf914d",
            specular: "#edcc9a",
            shininess: 30,
            side: T.DoubleSide,
        });

        let bellLineMaterial = new T.MeshStandardMaterial({
            color: "black",
        });

        //create the small poles that will be attatched to the bell
        //geometry for the bell poles:
        let bellPoleGeometry = new T.CylinderGeometry(0.2, 0.2, 4);

        let leftBellPole = new T.Mesh(bellPoleGeometry, woodMaterial);
        leftBellPole.position.set(-1, 15, 0);
        //add to the bellGroup - we will use to animate this later 
        bellGroup.add(leftBellPole);

        let rightBellPole = new T.Mesh(bellPoleGeometry, woodMaterial);
        rightBellPole.position.set(1, 15, 0);
        //add to the bellGroup - we will use to animate this later 
        bellGroup.add(rightBellPole);

        //now lets make the actual bell!
        let bellGeometry = new T.SphereGeometry(0.8, 5, 16, 0, Math.PI * 2, 0, 2.1);
        let bell = new T.Mesh(bellGeometry, bellMaterial);
        bell.position.set(0, 15, 0);
        bellGroup.add(bell);

        //create a little square at the top of the bell so it looks more like a bell shape:
        let bellTop = new T.BoxGeometry(0.25, 0.5, 0.5);
        let bellTopMesh = new T.Mesh(bellTop, bellMaterial);
        bellTopMesh.position.set(0, 15, 0);
        bellGroup.add(bellTopMesh);

        //create the line that is "tied" to each end of a bell pole, and that the bell will "hang" off of:
        let bellLineGeometry = new T.CylinderGeometry(0.04, 0.04, 2);
        let bellLine = new T.Mesh(bellLineGeometry, bellLineMaterial);
        bellLine.position.set(0, 15.8, 0);
        bellLine.rotateZ(Math.PI / 2);
        bellGroup.add(bellLine);

        //make sure to add the bellGroup to the group, otherwise it won't be added to the world!
        group.add(bellGroup);
        group.position.set(x, y, z);
        group.rotateY(angle);

        //make sure to call super!!
        super("Clocktower", group);

        //VARIABLES THAT WILL BE USED IN ANIMATION (stepworld)
        this.minuteHand = minuteHand;
        this.hourHand = hourHand;
        this.baseRotation = 0;
        this.bellGroup = bellGroup;
        this.time = 0;
        this.raiseBell = true;
        this.rotationBell = bell;
    }

    /**
     * step function used to animate the bell. It will raise from outside of the clocktower, stop at a certain height,
     * start ringing for a small period of time, stop ringing, and then lower down until it is no longer visible. this will continue
     * every time the clock hits the top! (keep in mind that if the hour hand reaches the top, but its only been a half rotation, it won't raise,
     * it needs to be one FULL rotation, then when it hits the top it will raise.)
     * 
     * @param {*} deltaTime 
     */
    stepWorld(deltaTime) {
        const oscillationFrequency = 500;
        const maxRockAngle = Math.PI / 6;

        //these variables are used because when you increase the delta slider past a certain point, the bell comes up for barely a split second, so I made it so
        //that if the delta is past a certain value, the stay time and amount it lifts by (lower = slower speed) increases so you can actually see it
        let deltScaleStay = 0;
        let deltScaleLift = 0;
        if (deltaTime >= 50) {
            deltScaleStay = 0.5;
            deltScaleLift = 0.1;
        }
        //using this way instead of just using the deltaTime helps a lot in the clock hands calculation because its elapsed time as opposed to just time. I tried scaling
        //this at first but the issue with it is that if you use the speed slider, the timing gets all messed up because you are adding a scaled version to the elapsed time. 
        //instead, I affect other variables within the calculations below so that it isn't moving at super speed.
        this.time += deltaTime

        //calculating the rotation for the minute and hour hands
        //full rotation is 2pi so we multiply that by the fraction that represents the relative position of the minute hand based on the current elapsed time.
        //the 3600 represents the minutes because there are 60 of them in an hour (3600 seconds), and then 43200 comes from the fact that a clock has hours 1-12 (so we
        //aren't thinking about 24 hours), thus we have 12 hours in seconds is 43200 which is a full 12 hour rotation.
        let minuteRotation = this.baseRotation + (2 * Math.PI * (this.time % 3600) / 3600);
        let hourRotation = this.baseRotation + (2 * Math.PI * (this.time % 43200) / 43200);

        //apply the calculated rotation to the clock hands:
        this.minuteHand.rotation.z = minuteRotation;
        this.hourHand.rotation.z = hourRotation;
        //this condition will tell us when to raise the bell, it is based off of the hourRotation, whenever it equals 2PI or 0 which indicates a cycle is done and the bell 
        //should be raised (i noticed it was too specific and wouldnt raise when i used == so i just used a 0.1 tolerance for if the time goes too fast for the condition to be caught)
        if ((hourRotation - Math.PI * 2 >= -0.1 && hourRotation - Math.PI * 2 <= 0.1) || (hourRotation <= 0.1 && hourRotation >= -0.1)) {
            this.raiseBell = true;
        }

        //then, after we have determined whether or not we should raise the bell in the above if statement, then we will execute the following code
        if (this.raiseBell) {
            //only continuously increase the y positiion if its below 7, 7 is the max height that the bell will raise when it goes off.
            if (this.bellGroup.position.y <= 7) {
                //raise the bell, see esxplanation above for the deltScaleLift reasoning
                this.bellGroup.position.y += 0.1 + deltScaleLift;
            } else {
                //if the bell has been fully raised (ie its reached above 7 and is now y=7.1, then we want to start ringing the bell)
                //ringing the bell is done using a function with a rocking value multiplied by a sin function that takes our elapsed time and multiplies it
                //by the oscillating frequencies which is the # of oscillations in a cycle. this format is taken from a previous workbook of mine, but altered to fit 
                //this specific animation. the time is scaled down a lot because i was unable to scale it down when the variable is created - see explanation above.
                this.rotationBell.rotation.x += maxRockAngle * Math.sin(this.time / 10000 * oscillationFrequency);
            }
            //then, if the bell has been ringing for a certain period of time (chose 0.8 based on what values i saw when I console.logged it and thought it had been ringing for enough time,
            //i just took that value and used it here to determine how long I wanted the bell to actually keep ringing)
            if (hourRotation >= 0.8 + deltScaleStay) {
                //at this point we have finished an entire animation iteration, so the bell has lifted, rung, and is now ready to be lowered.
                this.raiseBell = false;
            }
        }

        //the above code (if the bell is raised) will naturally flow to this code as we just set the raiseBell value to false once it stops ringing,
        //now we were ready to lower it, but we will only lower it to 0, not any lower.
        if (!this.raiseBell) {
            if (this.bellGroup.position.y >= 0) {
                this.bellGroup.position.y -= 0.1;
            }
        }
    }
}

