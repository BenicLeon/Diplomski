using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Geometry.Input;

namespace Model.Geometry.Request
{
    public class PointsDistanceRequest
    {
        public PointInput PointFirst { get; set; } = null!;

        public PointInput PointSecond { get; set; } = null!;
    }
}
