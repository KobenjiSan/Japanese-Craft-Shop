using API.src.Domain;

namespace API.src.Application.Services.Products.Interfaces
{
    public interface IProductReadService
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<List<string>> GetImageUrlsByProductIdAsync(string productId);
        Task<List<string>> GetLikedByList(string productId);
        Task<Product?> GetProductByIdAsync(string productId);
        Task<List<Product>> GetProductsFromIds(List<string> productIds);
    }
}