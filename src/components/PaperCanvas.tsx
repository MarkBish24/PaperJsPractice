import { useEffect, useRef } from "react";
import paper, { Path, Point, Color, project } from "paper";
import { Rectangle } from "paper/dist/paper-core";

export default function PaperCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    paper.setup(canvasRef.current);

    // Create rectangle
    const path = new Path.Rectangle(new Point(75, 75), [75, 75]);
    path.fillColor = new Color("red");

    // Animate rotation
    paper.view.onFrame = () => {
      path.rotate(3);
      if (path.fillColor) {
        path.fillColor.hue += 1;
      }
    };

    // Cleanup on unmount
    return () => {
      paper.view.onFrame = null;
      paper.project.clear();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
