using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
    在C#中使用执政指针，使用unsafe关键字
 */

namespace Part2
{
    class Chapter8_02
    {
        public static void Main(String[] args)
        {
            int x = 99, y = 100;
            unsafe
            {
                swap(&x, &y);
            }
            
        }

        public static unsafe void swap(int* a, int* b)
        {
            int temp;
            temp = *a;
            *a = *b;
            *b = temp;
        }
    }
}
