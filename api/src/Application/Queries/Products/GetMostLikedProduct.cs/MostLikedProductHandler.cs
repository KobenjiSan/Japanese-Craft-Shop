using API.src.Application.Common.DTOs.Products;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using Mapster;
using MediatR;

namespace API.src.Application.Queries.Products.GetMostLikedProduct
{
    public class MostLikedProductHandler : IRequestHandler<MostLikedProductQuery, ProductResponseDto>
    {
        private readonly IProductReadService _productReadService;

        public MostLikedProductHandler(IProductReadService productReadService)
        {
            _productReadService = productReadService;
        }

        public async Task<ProductResponseDto> Handle(MostLikedProductQuery request, CancellationToken cancellationToken)
        {
            var allProducts = await _productReadService.GetAllProductsAsync();

            var mostLiked = allProducts[0];
            var mostLikes = allProducts[0].LikedByUserIds.Count();

            foreach (Product product in allProducts)
            {
                if (product.LikedByUserIds.Count() > mostLikes)
                {
                    mostLikes = product.LikedByUserIds.Count();
                    mostLiked = product;
                }
            }

            return mostLiked.Adapt<ProductResponseDto>();
        }
    }
}