"use client";

import * as THREE from "three";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Canvas, extend, useFrame, useThree, invalidate } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
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
    "/assets/tag.glb",
);
useTexture.preload(
    "/assets/band.avif",
);

export type LanyardProps = {
    className?: string;
    style?: CSSProperties;
    onInteractionChange?: (isInteracting: boolean) => void;
};

export default function Lanyard({ className, style, onInteractionChange }: LanyardProps) {
    const eventSource = typeof window !== "undefined" ? document.body : undefined;

    // Detect mobile for performance optimizations
    const isMobile = typeof window !== "undefined"
        ? window.matchMedia("(max-width: 767px)").matches
        : false;

    return (
        <div
            className={className}
            style={{ pointerEvents: "none", ...style }}
        >
            <Canvas
                camera={{ position: [0, 0, 13], fov: 25 }}
                gl={{
                    alpha: true,
                    antialias: false, // Disable for performance
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                }}
                frameloop="demand" // Only render when needed
                dpr={isMobile ? 1 : [1, 1.5]} // Lower DPR on mobile
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
                <ambientLight intensity={isMobile ? 2 : Math.PI} />
                <Physics interpolate gravity={[0, -25, 0]} timeStep={isMobile ? 1 / 60 : 1 / 120} paused={false}>
                    <LanyardRig onInteractionChange={onInteractionChange} />
                </Physics>
                {/* Simplified lighting for performance */}
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                {!isMobile && <directionalLight position={[-5, -5, 5]} intensity={0.5} />}
            </Canvas>
        </div>
    );
}

type LanyardRigProps = {
    maxSpeed?: number;
    minSpeed?: number;
    position?: [number, number, number];
    scale?: number;
    onInteractionChange?: (isInteracting: boolean) => void;
};

