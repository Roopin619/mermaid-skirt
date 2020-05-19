export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
  
    // Design pattern here
    points.origin = new Point(0, 0);
    // points.rHem = points.origin.translate(measurements.frontHipArc + options.manipulateHem , measurements.length);
    // points.lHem = points.origin.shift(-90, measurements.length);
    points.rHip = points.origin.translate(measurements.frontHipArc, options.naturalWaistToHip);
    points.rWaist = points.origin.translate(measurements.frontWaistArc / 2 + options.frontDartWidth , -(1/2) * inch);
    points.waistCp = points.rWaist.shift(195, points.origin.dx(points.rWaist) / 3);
    points.cp1 = points.rHip.shift(90, -points.rHip.dy(points.origin) / 2);
    // points.cp2 = points.rHip.shift(-90, points.rHip.dy(points.rHem) / 2.5);
    // points.topRight = points.origin.shift(0, measurements.frontHipArc);
    // points.bottomRight = points.topRight.shift(-90, measurements.length);
  
    paths.waistCurve = new Path()
      .move(points.origin)
      ._curve(points.waistCp, points.rWaist)
      .attr("class","hidden")
  
    // Dart points
    let waistlength = paths.waistCurve.length()/2;
    points.leftDartC = paths.waistCurve
      .shiftAlong(waistlength);
    points.leftDartR = paths.waistCurve
      .shiftAlong(waistlength + options.frontDartWidth/2);
    points.leftDartL = paths.waistCurve
      .shiftAlong(waistlength - options.frontDartWidth/2);
    points.leftDartPoint = points.leftDartC
      .shift(-90, options.frontLeftDartLength);
    /*points.rightDartL = paths.waistCurve
      .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap);
    points.rightDartR = paths.waistCurve
      .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth);
    points.rightDartC = paths.waistCurve
      .shiftAlong(options.waistDartPosition + options.frontDartWidth/2 + options.dartGap + options.frontDartWidth/2);
    points.rightDartPoint = points.rightDartC
      .shift(-87, options.frontRightDartLength);*/

    const shiftDistance = measurements.hemLine / 6;
    points.leftDartR = points.leftDartR.shift(0, shiftDistance);
    points.shiftedLeftDartPoint = points.leftDartPoint.shift(0, shiftDistance);
    points.shiftedLeftDartC = points.leftDartC.shift(0, shiftDistance);
    points.rWaist = points.rWaist.shift(0, shiftDistance);
    points.cp1 = points.cp1.shift(0, shiftDistance);
    points.rHip = points.rHip.shift(0, shiftDistance);
    points.leftKneeL = points.origin.shift(-88, measurements.inseam / 2);
    points.leftKneeR = points.leftDartC.shift(-91, measurements.inseam / 2);
    points.rightKneeL = points.shiftedLeftDartC.shift(-88, measurements.inseam / 2);
    points.rightKneeR = points.rHip.shift(-91, measurements.inseam / 5.5);
    points.leftMermaidCpL = points.origin.shift(-89, measurements.inseam / 1.2);
    points.leftMermaidCpR = points.leftDartC.shift(-90, measurements.inseam / 1.2);
    points.rightMermaidCpL = points.shiftedLeftDartC.shift(-89, measurements.inseam / 1.2);
    points.rightMermaidCpR = points.rHip.shift(-93, measurements.inseam / 2);
    points.leftMermaidLHem = points.origin.translate(-measurements.frontHipArc / 6, measurements.inseam);
    points.leftMermaidRHem = points.leftDartC.translate(measurements.frontHipArc / 4, measurements.inseam);
    points.rightMermaidLHem = points.shiftedLeftDartC.translate(-measurements.frontHipArc / 6, measurements.inseam);
    points.rightMermaidRHem = points.rightMermaidLHem.shift(0, 1.2 * points.leftMermaidLHem.dx(points.leftMermaidRHem));;
    
    paths.frontMermaid1 = new Path()
      .move(points.leftDartPoint)
      .line(points.leftDartL)
      .line(points.origin)
      .line(points.leftKneeL)
      ._curve(points.leftMermaidCpL, points.leftMermaidLHem)
      .line(points.leftMermaidRHem)
      ._curve(points.leftMermaidCpR, points.leftKneeR)
      .line(points.leftDartPoint)
      .close();

    paths.frontMermaid2 = new Path()
      .move(points.shiftedLeftDartPoint)
      .line(points.leftDartR)
      .line(points.rWaist)
      ._curve(points.cp1, points.rHip)
      .line(points.rightKneeR)
      ._curve(points.rightMermaidCpR, points.rightMermaidRHem)
      .line(points.rightMermaidLHem)
      ._curve(points.rightMermaidCpL, points.rightKneeL)
      .line(points.shiftedLeftDartPoint)
      .close();
  
    /*paths.rightDart = new Path()
      .move(points.rightDartL)
      .line(points.rightDartPoint)
      .line(points.rightDartR)*/
  
    // Complete?
    if (complete) {
      if (sa) {
      }
      // Paperless?
      if (paperless) {
      }
    }
    return part;
}