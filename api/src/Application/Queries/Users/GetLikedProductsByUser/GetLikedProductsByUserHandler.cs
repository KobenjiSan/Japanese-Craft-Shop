using API.src.Application.Common.DTOs.Products;
using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using Mapster;
using MediatR;

namespace API.src.Application.Queries.Users.GetLikedProductsByUser
{
    public class GetLikedProductsByUserHandler : IRequestHandler<GetLikedProductsByUserQuery, GetLikedProductsByUserResponseDto>
    {
        private readonly IUserReadService _userReadService;
        private readonly IProductReadService _productReadService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetLikedProductsByUserHandler(
            IUserReadService userReadService,
            IProductReadService productReadService,
            IHttpContextAccessor httpContextAccessor

        )
        {
            _userReadService = userReadService;
            _productReadService = productReadService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<GetLikedProductsByUserResponseDto> Handle(GetLikedProductsByUserQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;
            if (userId == null)
                throw new UnauthorizedAccessException("User ID not found in token.");

            var productIdsList = await _userReadService.GetAllLikedByUserAsync(userId);
            if (productIdsList.Count <= 0 || productIdsList == null)
                return new GetLikedProductsByUserResponseDto([]);

            var productObjList = await _productReadService.GetProductsFromIds(productIdsList);

            var resultList = new List<ProductResponseDto>();
            foreach (Product product in productObjList)
            {
                var dtoProduct = product.Adapt<ProductResponseDto>();
                resultList.Add(dtoProduct);
            }

            return new GetLikedProductsByUserResponseDto(resultList);
        }
    }
}