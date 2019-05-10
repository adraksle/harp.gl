/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates, hereTilingScheme, TileKey, TilingScheme } from "@here/harp-geoutils";
import {
    calculateNormalizedDeviceCoordinates,
    MapControls,
    MapControlsUI
} from "@here/harp-map-controls";
import {
    CopyrightElementHandler,
    CopyrightInfo,
    DataSource,
    DisplacementMap,
    ElevationProvider,
    ElevationRange,
    ElevationRangeSource,
    MapView,
    MapViewEventNames,
    Tile
} from "@here/harp-mapview";
import { APIFormat, OmvDataSource } from "@here/harp-omv-datasource";
import * as THREE from "three";
import { accessToken } from "../config";

/**
 * This example shows how to use the [[ElevationProvider]] to do raycasting.
 * To show the output, click on the map with the shift key, this will insert a pink box.
 * Note, there seems to be a bug where the box shows as fully transparent.
 * Please see the hello.ts demo for a simpler example of how to setup a MapView etc.
 */
export namespace HelloRaycastExample {
    const scale = 10;
    const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00ff
    });
    // Return a 10mx10mx10m cube.
    function createPinkCube(): THREE.Mesh {
        return new THREE.Mesh(geometry, material);
    }
    // Create a new MapView for the HTMLCanvasElement of the given id.
    function initializeMapView(id: string): MapView {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const map = new MapView({
            canvas,
            theme: "resources/berlin_tilezen_base.json"
        });

        CopyrightElementHandler.install("copyrightNotice", map);

        // Center the camera on Manhattan, New York City.
        map.setCameraGeolocationAndZoom(new GeoCoordinates(40.6935, -74.009), 16.9);

        // Instantiate the default map controls, allowing the user to pan around freely.
        const mapControls = new MapControls(map);
        mapControls.maxPitchAngle = 50;
        mapControls.setRotation(6.3, 50);

        // Add an UI.
        const ui = new MapControlsUI(mapControls);
        canvas.parentElement!.appendChild(ui.domElement);

        // Resize the mapView to maximum.
        map.resize(window.innerWidth, window.innerHeight);

        // React on resize events.
        window.addEventListener("resize", () => {
            map.resize(window.innerWidth, window.innerHeight);
        });
        class DummyElevationRangeSource implements ElevationRangeSource {
            getElevationRange(tileKey: TileKey): ElevationRange {
                return { maxElevation: 0, minElevation: 0 };
            }
            getTilingScheme(): TilingScheme {
                return hereTilingScheme;
            }
            connect(): Promise<void> {
                return Promise.resolve();
            }
        }
        class DummyElevationSource extends DataSource {
            getTilingScheme(): TilingScheme {
                return hereTilingScheme;
            }
            getTile(tileKey: TileKey): Tile | undefined {
                return new Tile(this, tileKey);
            }
        }

        /**
         * Gets the elevation by firing a ray into the scene and returning the
         * point. Used to show how the rayCast method can be used.
         */
        class SceneElevationProvider implements ElevationProvider {
            private m_raycaster: THREE.Raycaster;
            constructor(readonly m_mapView: MapView) {
                this.m_raycaster = new THREE.Raycaster();
            }

            getHeight(geoPoint: GeoCoordinates, level?: number): number | undefined {
                throw new Error("Not yet implemented");
            }

            rayCast(screenPoint: THREE.Vector2): GeoCoordinates | undefined {
                const target = new THREE.Vector2();
                this.m_mapView.renderer.getSize(target);
                const ndc = calculateNormalizedDeviceCoordinates(
                    screenPoint.x,
                    screenPoint.y,
                    target.x,
                    target.y
                );
                this.m_raycaster.setFromCamera(ndc, this.m_mapView.camera);
                let intersections: THREE.Intersection[] = [];
                // Iterate through all visible tiles and add the intersections.
                this.m_mapView.visibleTileSet.forEachCachedTile((tile: Tile) => {
                    for (const object of tile.objects) {
                        const tileIntersections = this.m_raycaster.intersectObject(object);
                        intersections = intersections.concat(tileIntersections);
                    }
                });
                // intersectObject above returns the list sorted, but we sort here incase there
                // is results from multiple tiles.
                intersections.sort((a, b) => {
                    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
                });
                if (intersections.length === 0) {
                    return undefined;
                }
                const worldPoint = intersections[0].point.add(this.m_mapView.worldCenter);
                return this.m_mapView.projection.unprojectPoint(worldPoint);
            }

            getDisplacementMap(tileKey: TileKey): DisplacementMap | undefined {
                throw new Error("Not yet implemented");
            }

            getTilingSceme(): TilingScheme {
                throw new Error("Not yet implemented");
            }
        }
        const sceneElevationProvider = new SceneElevationProvider(map);
        map.setElevationSource(
            new DummyElevationSource(),
            new DummyElevationRangeSource(),
            sceneElevationProvider
        );

        canvas.addEventListener("mousedown", event => {
            if (!event.shiftKey || sceneElevationProvider === undefined) {
                return;
            }

            const screenPoint = new THREE.Vector2(event.pageX, event.pageY);
            const geoCoord = sceneElevationProvider.rayCast(screenPoint);
            if (geoCoord !== undefined) {
                const cube = createPinkCube();
                const posVector = new THREE.Vector3();
                map.projection.projectPoint(geoCoord, posVector);
                map.scene.add(cube);
                // For the map to rerender
                map.update();
                map.addEventListener(MapViewEventNames.Render, () => {
                    cube.position.copy(posVector);
                    cube.position.sub(map.worldCenter);
                });
            }
        });

        return map;
    }

    const message = document.createElement("div");
    message.innerHTML = `Press 'Shift' then click to put a pink box on a building`;

    message.style.position = "absolute";
    message.style.cssFloat = "right";
    message.style.top = "10px";
    message.style.right = "10px";
    document.body.appendChild(message);

    const mapView = initializeMapView("mapCanvas");

    const hereCopyrightInfo: CopyrightInfo = {
        id: "here.com",
        year: new Date().getFullYear(),
        label: "HERE",
        link: "https://legal.here.com/terms"
    };
    const copyrights: CopyrightInfo[] = [hereCopyrightInfo];

    const omvDataSource = new OmvDataSource({
        baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
        apiFormat: APIFormat.XYZOMV,
        styleSetName: "tilezen",
        maxZoomLevel: 17,
        authenticationCode: accessToken,
        copyrightInfo: copyrights
    });

    mapView.addDataSource(omvDataSource);
}
