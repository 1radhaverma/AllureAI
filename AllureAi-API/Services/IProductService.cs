using AllureAi_API.Domain.Contracts;

namespace AllureAi_API.Services
{
    public interface IProductService
    {
        Task<ProductDto> CreateProductAsync(CreateProductDto dto);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductByIdAsync(string id);
        Task<ProductDto> UpdateProductAsync(string id, UpdateProductDto dto);
        Task<bool> DeleteProductAsync(string id);
    }
}
