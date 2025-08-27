using API.src.Domain;

namespace API.src.Application.Services.Products.Interfaces
{
    public interface IProductWriteService
    {
        Task<Product> CreateProductAsync(Product product);
        Task DeleteProductAsync(string productId);
        Task UpdateLikedByUserAsync(string userId, string productId, bool isLiked);
        Task UpdateProductAsync(Product product);
        
    }
}