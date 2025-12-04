import { useEffect, useRef } from "react";
import paper from "paper";

export default function PaperCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    paper.setup(canvasRef.current);

    const numCircles = 20;
    const spacing = 20;
    const circles: paper.Path[] = [];

    // Create chain of circles
    for (let i = 0; i < numCircles; i++) {
      const circle = new paper.Path.Circle({
        center: [i * spacing + 100, 200],
        radius: 10,
        fillColor: "red",
      });
      circles.push(circle);
    }

    // Constraint solver
    function satisfyConstraints() {
      for (let i = 1; i < circles.length; i++) {
        const prev = circles[i - 1].position;
        const curr = circles[i].position;

        let delta = curr.subtract(prev);
        const dist = delta.length;
        const diff = dist - spacing;
        delta = delta.normalize();

        circles[i].position = circles[i].position.subtract(
          delta.multiply(diff * 0.5)
        );
        circles[i - 1].position = circles[i - 1].position.add(
          delta.multiply(diff * 0.5)
        );
      }
    }

    // Mouse control for tip
    paper.view.onMouseMove = (event: paper.MouseEvent) => {
      circles[0].position = event.point;
    };

    // Animation loop
    paper.view.onFrame = (event: any) => {
      // Gravity
      for (let i = 1; i < circles.length; i++) {
        circles[i].position.y += 0.5;
      }

      // Solve constraints multiple times for stability
      for (let i = 0; i < 5; i++) {
        satisfyConstraints();
      }
    };

    // Cleanup on unmount
    return () => {
      paper.view.onFrame = null;
      paper.view.onMouseMove = null;
      paper.project.clear();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
