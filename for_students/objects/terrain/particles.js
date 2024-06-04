import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../../../libs/CS559-Framework/GrObject.js";

/**
 * Class that creates the particles for my town
 */
export class Particles extends GrObject {
    constructor(params = {}) {
        //create the parts using a really basic buffer geometry - 
        //having a basic geometry is crucial because we dont want to load a bunch of complicated 
        //geometries and have it get super laggy.
        let particle = new T.Points(
            new T.BufferGeometry(),
            new T.PointsMaterial({
                color: "#85a679",
                size: 0.25,
            })
        );
        //make sure to call super!
        super("Particles", particle);

        //VARIABLES USED IN ANIMATION:
        this.particle = particle;
        this.particlesList = [];
    }

    stepWorld(delta) {
        //add particles (# based on scaled time)
        for (let i = 0; i < Math.floor(delta / 12); i++) {
            this.particlesList.push({
                //random pos 
                x: Math.random() * 100 - 50,
                y: Math.random() * 20 + 20,
                z: Math.random() * 100 - 50,
                //random velocities
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 0.5,
            });
        }

        //updating the positions so that they look like they're floating around
        this.particlesList = this.particlesList.filter((particle) => {
            //use the randomized velocities times the scaled function of time so that the position gets updated
            particle.x += particle.vx * delta / 200;
            particle.y += particle.vy * delta / 200;
            particle.z += particle.vz * delta / 200;
            //randomly change direction to simulate pixie dust floating
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.vy += (Math.random() - 0.5) * 0.1;
            particle.vz += (Math.random() - 0.5) * 0.1;

            //return the bounds so that the particles stay on the platform
            return particle.y > -10 && particle.y < 30 && particle.x > -30 && particle.x < 30 && particle.z > -30 && particle.z < 30;
        });

        //make sure to update the geometries w the new position
        //LEARNED THESE FROM THE FOLLOWING LINK: https://threejs.org/docs/#api/en/core/BufferAttribute.needsUpdate
        let bufferPositions = this.particlesList.flatMap((p) => [p.x, p.y, p.z]);
        this.particle.geometry.setAttribute("position", new T.Float32BufferAttribute(bufferPositions, 3));
        this.particle.geometry.attributes.position.needsUpdate = true;
    }
}
