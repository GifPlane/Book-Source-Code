using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Visual_Cs_2013_step_by_step.Chapter11
{
    class Chapter11_1
    {
        public static int Min(params int[] paramList)
        {
            // Verify that the caller has provided at least one parameter.
            // If not, throw an ArgumentException exception – it is not possible
            // to find the smallest value in an empty list.
            if (paramList == null || paramList.Length == 0)
            {
                throw new ArgumentException("Util.Min: not enough arguments");
            }
            // Set the current minimum value found in the list of parameters to the first item
            int currentMin = paramList[0];
            // Iterate through the list of parameters, searching to see whether any of them
            // are smaller than the value held in currentMin
            foreach (int i in paramList)
            {
                // If the loop finds an item that is smaller than the value held in
                // currentMin, then set currentMin to this value
                if (i < currentMin)
                {
                    currentMin = i;
                }
            }
            // At the end of the loop, currentMin holds the value of the smallest
            // item in the list of parameters, so return this value.
            return currentMin;
        }

        public static void Main(String[] args)
        {
            int[] array = new int[3];
            array[0] = 2;
            array[1] = 3;
            array[2] = 1;
            int min = Chapter11_1.Min(2,3);
        }
    }
}
