    "use client";

    import * as THREE from "three";
    import { useEffect, useRef, useState, type CSSProperties } from "react";
    import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
    import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
    import {
        BallCollider,
        CuboidCollider,
        Physics,
        RigidBody,
        type RigidBodyProps,
        useRopeJoint,
        useSphericalJoint,
    } from "@react-three/rapier";
    import { MeshLineGeometry, MeshLineMaterial } from "meshline";
    import type { GLTF } from "three-stdlib";
    import type { RigidBody as RapierRigidBody } from "@dimforge/rapier3d-compat";

extend({ MeshLineGeometry, MeshLineMaterial });

type TagGLTF = GLTF & {
    nodes: {
        card: THREE.Mesh;
        clip: THREE.Mesh;
        clamp: THREE.Mesh;
    };
    materials: {
        base: THREE.MeshStandardMaterial;
        metal: THREE.MeshStandardMaterial;
    };
};

type PointerCaptureTarget = {
    setPointerCapture?: (pointerId: number) => void;
    releasePointerCapture?: (pointerId: number) => void;
};

useGLTF.preload(
    "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb",
);
useTexture.preload(
    "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg",
);

export type LanyardProps = {
    className?: string;
    style?: CSSProperties;
};

export default function Lanyard({ className, style }: LanyardProps) {
    const eventSource = typeof window !== "undefined" ? document.body : undefined;

    return (
        <div
            className={className}
            style={{ pointerEvents: "none", ...style }}
        >
            <Canvas
                camera={{ position: [0, 0, 13], fov: 25 }}
                gl={{ alpha: true, antialias: true }}
                eventSource={eventSource}
                eventPrefix="client"
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    touchAction: "none",
                    pointerEvents: "none",
                }}
            >
                <ambientLight intensity={Math.PI} />
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <LanyardRig />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}

type LanyardRigProps = {
    maxSpeed?: number;
    minSpeed?: number;
    position?: [number, number, number];
    scale?: number;
};

function LanyardRig({
    maxSpeed = 50,
    minSpeed = 10,
    position = [1.2, 4, 0],
    scale = 0.75,
}: LanyardRigProps) {
    const band = useRef<THREE.Mesh<MeshLineGeometry>>(null!);
    const fixed = useRef<RapierRigidBody>(null!);
    const j1 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!);
    const j2 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null!);
    const j3 = useRef<RapierRigidBody>(null!);
    const card = useRef<RapierRigidBody>(null!);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const px = position[0];
    const py = position[1];
    const pz = position[2];
    const s = scale;
    const sp = (x: number, y: number, z: number): [number, number, number] => [
        px + x * s,
        py + y * s,
        pz + z * s,
    ];

    const segmentProps = {
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 2,
        linearDamping: 2,
    } satisfies RigidBodyProps;

    const { nodes, materials } = useGLTF(
    "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb",
    ) as unknown as TagGLTF;

    const texture = useTexture(
        "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/SOT1hmCesOHxEYxL7vkoZ/c57b29c85912047c414311723320c16b/band.jpg",
        (t) => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        },
    );

    const { width, height } = useThree((state) => state.size);
    const [curve] = useState(() => {
        const c = new THREE.CatmullRomCurve3([
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
        ]);
        c.curveType = "chordal";
        return c;
    });

    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45 * s, 0]]);

    useEffect(() => {
        if (!hovered) return;
        document.body.style.cursor = dragged ? "grabbing" : "grab";
        return () => void (document.body.style.cursor = "auto");
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && card.current) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));

            [card, j1, j2, j3, fixed].forEach((ref) => ref.current.wakeUp());
            card.current.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (fixed.current) {
            if (!card.current || !j1.current || !j2.current || !j3.current) return;

            // Fix most of the jitter when over pulling the card
            [j1.current, j2.current].forEach((body) => {
                if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());

                const clampedDistance = Math.max(
                    0.1,
                    Math.min(1, body.lerped.distanceTo(body.translation())),
                );

                body.lerped.lerp(
                    body.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
                );
            });

            // Calculate catmul curve
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped!);
            curve.points[2].copy(j1.current.lerped!);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            // Tilt it back towards the screen
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel(
                { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
                true,
            );
        }
    });

    return (
        <group name="lanyard">
            <group name="tag">
                <RigidBody ref={fixed} {...segmentProps} type="fixed" position={sp(0, 0, 0)} />

                <RigidBody position={sp(0.5, 0, 0)} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody position={sp(1, 0, 0)} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody position={sp(1.5, 0, 0)} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody
                    position={sp(2, 0, 0)}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                >
                    <CuboidCollider args={[0.8 * s, 1.125 * s, 0.01 * s]} />
                    <group
                        scale={2.25 * s}
                        position={[0, -1.2 * s, -0.05 * s]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => {
                            e.stopPropagation();
                            const target = e.nativeEvent.target as unknown as PointerCaptureTarget;
                            target?.releasePointerCapture?.(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            const target = e.nativeEvent.target as unknown as PointerCaptureTarget;
                            target?.setPointerCapture?.(e.pointerId);
                            drag(
                                new THREE.Vector3()
                                    .copy(e.point)
                                    .sub(
                                        vec.copy(card.current?.translation() ?? new THREE.Vector3()),
                                    ),
                            );
                        }}
                        onPointerCancel={(e) => {
                            e.stopPropagation();
                            const target = e.nativeEvent.target as unknown as PointerCaptureTarget;
                            target?.releasePointerCapture?.(e.pointerId);
                            drag(false);
                        }}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                map={materials.base.map}
                                map-anisotropy={16}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.5}
                            />
                        </mesh>
                        <mesh
                            geometry={nodes.clip.geometry}
                            material={materials.metal}
                            material-roughness={0.3}
                        />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>

            <group name="band">
                <mesh ref={band}>
                    <meshLineGeometry />
                    <meshLineMaterial
                        color="white"
                        depthTest={false}
                        resolution={[width, height]}
                        useMap
                        map={texture}
                        repeat={[-3, 1]}
                        lineWidth={1 * s}
                    />
                </mesh>
            </group>
        </group>
    );
}
