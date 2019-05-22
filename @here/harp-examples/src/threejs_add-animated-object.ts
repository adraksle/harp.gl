/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelloWorldExample } from "@here/harp-examples/src/hello";
import { GeoCoordinates } from "@here/harp-geoutils";
import { MapViewEventNames, RenderEvent } from "@here/harp-mapview";
import * as THREE from "three";

/**
 * This example builds on top of the [[HelloWorldExample]], so please consult that first for any
 * questions regarding basic setup of the map.
 *
 * Additionaly this example shows how to add a animated [THREE.js](https://threejs.org/) object
 * to the scene.
 *
 * Therefore the object is loaded with one of the [THREE.js](https://threejs.org/) loaders (we chose
 * FBX here).
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_load.ts]]
 * ```
 *
 * Once the object is loaded, we add it to the [[MapView.scene]] :
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_add_to_scene.ts]]
 * ```
 *
 * For ensuring good precision close to the camera harp.gl uses [relative to
 * center](http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm).
 *
 * Therefore we have to adjust the position of the object each frame. We do this
 * by adding an event listener to the map view that is called whenever the map is
 * rendered:
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_add_listener.ts]]
 * ```
 * In the callback we just subtract the [[MapView.worldCenter]] from the desired
 * world position of the object:
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_rtc.ts]]
 * ```
 * In the same callback we also update the animation of our object:
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_update_animation.ts]]
 * ```
 *
 * Normaly the map is only rendered when needed, i.e. when the user is interacting with the map.
 * Since we want to have a constant animation we have to tell [[MapView]] to always render.
 * We can do this via [[MapView.beginAnimation]]. We can stop the animation again with
 * [[MapView.endAnimation]].
 * ```typescript
 * [[include:harp_gl_threejs_add_animated-object_begin_animation.ts]]
 * ```
 */
export namespace ThreejsAddAnimatedObject {
    const mapView = HelloWorldExample.mapView;

    const figureGeoPosition = new GeoCoordinates(40.70497091, -74.0135);
    const figureWorldPosition = mapView.projection.projectPoint(
        figureGeoPosition,
        new THREE.Vector3()
    );
    const clock = new THREE.Clock();

    let figure: THREE.Group | undefined;
    let mixer: THREE.AnimationMixer | undefined;
    const onLoad = (object: any) => {
        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(object.animations[0]);
        action.play();

        figure = object as THREE.Group;
        figure.traverse((child: THREE.Object3D) => {
            child.renderOrder = 10000;
        });
        figure.renderOrder = 10000;
        figure.rotateX(Math.PI / 2);
        figure.scale.set(0.3, 0.3, 0.3);
        figure.name = "guy";

        // snippet:harp_gl_threejs_add_animated-object_add_to_scene.ts
        mapView.scene.add(figure);
        // end:harp_gl_threejs_add_animated-object_add_to_scene.ts
    };

    // snippet:harp_gl_threejs_add_animated-object_load.ts
    const loader = new (THREE as any).FBXLoader();
    loader.load("resources/walking.fbx", onLoad);
    // end:harp_gl_threejs_add_animated-object_load.ts

    const onRender = (event: RenderEvent) => {
        if (figure) {
            // snippet:harp_gl_threejs_add_animated-object_rtc.ts
            figure.position.copy(figureWorldPosition).sub(mapView.worldCenter);
            // end:harp_gl_threejs_add_animated-object_rtc.ts
        }

        if (mixer) {
            // snippet:harp_gl_threejs_add_animated-object_update_animation.ts
            const delta = clock.getDelta();
            mixer.update(delta);
            // end:harp_gl_threejs_add_animated-object_update_animation.ts
        }
    };

    // snippet:harp_gl_threejs_add_animated-object_add_listener.ts
    mapView.addEventListener(MapViewEventNames.Render, onRender);
    // end:harp_gl_threejs_add_animated-object_add_listener.ts

    // snippet:harp_gl_threejs_add_animated-object_begin_animation.ts
    mapView.beginAnimation();
    // end:harp_gl_threejs_add_animated-object_begin_animation.ts
}
