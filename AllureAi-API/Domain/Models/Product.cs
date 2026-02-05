using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AllureAi_API.Domain.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; }

        [BsonElement("Name")]
        public string ProductName { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Price")]
        public string Price { get; set; }

    }
}
