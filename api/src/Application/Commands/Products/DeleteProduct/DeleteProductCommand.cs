using MediatR;

namespace API.src.Application.Commands.Products.DeleteProduct
{
    public class DeleteProductCommand : IRequest<Unit>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}