using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AllureAi_API.Domain.Contracts
{
    //public class ProductContract
    //{
    //}
    public record CreateProductDto
    {
        [Required(ErrorMessage = "Product name is required.")]
        [JsonPropertyName("name")]
        public string Name { get; init; }

        [Required(ErrorMessage = "Description is required.")]
        [JsonPropertyName("Description")]
        public string Description { get; init; }

        [Required(ErrorMessage = "Price is required.")]
        [JsonPropertyName("Price")]
        public string Price { get; init; }
    }
    public record UpdateProductDto
    {
        [Required]
        [JsonPropertyName("name")]
        public string Name { get; init; }

        [Required]
        [JsonPropertyName("Description")]
        public string Description { get; init; }

        [Required]
        [JsonPropertyName("Price")]
        public string Price { get; init; }
    }
    public record ProductDto
    {
       
        [JsonPropertyName("id")]
        public string id { get; init; }

        [Required]
        [JsonPropertyName("name")]
        public string Name { get; init; }

        [Required]
        [JsonPropertyName("Description")]
        public string Description { get; init; }
        [Required]
        [JsonPropertyName("Price")]
        public string Price { get; init; }
    }
    public record DeleteProduct
    {      
        [JsonPropertyName("id")]
        public string id { get; init; }
    }
}