function LanyardRig({
    maxSpeed = 30,
    minSpeed = 8,
    position = [1.2, 4, 0],
    scale,
    onInteractionChange,
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
    const _quat = new THREE.Quaternion();
    const _upright = new THREE.Quaternion();

    const px = position[0];
    const py = position[1];
    const pz = position[2];
    const sp = (x: number, y: number, z: number): [number, number, number] => [
        px + x * s,
        py + y * s,
        pz + z * s,
    ];

    const segmentProps = {
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 4,
        linearDamping: 4,
    } satisfies RigidBodyProps;

    // Card gets heavier damping so it settles fast instead of swinging wildly
    const cardProps = {
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 6,
        linearDamping: 6,
    } satisfies RigidBodyProps;

    const { nodes, materials } = useGLTF(
        "/assets/tag.glb",
    ) as unknown as TagGLTF;

    const texture = useTexture(
        "/assets/band.avif",
        (t) => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        },
    );

    const { width, height } = useThree((state) => state.size);

    const responsiveScale =
        width < 480
            ? 0.56
            : width < 640
                ? 0.6
                : width < 768
                    ? 0.65
                    : width < 1024
                        ? 0.7
                        : 0.75;

    const s = scale ?? responsiveScale;
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

    useEffect(() => {
        onInteractionChange?.(hovered || Boolean(dragged));
        return () => onInteractionChange?.(false);
    }, [hovered, dragged, onInteractionChange]);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1 * s]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45 * s, 0]]);

    useEffect(() => {
        if (!hovered) return;
        document.body.style.cursor = dragged ? "grabbing" : "grab";
        return () => void (document.body.style.cursor = "auto");
    }, [hovered, dragged]);

    useEffect(() => {
        if (!dragged) return;
        // Avoid selecting/highlighting underlying page text while dragging.
        document.body.style.userSelect = "none";
        (document.body.style as CSSStyleDeclaration & { WebkitUserSelect?: string }).WebkitUserSelect =
            "none";

        // On touch devices, prevent the page from scrolling while the user is dragging
        // the lanyard. We attach a non-passive listener so preventDefault is honored.
        const preventTouchScroll = (event: TouchEvent) => {
            event.preventDefault();
        };
        document.addEventListener("touchmove", preventTouchScroll, { passive: false });

        return () => {
            document.body.style.userSelect = "";
            (document.body.style as CSSStyleDeclaration & { WebkitUserSelect?: string }).WebkitUserSelect =
                "";

            document.removeEventListener("touchmove", preventTouchScroll);
        };
    }, [dragged]);

    // Tab switch: never get stuck mid-drag, and snap the visual rope to the
    // physics bodies on return. After a tab switch the next frame delta is
    // huge; without the snap the rope lerps with an overshooting alpha and
    // looks yanked from above.
    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                drag(false);
                return;
            }
            [j1, j2, j3].forEach((ref) => {
                const body = ref.current as unknown as {
                    lerped?: THREE.Vector3;
                    translation(): THREE.Vector3;
                } | null;
                body?.lerped?.copy(body.translation());
            });
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, []);

    useFrame((state, delta) => {
        // Request a new frame when physics is active (for demand frameloop)
        invalidate();

        if (!fixed.current || !card.current || !j1.current || !j2.current || !j3.current) return;

        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));

            const anchor = fixed.current.translation();
            // Clamp to the rope's max reach, like a real lanyard:
            // 3 rope segments of 1s + 1.45s spherical joint offset
            const maxReach = 4.45 * s;
            let tx = vec.x - dragged.x - anchor.x;
            let ty = vec.y - dragged.y - anchor.y;
            let tz = vec.z - dragged.z - anchor.z;
            const dist = Math.hypot(tx, ty, tz);
            if (dist > maxReach) {
                const k = maxReach / dist;
                tx *= k;
                ty *= k;
                tz *= k;
            }

            // Smooth-follow the pointer instead of teleporting to it.
            // Raw pointer jitter is what made the rope joints oscillate —
            // easing the target kills the wiggle at its source.
            const cp = card.current.translation();
            const follow = 1 - Math.exp(-14 * delta);
            card.current.setNextKinematicTranslation({
                x: cp.x + (anchor.x + tx - cp.x) * follow,
                y: cp.y + (anchor.y + ty - cp.y) * follow,
                z: cp.z + (anchor.z + tz - cp.z) * follow,
            });

            // Keep the card upright while dragging
            const r = card.current.rotation();
            _quat.set(r.x, r.y, r.z, r.w);
            _quat.slerp(_upright, 1 - Math.exp(-8 * delta));
            card.current.setNextKinematicRotation(_quat);

            [j1, j2, j3].forEach((ref) => ref.current?.wakeUp());
        }

        {
            const cardBody = card.current;
            const isCardSleeping = cardBody.isSleeping?.() ?? false;

            // Hard cap on swing velocity — prevents wild flings after drags.
            // The rope stays playful but can never build up extreme momentum.
            if (!dragged && !isCardSleeping) {
                const lv = cardBody.linvel();
                const speed = Math.hypot(lv.x, lv.y, lv.z);
                const MAX_SWING_SPEED = 9;
                if (speed > MAX_SWING_SPEED) {
                    const k = MAX_SWING_SPEED / speed;
                    cardBody.setLinvel({ x: lv.x * k, y: lv.y * k, z: lv.z * k }, true);
                }
            }

            // Fix most of the jitter when over pulling the card
            [j1.current, j2.current].forEach((body) => {
                if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());

                const clampedDistance = Math.max(
                    0.1,
                    Math.min(1, body.lerped.distanceTo(body.translation())),
                );

                body.lerped.lerp(
                    body.translation(),
                    // Clamp alpha to 1: after a tab switch the frame delta is
                    // huge and an overshooting lerp flings the rope visually
                    Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))),
                );
            });

            // Calculate catmul curve with reduced resolution for performance
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped!);
            curve.points[2].copy(j1.current.lerped!);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(16));

            // Tilt it back towards the screen
            if (!dragged && !isCardSleeping) {
                ang.copy(cardBody.angvel());
                rot.copy(cardBody.rotation());
                const targetY = ang.y - rot.y * 0.25;

                // Only apply small corrections and never wake a sleeping body.
                if (Math.abs(targetY - ang.y) > 1e-4) {
                    cardBody.setAngvel(
                        { x: ang.x, y: targetY, z: ang.z },
                        false,
                    );
                }
            }
        }
    });

    return (
        <group name="lanyard">
            <group name="tag">
                <RigidBody ref={fixed} {...segmentProps} type="fixed" position={sp(0, 0, 0)} />

                {/* Start hanging straight down so there's no initial swing */}
                <RigidBody position={sp(0, -1, 0)} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody position={sp(0, -2, 0)} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody position={sp(0, -3, 0)} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1 * s]} />
                </RigidBody>

                <RigidBody
                    position={sp(0, -4.45, 0)}
                    ref={card}
                    {...cardProps}
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
                            e.nativeEvent.preventDefault();
                            const target = e.nativeEvent.target as unknown as PointerCaptureTarget;
                            target?.releasePointerCapture?.(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.preventDefault();
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
                            e.nativeEvent.preventDefault();
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
                    {/* Initialize with valid points to prevent NaN bounding box errors */}
                    <meshLineGeometry args={[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]} />
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
