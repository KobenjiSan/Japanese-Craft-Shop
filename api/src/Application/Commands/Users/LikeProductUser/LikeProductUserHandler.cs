using API.src.Application.Common.Exceptions;
using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users.Interfaces;
using MediatR;

namespace API.src.Application.Commands.Users.LikedProductUser
{
    public class LikeProductUserHandler : IRequestHandler<LikeProductUserCommand, LikeProductUserResponseDto>
    {

        private readonly IUserWriteService _writeService;
        private readonly IProductReadService _productReadService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LikeProductUserHandler(
            IUserWriteService writeService,
            IProductReadService productReadService,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _writeService = writeService;
            _productReadService = productReadService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<LikeProductUserResponseDto> Handle(LikeProductUserCommand request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;
            if (userId == null)
                throw new UnauthorizedAccessException("User ID not found in token.");

            var product = await _productReadService.GetProductByIdAsync(request.ProductId);
            if (product == null)
                throw new NotFoundException("Cannot like non existent product.");

            var alreadyLiked = await _writeService.TryLikeProductAsync(userId, request.ProductId);
            if (alreadyLiked)
                await _writeService.UnlikeProductAsync(userId, request.ProductId);

            return new LikeProductUserResponseDto(!alreadyLiked);
        }
    }
}