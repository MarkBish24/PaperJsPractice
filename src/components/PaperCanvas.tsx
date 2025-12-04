import { useEffect, useRef } from "react";
import paper, { Path, Point, Color, project, PointText, view } from "paper";
import { Rectangle } from "paper/dist/paper-core";

export default function PaperCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    paper.setup(canvasRef.current);

    const text = new paper.PointText({
      point: paper.view.center,
      justification: "center",
      fontSize: 30,
      fillColor: new paper.Color("black"),
    });

    let destination = new paper.Point(
      Math.random() * paper.view.size.width,
      Math.random() * paper.view.size.height
    );

    paper.view.onFrame = () => {
      const vector = destination.subtract(text.position);

      text.position = text.position.add(vector.divide(30));

      text.content = Math.round(vector.length).toString();

      if (vector.length < 5) {
        destination = new paper.Point(
          Math.random() * paper.view.size.width,
          Math.random() * paper.view.size.height
        );
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
