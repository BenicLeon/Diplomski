using Model.Geometry.Input;

namespace Model.Geometry.Request
{

    public class PlaneRequest
    {
        public PlaneInput First { get; set; } = null!;
        public PlaneInput Second { get; set; } = null!;
    }
}