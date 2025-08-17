using API.src.Application.Services.Products.Interfaces;
using MediatR;

namespace API.src.Application.Queries.Products.GetLikedByList
{
    public class GetLikedByListHandler : IRequestHandler<GetLikedByListQuery, LikedByListResponseDto>
    {
        private readonly IProductReadService _productReadService;
        public GetLikedByListHandler(IProductReadService productReadService)
        {
            _productReadService = productReadService;
        }

        public async Task<LikedByListResponseDto> Handle(GetLikedByListQuery request, CancellationToken cancellationToken)
        {
            var responseList = await _productReadService.GetLikedByList(request.ProductId);
            if (responseList == null)
                responseList = new List<string>();

            return new LikedByListResponseDto(responseList);
        }
    }
}