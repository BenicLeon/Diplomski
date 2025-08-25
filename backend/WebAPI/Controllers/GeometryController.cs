using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using Model.Geometry;
using Service;
using Microsoft.AspNetCore.Authorization;
using Common;
using Model.Geometry.Input;
using Model.Geometry.Request;


[Authorize]
[ApiController]
[Route("api/geometry")]
public class GeometryController : ControllerBase
{
    private readonly IGeometryService _geometryService;

    public GeometryController(IGeometryService geometryService)
    {
        _geometryService = geometryService;
    }

    [HttpPost("distance-between-planes")]
    public ActionResult<CalculateResult> CalculateDistance([FromBody] PlaneRequest request)
    {
        if (!IsPlaneDefined(request.First) || !IsPlaneDefined(request.Second))
            return BadRequest(Error("Koeficijenti A, B i C u jednoj od ravnina ne mogu svi biti 0."));

        var result = _geometryService.CalculateDistanceBetweenPlanes(request.First, request.Second);
        return Ok(result);
    }

    [HttpPost("angle-between-planes")]
    public ActionResult<CalculateResult> CalculateAngle([FromBody] PlaneRequest request)
    {
        if (!IsPlaneDefined(request.First) || !IsPlaneDefined(request.Second))
            return BadRequest(Error("Koeficijenti A, B i C u jednoj od ravnina ne mogu svi biti 0."));

        var result = _geometryService.CalculateAngleBetweenPlanes(request.First, request.Second);
        return Ok(result);
    }

    [HttpPost("angle-between-plane-line")]
    public ActionResult<CalculateResult> CalculateAngleBetweenPlaneAndLine([FromBody] PlaneLineRequest request)
    {
        if (!IsPlaneDefined(request.Plane))
            return BadRequest(Error("Ravnina nije definirana – A, B i C ne mogu svi biti 0."));

        if (!IsVectorDefined(request.Line.X, request.Line.Y, request.Line.Z))
            return BadRequest(Error("Vektor smjera pravca nije definiran – X, Y i Z ne mogu svi biti 0."));

        var result = _geometryService.CalculateAngleBetweenPlaneAndLine(request.Plane, request.Line);
        return Ok(result);
    }

    [HttpPost("point-belonging-check")]
    public ActionResult IsPointBelongingToPlane([FromBody] PlanePointRequest request)
    {
        if (!IsPlaneDefined(request.Plane))
            return BadRequest(Error("Ravnina nije definirana – A, B i C ne mogu svi biti 0."));

        if (!IsPointDefined(request.Point))
            return BadRequest(Error("Točka nije definirana – X, Y i Z ne mogu svi biti 0."));

        var result = _geometryService.IsPointBelongingToPlane(request.Plane, request.Point);
        return Ok(result);
    }

    [HttpPost("plane-origin-check")]
    public ActionResult IsPlaneTroughOrigin([FromBody] PlaneInput request)
    {
        if (!IsPlaneDefined(request))
            return BadRequest(Error("Ravnina nije definirana – A, B i C ne mogu svi biti 0."));

        var result = _geometryService.IsPlaneTroughOrigin(request);
        return Ok(result);
    }

    [HttpPost("distance-between-plane-point")]
    public ActionResult<CalculateResult> CalculateDistanceBetweenPlanePoint([FromBody] PlanePointRequest request)
    {
        if (!IsPlaneDefined(request.Plane))
            return BadRequest(Error("Ravnina nije definirana – A, B i C ne mogu svi biti 0."));

        if (!IsPointDefined(request.Point))
            return BadRequest(Error("Točka nije definirana – X, Y i Z ne mogu svi biti 0."));

        var result = _geometryService.CalculatePointPlaneDistance(request.Plane, request.Point);
        return Ok(result);
    }

    [HttpPost("points-distance")]
    public ActionResult<CalculateResult> CalculatePointsDistance([FromBody] PointsDistanceRequest request)
    {
        if (!IsPointDefined(request.PointFirst))
            return BadRequest(Error("Prva točka nije definirana – X, Y i Z ne mogu svi biti 0."));

        if (!IsPointDefined(request.PointSecond))
            return BadRequest(Error("Druga točka nije definirana – X, Y i Z ne mogu svi biti 0."));

        var result = _geometryService.CalculatePointsDistance(request.PointFirst, request.PointSecond);
        return Ok(result);
    }

    [HttpPost("line-from-points")]
    public ActionResult<CalculateLineResult> CalculateLineFromPoints([FromBody] LineFromPointsRequest request)
    {
        if (request == null || request.Point1 == null || request.Point2 == null)
            return BadRequest(Error("Podaci o točkama nisu poslani."));

        if (!AreDifferentPoints(request.Point1, request.Point2))
            return BadRequest(Error("Točke su identične – pravac nije definiran."));

        var result = _geometryService.CalculateLineFromTwoPoints(request.Point1, request.Point2);
        return Ok(result);
    }

    [HttpPost("plane-from-three-points")]
    public ActionResult<CalculatePlaneResult> CalculatePlaneFromThreePoints([FromBody] ThreePointsRequest request)
    {
        if (request == null || request.Point1 == null || request.Point2 == null || request.Point3 == null)
            return BadRequest(Error("Nisu poslani svi potrebni podaci o točkama."));

        if (!AreDifferentPoints(request.Point1, request.Point2) ||
            !AreDifferentPoints(request.Point1, request.Point3) ||
            !AreDifferentPoints(request.Point2, request.Point3))
            return BadRequest(Error("Sve tri točke moraju biti različite kako bi definirale ravninu."));

        var result = _geometryService.CalculatePlaneFromThreePoints(request.Point1, request.Point2, request.Point3);
        return Ok(result);
    }
    private bool IsPlaneDefined(PlaneInput plane)
    {
        return !(plane.A == 0 && plane.B == 0 && plane.C == 0);
    }

    private bool IsVectorDefined(double x, double y, double z)
    {
        return !(x == 0 && y == 0 && z == 0);
    }

    private bool IsPointDefined(PointInput point)
    {
        return IsVectorDefined(point.X, point.Y, point.Z);
    }

    private bool AreDifferentPoints(PointInput p1, PointInput p2)
    {
        return !(p1.X == p2.X && p1.Y == p2.Y && p1.Z == p2.Z);
    }

    private ErrorResponseDTO Error(string message, string? details = null)
    {
        return new ErrorResponseDTO
        {
            Error = message,
            Details = details
        };
    }
}
