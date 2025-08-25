using Common;
using Model.Geometry.Input;
using System.Numerics;

namespace Service;

public class GeometryService : IGeometryService
{
    public CalculateResult CalculateDistanceBetweenPlanes(PlaneInput p1, PlaneInput p2)
    {
        bool areParallel =
            p1.A * p2.B == p2.A * p1.B &&
            p1.A * p2.C == p2.A * p1.C &&
            p1.B * p2.C == p2.B * p1.C;

        if (!areParallel)
        {
            return new CalculateResult
            {
                Result = 0,
                Steps = "Korak Provjera paralelnosti: vektori nisu proporcionalni. Korak Ravnine se sijeku pa je udaljenost 0."
            };
        }

        double numerator = Math.Abs(p2.D - p1.D);
        double denominator = Math.Sqrt(p1.A * p1.A + p1.B * p1.B + p1.C * p1.C);
        double distance = numerator / denominator;

        string steps = $"Korak Provjera paralelnosti: vektori normale n1=({p1.A},{p1.B},{p1.C}) i n2=({p2.A},{p2.B},{p2.C}) su proporcionalni. " +
                       $"Korak Koristi se formula d=|D2-D1|/sqrt(A²+B²+C²). " +
                       $"Korak d = |{p2.D}-{p1.D}| / sqrt({p1.A}²+{p1.B}²+{p1.C}²) = {Math.Round(distance, 4)}.";

        return new CalculateResult
        {
            Result = Math.Round(distance, 4),
            Steps = steps
        };
    }

    public CalculateResult CalculateAngleBetweenPlanes(PlaneInput p1, PlaneInput p2)
    {
        var dotProduct = (p1.A * p2.A) + (p1.B * p2.B) + (p1.C * p2.C);
        var magnitude1 = Math.Sqrt(Math.Pow(p1.A, 2) + Math.Pow(p1.B, 2) + Math.Pow(p1.C, 2));
        var magnitude2 = Math.Sqrt(Math.Pow(p2.A, 2) + Math.Pow(p2.B, 2) + Math.Pow(p2.C, 2));

        double cosine = dotProduct / (magnitude1 * magnitude2);
        double angleRad = Math.Acos(cosine);
        double angleDeg = Math.Round(angleRad * 180 / Math.PI, 4);

        string steps = $"Korak Skalarni produkt n₁·n₂ = {dotProduct}. " +
                       $"Korak Duljine: |n₁|={Math.Round(magnitude1, 4)}, |n₂|={Math.Round(magnitude2, 4)}. " +
                       $"Korak cos(θ)={Math.Round(cosine, 4)}. " +
                       $"Korak θ = arccos({Math.Round(cosine, 4)}) = {angleDeg}°.";

        return new CalculateResult
        {
            Result = angleDeg,
            Steps = steps
        };
    }

    public CalculateResult CalculateAngleBetweenPlaneAndLine(PlaneInput plane, LineInput line)
    {
        double dotProduct = (plane.A * line.X) + (plane.B * line.Y) + (plane.C * line.Z);
        double planeMagnitude = Math.Sqrt(Math.Pow(plane.A, 2) + Math.Pow(plane.B, 2) + Math.Pow(plane.C, 2));
        double lineMagnitude = Math.Sqrt(Math.Pow(line.X, 2) + Math.Pow(line.Y, 2) + Math.Pow(line.Z, 2));
        double cosine = dotProduct / (planeMagnitude * lineMagnitude);
        double angleBetweenNormalAndLine = Math.Acos(cosine) * 180 / Math.PI;
        double angle = Math.Round(Math.Abs(90 - angleBetweenNormalAndLine), 4);

        string steps = $"Korak Skalarni produkt n·v = {dotProduct}. " +
                       $"Korak Duljine: |n|={Math.Round(planeMagnitude, 4)}, |v|={Math.Round(lineMagnitude, 4)}. " +
                       $"Korak cos(θ)={Math.Round(cosine, 4)}. " +
                       $"Korak θ između pravca i ravnine = |90° - {Math.Round(angleBetweenNormalAndLine, 4)}°| = {angle}°.";

        return new CalculateResult
        {
            Result = angle,
            Steps = steps
        };
    }

    public bool IsPointBelongingToPlane(PlaneInput plane, PointInput point)
    {
        double sum = plane.A * point.X + plane.B * point.Y + plane.C * point.Z + plane.D;
        return sum == 0;
    }

