using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cs_in_depth.Chapter1
{
    class Test
    {
        public static void Main(string[] args){

            List<Product> products = Product.GetSampleProducts();

           // products.Sort((x, y)=> x.Name.CompareTo(y.Name));

            foreach (Product product in products.OrderBy(p=>p.Name)){
                Console.WriteLine(product);
            }
        }
    }
}
