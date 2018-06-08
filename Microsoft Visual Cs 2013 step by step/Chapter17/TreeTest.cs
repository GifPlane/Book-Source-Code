using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft_Visual_Cs_2013_step_by_step.Chapter17
{
    class TreeTest
    {
        public static void Main(String[] args)
        {
            Tree<int> tree1 = new Tree<int>(10);
            tree1.Insert(5);
            tree1.Insert(11);
            tree1.Insert(5);
            tree1.Insert(-12);
            tree1.Insert(15);
            tree1.Insert(0);
            tree1.Insert(14);
            tree1.Insert(-8);
            tree1.Insert(10);
            tree1.Insert(8);
            tree1.Insert(8);
            string sortedData = tree1.WalkTree();
            Console.WriteLine("Sorted data is: {0}", sortedData);
        }
    }
}
