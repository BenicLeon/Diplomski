using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Geometry.Input;

namespace Model.Geometry.Request
{
    public class LineFromPointsRequest
    {
        public PointInput Point1 { get; set; } = null!;
        public PointInput Point2 { get; set; } = null!;
    }

}
