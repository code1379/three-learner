import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3,
  MeshStandardMaterial,
  AmbientLight,
} from "three";

export class ThreeEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;

  private scene: Scene;
  // 透视相机（人眼）
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
    );

    this.camera.position.set(20, 20, 20);
    // Vector3 向量
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up.set(0, 1, 0);

    dom.appendChild(this.renderer.domElement);
    // this.renderer.domElement.width = dom.offsetWidth;
    // this.renderer.domElement.height = dom.offsetHeight;
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);

    const box: Mesh = new Mesh(
      new BoxGeometry(10, 10, 10),
      // new MeshBasicMaterial({ color: 0x00ff00 })
      new MeshStandardMaterial({
        color: "rgb(255, 255, 0)",
      })
    );

    // 光
    const ambientLight = new AmbientLight("rgb(255, 255, 255)", 10);

    this.scene.add(box);
    this.scene.add(ambientLight);

    // 背景色
    // this.renderer.setClearColor("rgb(255, 255, 255)");
    // this.renderer.clearColor();
    this.renderer.render(this.scene, this.camera);
  }
}
