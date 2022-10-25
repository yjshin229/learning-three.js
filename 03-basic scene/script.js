console.log(THREE) //needs to me uppercase!

//Scene
const scene = new THREE.Scene();

// Red cube
   
const geometry = new THREE.BoxGeometry(1,1,1); //geometry
const material = new THREE.MeshBasicMaterial({color: 0xff0000}) //material
const mesh = new THREE.Mesh(geometry,material) //create Mesh. naming mesh because there is only one mesh
scene.add(mesh); //add the object(mesh) to the scene

//Sizes (where we see)
const sizes = {
    width:800,
    height:600
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height); //PerspectiveCamera = the default POV, the 75 is FOV(field of View)
camera.position.z = 3 // move back by 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera) // add the camera to the scene


//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ // there are other renderers such as css or svg renderer too
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height) // this will change the size of the canvas
renderer.render(scene, camera) //render(scene, camera)