using AllureAi_API.Domain.Contracts;

namespace AllureAi_API.Services
{
    public interface IProductService
    {
        Task<ProductDto?> GetProductByIdAsync(string id);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
        Task<ProductDto> UpdateProductAsync(string id, UpdateProductDto updateProductDto);
        Task<bool> DeleteProductAsync(string id);
    }
}
