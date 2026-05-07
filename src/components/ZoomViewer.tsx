"use client";

import { useEffect, useRef } from "react";

export default function ZoomViewer() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let viewer: any;

    (async () => {
      const OpenSeadragon = (await import("openseadragon")).default;

      viewer = OpenSeadragon({
        element: el,
        prefixUrl:
          "https://openseadragon.github.io/openseadragon/images/",
        tileSources: "/2025_board.dzi",
        showNavigator: false,
        maxZoomPixelRatio: 10,
      });

      // Button Theme
      viewer.element.classList.add("gizz-osd-theme");

      // ✅ ROTATE BUTTON
      viewer.addHandler("open", () => {
        const btn = document.createElement("button");

        btn.innerHTML = "⟳";
        btn.title = "Rotate 90°";
        btn.style.cursor = "pointer";
        btn.className = "openseadragon-button";

        btn.onclick = () => {
          const current = viewer.viewport.getRotation();
          viewer.viewport.setRotation(current + 90);
        };

        viewer.addControl(btn, {
          anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT,
        });

        viewer.element.classList.add("gizz-osd-theme")
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