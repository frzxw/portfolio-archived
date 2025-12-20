declare module "meshline" {
  export class MeshLineGeometry {
    constructor(points: THREE.Vector3[], widthFn?: (i: number) => number);
  }
  export class MeshLineMaterial extends THREE.Material {
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
    });
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<THREE.BufferGeometry>, THREE.BufferGeometry>;
      meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<THREE.Material>, THREE.Material>;
    }
  }
}

export {};
