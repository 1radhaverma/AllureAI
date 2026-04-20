using AllureAi_API.Data;
using AllureAi_API.Domain.Contracts;
using AllureAi_API.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AllureAi_API.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                ProductName = dto.Name,
                Description = dto.Description,
                Price = decimal.Parse(dto.Price) // Convert decimal to string for storage
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return MapToDto(product);
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _context.Products.ToListAsync();
            return products.Select(MapToDto);
        }

        public async Task<ProductDto?> GetProductByIdAsync(string id)
        {
            int productId = int.Parse(id);

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                throw new Exception("Product not found");

            return MapToDto(product);
        }

        public async Task<ProductDto> UpdateProductAsync(string id, UpdateProductDto dto)
        {
            int productId = int.Parse(id);

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                throw new Exception("Product not found");

            product.ProductName = dto.Name;
            product.Description = dto.Description;
            product.Price = decimal.Parse(dto.Price);

            await _context.SaveChangesAsync();

            return MapToDto(product);
        }

        public async Task<bool> DeleteProductAsync(string id)
        {
            int productId = int.Parse(id);

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
                throw new Exception("Product not found");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        private static ProductDto MapToDto(Product product) => new()
        {
            id = product.ID.ToString(),
            Name = product.ProductName,
            Description = product.Description,
            Price = product.Price.ToString()
        };
    }
}