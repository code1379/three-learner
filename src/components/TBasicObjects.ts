import {
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from "three";

export const box: Mesh = new Mesh(
  new BoxGeometry(10, 10, 10),
  // new MeshBasicMaterial({ color: 0x00ff00 })
  new MeshStandardMaterial({
    color: "rgb(255, 255, 0)",
  })
);
box.position.x = -10;

export const sphere: Mesh = new Mesh(
  new SphereGeometry(5),
  new MeshStandardMaterial()
);

sphere.position.x = 10;

export const cylinder: Mesh = new Mesh(
  new CylinderGeometry(5, 5, 10, 32, 5),
  new MeshStandardMaterial()
);

cylinder.position.z = 10;

export const basicObjectList: Object3D[] = [box, sphere, cylinder];
