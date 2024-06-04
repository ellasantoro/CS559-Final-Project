/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let wall = new T.TextureLoader().load("./images/medievalWall2.png");
let wood = new T.TextureLoader().load("./images/wood.jpg");
let roofTexture = new T.TextureLoader().load("./images/roof2.jpeg");

/**
 * this class creates one type of medieval house for my town
 */
export class MedievalStructure extends GrObject {
    constructor(x, y, z) {
        let group = new T.Group();

        //MATERIALS (used throughout, but all defined here):
        let baseMaterial = new T.MeshStandardMaterial({
            map: wall,
            bumpMap: wall,
            bumpScale: 5
        });

        let roofMaterial = new T.MeshStandardMaterial({
            bumpMap: roofTexture,
            bumpScale: 5,
            color: "#917861"
        });

        let poleMaterial = new T.MeshStandardMaterial({
            color: "#755535",
            bumpMap: wood,
            bumpScale: 100,
        });

        //ROOF:
        let roofGeometry = new T.BufferGeometry();
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
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //right
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //back
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //left
            0.25, 0, //top
            0, 0.8, //left
            0.5, 0.8, //right

            //using -1's for the bottom since we don't need the roof texture on the bottom square and -1
            //makes it out of bounds for the uvs:
            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,
        ]);

        //set the attributes & compute vertex normals for both the base and the roof (this code is taken from examples & class - code given to us)
        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv, 2));
        roofGeometry.computeVertexNormals();

        //create the roof using the above vertices/uvs
        let roof = new T.Mesh(roofGeometry, roofMaterial);
        roof.position.set(0, -3, 0);
        roof.scale.set(3, 4, 3);
        group.add(roof);

        let sideRoofGeometry = new T.BoxGeometry(2.5, 0.25, 3);
        let sideRoof = new T.Mesh(sideRoofGeometry, roofMaterial);
        sideRoof.position.set(2.8, 0.5, 0);
        sideRoof.rotateZ(-Math.PI / 10);
        group.add(sideRoof);

        //WALLS:
        let baseGeometry = new T.BoxGeometry(3, 3, 3);
        let base = new T.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, -0.5, 0);
        group.add(base);

        //POLES (for the side roof):
        let poleGeometry = new T.CylinderGeometry(.1, 0.1, 2.3);
        let pole = new T.Mesh(poleGeometry, poleMaterial);
        pole.position.set(3.6, -0.8, 1);
        group.add(pole);

        let pole2 = new T.Mesh(poleGeometry, poleMaterial);
        pole2.position.set(3.6, -0.8, -1);
        group.add(pole2);

        //set the group position based off of what was passed in through the constructor
        group.position.set(x, y + 2, z);

        //remember to call super!
        super("Medieval House - Style 3", group);
    }
}