using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AllureAi_API.Domain.Models
{
    public class Product
    {
       
        public int ID { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
