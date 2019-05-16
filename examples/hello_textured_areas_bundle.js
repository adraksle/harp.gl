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
/******/ 		"hello_textured_areas": 0
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
/******/ 	deferredModules.push(["./src/hello_textured_areas.ts","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/hello_textured_areas.ts":
/*!*************************************!*\
  !*** ./src/hello_textured_areas.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n * Copyright (C) 2017-2019 HERE Europe B.V.\n * Licensed under Apache 2.0, see full license in LICENSE\n * SPDX-License-Identifier: Apache-2.0\n */\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst harp_datasource_protocol_1 = __webpack_require__(/*! @here/harp-datasource-protocol */ \"../harp-datasource-protocol/index.ts\");\nconst harp_geoutils_1 = __webpack_require__(/*! @here/harp-geoutils */ \"../harp-geoutils/index.ts\");\nconst harp_map_controls_1 = __webpack_require__(/*! @here/harp-map-controls */ \"../harp-map-controls/index.ts\");\nconst harp_mapview_1 = __webpack_require__(/*! @here/harp-mapview */ \"../harp-mapview/index.ts\");\nconst harp_omv_datasource_1 = __webpack_require__(/*! @here/harp-omv-datasource */ \"../harp-omv-datasource/index.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./config.ts\");\nvar HelloWorldTexturedExample;\n(function (HelloWorldTexturedExample) {\n    function main() {\n        addTextureCoypright();\n        const mapView = initializeMapView(\"mapCanvas\");\n        const hereCopyrightInfo = {\n            id: \"here.com\",\n            year: new Date().getFullYear(),\n            label: \"HERE\",\n            link: \"https://legal.here.com/terms\"\n        };\n        const copyrights = [hereCopyrightInfo];\n        const omvDataSource = new harp_omv_datasource_1.OmvDataSource({\n            baseUrl: \"https://xyz.api.here.com/tiles/herebase.02\",\n            apiFormat: harp_omv_datasource_1.APIFormat.XYZOMV,\n            styleSetName: \"tilezen\",\n            maxZoomLevel: 17,\n            authenticationCode: config_1.accessToken,\n            copyrightInfo: copyrights\n        });\n        mapView.addDataSource(omvDataSource);\n    }\n    function addTextureCoypright() {\n        document.body.innerHTML += `\n<style>\n    #mapCanvas {\n        top: 0;\n    }\n    #texture-license{\n        margin: 10px;\n        padding: 10px;\n        color: #cccccc;\n    }\n</style>\n<p id=\"texture-license\">Textures by\n<a href=\"https://opengameart.org/content/wall-grass-rock-stone-wood-and-dirt-480\">\nWest</a>.</p>`;\n    }\n    /**\n     * Modify the theme after loading and replace some area features that use the [[FillTechnique]]\n     * to use [[StandardTexturedTechnique]] instead.\n     * This enables lighting for these areas and allows to specify textures.\n     * This could solely be done in the theme json file but for explanatory reasons it's done here.\n     * @param theme The theme that should be modified.\n     * @returns The modified theme.\n     */\n    function modifyTheme(theme) {\n        const urbanAreaTexture = \"resources/wests_textures/paving.png\";\n        const parkTexture = \"resources/wests_textures/clover.png\";\n        if (theme.styles) {\n            for (const styleSetName in theme.styles) {\n                if (!theme.styles.hasOwnProperty(styleSetName)) {\n                    continue;\n                }\n                const styleSet = theme.styles[styleSetName];\n                styleSet.forEach(style => {\n                    if (style.description === \"urban area\") {\n                        style.technique = \"standard\";\n                        style.attr = {\n                            color: \"#ffffff\",\n                            map: urbanAreaTexture,\n                            mapProperties: {\n                                repeatU: 10,\n                                repeatV: 10,\n                                wrapS: \"repeat\",\n                                wrapT: \"repeat\"\n                            },\n                            textureCoordinateType: harp_datasource_protocol_1.TextureCoordinateType.TileSpace\n                        };\n                    }\n                    else if (style.description === \"park\") {\n                        style.technique = \"standard\";\n                        style.attr = {\n                            color: \"#ffffff\",\n                            map: parkTexture,\n                            mapProperties: {\n                                repeatU: 5,\n                                repeatV: 5,\n                                wrapS: \"repeat\",\n                                wrapT: \"repeat\"\n                            },\n                            textureCoordinateType: harp_datasource_protocol_1.TextureCoordinateType.TileSpace\n                        };\n                    }\n                    else if (style.description === \"building_geometry\") {\n                        // Disable extruded buildings to reduce noise.\n                        style.technique = \"none\";\n                    }\n                });\n            }\n        }\n        return theme;\n    }\n    function initializeMapView(id) {\n        const canvas = document.getElementById(id);\n        const themePromise = harp_mapview_1.ThemeLoader.loadAsync(\"resources/berlin_tilezen_base.json\");\n        const map = new harp_mapview_1.MapView({\n            canvas,\n            theme: themePromise.then(modifyTheme)\n        });\n        harp_mapview_1.CopyrightElementHandler.install(\"copyrightNotice\", map);\n        map.camera.position.set(0, 0, 1600);\n        map.geoCenter = new harp_geoutils_1.GeoCoordinates(40.7, -74.010241978);\n        const mapControls = new harp_map_controls_1.MapControls(map);\n        mapControls.setRotation(0.9, 23.928);\n        const ui = new harp_map_controls_1.MapControlsUI(mapControls);\n        canvas.parentElement.appendChild(ui.domElement);\n        map.resize(window.innerWidth, window.innerHeight);\n        window.addEventListener(\"resize\", () => {\n            map.resize(window.innerWidth, window.innerHeight);\n        });\n        return map;\n    }\n    main();\n})(HelloWorldTexturedExample = exports.HelloWorldTexturedExample || (exports.HelloWorldTexturedExample = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGVsbG9fdGV4dHVyZWRfYXJlYXMudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVsbG9fdGV4dHVyZWRfYXJlYXMudHM/YmM0NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE3LTIwMTkgSEVSRSBFdXJvcGUgQi5WLlxuICogTGljZW5zZWQgdW5kZXIgQXBhY2hlIDIuMCwgc2VlIGZ1bGwgbGljZW5zZSBpbiBMSUNFTlNFXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFRleHR1cmVDb29yZGluYXRlVHlwZSwgVGhlbWUgfSBmcm9tIFwiQGhlcmUvaGFycC1kYXRhc291cmNlLXByb3RvY29sXCI7XG5pbXBvcnQgeyBHZW9Db29yZGluYXRlcyB9IGZyb20gXCJAaGVyZS9oYXJwLWdlb3V0aWxzXCI7XG5pbXBvcnQgeyBNYXBDb250cm9scywgTWFwQ29udHJvbHNVSSB9IGZyb20gXCJAaGVyZS9oYXJwLW1hcC1jb250cm9sc1wiO1xuaW1wb3J0IHsgQ29weXJpZ2h0RWxlbWVudEhhbmRsZXIsIENvcHlyaWdodEluZm8sIE1hcFZpZXcsIFRoZW1lTG9hZGVyIH0gZnJvbSBcIkBoZXJlL2hhcnAtbWFwdmlld1wiO1xuaW1wb3J0IHsgQVBJRm9ybWF0LCBPbXZEYXRhU291cmNlIH0gZnJvbSBcIkBoZXJlL2hhcnAtb212LWRhdGFzb3VyY2VcIjtcbmltcG9ydCB7IGFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEhlbGxvV29ybGRUZXh0dXJlZEV4YW1wbGUge1xuICAgIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgICAgIGFkZFRleHR1cmVDb3lwcmlnaHQoKTtcblxuICAgICAgICBjb25zdCBtYXBWaWV3ID0gaW5pdGlhbGl6ZU1hcFZpZXcoXCJtYXBDYW52YXNcIik7XG5cbiAgICAgICAgY29uc3QgaGVyZUNvcHlyaWdodEluZm86IENvcHlyaWdodEluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJoZXJlLmNvbVwiLFxuICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgbGFiZWw6IFwiSEVSRVwiLFxuICAgICAgICAgICAgbGluazogXCJodHRwczovL2xlZ2FsLmhlcmUuY29tL3Rlcm1zXCJcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29weXJpZ2h0czogQ29weXJpZ2h0SW5mb1tdID0gW2hlcmVDb3B5cmlnaHRJbmZvXTtcblxuICAgICAgICBjb25zdCBvbXZEYXRhU291cmNlID0gbmV3IE9tdkRhdGFTb3VyY2Uoe1xuICAgICAgICAgICAgYmFzZVVybDogXCJodHRwczovL3h5ei5hcGkuaGVyZS5jb20vdGlsZXMvaGVyZWJhc2UuMDJcIixcbiAgICAgICAgICAgIGFwaUZvcm1hdDogQVBJRm9ybWF0LlhZWk9NVixcbiAgICAgICAgICAgIHN0eWxlU2V0TmFtZTogXCJ0aWxlemVuXCIsXG4gICAgICAgICAgICBtYXhab29tTGV2ZWw6IDE3LFxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25Db2RlOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgICAgIGNvcHlyaWdodEluZm86IGNvcHlyaWdodHNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFwVmlldy5hZGREYXRhU291cmNlKG9tdkRhdGFTb3VyY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRleHR1cmVDb3lwcmlnaHQoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MICs9IGBcbjxzdHlsZT5cbiAgICAjbWFwQ2FudmFzIHtcbiAgICAgICAgdG9wOiAwO1xuICAgIH1cbiAgICAjdGV4dHVyZS1saWNlbnNle1xuICAgICAgICBtYXJnaW46IDEwcHg7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIGNvbG9yOiAjY2NjY2NjO1xuICAgIH1cbjwvc3R5bGU+XG48cCBpZD1cInRleHR1cmUtbGljZW5zZVwiPlRleHR1cmVzIGJ5XG48YSBocmVmPVwiaHR0cHM6Ly9vcGVuZ2FtZWFydC5vcmcvY29udGVudC93YWxsLWdyYXNzLXJvY2stc3RvbmUtd29vZC1hbmQtZGlydC00ODBcIj5cbldlc3Q8L2E+LjwvcD5gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vZGlmeSB0aGUgdGhlbWUgYWZ0ZXIgbG9hZGluZyBhbmQgcmVwbGFjZSBzb21lIGFyZWEgZmVhdHVyZXMgdGhhdCB1c2UgdGhlIFtbRmlsbFRlY2huaXF1ZV1dXG4gICAgICogdG8gdXNlIFtbU3RhbmRhcmRUZXh0dXJlZFRlY2huaXF1ZV1dIGluc3RlYWQuXG4gICAgICogVGhpcyBlbmFibGVzIGxpZ2h0aW5nIGZvciB0aGVzZSBhcmVhcyBhbmQgYWxsb3dzIHRvIHNwZWNpZnkgdGV4dHVyZXMuXG4gICAgICogVGhpcyBjb3VsZCBzb2xlbHkgYmUgZG9uZSBpbiB0aGUgdGhlbWUganNvbiBmaWxlIGJ1dCBmb3IgZXhwbGFuYXRvcnkgcmVhc29ucyBpdCdzIGRvbmUgaGVyZS5cbiAgICAgKiBAcGFyYW0gdGhlbWUgVGhlIHRoZW1lIHRoYXQgc2hvdWxkIGJlIG1vZGlmaWVkLlxuICAgICAqIEByZXR1cm5zIFRoZSBtb2RpZmllZCB0aGVtZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb2RpZnlUaGVtZSh0aGVtZTogVGhlbWUpOiBUaGVtZSB7XG4gICAgICAgIGNvbnN0IHVyYmFuQXJlYVRleHR1cmUgPSBcInJlc291cmNlcy93ZXN0c190ZXh0dXJlcy9wYXZpbmcucG5nXCI7XG4gICAgICAgIGNvbnN0IHBhcmtUZXh0dXJlID0gXCJyZXNvdXJjZXMvd2VzdHNfdGV4dHVyZXMvY2xvdmVyLnBuZ1wiO1xuXG4gICAgICAgIGlmICh0aGVtZS5zdHlsZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3R5bGVTZXROYW1lIGluIHRoZW1lLnN0eWxlcykge1xuICAgICAgICAgICAgICAgIGlmICghdGhlbWUuc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlU2V0TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlU2V0ID0gdGhlbWUuc3R5bGVzW3N0eWxlU2V0TmFtZV07XG4gICAgICAgICAgICAgICAgc3R5bGVTZXQuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5kZXNjcmlwdGlvbiA9PT0gXCJ1cmJhbiBhcmVhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnRlY2huaXF1ZSA9IFwic3RhbmRhcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmF0dHIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcDogdXJiYW5BcmVhVGV4dHVyZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBQcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdFU6IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBlYXRWOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcFM6IFwicmVwZWF0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBUOiBcInJlcGVhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlQ29vcmRpbmF0ZVR5cGU6IFRleHR1cmVDb29yZGluYXRlVHlwZS5UaWxlU3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuZGVzY3JpcHRpb24gPT09IFwicGFya1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS50ZWNobmlxdWUgPSBcInN0YW5kYXJkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5hdHRyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHBhcmtUZXh0dXJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0VTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0VjogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcFM6IFwicmVwZWF0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBUOiBcInJlcGVhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlQ29vcmRpbmF0ZVR5cGU6IFRleHR1cmVDb29yZGluYXRlVHlwZS5UaWxlU3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuZGVzY3JpcHRpb24gPT09IFwiYnVpbGRpbmdfZ2VvbWV0cnlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBleHRydWRlZCBidWlsZGluZ3MgdG8gcmVkdWNlIG5vaXNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudGVjaG5pcXVlID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhlbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZU1hcFZpZXcoaWQ6IHN0cmluZyk6IE1hcFZpZXcge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHRoZW1lUHJvbWlzZTogUHJvbWlzZTxUaGVtZT4gPSBUaGVtZUxvYWRlci5sb2FkQXN5bmMoXG4gICAgICAgICAgICBcInJlc291cmNlcy9iZXJsaW5fdGlsZXplbl9iYXNlLmpzb25cIlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgTWFwVmlldyh7XG4gICAgICAgICAgICBjYW52YXMsXG4gICAgICAgICAgICB0aGVtZTogdGhlbWVQcm9taXNlLnRoZW4obW9kaWZ5VGhlbWUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvcHlyaWdodEVsZW1lbnRIYW5kbGVyLmluc3RhbGwoXCJjb3B5cmlnaHROb3RpY2VcIiwgbWFwKTtcblxuICAgICAgICBtYXAuY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAxNjAwKTtcblxuICAgICAgICBtYXAuZ2VvQ2VudGVyID0gbmV3IEdlb0Nvb3JkaW5hdGVzKDQwLjcsIC03NC4wMTAyNDE5NzgpO1xuICAgICAgICBjb25zdCBtYXBDb250cm9scyA9IG5ldyBNYXBDb250cm9scyhtYXApO1xuICAgICAgICBtYXBDb250cm9scy5zZXRSb3RhdGlvbigwLjksIDIzLjkyOCk7XG4gICAgICAgIGNvbnN0IHVpID0gbmV3IE1hcENvbnRyb2xzVUkobWFwQ29udHJvbHMpO1xuICAgICAgICBjYW52YXMucGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQodWkuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgbWFwLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBtYXAucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIG1haW4oKTtcbn1cbiJdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/hello_textured_areas.ts\n");

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