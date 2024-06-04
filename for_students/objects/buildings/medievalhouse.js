/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let wallTexture = new T.TextureLoader().load("./images/medievalWall3.png");
let baseTexture = new T.TextureLoader().load("./images/stoneBase.jpg");
let woodTexture = new T.TextureLoader().load("./images/wood.jpg");
let roofTexture = new T.TextureLoader().load("./images/roof.jpeg");
let roofOutlookTexture = new T.TextureLoader().load("./images/frontRoof.png");
let roofFrontTexture = new T.TextureLoader().load("./images/roofOutlook2.png");

/**
 * This class makes one of the medieval house types in my town.
 */
export class MedievalHouse extends GrObject {
    //this constructor takes in x,y,z values for the position of the house, as well as the rotation angle, scaling 
    //value, and two colors that indicate the color of the roof and the color of the outlook
    constructor(x, y, z, angle, color, color2, scale) {
        let group = new T.Group();
        //MATERIALS: (used throughout the file, all defined here):
        let houseMaterial = new T.MeshStandardMaterial({
            color: "#f0d8c7",
            map: wallTexture,
            bumpMap: wallTexture,
            bumpScale: 3,
        });

        let baseMaterial = new T.MeshStandardMaterial({
            color: "#f2e1d5",
            map: baseTexture,
            bumpMap: baseTexture,
            bumpScale: 200,
        });

        let pyramidMaterial = new T.MeshStandardMaterial({
            color: "#665649",
            bumpMap: wallTexture,
            bumpScale: 30,
        });

        let rodMaterial = new T.MeshStandardMaterial({
            color: "#665649",
            bumpMap: woodTexture,
            bumpScale: 30,
        });

        let poleMaterial = new T.MeshStandardMaterial({
            color: "#665649",
            bumpMap: woodTexture,
            bumpScale: 30,
        });

        let roofMaterial = new T.MeshStandardMaterial({
            color: color,
            map: roofTexture,
            bumpMap: roofTexture,
            bumpScale: 5,
            roughness: 0.75,
        });

        let outlookMaterial = new T.MeshStandardMaterial({
            color: "#f0d8c7",
            map: roofOutlookTexture,
            bumpMap: roofOutlookTexture,
            bumpScale: 5,
            roughness: 0.75,
        });

        let dormerMaterial = new T.MeshStandardMaterial({
            color: color2,
            bumpMap: roofFrontTexture,
            bumpScale: 10,
            roughness: 0.75,
        });

        //BASE (cobblestone below the walls):
        let baseGeometry = new T.BoxGeometry(6, 3, 4);
        let base = new T.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 1, 0);
        group.add(base);

        //WALLS:
        let wallGeometry = new T.BoxGeometry(6.25, 4, 4.6);
        let wall = new T.Mesh(wallGeometry, houseMaterial);
        wall.position.set(0, 3, 0);
        group.add(wall);

        //PERCH: perches that are on the wood outlines of the base:
        let perchGeometry = new T.ConeGeometry(0.25, 0.3, 3);
        let perchGeometry2 = new T.CylinderGeometry(0.1, 0.1, 1.5);
        let horizontalPerchGeometry = new T.CylinderGeometry(0.1, 0.1, 6);
        let horizSidePerchGeometry = new T.CylinderGeometry(0.1, 0.1, 4);

        let perch1 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch1.rotateX(Math.PI / 2 - 0.3);
        perch1.position.set(2.8, 0.9, 2.2);
        group.add(perch1);

        let perch2 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch2.rotateX(Math.PI / 2 - 0.3);
        perch2.position.set(-1, 0.9, 2.2);
        group.add(perch2);

        let perch3 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch3.rotateX(Math.PI / 2 - 0.3);
        perch3.position.set(1, 0.9, 2.2);
        group.add(perch3);

        let perch4 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch4.rotateX(Math.PI / 2 - 0.3);
        perch4.position.set(-2.8, 0.9, 2.2);
        group.add(perch4);

        let horizPerch1 = new T.Mesh(horizontalPerchGeometry, rodMaterial);
        horizPerch1.rotateZ(Math.PI / 2);
        horizPerch1.position.set(0, 0.9, 2);
        group.add(horizPerch1);
        group.position.set(x, y, z);

        //back side:
        let perch5 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch5.rotateX(Math.PI / 2 - 0.3);
        perch5.position.set(2.8, 0.9, -2.2);
        group.add(perch5);

        let perch6 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch6.rotateX(Math.PI / 2 - 0.3);
        perch6.position.set(-1, 0.9, -2.2);
        group.add(perch6);

