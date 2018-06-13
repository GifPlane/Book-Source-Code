using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cs_in_depth
{
    public class Product
    {
        readonly string name;
        public string Name { get { return name; } }
        readonly decimal price;
        public decimal Price { get { return price; } }

        public Product(string name, decimal price)
        {
            this.name = name;
            this.price = price;
        }

        public static List<Product> GetSampleProducts()
        {
            return new List<Product>{
                new Product(name:"West Side Story", price:9.9m),
                new Product(name:"Assassins", price:14.9m),
                new Product(name:"Frogs", price:13.9m),
                new Product(name:"Sweeney", price:10.9m)
            };
        }

        public override string ToString()
        {
            return string.Format("{0}:{1}", name, price);
        }
    }

    
}
