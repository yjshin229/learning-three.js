import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group();
group.position.y = 1; // moves all the groups at once
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
group.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cube3.position.x = 2;
group.add(cube3);


//axes
const axesHelper = new THREE.AxesHelper(3) // number in AxesHelper is the length of axis
scene.add(axesHelper);

/*
//scale
mesh.scale.set(2,0.5,0.5)

//Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25 // half a rotation is pi
mesh.rotation.y = Math.PI * 0.25
*/

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
//camera.position.z = 3 //postive number makes the camera closer, negative vice versa
camera.position.set(1,1,3);
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera) // render is like when you take the picture. so render after adjusting position or object etc. 