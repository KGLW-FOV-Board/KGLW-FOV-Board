"use client";

import { useEffect, useRef } from "react";

export default function ZoomViewer() {

  const ref = useRef<HTMLDivElement | null>(null);

  // STORE VIEWER GLOBALLY INSIDE COMPONENT
  const viewerRef = useRef<any>(null);

  useEffect(() => {

    const el = ref.current;
    if (!el) return;

    let viewer: any;

    (async () => {

      const OpenSeadragon =
        (await import("openseadragon")).default;

      viewer = OpenSeadragon({
        element: el,
        prefixUrl:
          "https://openseadragon.github.io/openseadragon/images/",
        tileSources: "./2025_board.dzi",
        showNavigator: false,
        maxZoomPixelRatio: 10,
      });

      // SAVE VIEWER
      viewerRef.current = viewer;

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

      // COPY CURRENT VIEW TO CLIPBOARD
      (window as any).copyView = async () => {

        if (!viewerRef.current) return;

        const center =
          viewerRef.current.viewport.getCenter();

        const zoom =
          viewerRef.current.viewport.getZoom();

        const output =
          `{ x: ${center.x.toFixed(4)}, y: ${center.y.toFixed(4)}, zoom: ${zoom.toFixed(2)} }`;

        console.log(output);

        try {
          await navigator.clipboard.writeText(output);
          console.log("Copied to clipboard");
        } catch {
          console.log("Clipboard copy failed");
        }
      };

      // CLICK TO LOG POSITION
      viewer.addHandler("canvas-click", (event: any) => {

        const point =
          viewer.viewport.pointFromPixel(event.position);

        console.log({
          x: Number(point.x.toFixed(4)),
          y: Number(point.y.toFixed(4)),
        });
      });

      // =====================================================
      // BUTTON THEME
      // =====================================================

      viewer.element.classList.add("gizz-osd-theme");

      // =====================================================
      // ROTATE CLOCKWISE
      // =====================================================

      viewer.addHandler("open", () => {

        const btn = document.createElement("button");

        btn.innerHTML = "⟳";
        btn.title = "Rotate Clockwise 90°";
        btn.style.cursor = "pointer";
        btn.className = "openseadragon-button";

        btn.onclick = () => {

          const current =
            viewer.viewport.getRotation();

          viewer.viewport.setRotation(current + 90);
        };

        viewer.addControl(btn, {
          anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT,
        });
      });

      // =====================================================
      // ROTATE COUNTERCLOCKWISE
      // =====================================================

      viewer.addHandler("open", () => {

        const btn = document.createElement("button");

        btn.innerHTML = "⟲";
        btn.title = "Rotate Counter-clockwise 90°";
        btn.style.cursor = "pointer";
        btn.className = "openseadragon-button";

        btn.onclick = () => {

          const current =
            viewer.viewport.getRotation();

          viewer.viewport.setRotation(current - 90);
        };

        viewer.addControl(btn, {
          anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT,
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