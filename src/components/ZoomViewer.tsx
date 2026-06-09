"use client";

import { useEffect, useRef } from "react";

export default function ZoomViewer() {

  const ref = useRef<HTMLDivElement | null>(null);

  // VIEWER REFERENCES
  const viewerRef = useRef<any>(null);
  const osdRef = useRef<any>(null);
  const homeZoomRef = useRef<number>(1);

  useEffect(() => {

    const el = ref.current;
    if (!el) return;

    let viewer: any;

    (async () => {

      const OpenSeadragon =
        (await import("openseadragon")).default;

      osdRef.current = OpenSeadragon;

      viewer = OpenSeadragon({
        element: el,

        prefixUrl:
          "https://openseadragon.github.io/openseadragon/images/",

        tileSources: "./2025_board.dzi",

        showNavigator: false,
        maxZoomPixelRatio: 10,

        // SMOOTH CAMERA SETTINGS
        animationTime: 2.2,
        springStiffness: 3.5,

        gestureSettingsTouch: {
          pinchRotate: true,
        },
      });

      viewerRef.current = viewer;
      (window as any).viewerRef = viewerRef;

      // =====================================================
      // GLOBAL DEBUG HELPERS
      // =====================================================

      // LOG CURRENT VIEW
      (window as any).logView = () => {

        if (!viewerRef.current) return;

        const center =
          viewerRef.current.viewport.getCenter();

        const zoom =
          viewerRef.current.viewport.getZoom();

        console.log({
          x: Number(center.x.toFixed(4)),
          y: Number(center.y.toFixed(4)),
          zoom: Number(zoom.toFixed(2)),
        });
      };

      // =====================================================
      // CINEMATIC ZOOM FUNCTION
      // =====================================================

      (window as any).zoomToLocation = async (
        x: number,
        y: number,
        zoom: number
      ) => {

        if (!viewerRef.current || !osdRef.current) return;

        const viewer = viewerRef.current;
        const viewport = viewer.viewport;
        const OpenSeadragon = osdRef.current;

        // CURRENT STATE
        const currentCenter =
          viewport.getCenter();

        const currentZoom =
          viewport.getZoom();

        // DISTANCE TO TARGET
        const dx = currentCenter.x - x;
        const dy = currentCenter.y - y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        // FARTHER MOVES = MORE ZOOM OUT
        const zoomOutFactor =
          3 + Math.min(distance * 1.2, 1);

        const rawZoomedOutLevel =
          currentZoom / zoomOutFactor;

        // NEVER ZOOM OUT FARTHER
        // THAN THE HOME VIEW
        const zoomedOutLevel =
          Math.max(
            rawZoomedOutLevel,
            homeZoomRef.current
          );

        // =====================================================
        // STEP 1:
        // ZOOM OUT IN PLACE
        // =====================================================

        viewport.zoomTo(
          zoomedOutLevel,
          undefined,
          false
        );

        // WAIT FOR ZOOM OUT
        await new Promise((resolve) =>
          setTimeout(resolve, 700)
        );

        // =====================================================
        // STEP 2:
        // PAN ACROSS POSTER
        // =====================================================

        viewport.panTo(
          new OpenSeadragon.Point(x, y),
          false
        );

        // WAIT FOR PAN
        await new Promise((resolve) =>
          setTimeout(resolve, 900)
        );

        // =====================================================
        // STEP 3:
        // ZOOM BACK INTO TARGET
        // =====================================================

        viewport.zoomTo(
          zoom,
          undefined,
          false
        );
      };

      viewer.addHandler("open", () => {
        homeZoomRef.current =
          viewer.viewport.getHomeZoom();
      });

      // =====================================================
      // CLICK TO LOG IMAGE COORDINATES
      // =====================================================

      viewer.addHandler(
        "canvas-click",
        (event: any) => {

          const point =
            viewer.viewport.pointFromPixel(
              event.position
            );

          console.log({
            x: Number(point.x.toFixed(4)),
            y: Number(point.y.toFixed(4)),
          });
        }
      );

      // =====================================================
      // BUTTON THEME
      // =====================================================

      viewer.element.classList.add(
        "gizz-osd-theme"
      );

      // =====================================================
      // ROTATE CLOCKWISE
      // =====================================================

      viewer.addHandler("open", () => {

        const btn = document.createElement("button");

        btn.innerHTML = "⟳";
        btn.title = "Rotate Clockwise 90°";
        btn.style.cursor = "pointer";
        btn.className =
          "openseadragon-button";

        btn.onclick = () => {

          const current =
            viewer.viewport.getRotation();

          viewer.viewport.setRotation(
            current + 90
          );
        };

        viewer.addControl(btn, {
          anchor:
            OpenSeadragon.ControlAnchor.TOP_RIGHT,
        });
      });

      // =====================================================
      // ROTATE COUNTERCLOCKWISE
      // =====================================================

      viewer.addHandler("open", () => {

        const btn = document.createElement("button");

        btn.innerHTML = "⟲";
        btn.title =
          "Rotate Counter-clockwise 90°";

        btn.style.cursor = "pointer";

        btn.className =
          "openseadragon-button";

        btn.onclick = () => {

          const current =
            viewer.viewport.getRotation();

          viewer.viewport.setRotation(
            current - 90
          );
        };

        viewer.addControl(btn, {
          anchor:
            OpenSeadragon.ControlAnchor.TOP_RIGHT,
        });
      });

    })();

    return () => {
      if (viewer) viewer.destroy();
    };

  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        background: "black",
      }}
    />
  );
}