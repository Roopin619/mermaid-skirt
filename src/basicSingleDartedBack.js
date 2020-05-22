export default function(part) {
    let { Point, points, Path, paths, measurements, options } = part.shorthand();
    const inch = 25.4;
    const shiftDistance = measurements.hemLine / 6;
  
    // Design pattern here
    points.origin = new Point(0, 0);
    points.lWaist = points.origin.translate(-(measurements.backWaistArc / 2 + options.backDartWidth), -(1/2) * inch);
    points.waistCp = points.lWaist.shift(-195, points.origin.dx(points.lWaist) / 3);
    
    paths.waistCurve = new Path()
    .move(points.origin)
    ._curve(points.waistCp, points.lWaist)
    .attr("class","hidden");
  
    // Dart Points
    let waistlength = paths.waistCurve.length()/2;
    points.rightDartC = paths.waistCurve
      .shiftAlong(waistlength);
    points.rightDartL = paths.waistCurve
      .shiftAlong(waistlength + options.backDartWidth/2);
    points.rightDartR = paths.waistCurve
      .shiftAlong(waistlength - options.backDartWidth/2);
    points.rightDartPoint = points.rightDartC
      .shift(-90, options.backRightDartLength);
    /*points.leftDartR = paths.waistCurve
      .shiftAlong(options.waistDartPosition + options.backDartWidth/2 + options.dartGap);
    points.leftDartL = paths.waistCurve
      .shiftAlong(options.waistDartPosition + options.backDartWidth/2 + options.dartGap + options.backDartWidth);
    points.leftDartC = paths.waistCurve
      .shiftAlong(waistlength);
    points.leftDartPoint = points.leftDartC
      .shift(-91, options.backLeftDartLength);*/

    points.rightDartL = points.rightDartL.shift(180, shiftDistance);
    points.rightMermaidRHip = points.origin.shift(-90, options.naturalWaistToHip);
    points.rightMermaidLHip = points.rightDartC.shift(-90, options.naturalWaistToHip);
    points.leftMermaidRHip = points.rightMermaidLHip.shift(180, shiftDistance);
    points.leftMermaidLHip = points.origin.translate(-(measurements.backHipArc + shiftDistance), options.naturalWaistToHip);
    points.leftMermaidLHipCp = points.leftMermaidLHip.shift(90, options.naturalWaistToHip / 1.5);
    
    const leftMermaidHipDiff = points.leftMermaidLHip.dx(points.leftMermaidRHip);
    const rightMermaidHipDiff = points.rightMermaidLHip.dx(points.rightMermaidRHip);

    const frontHipDifference = measurements.frontHipArc - Math.abs(points.origin.dx(points.rightDartC));

    points.rightMermaidCpR = points.rightMermaidRHip.shift(-95, measurements.inseam/1.8);
    points.rightMermaidCpL = points.rightMermaidLHip.shift(-87, measurements.inseam/2);
    points.leftMermaidCpR = points.leftMermaidRHip.shift(-95, measurements.inseam/1.8);
    points.leftMermaidCpL = points.leftMermaidLHip.shift(-82, measurements.inseam/2.2);
    points.shiftedRightDartPoint = points.rightDartPoint.shift(180, shiftDistance);
    points.shiftedRightDartC = points.rightDartC.shift(180, shiftDistance);
    points.lWaist = points.lWaist.shift(180, shiftDistance);
    points.waistCp = points.waistCp.shift(180, shiftDistance);

    points.rightMermaidBottom = points.origin
      .translate(-rightMermaidHipDiff / 2, measurements.inseam + options.inseamToGround);
    points.leftMermaidBottom = points.rightMermaidBottom
      .shift(180, rightMermaidHipDiff / 2 + shiftDistance + leftMermaidHipDiff / 2);
    points.rightMermaidRHem = points.rightMermaidBottom
      .translate(rightMermaidHipDiff, 0.3 * leftMermaidHipDiff);
    points.rightMermaidLHem = points.rightMermaidBottom
      .translate(-rightMermaidHipDiff, 0.1 * leftMermaidHipDiff);
    points.leftMermaidRHem = points.leftMermaidBottom
      .translate(leftMermaidHipDiff, 0.1 * leftMermaidHipDiff);
    points.leftMermaidLHem = points.leftMermaidBottom
      .translate(-leftMermaidHipDiff, -0.1 * frontHipDifference);
    points.leftMermaidBottomCpL = points.leftMermaidLHem
      .shift(-20, leftMermaidHipDiff / 1.4);
    points.leftMermaidBottomCpR = points.leftMermaidRHem
      .shift(190, leftMermaidHipDiff / 1.4);
    points.rightMermaidBottomCpL = points.rightMermaidLHem
      .shift(-38, rightMermaidHipDiff);
    points.rightMermaidBottomCpR = points.rightMermaidRHem
      .shift(205, rightMermaidHipDiff / 1.8);

    points.rightMermaidCut = points.rightDartPoint.shift(-5, 0.1 * shiftDistance);
    points.leftMermaidCut = points.shiftedRightDartPoint.shift(185, 0.1 * shiftDistance);

    paths.waistCurve = new Path()
      .move(points.rightDartL)
      ._curve(points.waistCp, points.lWaist)

    paths.frontMermaid4 = new Path()
      .move(points.rightDartPoint)
      .line(points.rightDartR)
      .line(points.origin)
      .line(points.rightMermaidRHip)
      ._curve(points.rightMermaidCpR, points.rightMermaidRHem)
      .curve(points.rightMermaidBottomCpR, points.rightMermaidBottomCpL, points.rightMermaidLHem)
      ._curve(points.rightMermaidCpL, points.rightMermaidLHip)
      .line(points.rightDartPoint)
      .line(points.rightMermaidCut);

    paths.frontMermaid3 = new Path()
      .move(points.shiftedRightDartPoint)
      .line(points.rightDartL)
      ._curve(points.waistCp, points.lWaist)
      ._curve(points.leftMermaidLHipCp, points.leftMermaidLHip)
      ._curve(points.leftMermaidCpL, points.leftMermaidLHem)
      .curve(points.leftMermaidBottomCpL, points.leftMermaidBottomCpR, points.leftMermaidRHem)
      ._curve(points.leftMermaidCpR, points.leftMermaidRHip)
      .line(points.shiftedRightDartPoint)
      .line(points.leftMermaidCut);
  
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