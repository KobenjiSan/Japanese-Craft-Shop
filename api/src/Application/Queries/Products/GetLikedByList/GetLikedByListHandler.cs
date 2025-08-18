using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using MediatR;

namespace API.src.Application.Queries.Products.GetLikedByList
{
    public class GetLikedByListHandler : IRequestHandler<GetLikedByListQuery, LikedByListResponseDto>
    {
        private readonly IProductReadService _productReadService;
        private readonly IUserReadService _userReadService;
        public GetLikedByListHandler(
            IProductReadService productReadService,
            IUserReadService userReadService
        )
        {
            _productReadService = productReadService;
            _userReadService = userReadService;
        }

        public async Task<LikedByListResponseDto> Handle(GetLikedByListQuery request, CancellationToken cancellationToken)
        {
            var idsList = await _productReadService.GetLikedByList(request.ProductId);
            if (idsList == null)
                return new LikedByListResponseDto(new List<UserToId>());

            var responseList = await _userReadService.GetListUsersByIdsAsync(idsList);

            return new LikedByListResponseDto(responseList);
        }
    }
}