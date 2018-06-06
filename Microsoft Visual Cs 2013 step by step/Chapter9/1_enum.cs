using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Visual_Cs_2013_step_by_step.Chapter9
{

    enum Month : byte
    {
        January, February, March, April,
        May, June, July, August,
        September, October, November, December
    }

    class _1_enum
    {

        public static void Main(String[] args)
        {
            doWork();
        }

        static void doWork()
        {
            Month first = Month.December;
           // Month second = Month.February;
            Console.WriteLine(first);
            ++first;//first=12的时候，没有对应的枚举类型，所以下面直接输出12
            Console.WriteLine(first);
        }
    }
}
