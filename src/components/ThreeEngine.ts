import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  AmbientLight,
  AxesHelper,
  GridHelper,
  MOUSE,
  Object3D,
} from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class ThreeEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;

  private scene: Scene;
  // 透视相机（人眼）
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer({
      // 抗锯齿
      antialias: true,
    });
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

    // 性能监视器
    const stats = new Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = "fixed";
    statsDom.style.top = "0px";
    statsDom.style.right = "5px";
    statsDom.style.left = "unset";
    dom.appendChild(statsDom);

    // 轨道控制器
    const orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    // orbitControls.autoRotate = true;
    orbitControls.enableDamping = true;
    orbitControls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,
    };

    const animate = () => {
      // this.camera.position.x += -0.01;
      orbitControls.update();
      this.renderer.render(this.scene, this.camera);
      stats.update();
      requestAnimationFrame(animate);
    };

    animate();
  }

  addObject(...objects: Object3D[]) {
    objects.forEach((object) => {
      this.scene.add(object);
    });
  }
}
