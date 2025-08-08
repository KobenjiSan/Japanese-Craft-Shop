using API.src.Application.DTOs.Responses;
using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using MediatR;

namespace API.src.Application.Queries.Users
{
    public class GetAllLikedByUserHandler : IRequestHandler<GetAllLikedByUserQuery, AllLikedByUserResponseDto>
    {

        private readonly IUserReadService _readService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAllLikedByUserHandler(IUserReadService readService, IHttpContextAccessor httpContextAccessor)
        {
            _readService = readService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AllLikedByUserResponseDto> Handle(GetAllLikedByUserQuery request, CancellationToken cancellationToken)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;
            if (userId == null)
                throw new UnauthorizedAccessException("User ID not found in token.");

            var reponseList = await _readService.GetAllLikedByUserAsync(userId);

            return new AllLikedByUserResponseDto { LikedProducts = reponseList };

        }
    }
}