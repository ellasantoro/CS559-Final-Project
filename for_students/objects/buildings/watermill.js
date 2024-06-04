/*jshint esversion: 6 */
// @ts-check
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

//TEXTURES:
let wood = new T.TextureLoader().load("./images/wheel.png");

/**
 * this class creates the watermill object for my town (including the animation)
 * 
 * NOTE: SOME of this code was taken from my workbook with the park objects, I built a ferris wheel that was similar to this
 */
export class Watermill extends GrObject {
  //constructor takes in x,y, and z positions, as well as a scale value and woodColor since I want different instances of the object
  //to have different wood colors.
  constructor(x, y, z, scale, woodColor) {
    let group = new T.Group();

    //create the center of the windmill wheels:
    let centerGeometry = new T.CylinderGeometry(0.2, 0.2, 0.1, 16);
    let centerMaterial = new T.MeshPhongMaterial({ color: "#9e9e9d", });
    let center = new T.Mesh(centerGeometry, centerMaterial);
    center.translateY(0.05);
    group.add(center);

    //group for the wheels
    let wheelGroup = new T.Group();
    group.add(wheelGroup);
    wheelGroup.rotateZ(Math.PI / 2);
    wheelGroup.translateY(0.1);

    //create the wheel geometry & materials to use
    let wheelGeometry = new T.CylinderGeometry(2.3, 2.3, 0.2, 16);
    let wheelMaterial = new T.MeshStandardMaterial({
      color: woodColor,
      bumpMap: wood,
      bumpScale: 50,
    });

    //WHEELS:
    let wheel = new T.Mesh(wheelGeometry, wheelMaterial);
    let wheel2 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.y = 1;
    wheelGroup.add(wheel);
    wheelGroup.add(wheel2);

    //SEATS:
    let seatGroup = new T.Group();
    wheelGroup.add(seatGroup);
    let seatGeometry = new T.BoxGeometry(0.25, 0.25, 0.9);

    //add all the seats using a for loop:
    let seat;
    for (let i = 0; i < 9; i++) {
      seat = new T.Mesh(seatGeometry, centerMaterial);
      seat.position.set(2 * Math.cos(i * (2 * Math.PI) / 9), 0.4, 2 * Math.sin(i * (2 * Math.PI) / 9));
      seat.rotateX(Math.PI / 2);
      seatGroup.add(seat);
    }

    group.scale.set(scale, scale, scale);
    group.position.set(x, y, z);

    //remember to call super!
    super("Watermill", group);

    //variable that will be used for animation
    this.group = group;
  }

  //animation for the watermill (this is trivial, it is not one of my behaviors for points, just for decoration!)
  stepWorld(delta) {
    this.group.rotateX(0.001 * delta);
  }
}
