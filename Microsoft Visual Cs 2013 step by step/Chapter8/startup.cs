using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Visual_Cs_2013_step_by_step.Chapter8
{
    class startup
    {
        public static void Main(String[] args)
        {
            copy_of_static c = new copy_of_static();

            c.b = 10;
            c.SetC(20);

            copy_of_static newc = c.Clone();

            copy_of_static.a = 100;

        }
    }
}
