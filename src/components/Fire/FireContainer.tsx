import React, { Component } from "react";
import { currentMode } from '../../models/CurrentMode'
import { PubSubHook } from '../../models/PubSubHook'
import { timer } from '../../models/Timer'
import "./Fire";
import "./FireShader";

const THREE = require("three")

const style = {
    height: 500
};

export class FireInnerContainer extends Component<{ speed: number }> {
    requestID: any;
    controls: any;
    mount: any;
    scene: any;
    camera: any;
    renderer: any;
    clock: any;
    fire: any;

    componentDidMount() {
        this.sceneSetup();
        this.addFire();
        this.startAnimationLoop();
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );

        let loader = new THREE.TextureLoader();
        loader.crossOrigin = "";

        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.clock = new THREE.Clock();

        this.mount.appendChild(this.renderer.domElement); // mount using React ref
    };

    addFire = (fire: any = fireRed) => {
        let loader = new THREE.TextureLoader();
        loader.crossOrigin = "";

        let fireTex = loader.load(fire);

        this.fire = new THREE.Fire(fireTex);

        this.fire.position.set(0, 0.2, 7.8);
        this.scene.add(this.fire);
    };

    removeFire = () => {
        this.scene.remove(this.fire);
    };

    startAnimationLoop = () => {
        this.clock.getDelta();

        //var t = clock.elapsedTime * controller.speed;
        let t = this.clock.elapsedTime * this.props.speed;
        this.fire.update(t);

        this.renderer.render(this.scene, this.camera);

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        return <div style={style} ref={(ref) => (this.mount = ref)} />;
    }
}

const fireGreen = require('./Fire-green.png');
const fireRed = require('./Fire-red.png');

let mapFireTexture = {
    red: fireRed,
    green: fireGreen
}

export const FireContainer = () => {
    let { value } = PubSubHook(currentMode);
    let timerValue = PubSubHook(timer);

    const fireInner = React.useRef<FireInnerContainer>(null);


    React.useLayoutEffect(() => {
        if (timerValue.value === 0) {
            fireInner.current?.removeFire()
        }

    }, [timerValue])
    React.useLayoutEffect(() => {
        fireInner.current?.removeFire()
        if (timerValue.value !== 0) {
            fireInner.current?.addFire(mapFireTexture[value ? value?.color : 'red']);
        }
    }, [value])

    return <div>
        <FireInnerContainer speed={value ? value?.speed : 1} ref={fireInner} />
    </div>
}