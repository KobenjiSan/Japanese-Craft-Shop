using API.src.Domain;

namespace API.src.Application.Services.Products.Interfaces
{
    public interface IProductReadService
    {
        Task<Product?> GetProductByIdAsync(string productId);
    }
}