    public bool IsPlaneTroughOrigin(PlaneInput plane)
    {
        return plane.D == 0;
    }

    public CalculateResult CalculatePointPlaneDistance(PlaneInput plane, PointInput point)
    {
        double numerator = Math.Abs(plane.A * point.X + plane.B * point.Y + plane.C * point.Z + plane.D);
        double denominator = Math.Sqrt(Math.Pow(plane.A, 2) + Math.Pow(plane.B, 2) + Math.Pow(plane.C, 2));
        double distance = Math.Round(numerator / denominator, 2);

        string steps = $"Korak Primjena formule: d = |Ax + By + Cz + D| / sqrt(A² + B² + C²). " +
                       $"Korak Brojnik = {numerator}. " +
                       $"Korak Nazivnik = {Math.Round(denominator, 4)}. " +
                       $"Korak Udaljenost = {distance}.";

        return new CalculateResult
        {
            Result = distance,
            Steps = steps
        };
    }

    public CalculateResult CalculatePointsDistance(PointInput pointFirst, PointInput pointSecond)
    {
        double dx = pointSecond.X - pointFirst.X;
        double dy = pointSecond.Y - pointFirst.Y;
        double dz = pointSecond.Z - pointFirst.Z;

        double distance = Math.Round(Math.Sqrt(dx * dx + dy * dy + dz * dz), 2);

        string steps = $"Korak Razlike: dx={dx}, dy={dy}, dz={dz}. " +
                       $"Korak Primjena formule: d = sqrt(dx² + dy² + dz²). " +
                       $"Korak Udaljenost = {distance}.";

        return new CalculateResult
        {
            Result = distance,
            Steps = steps
        };
    }

    public CalculateLineResult CalculateLineFromTwoPoints(PointInput p1, PointInput p2)
    {
        double dx = p2.X - p1.X;
        double dy = p2.Y - p1.Y;
        double dz = p2.Z - p1.Z;

        string steps = $"Korak Točka T₁ = ({p1.X}, {p1.Y}, {p1.Z}), T₂ = ({p2.X}, {p2.Y}, {p2.Z}). " +
                       $"Korak Vektor smjera s = (dx, dy, dz) = ({dx}, {dy}, {dz}).";

        return new CalculateLineResult
        {
            StartPoint = p1,
            DirectionVector = new LineInput { X = dx, Y = dy, Z = dz },
            Steps = steps
        };
    }

    public CalculatePlaneResult CalculatePlaneFromThreePoints(PointInput p1, PointInput p2, PointInput p3)
    {
        double v1X = p2.X - p1.X;
        double v1Y = p2.Y - p1.Y;
        double v1Z = p2.Z - p1.Z;

        double v2X = p3.X - p1.X;
        double v2Y = p3.Y - p1.Y;
        double v2Z = p3.Z - p1.Z;

        double A = v1Y * v2Z - v2Y * v1Z;
        double B = -(v1X * v2Z - v2X * v1Z);
        double C = v1X * v2Y - v2X * v1Y;
        double D = -(A * p1.X + B * p1.Y + C * p1.Z);

        A = Math.Round(A, 2);
        B = Math.Round(B, 2);
        C = Math.Round(C, 2);
        D = Math.Round(D, 2);

        string steps = $"Korak Zadan je T₁ = ({p1.X}, {p1.Y}, {p1.Z}), T₂ = ({p2.X}, {p2.Y}, {p2.Z}), T₃ = ({p3.X}, {p3.Y}, {p3.Z}). " +
                       $"Korak Računamo vektore T₁T₂ = ({v1X}, {v1Y}, {v1Z}) i T₁T₃ = ({v2X}, {v2Y}, {v2Z}). " +
                       $"Korak Normala ravnine je vektorski produkt T₁T₂ × T₁T₃ = ({A}, {B}, {C}). " +
                       $"Korak Parametar D se dobiva: D = -({A}·{p1.X} + {B}·{p1.Y} + {C}·{p1.Z}) = {D}. " +
                       $"Korak Opći oblik ravnine: {A}x + {B}y + {C}z + {D} = 0.";

        return new CalculatePlaneResult
        {
            A = A,
            B = B,
            C = C,
            D = D,
            Steps = steps
        };
    }
}
