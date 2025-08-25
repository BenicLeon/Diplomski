using Model.Geometry.Input;

namespace Common
{
    public class CalculateLineResult
    {
        public PointInput StartPoint { get; set; } = null!;
        public LineInput DirectionVector { get; set; } = null!;
        public string Steps { get; set; } = string.Empty;
    }
}