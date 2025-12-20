import type * as THREE from "three";

declare module "meshline" {
  export class MeshLineGeometry extends THREE.BufferGeometry {
    constructor(points?: THREE.Vector3[] | number[], widthFn?: (p: number) => number);
    setPoints(points: THREE.Vector3[] | number[], widthFn?: (p: number) => number): void;
  }

  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(options?: {
      color?: THREE.ColorRepresentation;
      lineWidth?: number;
      sizeAttenuation?: boolean;
      map?: THREE.Texture;
      alphaMap?: THREE.Texture;
      dashArray?: number;
      dashRatio?: number;
      useDash?: boolean;
      dashScale?: number;
      transparent?: boolean;
      side?: THREE.Side;
      depthTest?: boolean;
      depthWrite?: boolean;
      fog?: boolean;
      repeat?: THREE.Vector2 | [number, number];
      resolution?: THREE.Vector2 | [number, number];
    });
  }
}

export {};
