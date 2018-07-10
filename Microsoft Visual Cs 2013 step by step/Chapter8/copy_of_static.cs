using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Visual_Cs_2013_step_by_step.Chapter8
{
    class copy_of_static
    {
        public static int a = 1;

        public int b;

        private int c;

        public void SetC(int c)
        {
            this.c = c;
        }

        public copy_of_static Clone()
        {
            copy_of_static o = new copy_of_static();

            o.b = this.b;
            o.c = this.c;

            return o;
        }
    }
}