        let perch7 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch7.rotateX(Math.PI / 2 - 0.3);
        perch7.position.set(1, 0.9, -2.2);
        group.add(perch7);

        let perch8 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch8.rotateX(Math.PI / 2 - 0.3);
        perch8.position.set(-2.8, 0.9, -2.2);
        group.add(perch8);

        let horizPerch2 = new T.Mesh(horizontalPerchGeometry, rodMaterial);
        horizPerch2.rotateZ(Math.PI / 2);
        horizPerch2.position.set(0, 0.9, -2);
        group.add(horizPerch2);
        group.position.set(x, y, z);

        //LEFT SIDE:
        let perch9 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch9.rotateX(Math.PI / 2 - 0.3);
        perch9.position.set(3.1, 0.9, 1.8);
        group.add(perch9);

        let perch10 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch10.rotateX(Math.PI / 2 - 0.3);
        perch10.position.set(3.1, 0.9, -1.8);
        group.add(perch10);

        let perch11 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch11.rotateX(Math.PI / 2 - 0.3);
        perch11.position.set(3.1, 0.9, 0.6);
        group.add(perch11);

        let perch12 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch12.rotateX(Math.PI / 2 - 0.3);
        perch12.position.set(3.1, 0.9, -0.6);
        group.add(perch12);

        let horizPerch3 = new T.Mesh(horizSidePerchGeometry, rodMaterial);
        horizPerch3.rotateZ(Math.PI / 2);
        horizPerch3.rotateX(Math.PI / 2);
        horizPerch3.position.set(3, 0.9, 0);
        group.add(horizPerch3);
        group.position.set(x, y, z);

        //RIGHT SIDE:
        let perch13 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch13.rotateX(Math.PI / 2 - 0.3);
        perch13.position.set(-3.1, 0.9, 1.8);
        group.add(perch13);

        let perch14 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch14.rotateX(Math.PI / 2 - 0.3);
        perch14.position.set(-3.1, 0.9, -1.8);
        group.add(perch14);

        let perch15 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch15.rotateX(Math.PI / 2 - 0.3);
        perch15.position.set(-3.1, 0.9, 0.6);
        group.add(perch15);

        let perch16 = new T.Mesh(perchGeometry, pyramidMaterial);
        perch16.rotateX(Math.PI / 2 - 0.3);
        perch16.position.set(-3.1, 0.9, -0.6);
        group.add(perch16);

        let horizPerch4 = new T.Mesh(horizSidePerchGeometry, rodMaterial);
        horizPerch4.rotateZ(Math.PI / 2);
        horizPerch4.rotateX(Math.PI / 2);
        horizPerch4.position.set(-3, 0.9, 0);
        group.add(horizPerch4);

        let poleMesh = new T.Mesh(perchGeometry2, poleMaterial);
        poleMesh.position.set(2.98, 0.1, 1.98);
        group.add(poleMesh);

        let poleMesh2 = new T.Mesh(perchGeometry2, poleMaterial);
        poleMesh2.position.set(-2.98, 0.1, 1.98);
        group.add(poleMesh2);

        let poleMesh3 = new T.Mesh(perchGeometry2, poleMaterial);
        poleMesh3.position.set(2.98, 0.1, -1.98);
        group.add(poleMesh3);

        let poleMesh4 = new T.Mesh(perchGeometry2, poleMaterial);
        poleMesh4.position.set(-2.98, 0.1, -1.98);
        group.add(poleMesh4);


        //ROOF:
        //main roof portion vertices:
        const vertices = new Float32Array([
            //ALL TRIANGLES ARE BUILT IN CCW DIRECTION
            //right rectangle
            0, 1.8, 0.6, //top left
            0.6, 1, 0.6, //bottom left
            0.6, 1, -1, //bottom right

            0.6, 1, -1, //bottom right
            0, 1.8, -1, //top right
            0, 1.8, 0.6, //top left

            //left rectangle
            -0.6, 1, -1, //bottom left
            -0.6, 1, 0.6, //bottom right
            0, 1.8, 0.6, //top right

            0, 1.8, 0.6, //top right
            0, 1.8, -1, //top left
            -0.6, 1, -1, //bottom left


            //roof bottom
            0.6, 1, 0.6,
            -0.6, 1, 0.6,
            -0.6, 1, -1,
            -0.6, 1, -1,
            0.6, 1, -1,
            0.6, 1, 0.6,

            //left side (slanted)
            0.6, 1.07, 0.2, //bottom right
            0.6, 1.47, -0.2, //top right
            -0.6, 1.47, -0.2, //top left

            -0.6, 1.47, -0.2,//top left
            -0.6, 1.07, 0.2, //bottom left
            0.6, 1.07, 0.2, //bottom right

            //right side (slanted):
            -0.6, 1.07, -0.6, //bottom right
            -0.6, 1.47, -0.2, //top right
            0.6, 1.47, -0.2, //top left

            0.6, 1.47, -0.2, //top left
            0.6, 1.07, -0.6, //bottom left
            -0.6, 1.07, -0.6, //bottom right
        ]);

