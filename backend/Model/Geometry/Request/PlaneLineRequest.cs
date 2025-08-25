using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Geometry.Input;

namespace Model.Geometry.Request
{
    public class PlaneLineRequest
    {
        public PlaneInput Plane { get; set; } = null!;

        public LineInput Line { get; set; } = null!;
    }
}
