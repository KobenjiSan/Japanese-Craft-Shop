using API.src.Application.Common.Exceptions;
using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users.Interfaces;
using MediatR;

namespace API.src.Application.Commands.Products.DeleteProduct
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, Unit>
    {
        private readonly IProductReadService _productReadService;
        private readonly IProductWriteService _productWriteService;
        private readonly IUserWriteService _userWriteService;

        public DeleteProductHandler(
            IProductReadService productReadService,
            IProductWriteService productWriteService,
            IUserWriteService userWriteService
        )
        {
            _productReadService = productReadService;
            _productWriteService = productWriteService;
            _userWriteService = userWriteService;
        }

        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var imageUrls = await _productReadService.GetImageUrlsByProductIdAsync(request.ProductId);
            if (imageUrls == null)
                throw new NotFoundException("Product does not exist.");

            await _userWriteService.RemoveProductFromAllUsers(request.ProductId);

            await _productWriteService.DeleteProductAsync(request.ProductId);

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            foreach (var url in imageUrls)
            {
                var fileName = Path.GetFileName(new Uri(url).LocalPath);
                var filePath = Path.Combine(uploadsFolder, fileName);
                if (File.Exists(filePath))
                    File.Delete(filePath);
            }

            return Unit.Value;
        }
    }
}