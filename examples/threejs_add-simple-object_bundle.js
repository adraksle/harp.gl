/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"threejs_add-simple-object": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/threejs_add-simple-object.ts","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/threejs_add-simple-object.ts":
/*!******************************************!*\
  !*** ./src/threejs_add-simple-object.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n * Copyright (C) 2017-2019 HERE Europe B.V.\n * Licensed under Apache 2.0, see full license in LICENSE\n * SPDX-License-Identifier: Apache-2.0\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ \"../harp-geoutils/index.ts\");\nconst harp_map_controls_1 = __webpack_require__(/*! @here/harp-map-controls */ \"../harp-map-controls/index.ts\");\nconst harp_mapview_1 = __webpack_require__(/*! @here/harp-mapview */ \"../harp-mapview/index.ts\");\nconst harp_omv_datasource_1 = __webpack_require__(/*! @here/harp-omv-datasource */ \"../harp-omv-datasource/index.ts\");\nconst THREE = __webpack_require__(/*! three */ \"three\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./config.ts\");\n/**\n * This example builds on top of the [[HelloWorldExample]], so please consult that first for any\n * questions regarding basic setup of the map.\n *\n * This example shows how to add a [THREE.js](https://threejs.org/) object to the scene.\n *\n * For the purposes of the demo, create a simple pink box.\n * ```typescript\n * [[include:harp_gl_threejs_add_simple_object_0.ts]]\n * ```\n * Next we need to find the position to place the cube, we use the helpful method\n * [[getWorldPositionAt]] to get the world space position under the mouse when it is clicked, this\n * is shown here:\n * ```typescript\n * [[include:harp_gl_threejs_add_simple_object_1.ts]]\n * ```\n *\n * Here the object is created and added to the scene.\n * ```typescript\n * [[include:harp_gl_threejs_add_simple_object_2.ts]]\n * ```\n *\n * In harp.gl, we position elements [relative to\n * center](http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm), which helps to\n * ensure accuracy.\n *\n * The drawback of this is that we need to update the position of the cube each frame. This is\n * fortunately easy to do and is shown here:\n * ```typescript\n * [[include:harp_gl_threejs_add_simple_object_3.ts]]\n * ```\n *\n * Finally, in order to see the cube rendered on the map, we need to force an update.\n * ```typescript\n * [[include:harp_gl_threejs_add_simple_object_4.ts]]\n * ```\n */\nvar ThreejsAddSimpleObject;\n(function (ThreejsAddSimpleObject) {\n    // snippet:harp_gl_threejs_add_simple_object_0.ts\n    const scale = 100;\n    const geometry = new THREE.BoxGeometry(1 * scale, 1 * scale, 1 * scale);\n    const material = new THREE.MeshStandardMaterial({\n        color: 0x00ff00fe\n    });\n    function createPinkCube() {\n        const mesh = new THREE.Mesh(geometry, material);\n        // Make sure the cube overlaps everything else, is completely arbitrary.\n        mesh.renderOrder = Number.MAX_SAFE_INTEGER;\n        return mesh;\n    }\n    // end:harp_gl_threejs_add_simple_object_0.ts\n    // Create a new MapView for the HTMLCanvasElement of the given id.\n    function initializeMapView(id) {\n        const canvas = document.getElementById(id);\n        const map = new harp_mapview_1.MapView({\n            canvas,\n            theme: \"resources/berlin_tilezen_base.json\"\n        });\n        harp_mapview_1.CopyrightElementHandler.install(\"copyrightNotice\", map);\n        // Center the camera on Manhattan, New York City.\n        map.setCameraGeolocationAndZoom(new harp_geoutils_1.GeoCoordinates(40.6935, -74.009), 16.9);\n        // Instantiate the default map controls, allowing the user to pan around freely.\n        const mapControls = new harp_map_controls_1.MapControls(map);\n        mapControls.maxPitchAngle = 50;\n        mapControls.setRotation(6.3, 50);\n        // Add an UI.\n        const ui = new harp_map_controls_1.MapControlsUI(mapControls);\n        canvas.parentElement.appendChild(ui.domElement);\n        // Resize the mapView to maximum.\n        map.resize(window.innerWidth, window.innerHeight);\n        // React on resize events.\n        window.addEventListener(\"resize\", () => {\n            map.resize(window.innerWidth, window.innerHeight);\n        });\n        canvas.addEventListener(\"mousedown\", event => {\n            // snippet:harp_gl_threejs_add_simple_object_1.ts\n            // Get the position of the mouse in world space.\n            const worldPositionAtMouse = map.getWorldPositionAt(event.pageX, event.pageY);\n            if (worldPositionAtMouse === null) {\n                return;\n            }\n            // end:harp_gl_threejs_add_simple_object_1.ts\n            // snippet:harp_gl_threejs_add_simple_object_2.ts\n            const cube = createPinkCube();\n            map.scene.add(cube);\n            // end:harp_gl_threejs_add_simple_object_2.ts\n            // snippet:harp_gl_threejs_add_simple_object_3.ts\n            // Add a callback to execute before the items are rendered.\n            map.addEventListener(harp_mapview_1.MapViewEventNames.Render, () => {\n                // Set the cube position relative to the world center. Note, we don't subtract the\n                // [[worldCenter]] from the worldMousePosition, because we need to keep the cubes\n                // world position untouched.\n                cube.position.copy(worldPositionAtMouse).sub(map.worldCenter);\n            });\n            // end:harp_gl_threejs_add_simple_object_3.ts\n            // snippet:harp_gl_threejs_add_simple_object_4.ts\n            // Force the scene to be rerendered once the cube is added to the scene.\n            map.update();\n            // end:harp_gl_threejs_add_simple_object_4.ts\n        });\n        return map;\n    }\n    const message = document.createElement(\"div\");\n    message.innerHTML = `Click to add a ${scale}m wide cube to scene.`;\n    message.style.position = \"absolute\";\n    message.style.cssFloat = \"right\";\n    message.style.top = \"10px\";\n    message.style.right = \"10px\";\n    document.body.appendChild(message);\n    const mapView = initializeMapView(\"mapCanvas\");\n    const hereCopyrightInfo = {\n        id: \"here.com\",\n        year: new Date().getFullYear(),\n        label: \"HERE\",\n        link: \"https://legal.here.com/terms\"\n    };\n    const copyrights = [hereCopyrightInfo];\n    const omvDataSource = new harp_omv_datasource_1.OmvDataSource({\n        baseUrl: \"https://xyz.api.here.com/tiles/herebase.02\",\n        apiFormat: harp_omv_datasource_1.APIFormat.XYZOMV,\n        styleSetName: \"tilezen\",\n        maxZoomLevel: 17,\n        authenticationCode: config_1.accessToken,\n        copyrightInfo: copyrights\n    });\n    mapView.addDataSource(omvDataSource);\n})(ThreejsAddSimpleObject = exports.ThreejsAddSimpleObject || (exports.ThreejsAddSimpleObject = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhyZWVqc19hZGQtc2ltcGxlLW9iamVjdC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy90aHJlZWpzX2FkZC1zaW1wbGUtb2JqZWN0LnRzP2E5MGUiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNy0yMDE5IEhFUkUgRXVyb3BlIEIuVi5cbiAqIExpY2Vuc2VkIHVuZGVyIEFwYWNoZSAyLjAsIHNlZSBmdWxsIGxpY2Vuc2UgaW4gTElDRU5TRVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBHZW9Db29yZGluYXRlcyB9IGZyb20gXCJAaGVyZS9oYXJwLWdlb3V0aWxzXCI7XG5pbXBvcnQgeyBNYXBDb250cm9scywgTWFwQ29udHJvbHNVSSB9IGZyb20gXCJAaGVyZS9oYXJwLW1hcC1jb250cm9sc1wiO1xuaW1wb3J0IHtcbiAgICBDb3B5cmlnaHRFbGVtZW50SGFuZGxlcixcbiAgICBDb3B5cmlnaHRJbmZvLFxuICAgIE1hcFZpZXcsXG4gICAgTWFwVmlld0V2ZW50TmFtZXNcbn0gZnJvbSBcIkBoZXJlL2hhcnAtbWFwdmlld1wiO1xuaW1wb3J0IHsgQVBJRm9ybWF0LCBPbXZEYXRhU291cmNlIH0gZnJvbSBcIkBoZXJlL2hhcnAtb212LWRhdGFzb3VyY2VcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgYWNjZXNzVG9rZW4gfSBmcm9tIFwiLi4vY29uZmlnXCI7XG5cbi8qKlxuICogVGhpcyBleGFtcGxlIGJ1aWxkcyBvbiB0b3Agb2YgdGhlIFtbSGVsbG9Xb3JsZEV4YW1wbGVdXSwgc28gcGxlYXNlIGNvbnN1bHQgdGhhdCBmaXJzdCBmb3IgYW55XG4gKiBxdWVzdGlvbnMgcmVnYXJkaW5nIGJhc2ljIHNldHVwIG9mIHRoZSBtYXAuXG4gKlxuICogVGhpcyBleGFtcGxlIHNob3dzIGhvdyB0byBhZGQgYSBbVEhSRUUuanNdKGh0dHBzOi8vdGhyZWVqcy5vcmcvKSBvYmplY3QgdG8gdGhlIHNjZW5lLlxuICpcbiAqIEZvciB0aGUgcHVycG9zZXMgb2YgdGhlIGRlbW8sIGNyZWF0ZSBhIHNpbXBsZSBwaW5rIGJveC5cbiAqIGBgYHR5cGVzY3JpcHRcbiAqIFtbaW5jbHVkZTpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMC50c11dXG4gKiBgYGBcbiAqIE5leHQgd2UgbmVlZCB0byBmaW5kIHRoZSBwb3NpdGlvbiB0byBwbGFjZSB0aGUgY3ViZSwgd2UgdXNlIHRoZSBoZWxwZnVsIG1ldGhvZFxuICogW1tnZXRXb3JsZFBvc2l0aW9uQXRdXSB0byBnZXQgdGhlIHdvcmxkIHNwYWNlIHBvc2l0aW9uIHVuZGVyIHRoZSBtb3VzZSB3aGVuIGl0IGlzIGNsaWNrZWQsIHRoaXNcbiAqIGlzIHNob3duIGhlcmU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBbW2luY2x1ZGU6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzEudHNdXVxuICogYGBgXG4gKlxuICogSGVyZSB0aGUgb2JqZWN0IGlzIGNyZWF0ZWQgYW5kIGFkZGVkIHRvIHRoZSBzY2VuZS5cbiAqIGBgYHR5cGVzY3JpcHRcbiAqIFtbaW5jbHVkZTpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMi50c11dXG4gKiBgYGBcbiAqXG4gKiBJbiBoYXJwLmdsLCB3ZSBwb3NpdGlvbiBlbGVtZW50cyBbcmVsYXRpdmUgdG9cbiAqIGNlbnRlcl0oaHR0cDovL2hlbHAuYWdpLmNvbS9BR0lDb21wb25lbnRzL2h0bWwvQmxvZ1ByZWNpc2lvbnNQcmVjaXNpb25zLmh0bSksIHdoaWNoIGhlbHBzIHRvXG4gKiBlbnN1cmUgYWNjdXJhY3kuXG4gKlxuICogVGhlIGRyYXdiYWNrIG9mIHRoaXMgaXMgdGhhdCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGN1YmUgZWFjaCBmcmFtZS4gVGhpcyBpc1xuICogZm9ydHVuYXRlbHkgZWFzeSB0byBkbyBhbmQgaXMgc2hvd24gaGVyZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIFtbaW5jbHVkZTpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMy50c11dXG4gKiBgYGBcbiAqXG4gKiBGaW5hbGx5LCBpbiBvcmRlciB0byBzZWUgdGhlIGN1YmUgcmVuZGVyZWQgb24gdGhlIG1hcCwgd2UgbmVlZCB0byBmb3JjZSBhbiB1cGRhdGUuXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBbW2luY2x1ZGU6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzQudHNdXVxuICogYGBgXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgVGhyZWVqc0FkZFNpbXBsZU9iamVjdCB7XG4gICAgLy8gc25pcHBldDpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMC50c1xuICAgIGNvbnN0IHNjYWxlID0gMTAwO1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEgKiBzY2FsZSwgMSAqIHNjYWxlLCAxICogc2NhbGUpO1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4MDBmZjAwZmVcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjcmVhdGVQaW5rQ3ViZSgpOiBUSFJFRS5NZXNoIHtcbiAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY3ViZSBvdmVybGFwcyBldmVyeXRoaW5nIGVsc2UsIGlzIGNvbXBsZXRlbHkgYXJiaXRyYXJ5LlxuICAgICAgICBtZXNoLnJlbmRlck9yZGVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gICAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgICAvLyBlbmQ6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzAudHNcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBNYXBWaWV3IGZvciB0aGUgSFRNTENhbnZhc0VsZW1lbnQgb2YgdGhlIGdpdmVuIGlkLlxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVNYXBWaWV3KGlkOiBzdHJpbmcpOiBNYXBWaWV3IHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwVmlldyh7XG4gICAgICAgICAgICBjYW52YXMsXG4gICAgICAgICAgICB0aGVtZTogXCJyZXNvdXJjZXMvYmVybGluX3RpbGV6ZW5fYmFzZS5qc29uXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29weXJpZ2h0RWxlbWVudEhhbmRsZXIuaW5zdGFsbChcImNvcHlyaWdodE5vdGljZVwiLCBtYXApO1xuXG4gICAgICAgIC8vIENlbnRlciB0aGUgY2FtZXJhIG9uIE1hbmhhdHRhbiwgTmV3IFlvcmsgQ2l0eS5cbiAgICAgICAgbWFwLnNldENhbWVyYUdlb2xvY2F0aW9uQW5kWm9vbShuZXcgR2VvQ29vcmRpbmF0ZXMoNDAuNjkzNSwgLTc0LjAwOSksIDE2LjkpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBkZWZhdWx0IG1hcCBjb250cm9scywgYWxsb3dpbmcgdGhlIHVzZXIgdG8gcGFuIGFyb3VuZCBmcmVlbHkuXG4gICAgICAgIGNvbnN0IG1hcENvbnRyb2xzID0gbmV3IE1hcENvbnRyb2xzKG1hcCk7XG4gICAgICAgIG1hcENvbnRyb2xzLm1heFBpdGNoQW5nbGUgPSA1MDtcbiAgICAgICAgbWFwQ29udHJvbHMuc2V0Um90YXRpb24oNi4zLCA1MCk7XG5cbiAgICAgICAgLy8gQWRkIGFuIFVJLlxuICAgICAgICBjb25zdCB1aSA9IG5ldyBNYXBDb250cm9sc1VJKG1hcENvbnRyb2xzKTtcbiAgICAgICAgY2FudmFzLnBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKHVpLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFJlc2l6ZSB0aGUgbWFwVmlldyB0byBtYXhpbXVtLlxuICAgICAgICBtYXAucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlYWN0IG9uIHJlc2l6ZSBldmVudHMuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgICAgIG1hcC5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIHNuaXBwZXQ6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzEudHNcbiAgICAgICAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIG1vdXNlIGluIHdvcmxkIHNwYWNlLlxuICAgICAgICAgICAgY29uc3Qgd29ybGRQb3NpdGlvbkF0TW91c2UgPSBtYXAuZ2V0V29ybGRQb3NpdGlvbkF0KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG4gICAgICAgICAgICBpZiAod29ybGRQb3NpdGlvbkF0TW91c2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlbmQ6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzEudHNcblxuICAgICAgICAgICAgLy8gc25pcHBldDpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMi50c1xuICAgICAgICAgICAgY29uc3QgY3ViZSA9IGNyZWF0ZVBpbmtDdWJlKCk7XG4gICAgICAgICAgICBtYXAuc2NlbmUuYWRkKGN1YmUpO1xuICAgICAgICAgICAgLy8gZW5kOmhhcnBfZ2xfdGhyZWVqc19hZGRfc2ltcGxlX29iamVjdF8yLnRzXG5cbiAgICAgICAgICAgIC8vIHNuaXBwZXQ6aGFycF9nbF90aHJlZWpzX2FkZF9zaW1wbGVfb2JqZWN0XzMudHNcbiAgICAgICAgICAgIC8vIEFkZCBhIGNhbGxiYWNrIHRvIGV4ZWN1dGUgYmVmb3JlIHRoZSBpdGVtcyBhcmUgcmVuZGVyZWQuXG4gICAgICAgICAgICBtYXAuYWRkRXZlbnRMaXN0ZW5lcihNYXBWaWV3RXZlbnROYW1lcy5SZW5kZXIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGN1YmUgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHdvcmxkIGNlbnRlci4gTm90ZSwgd2UgZG9uJ3Qgc3VidHJhY3QgdGhlXG4gICAgICAgICAgICAgICAgLy8gW1t3b3JsZENlbnRlcl1dIGZyb20gdGhlIHdvcmxkTW91c2VQb3NpdGlvbiwgYmVjYXVzZSB3ZSBuZWVkIHRvIGtlZXAgdGhlIGN1YmVzXG4gICAgICAgICAgICAgICAgLy8gd29ybGQgcG9zaXRpb24gdW50b3VjaGVkLlxuICAgICAgICAgICAgICAgIGN1YmUucG9zaXRpb24uY29weSh3b3JsZFBvc2l0aW9uQXRNb3VzZSkuc3ViKG1hcC53b3JsZENlbnRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGVuZDpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfMy50c1xuXG4gICAgICAgICAgICAvLyBzbmlwcGV0OmhhcnBfZ2xfdGhyZWVqc19hZGRfc2ltcGxlX29iamVjdF80LnRzXG4gICAgICAgICAgICAvLyBGb3JjZSB0aGUgc2NlbmUgdG8gYmUgcmVyZW5kZXJlZCBvbmNlIHRoZSBjdWJlIGlzIGFkZGVkIHRvIHRoZSBzY2VuZS5cbiAgICAgICAgICAgIG1hcC51cGRhdGUoKTtcbiAgICAgICAgICAgIC8vIGVuZDpoYXJwX2dsX3RocmVlanNfYWRkX3NpbXBsZV9vYmplY3RfNC50c1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYENsaWNrIHRvIGFkZCBhICR7c2NhbGV9bSB3aWRlIGN1YmUgdG8gc2NlbmUuYDtcblxuICAgIG1lc3NhZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgbWVzc2FnZS5zdHlsZS5jc3NGbG9hdCA9IFwicmlnaHRcIjtcbiAgICBtZXNzYWdlLnN0eWxlLnRvcCA9IFwiMTBweFwiO1xuICAgIG1lc3NhZ2Uuc3R5bGUucmlnaHQgPSBcIjEwcHhcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgbWFwVmlldyA9IGluaXRpYWxpemVNYXBWaWV3KFwibWFwQ2FudmFzXCIpO1xuXG4gICAgY29uc3QgaGVyZUNvcHlyaWdodEluZm86IENvcHlyaWdodEluZm8gPSB7XG4gICAgICAgIGlkOiBcImhlcmUuY29tXCIsXG4gICAgICAgIHllYXI6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgbGFiZWw6IFwiSEVSRVwiLFxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vbGVnYWwuaGVyZS5jb20vdGVybXNcIlxuICAgIH07XG4gICAgY29uc3QgY29weXJpZ2h0czogQ29weXJpZ2h0SW5mb1tdID0gW2hlcmVDb3B5cmlnaHRJbmZvXTtcblxuICAgIGNvbnN0IG9tdkRhdGFTb3VyY2UgPSBuZXcgT212RGF0YVNvdXJjZSh7XG4gICAgICAgIGJhc2VVcmw6IFwiaHR0cHM6Ly94eXouYXBpLmhlcmUuY29tL3RpbGVzL2hlcmViYXNlLjAyXCIsXG4gICAgICAgIGFwaUZvcm1hdDogQVBJRm9ybWF0LlhZWk9NVixcbiAgICAgICAgc3R5bGVTZXROYW1lOiBcInRpbGV6ZW5cIixcbiAgICAgICAgbWF4Wm9vbUxldmVsOiAxNyxcbiAgICAgICAgYXV0aGVudGljYXRpb25Db2RlOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgY29weXJpZ2h0SW5mbzogY29weXJpZ2h0c1xuICAgIH0pO1xuXG4gICAgbWFwVmlldy5hZGREYXRhU291cmNlKG9tdkRhdGFTb3VyY2UpO1xufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/threejs_add-simple-object.ts\n");

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = THREE;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJUSFJFRVwiP2ZjMDAiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBUSFJFRTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///three\n");

/***/ })

/******/ });