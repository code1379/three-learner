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
  AxesHelper,
  GridHelper,
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
    // 辅助工具
    const axesHelper = new AxesHelper(100);
    const gridHelper = new GridHelper(
      100,
      10,
      "rgb(200,200,200)",
      "rgb(0,100,100)"
    );

    this.scene.add(box);
    this.scene.add(ambientLight);
    this.scene.add(axesHelper);
    this.scene.add(gridHelper);

    // 背景色
    // this.renderer.setClearColor("rgb(255, 255, 255)");
    // this.renderer.clearColor();

    // 如果想要渲染出一个能运动的物体，需要每帧都重新执行一遍渲染函数
    // this.renderer.render(this.scene, this.camera);

    // setInterval(() => {
    //   this.renderer.render(this.scene, this.camera);
    // }, 1000 / 60);

    const animate = () => {
      box.position.x += -0.01;
      box.rotation.y += 0.01;
      this.camera.position.x += -0.01;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };

    animate();
  }
}
