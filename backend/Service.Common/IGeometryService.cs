using Common;
using Model.Geometry.Input;

namespace Service;

public interface IGeometryService
{
    CalculateResult CalculateDistanceBetweenPlanes(PlaneInput p1, PlaneInput p2);

    CalculateResult CalculateAngleBetweenPlanes(PlaneInput p1, PlaneInput p2);

    CalculateResult CalculateAngleBetweenPlaneAndLine(PlaneInput plane, LineInput line);

    bool IsPointBelongingToPlane(PlaneInput plane, PointInput point);

    bool IsPlaneTroughOrigin(PlaneInput plane);

    CalculateResult CalculatePointPlaneDistance(PlaneInput plane, PointInput point);

    CalculateResult CalculatePointsDistance(PointInput pointFirst, PointInput pointSecond);

    CalculateLineResult CalculateLineFromTwoPoints(PointInput p1, PointInput p2);

    CalculatePlaneResult CalculatePlaneFromThreePoints(PointInput p1, PointInput p2, PointInput p3);



}
