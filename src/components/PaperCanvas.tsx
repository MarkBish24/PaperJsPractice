import { useEffect, useRef } from "react";
import paper, { Path, Point, Color } from "paper";
import { Rectangle } from "paper/dist/paper-core";

export default function PaperCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    paper.setup(canvasRef.current);

    // Example: draw a circle in the center
    const circle = new Path.Circle({
      center: new Point(200, 200),
      radius: 50,
      fillColor: "skyblue",
    });

    var myPath = new Path();
    myPath.strokeColor = new Color("black");
    myPath.add(new Point(0, 0));
    myPath.add(new Point(100, 50));
    myPath.insert(1, new Point(30, 40));

    var path = new Path();
    path.strokeColor = new Color("black");
    path.add(new Point(30, 75));
    path.add(new Point(30, 25));
    path.add(new Point(80, 25));
    path.add(new Point(80, 75));
    path.closed = true;
    path.fullySelected = true;

    var copy = path.clone();
    copy.fullySelected = false;
    copy.position.x += 100;

    copy.smooth();

    var myPath = new Path();
    myPath.strokeColor = new Color("black");
    myPath.add(new Point(40, 90));
    myPath.add(new Point(90, 40));
    myPath.add(new Point(140, 90));

    myPath.closed = true;

    var myCircle = new Path.Circle(new Point(100, 70), 50);
    myCircle.strokeColor = new Color("black");
    myCircle.selected = true;

    myCircle.removeSegment(0);

    var myCircle = new Path.Circle(new Point(100, 70), 50);
    myCircle.fillColor = new Color("black");

    var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
    path = new Path.Rectangle(rectangle);
    path.fillColor = new Color("#e9e4ff");
    // Optional: animate the circle
    paper.view.onFrame = () => {
      circle.rotate(1); // rotate 1 degree per frame
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
