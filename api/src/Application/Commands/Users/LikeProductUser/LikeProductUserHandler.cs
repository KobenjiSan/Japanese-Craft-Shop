using API.src.Application.Common.Exceptions;
using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users.Interfaces;
using MediatR;

namespace API.src.Application.Commands.Users.LikedProductUser
{
    public class LikeProductUserHandler : IRequestHandler<LikeProductUserCommand, LikeProductUserResponseDto>
    {

        private readonly IUserWriteService _userWriteService;
        private readonly IProductWriteService _productWriteService;
        private readonly IProductReadService _productReadService;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public LikeProductUserHandler(
            IUserWriteService userWriteService,
            IProductWriteService productWriteService,
            IProductReadService productReadService,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _userWriteService = userWriteService;
            _productWriteService = productWriteService;
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

            var isLikedStatus = await _userWriteService.ToggleLikeProductAsync(userId, request.ProductId);

            await _productWriteService.UpdateLikedByUserAsync(userId, request.ProductId, isLikedStatus);

            return new LikeProductUserResponseDto(isLikedStatus);
        }
    }
}