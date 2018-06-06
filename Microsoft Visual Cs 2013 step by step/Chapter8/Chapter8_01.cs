using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Part2
{
    class Pass
    {

        public static void Main(String[] args)
        {
            doWork();
        }

        public static void Value(int param)
        {
            param = 42;
        }

        static void doWork()
        {
            int i = 0;
            Console.WriteLine(i);
            Pass.Value(i);
            Console.WriteLine(i);
        }
    }
}