        //texture mapping for the main portion of the roof
        const uv = new Float32Array([
            1, 0.8,
            1, 0,
            0.5, 0,

            0.5, 0,
            0.5, 0.8,
            1, 0.8,

            0.5, 0,
            1, 0,
            1, 0.8,

            1, 0.8,
            0.5, 0.8,
            0.5, 0,

            -1, -1,
            -1, -1,
            -1, -1,

            -1, -1,
            -1, -1,
            -1, -1,

            1, 0,
            1, 1,
            0.5, 1,

            0.5, 1,
            0.5, 0,
            1, 0,

            0.5, 0,
            0.5, 1,
            1, 1,

            1, 1,
            1, 0,
            0.5, 0,
        ]);

        //vertices for the roof outlooks
        const vertices2 = new Float32Array([
            //front:
            0.6, 1.47, -0.2, //top
            0.6, 1.07, 0.2, //left
            0.6, 1.07, -0.6, //right

            //front (on the other side):
            -0.6, 1.47, -0.2, //top
            -0.6, 1.07, -0.6, //right
            -0.6, 1.07, 0.2, //left

        ]);

        //texture mapping for the roof outlooks:
        const uv2 = new Float32Array([
            0.5, 1.25,
            1, 0,
            0, 0,

            0.5, 1.25,
            1, 0,
            0, 0,

        ]);

        //vertices for the roof dormers
        const vertices3 = new Float32Array([
            //front
            0, 1.8, 0.6, //top
            -0.6, 1, 0.6, //left
            0.6, 1, 0.6, //right

            //back
            0, 1.8, -1, //top
            0.6, 1, -1, //left
            -0.6, 1, -1, //right

        ]);

        //texture mapping for the roof doermers
        const uv3 = new Float32Array([
            0.5, 1,
            1, 0,
            0, 0,

            0.5, 1,
            1, 0,
            0, 0,

        ]);
        //create the roof geometries using the buffer geometry and setting the positions and uvs
        let roofGeometry = new T.BufferGeometry();
        roofGeometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
        roofGeometry.setAttribute("uv", new T.BufferAttribute(uv, 2));
        roofGeometry.computeVertexNormals();

        let roofOutlookGeometry = new T.BufferGeometry();
        roofOutlookGeometry.setAttribute("position", new T.BufferAttribute(vertices2, 3));
        roofOutlookGeometry.setAttribute("uv", new T.BufferAttribute(uv2, 2));
        roofOutlookGeometry.computeVertexNormals();

        let roofDormerGeometry = new T.BufferGeometry();
        roofDormerGeometry.setAttribute("position", new T.BufferAttribute(vertices3, 3));
        roofDormerGeometry.setAttribute("uv", new T.BufferAttribute(uv3, 2));
        roofDormerGeometry.computeVertexNormals();

        //create all the meshes using our above geometries that we created:
        let roofOutlookMesh = new T.Mesh(roofOutlookGeometry, outlookMaterial);
        group.add(roofOutlookMesh);
        roofOutlookMesh.position.set(0.9, 0.58, 0);
        roofOutlookMesh.rotateY(Math.PI / 2);
        roofOutlookMesh.scale.set(4.5, 4.5, 4.5);

        let roofMesh = new T.Mesh(roofGeometry, roofMaterial);
        group.add(roofMesh);
        roofMesh.position.set(0.9, 0.58, 0);
        roofMesh.rotateY(Math.PI / 2);
        roofMesh.scale.set(4.5, 4.5, 4.5);

        let roofFrontMesh = new T.Mesh(roofDormerGeometry, dormerMaterial);
        group.add(roofFrontMesh);
        roofFrontMesh.position.set(0.9, 0.58, 0);
        roofFrontMesh.rotateY(Math.PI / 2);
        roofFrontMesh.scale.set(4.5, 4.5, 4.5);

        //set the group rotation, position, and scale based on what was passed into the constructor.
        group.rotateY(angle);
        group.position.set(x, y, z);
        group.scale.set(scale, scale, scale);

        //make sure to call super!
        super("Medieval House - Style 1", group);
    }
}