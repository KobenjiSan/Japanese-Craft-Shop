using API.src.Domain;

namespace API.src.Application.Services.Products.Interfaces
{
    public interface IProductWriteService
    {
        Task<Product> CreateProductAsync(Product product);
    }
}