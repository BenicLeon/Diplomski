using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Geometry.Input;

namespace Model.Geometry.Request
{
    public class PlanePointRequest
    {
        public PlaneInput Plane { get; set; } = null!;

        public PointInput Point { get; set; } = null!;
    }
}
